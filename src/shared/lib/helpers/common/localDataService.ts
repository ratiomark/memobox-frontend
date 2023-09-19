// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { ShelfSchema } from '@/entities/Shelf';
import { COMMON_SHELF_IS_COLLAPSED_KEY, SHELVES_KEY } from '@/shared/const/localStorage';

interface IStorageService {
	// setItem(key: string, value: any): void;
	// getItem(key: string): any;
	// removeItem(key: string): void;
	// clear(): void;
	saveData(key: string, value: any): void;
	getData(key: string): any;
	removeData(key: string): void;
	// getShelves(): ShelfSchema[] | undefined
	// setShelves(shelves: ShelfSchema[]): void
}


class LocalStorageService implements IStorageService {
	saveData(key: string, value: any) {
		if (typeof value === 'object') {
			value = JSON.stringify(value);
		}
		localStorage.setItem(key, value);
	}

	getData(key: string) {
		let value = localStorage.getItem(key);
		try {
			value = JSON.parse(value as string);
		} catch (e) {
			// value could not be parsed, it is not JSON, so we return it as is
		}
		return value;
	}

	removeData(key: string) {
		localStorage.removeItem(key);
	}

	clear() {
		localStorage.clear();
	}
}

interface ILocalDataService {
	saveData(key: string, value: any): void
	getData(key: string): any
	removeData(key: string): void
	getShelves(): ShelfSchema[] | []
	setShelves(shelves: ShelfSchema[]): void
	setCommonShelfCollapsed(commonShelfCollapsed: boolean): void
	getCommonShelfCollapsed(): boolean | undefined
}

class LocalDataService implements ILocalDataService {

	constructor(private storage: IStorageService) { }

	saveData(key: string, data: any) {
		this.storage.saveData(key, data);
	}
	getData(key: string) {
		return this.storage.getData(key);
	}
	removeData(key: string) {
		this.storage.removeData(key)
	}
	setShelves(shelves: ShelfSchema[]): void {
		this.saveData(SHELVES_KEY, shelves)
	}
	getShelves(): ShelfSchema[] | [] {
		return this.getData(SHELVES_KEY) ?? []
		// const shelvesFromStorage = this.getData(SHELVES_KEY)
		// if (!shelvesFromStorage) return []
		// return shelvesFromStorage
	}
	setCommonShelfCollapsed(commonShelfCollapsed: boolean | undefined): void {
		if (commonShelfCollapsed === undefined) return
		this.saveData(COMMON_SHELF_IS_COLLAPSED_KEY, commonShelfCollapsed)
	}
	getCommonShelfCollapsed() {
		return this.getData(COMMON_SHELF_IS_COLLAPSED_KEY) ?? true
	}
}

let isInBrowser: boolean;

try {
	isInBrowser = typeof window !== 'undefined';
} catch (e) {
	isInBrowser = false;
}
let localDataService: LocalDataService;
if (isInBrowser) {
	const storage = new LocalStorageService();
	localDataService = new LocalDataService(storage)
}

export { localDataService }
