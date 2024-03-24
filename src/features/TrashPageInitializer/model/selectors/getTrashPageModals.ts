import { StateSchema } from '@/app/providers/StoreProvider';


export const getTrashPageIsCardEditModalOpen = (state: StateSchema) => state.trashPage?.isCardEditModalOpen
export const getTrashPageIsMoveCardsModalOpen = (state: StateSchema) => state.trashPage?.isMoveCardsModalOpen


export const getTrashPageIsRestoreBoxModalOpen = (state: StateSchema) => state.trashPage?.restoreBoxModal.isOpen
export const getTrashPageRestoreBoxModalSelectedShelfId = (state: StateSchema) => state.trashPage?.restoreBoxModal.selectedShelfId ?? ''
export const getTrashPageRestoreBoxModalOriginalShelfId = (state: StateSchema) => state.trashPage?.restoreBoxModal.originalShelfId ?? ''
export const getTrashPageRestoreBoxModalShelfTitle = (state: StateSchema) => state.trashPage?.restoreBoxModal.shelfTitle ?? ''
export const getTrashPageRestoreBoxModalBoxId = (state: StateSchema) => state.trashPage?.restoreBoxModal.boxId ?? ''
export const getTrashPageRestoreBoxModalBoxIndex = (state: StateSchema) => state.trashPage?.restoreBoxModal.boxIndex

export const getTrashPageIsRestoreNewOrLearntModalOpen = (state: StateSchema) => state.trashPage?.restoreNewOrLearntModal?.isOpen ?? false
export const getTrashPageRestoreNewOrLearntModalShelfId = (state: StateSchema) => state.trashPage?.restoreNewOrLearntModal?.shelfId
export const getTrashPageRestoreNewOrLearntModalBoxType = (state: StateSchema) => state.trashPage?.restoreNewOrLearntModal?.boxType
export const getTrashPageRestoreNewOrLearntModalBoxId = (state: StateSchema) => state.trashPage?.restoreNewOrLearntModal?.boxId


export const getTrashPageIsRestoreCardModalOpen = (state: StateSchema) => state.trashPage?.restoreCardModal?.isOpen ?? false
export const getTrashPageRestoreCardModalShelfId = (state: StateSchema) => state.trashPage?.restoreCardModal?.shelfId ?? ''
export const getTrashPageRestoreCardModalBoxId = (state: StateSchema) => state.trashPage?.restoreCardModal?.boxId ?? ''
export const getTrashPageRestoreCardModalCardId = (state: StateSchema) => state.trashPage?.restoreCardModal?.cardId ?? ''

// export const getTrashPageRestoreNewOrLearntModalBoxType = (state: StateSchema) => state.trashPage?.restoreCardModal?.boxType