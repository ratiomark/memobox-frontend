import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { getAllShelves, getCupboardState } from '../slice/cupboardShelfListSlice';
import { store } from '@/app/providers/StoreProvider'

export const getCupboard = (state: StateSchema) => state.cupboard
export const getCupboardIsDataAlreadyInStore = (state: StateSchema) => state.cupboard.isDataAlreadyInStore
export const getCupboardIsNeedRefetch = (state: StateSchema) => state.cupboard.isNeedRefetch
export const getCupboardIsNeedStop = (state: StateSchema) => state.cupboard.isNeedStop
export const getCupboardIsFirstRender = (state: StateSchema) => state.cupboard.isFirstRender
export const getCupboardCommonShelfCollapsed = (state: StateSchema) => state.cupboard.commonShelf?.isCollapsed
export const getCupboardCommonShelf = (state: StateSchema) => state.cupboard.commonShelf
export const getCupboardData = (state: StateSchema) => state.cupboard.cupboardData
export const getCupboardIsLoading = (state: StateSchema) => state.cupboard.isLoading
export const getCupboardError = (state: StateSchema) => state.cupboard.error
export const getCupboardShelves = (state: StateSchema) => state.cupboard
// export const getCupboardShelves = (state: StateSchema) => state.cupboard.shelves
// export const getShelfIsDeleting = createSelector(
// 	[
// 		(state: StateSchema, shelfId: string) => getCupboardState.selectById(state, shelfId)
// 	],
// 	(shelf) => shelf?.isDeleting
// )
export const getShelfIsDeleting = (shelfId: string) => {
	return createSelector(
		[
			(state: StateSchema) => state
		],
		(state) => getCupboardState.selectById(state, shelfId)?.isDeleting
	)
}
export const getShelfById = (shelfId: string) => {
	return createSelector(
		[
			(state: StateSchema) => state
		],
		(state) => getCupboardState.selectById(state, shelfId)
	)
}
// export const getShelfById = createSelector(
// 	[
// 		(state: StateSchema, shelfId: string) => getCupboardState.selectById(state, shelfId)
// 	],
// 	(shelf) => shelf
// )

export const getShelfItems = createSelector(
	[
		getAllShelves,
		getCupboardIsLoading,
	],
	(shelves, isLoading) => {
		if (isLoading) return []
		return shelves.map(shelf => ({
			content: shelf.title,
			value: shelf.id
		}))
	}
)

export const getIsCupboardInfoOpen = (state: StateSchema) => state.cupboard.isCupboardInfoModalOpen