import { StateSchema } from '@/app/providers/StoreProvider';

export const getRenameShelfModalIsOpen = (state: StateSchema) => state.cupboard.renameShelfModal.isOpen
export const getRenameShelfModalShelfId = (state: StateSchema) => state.cupboard.renameShelfModal.shelfId
export const getRenameShelfModalShelfTitle = (state: StateSchema) => state.cupboard.renameShelfModal.title
export const getRenameShelfModalRequestStatus = (state: StateSchema) => state.cupboard.renameShelfModal.requestStatus