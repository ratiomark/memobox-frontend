import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const loadLanguages = import.meta.env.DEV ? 'all' : 'currentOnly';
const detectorOptions = {
	// Настройки для определения языка
	order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
	lookupLocalStorage: 'i18nextLng',
	// Функция проверки, которая обрезает региональный код
	checkWhitelist: true,
	lookupFromPathIndex: 0
};

i18n.use(LanguageDetector).init({
	detection: detectorOptions,
	// ... другие опции i18n
});
i18n
	// use это подключение плагинов, их можно писать самому. 
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({

		supportedLngs: ['ru', 'en'],
		// supportedLngs: ['ru', 'en', 'zk','it', 'uk', 'de'],
		// fallbackLng: ['en', 'ru'], //если использовать оба языка, то они оба json будут загружены
		// дебаг будет спамить в консоль подрузку переводов, отсутсвующие ключи
		debug: false,
		// debug: __IS_DEV__,
		interpolation: {
			escapeValue: false,
		},
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json' // путь из которого будут подтягиваться переводы
		},
		load: 'languageOnly', // Загружать все языки в режиме разработки, иначе только текущий
		detection: detectorOptions,
	});


export default i18n;