export {
	getTrashPageIsCardEditModalOpen,
	getTrashPageIsMoveCardsModalOpen,
} from './model/selectors/getTrashPageModals';

export {
	getTrashPageIsMultiSelectActive,
	getTrashPageSelectedCardIds
} from './model/selectors/getTrashPageMultiSelect';

export {
	getTrashPageActiveEntity,
	getTrashPageIsMounted,
	getTrashPageIsLoading,
} from './model/selectors/getTrashPage';


export type {
	TrashPageInitializerSchema,
	TrashPageEntityType
} from './model/types/TrashPageInitializerSchema'

export { TrashPageInitializer } from './ui/TrashPageInitializer';
export { trashPageActions } from './model/slice/trashPageSlice';