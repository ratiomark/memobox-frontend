import { StateSchema } from '@/app/providers/StoreProvider';

export const getViewPage = (state: StateSchema) => state.viewPage
export const getViewPageShelfId = (state: StateSchema) => state.viewPage?.shelfId
export const getViewPageIsMounted = (state: StateSchema) => state.viewPage?._viewPageMounted

export const getViewPageSavedShelf = (shelfId: string) =>
	(state: StateSchema) => state.viewPage?.shelvesDataSaved?.[shelfId]

export const getLastBoxIdByShelfId = (shelfId: string) =>
	(state: StateSchema) => state.viewPage?.shelvesDataSaved[shelfId].lastBoxId ?? 'new'
// export const getViewPageSavedShelf = (shelfId: string) =>
	// (state: StateSchema) => state.viewPage?.shelvesDataSaved?.[shelfId]