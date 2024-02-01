import { StateSchema } from '@/app/providers/StoreProvider';


export const getTrashPageIsCardEditModalOpen = (state: StateSchema) => state.trashPage?.isCardEditModalOpen
export const getTrashPageIsMoveCardsModalOpen = (state: StateSchema) => state.trashPage?.isMoveCardsModalOpen


export const getTrashPageIsRestoreBoxModalOpen = (state: StateSchema) => state.trashPage?.restoreBoxModal.isOpen
export const getTrashPageRestoreBoxModalShelfId = (state: StateSchema) => state.trashPage?.restoreBoxModal.shelfId ?? ''
export const getTrashPageRestoreBoxModalShelfTitle = (state: StateSchema) => state.trashPage?.restoreBoxModal.shelfTitle ?? ''
export const getTrashPageRestoreBoxModalBoxId = (state: StateSchema) => state.trashPage?.restoreBoxModal.boxId ?? ''
export const getTrashPageRestoreBoxModalBoxIndex = (state: StateSchema) => state.trashPage?.restoreBoxModal.boxIndex