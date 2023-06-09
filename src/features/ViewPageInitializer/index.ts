export { getViewPageShelfId, getViewPage, getViewPageSavedShelf } from './model/selectors/getViewPageInitializer';

export { viewPageReducer, viewPageActions } from './model/slice/viewPageSlice';
export type { ViewPageInitializerSchema } from './model/types/ViewPageInitializerSchema';
export { ViewPageInitializer } from './ui/ViewPageInitializer';