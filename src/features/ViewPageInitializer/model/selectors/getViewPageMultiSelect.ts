import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { getViewPageShelfId, getViewPageBoxId, getViewPageBoxSpecialIndex } from './getViewPageInitializer';

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