import { StateSchema } from '@/app/providers/StoreProvider';

export const getViewPage = (state: StateSchema) => state.viewPage
export const getViewPageShelfId = (state: StateSchema) => state.viewPage?.shelfId
export const getViewPageSavedShelf = (shelfId: string) =>
	(state: StateSchema) => state.viewPage?.shelvesDataSaved?.[shelfId]