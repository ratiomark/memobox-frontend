export {
	getViewPageShelfId, getViewPageBoxId,
	getViewPageIsLoading,
	getViewPageCards,
	getViewPageCardsFiltered,
	getViewPageIsMounted,
	getViewPage,
	// getViewPageSortItemsList,
	getViewPageColumns,
	getViewPageSavedShelf,
} from './model/selectors/getViewPageInitializer';

export { viewPageReducer, viewPageActions } from './model/slice/viewPageSlice';
export type { ViewPageInitializerSchema } from './model/types/ViewPageInitializerSchema';
export { ViewPageInitializer } from './ui/ViewPageInitializer';