// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { ShelfSchema } from '@/entities/Shelf';
// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { SortColumnValue } from '@/entities/User';
import {
	KEY_APP_LANG_LOCAL_STORAGE,
	KEY_COMMON_SHELF_IS_COLLAPSED,
	KEY_SHELVES_LOCAL_STORAGE,
	KEY_THEME_LOCAL_STORAGE,
	KEY_TOOLTIP_ENABLED_LOCAL_STORAGE,
	KEY_USER_ID_LOCAL_STORAGE,
	KEY_USER_REFRESH_TOKEN_LOCAL_STORAGE,
	KEY_USER_TOKEN_LOCAL_STORAGE,
	KEY_VIEW_ROWS_LOCAL_STORAGE,
	KEY_VIEW_SORT_ORDER_LOCAL_STORAGE,
	KEY_VIEW_SORT_VALUE_LOCAL_STORAGE,

} from '@/shared/const/localStorage';
import { SortOrderType } from '@/shared/types/SortOrderType';
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
	// 
	getShelves(): ShelfSchema[] | []
	setShelves(shelves: ShelfSchema[]): void
	setCommonShelfCollapsed(commonShelfCollapsed: boolean): void
	getCommonShelfCollapsed(): boolean | undefined
	setTheme(theme: Theme): void
	getTheme(): Theme
	setViewRows(viewRowsValue: string | number): void
	getViewRows(): number
	setToken(token: string | number): void
	setRefreshToken(token: string | number): void
	getRefreshToken(): string
	setUserId(userId: string): void
	getUserId(): string
	setLanguage(language: string): void
	getLanguage(): string
	setTooltipIsEnabled(state: boolean): void
	getTooltipIsEnabled(): boolean
	logout(): void
	// 
	setSortOrderViewPage(sortOrder: SortOrderType): void
	getSortOrderViewPage(): SortOrderType
	setSortValueViewPage(sortValue: SortColumnValue): void
	getSortValueViewPage(): SortColumnValue
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
	setToken(token: string): void {
		this.saveData(KEY_USER_TOKEN_LOCAL_STORAGE, token)
	}
	getToken(): string {
		return this.getData(KEY_USER_TOKEN_LOCAL_STORAGE)
	}
	setRefreshToken(token: string): void {
		this.saveData(KEY_USER_REFRESH_TOKEN_LOCAL_STORAGE, token)
	}
	getRefreshToken(): string {
		return this.getData(KEY_USER_REFRESH_TOKEN_LOCAL_STORAGE)
	}
	setUserId(userId: string): void {
		this.saveData(KEY_USER_ID_LOCAL_STORAGE, userId)
	}
	getUserId(): string {
		return this.getData(KEY_USER_ID_LOCAL_STORAGE)
	}
	setViewRows(viewRows: string | number): void {
		this.saveData(KEY_VIEW_ROWS_LOCAL_STORAGE, viewRows)
	}
	getViewRows(): number {
		return Number(this.getData(KEY_VIEW_ROWS_LOCAL_STORAGE)) ?? 2
	}
	setCommonShelfCollapsed(commonShelfCollapsed: boolean | undefined): void {
		if (commonShelfCollapsed === undefined) return
		this.saveData(KEY_COMMON_SHELF_IS_COLLAPSED, commonShelfCollapsed)
	}
	getCommonShelfCollapsed() {
		return this.getData(KEY_COMMON_SHELF_IS_COLLAPSED) ?? true
	}
	setLanguage(language: string): void {
		this.saveData(KEY_APP_LANG_LOCAL_STORAGE, language)
	}
	getLanguage(): string {
		return this.getData(KEY_APP_LANG_LOCAL_STORAGE) ?? 'en'
	}
	setTooltipIsEnabled(state: boolean) {
		this.saveData(KEY_TOOLTIP_ENABLED_LOCAL_STORAGE, state)
	}
	getTooltipIsEnabled() {
		return this.getData(KEY_TOOLTIP_ENABLED_LOCAL_STORAGE) ?? true
	}
	logout() {
		this.removeData(KEY_USER_TOKEN_LOCAL_STORAGE)
		this.removeData(KEY_USER_REFRESH_TOKEN_LOCAL_STORAGE)
		this.removeData(KEY_USER_ID_LOCAL_STORAGE)
		this.removeData(KEY_SHELVES_LOCAL_STORAGE)
		this.removeData(KEY_COMMON_SHELF_IS_COLLAPSED)
		this.removeData(KEY_VIEW_ROWS_LOCAL_STORAGE)
		this.removeData(KEY_VIEW_SORT_ORDER_LOCAL_STORAGE)
		this.removeData(KEY_VIEW_SORT_VALUE_LOCAL_STORAGE)
	}
	// 
	setSortOrderViewPage(sortOrder: SortOrderType) {
		this.saveData(KEY_VIEW_SORT_ORDER_LOCAL_STORAGE, sortOrder)
	}
	getSortOrderViewPage(): SortOrderType {
		return this.getData(KEY_VIEW_SORT_ORDER_LOCAL_STORAGE) ?? 'asc'
	}
	setSortValueViewPage(sortValue: SortColumnValue) {
		this.saveData(KEY_VIEW_SORT_VALUE_LOCAL_STORAGE, sortValue)
	}
	getSortValueViewPage(): SortColumnValue {
		return this.getData(KEY_VIEW_SORT_VALUE_LOCAL_STORAGE) ?? 'createdAt'
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
