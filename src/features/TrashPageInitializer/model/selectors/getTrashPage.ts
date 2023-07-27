import { StateSchema } from '@/app/providers/StoreProvider';

export const getTrashPageActiveEntity = (state: StateSchema) => state.trashPage?.activeEntity ?? 'shelves'
export const getTrashPageIsMounted = (state: StateSchema) => state.trashPage?._trashPageMounted
export const getTrashPageIsLoading = (state: StateSchema) => state.trashPage?.isLoading
// export const getTrashPageActiveEntity = (state: StateSchema) => state.trashPage?.activeEntity