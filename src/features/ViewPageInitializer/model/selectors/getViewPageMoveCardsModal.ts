import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { getViewPageBoxItemsMoveCardsModal, getViewPageShelfItemsModal } from './getViewPageShelfAndBoxItems';

export const getViewPageMoveCardsModalIsOpen = (state: StateSchema) => state.viewPage?.moveCardsModal.isMoveCardsModalOpen
export const getViewPageMoveCardsModalShelfId = (state: StateSchema) => state.viewPage?.moveCardsModal.shelfId
export const getViewPageMoveCardsModalBoxId = (state: StateSchema) => state.viewPage?.moveCardsModal.boxId

export const getViewPageMoveCardsModalShelfIdChecked = () => 'ss'
// export const getViewPageMoveCardsModalShelfIdChecked = createSelector(
// 	[
// 		getViewPageMoveCardsModalShelfId,
// 		getViewPageShelfItemsModal,
// 	],
// 	(shelfIdFromState, shelvesItems) => {
// 		if (shelfIdFromState === '' && shelvesItems.length > 0) return shelvesItems[0].value
// 		return shelfIdFromState ?? ''
// 	}
// )

// export const getViewPageMoveCardsModalBoxIdChecked = createSelector(
// 	[
// 		getViewPageBoxItemsMoveCardsModal,
// 		// getViewPageMoveCardsModalShelfIdChecked,
// 		getViewPageMoveCardsModalBoxId,
// 		getViewPageShelfItemsModal,
// 	],
// 	(boxItems, boxIdFromState, shelvesItems) => {
// 	// (shelfId, boxIdFromState, shelvesItems) => {
// 		const boxes = getViewPageBoxItemsMoveCardsModal(shelfId)
// 		// if (boxIdFromState === '' && shelvesItems.length > 0) return shelvesItems[0].value
// 		// return boxIdFromState
// 	}
// )