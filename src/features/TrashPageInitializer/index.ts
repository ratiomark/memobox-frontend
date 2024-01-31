export { restoreShelfByIdThunk } from './model/services/restoreShelfByIdThunk'
export { restoreBoxThunk } from './model/services/restoreBoxThunk'

export { deleteShelfFromTrashByIdThunk as deleteFinalShelfByIdThunk  } from './model/services/deleteShelfFromTrashByIdThunk'
export { deleteBoxFromTrashByIdThunk } from './model/services/deleteBoxFromTrashByIdThunk'

export {
	getTrashPageIsCardEditModalOpen,
	getTrashPageIsMoveCardsModalOpen,
	getTrashPageIsRestoreBoxModalOpen,
	getTrashPageRestoreBoxModalShelfId,
	getTrashPageRestoreBoxModalBoxId,
	getTrashPageRestoreBoxModalBoxIndex,
	getTrashPageRestoreBoxModalShelfTitle,
} from './model/selectors/getTrashPageModals'

export { getTrashPageIsMultiSelectActive, getTrashPageSelectedCardIds } from './model/selectors/getTrashPageMultiSelect'

export { getTrashPageActiveEntity, getTrashPageIsMounted, getTrashPageIsLoading } from './model/selectors/getTrashPage'

export type { TrashPageInitializerSchema, TrashPageEntityType } from './model/types/TrashPageInitializerSchema'

export { TrashPageInitializer } from './ui/TrashPageInitializer'
export { trashPageActions } from './model/slice/trashPageSlice'
