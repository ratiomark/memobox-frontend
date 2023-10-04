// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { ShelfSchema } from '@/entities/Shelf';
import { KEY_COMMON_SHELF_IS_COLLAPSED, KEY_SHELVES_LOCAL_STORAGE, KEY_THEME_LOCAL_STORAGE, KEY_VIEW_ROWS_LOCAL_STORAGE } from '@/shared/const/localStorage';
import { Theme } from '@/shared/types/Theme';

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
	setTheme(theme: Theme): void
	getTheme(): Theme
	setViewRows(viewRowsValue: string | number): void
	getViewRows(): string
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
		this.saveData(KEY_SHELVES_LOCAL_STORAGE, shelves)
	}
	getShelves(): ShelfSchema[] | [] {
		const localShelves = this.getData(KEY_SHELVES_LOCAL_STORAGE)
		if (Array.isArray(localShelves) && localShelves.length > 0) {
			return localShelves.sort((a, b) => a.index - b.index)
		}
		return []
		// if (!shelvesFromStorage) return []
		// return shelvesFromStorage
	}
	setTheme(theme: Theme): void {
		this.saveData(KEY_THEME_LOCAL_STORAGE, theme)
	}
	getTheme(): Theme {
		return this.getData(KEY_THEME_LOCAL_STORAGE)
	}
	setViewRows(viewRows: string | number): void {
		this.saveData(KEY_VIEW_ROWS_LOCAL_STORAGE, viewRows)
	}
	getViewRows(): string {
		return this.getData(KEY_VIEW_ROWS_LOCAL_STORAGE)
	}
	setCommonShelfCollapsed(commonShelfCollapsed: boolean | undefined): void {
		if (commonShelfCollapsed === undefined) return
		this.saveData(KEY_COMMON_SHELF_IS_COLLAPSED, commonShelfCollapsed)
	}
	getCommonShelfCollapsed() {
		return this.getData(KEY_COMMON_SHELF_IS_COLLAPSED) ?? true
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
