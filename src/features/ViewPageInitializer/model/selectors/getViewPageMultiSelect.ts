import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
// import { getViewPageBoxSpecialIndex } from './getViewPageInitializer';
const getViewPageShelfId = (state: StateSchema) => state.viewPage?.shelfId ?? 'all'
const getViewPageBoxSpecialIndex = (state: StateSchema) => state.viewPage?.boxSpecialIndex ?? 'new'
// export const getViewPageBoxId = (state: StateSchema) => state.viewPage?.boxId ?? ''
export const getViewPageSelectedCardIds = (state: StateSchema) => state.viewPage?.selectedCardIds
export const getViewPageMultiSelectIsActive = (state: StateSchema) => state.viewPage?.isMultiSelectActive

export const getMultiSelectDeleteCardIds = (state: StateSchema) => state.viewPage?.multiSelectDeleteCardIdList ?? []
export const getCardIdsSelectedForDeletionByRandomId = (id: string) => (state: StateSchema) => state.viewPage?.multiSelectDeleteCardIdObject[id] ?? []

export const getMultiSelectMoveCardIds = (state: StateSchema) => state.viewPage?.multiSelectMoveCardIdList ?? []
export const getCardIdsSelectedForMoveByRandomId = (id: string) => (state: StateSchema) => state.viewPage?.multiSelectMoveCardIdObject[id] ?? []
export const getMultiSelectIsSelectAllAllowed = createSelector(
	[
		getViewPageShelfId,
		getViewPageBoxSpecialIndex,
	],
	(shelfId, boxIndexSpecial) => {
		if (shelfId === 'all' && (boxIndexSpecial === 'all' || boxIndexSpecial === 'learning')) return false
		return true
	}
)