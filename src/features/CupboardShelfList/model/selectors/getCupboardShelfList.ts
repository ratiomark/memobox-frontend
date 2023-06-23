import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { getCupboardState } from '../slice/cupboardShelfListSlice';

export const getCupboard = (state: StateSchema) => state.cupboard
export const getCupboardCommonShelfCollapsed = (state: StateSchema) => state.cupboard.commonShelfCollapsed
export const getCupboardData = (state: StateSchema) => state.cupboard.cupboardData
export const getCupboardIsLoading = (state: StateSchema) => state.cupboard.isLoading
export const getCupboardError = (state: StateSchema) => state.cupboard.error
export const getCupboardShelves = (state: StateSchema) => state.cupboard
// export const getCupboardShelves = (state: StateSchema) => state.cupboard.shelves
export const getShelfIsDeleting = createSelector(
	[
		(state: StateSchema, shelfId: string) => getCupboardState.selectById(state, shelfId)
	],
	(shelf) => shelf?.isDeleting
)
export const getShelfById = createSelector(
	[
		(state: StateSchema, shelfId: string) => getCupboardState.selectById(state, shelfId)
	],
	(shelf) => shelf
)

// export const getShelfByID = (shelfId: string) => {
// 	return createSelector(get, (state) =>
// 		selectById(state, entityId)
// 	);
// };
// export const getDeletionIds = (state: StateSchema) => state.cupboard.shelvesDeletionIds 