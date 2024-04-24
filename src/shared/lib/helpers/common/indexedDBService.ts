
import { openDB, DBSchema, IDBPDatabase } from 'idb';

// interface ConfigsSchema extends DBSchema {
// 	configs: {
// 		value: string;
// 		key: ConfigKey;
// 	};
// }

interface MyDB extends DBSchema {
	configs: {
		value: string;
		key: ConfigKey;
	};
	userData: {
		value: boolean;
		key: UserKey
	};
}

// if (!db.objectStoreNames.contains('configs')) {
// 	db.createObjectStore('configs', { keyPath: 'key' });
// }
type UserKey = 'isActivated' | 'isSubscribed';
type ConfigKey = 'apiBaseUrl' | 'token' | 'refreshToken' | 'language';

class DatabaseService {
	private static instance: DatabaseService;
	private dbPromise: Promise<IDBPDatabase<MyDB>>;
	private constructor() {
		this.dbPromise = openDB<MyDB>('myAppDB', 1, {
			upgrade(db, oldVersion) {
				if (!db.objectStoreNames.contains('configs')) {
					db.createObjectStore('configs');
				}
				if (!db.objectStoreNames.contains('userData')) {
					db.createObjectStore('userData');
				}
				// if (oldVersion < 1) {
				// 	if (!db.objectStoreNames.contains('configs')) {
				// 		db.createObjectStore('configs');
				// 	}
				// }
				// if (oldVersion < 2) {
				// 	if (!db.objectStoreNames.contains('userData')) {
				// 		db.createObjectStore('userData', { keyPath: 'key' });
				// 	}
				// }
				// if (oldVersion < 4) {
				// 	if (!db.objectStoreNames.contains('userData')) {
				// 		db.createObjectStore('userData', { keyPath: 'key' });
				// 	}
				// }
			}
		});
	}
	// private constructor() {
	// 	this.dbPromise = openDB<MyDB>('myAppDB', 3, {
	// 		upgrade(db, oldVersion) {
	// 			if (oldVersion < 1 && !db.objectStoreNames.contains('configs')) {
	// 				db.createObjectStore('configs', { keyPath: 'key' });
	// 			}
	// 			if (oldVersion < 2 && !db.objectStoreNames.contains('userData')) {
	// 				db.createObjectStore('userData', { keyPath: 'key' });
	// 			}
	// 			// Future upgrades can be managed here
	// 		}
	// 	});
	// }

	public static getInstance(): DatabaseService {
		if (!DatabaseService.instance) {
			DatabaseService.instance = new DatabaseService();
		}
		return DatabaseService.instance;
	}

	public getDBPromise(): Promise<IDBPDatabase<MyDB>> {
		return this.dbPromise;
	}
}

class ConfigService {
	private dbPromise: Promise<IDBPDatabase<MyDB>>;

	constructor() {
		this.dbPromise = DatabaseService.getInstance().getDBPromise();
	}


	public async getConfig(key: ConfigKey): Promise<string | undefined> {
		const db = await this.dbPromise;
		return await db.get('configs', key);
	}

	public async setConfig(key: ConfigKey, value: string): Promise<void> {
		const db = await this.dbPromise;
		const tx = db.transaction('configs', 'readwrite');
		await tx.objectStore('configs').put(value, key);
		await tx.done;
	}

	public async removeConfig(key: ConfigKey): Promise<void> {
		const db = await this.dbPromise;
		const tx = db.transaction('configs', 'readwrite');
		await tx.objectStore('configs').delete(key);
		await tx.done;
	}

	public async setup(initialConfigs: { [key in ConfigKey]?: string }): Promise<void> {
		const db = await this.dbPromise;
		const tx = db.transaction('configs', 'readwrite');
		for (const [key, value] of Object.entries(initialConfigs)) {
			if (value !== undefined) {
				await tx.store.put(value, key as ConfigKey);  // Простая передача значения и ключа
			}
		}
		await tx.done;
	}

	// Methods to interact with the 'configs' object store
}

export const indexedConfigService = new ConfigService();

// Нужно сделать обертку LocalDBService, которая будет принимать DBStorage(в веб версии это будет indexedDB, а react native это будет что-то другое). Смысыл в том, что мне нужно сделать обвертку, которая через депенденси инджекшн будет реализовывать нужные методы.
// Если есть только одна новая карточка.
// Пользователь перезагружает страницу. В этот момент я сохраняю данные в indexedDB
// Я сохраняю объект новой карточки в таком формате
// index: 0 (соответветсвтено если в будущем будет еще одна несохраненная карточка, то у нее index: 1 )
// shelfId
// boxId
// question - тут строковое представление editorState
// answer - тут строковое представление editorState
// Когда плагин добавляет картинку, то я делаю следующее. В indexDB я помещаю объект:
// imageBase64: резульатат FileReader
// imageBlobUrl: результат URL.createObjectURL(image)
// cardIndex: 0 для первой несохраненной карточки
// fieldType: question | answer
// imageId: уникальный айдишник
// Когда страница перезагружается, то я:
// Смотрю на question. Если там есть картинка, то ее src это blob, который уже лежит в indexDB. Я нахожу картинку по imageBlobUrl, достаю imageId, меняю src: imageBlobUrl на src: imageId.
// Проделываю тоже самое с answer.
// Сохраняю карточку в хранилище объектов для cards.
// Страница перезагружается.
// Я провераю хранилище объектов cards. Если там есть что-то, то я достаю все объекты. Рассмотрим ситуацию, где только одна карточка.
// Я достаю карточку. Проверяю question, если там есть картинка, то ее src указывает на imageId.
// Использую imageId, чтобы получить imageBase64, на основе imageBase64 создаю новый imageBlobUrl.
// Беру новый imageBlobUrl, заменяю старое значение imageBlobUrl на новое, а также заменяю imageId внутри вопроса на новый imageBlobUrl.
// Проделываю это для все imageId в вопросах и ответах.
// Новые данные передаю в хранилище редакса.
// Profit! (навереное)
// Однако я должен посмотреть если ли картинки. Если картинка присутствует, то я должен взять блоб ссылку, пол
// const handleBeforeUnload = (event) => {
// 	// Здесь можно вызвать любой коллбек
// 	console.log('User is leaving the page');

// 	// Следующие две строки необходимы для отображения стандартного предупреждения браузера о том, что пользователь покидает страницу
// 	event.preventDefault();
// 	event.returnValue = '';
// };

// // Добавляем обработчик события beforeunload
// window.addEventListener('beforeunload', handleBeforeUnload);

// // Удаляем обработчик события при размонтировании компонента, чтобы избежать утечек памяти
// return () => {
// 	window.removeEventListener('beforeunload', handleBeforeUnload);
// };