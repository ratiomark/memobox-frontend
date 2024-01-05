import { StateSchema } from '@/app/providers/StoreProvider';
import { EntityId, createSelector } from '@reduxjs/toolkit';
import { getAllShelves, getCupboardState } from '../slice/cupboardShelfListSlice';
import { store } from '@/app/providers/StoreProvider'
import { localDataService } from '@/shared/lib/helpers/common/localDataService';

export const getCupboard = (state: StateSchema) => state.cupboard
// export const getCupboard = (state: StateSchema) => state.cupboard?.isMounted
export const getAbortedThunkIds = (state: StateSchema) => state.cupboard.abortedThunkIds
export const getIsCupboardDataAlreadyInStore = (state: StateSchema) => state.cupboard.isDataAlreadyInStore
export const getIsCupboardNeedRefetch = (state: StateSchema) => state.cupboard.isNeedRefetch
export const getCupboardIsNeedStop = (state: StateSchema) => state.cupboard.isNeedStop
export const getIsCupboardFirstRender = (state: StateSchema) => state.cupboard.isFirstRender
export const getCupboardCommonShelfCollapsed = (state: StateSchema) => state.cupboard.commonShelf?.isCollapsed
export const getCupboardCommonShelf = (state: StateSchema) => state.cupboard.commonShelf
export const getCupboardData = (state: StateSchema) => state.cupboard.cupboardData
export const getIsCupboardLoading = (state: StateSchema) => state.cupboard.isLoading
export const getIsCupboardRefetching = (state: StateSchema) => state.cupboard.isRefetching
export const getCupboardError = (state: StateSchema) => state.cupboard.error
export const getCupboardShelves = (state: StateSchema) => state.cupboard
export const getIsAnyCardsToTrain = createSelector(
	[
		(state: StateSchema) => state.cupboard.commonShelf
	],
	(commonShelf) => {
		const newCards = commonShelf?.new.all ?? 0
		const learntCards = commonShelf?.learnt.train ?? 0
		const learningCards = commonShelf?.learning.train ?? 0
		return Boolean(newCards + learntCards + learningCards)
	}
)
export const getIsOnlyOneShelfLeftInCupboard = (state: StateSchema) => state.cupboard.ids.length < 2
// export const getCupboardShelves = (state: StateSchema) => state.cupboard.shelves
// export const getShelfIsDeleting = createSelector(
// 	[
// 		(state: StateSchema, shelfId: string) => getCupboardState.selectById(state, shelfId)
// 	],
// 	(shelf) => shelf?.isDeleting
// )

export const getShelfById = (shelfId: string) => {
	return createSelector(
		[
			(state: StateSchema) => state
		],
		(state) => getCupboardState.selectById(state, shelfId)
	)
}
export const getShelfTitleByShelfId = (shelfId: string | EntityId) => {
	return createSelector(
		[
			(state: StateSchema) => state
		],
		(state) => getCupboardState.selectById(state, shelfId)?.title
	)
}

export const getShelfItems = createSelector(
	[
		(state: StateSchema) => getCupboardState.selectAll(state),
		getIsCupboardLoading,
	],
	(shelves, isLoading) => {
		if (isLoading) return []
		return shelves.map(shelf => ({
			content: shelf.title,
			value: shelf.id
		}))
	}
)
// export const getShelfItems = createSelector(
// 	[
// 		getAllShelves,
// 		getCupboardIsLoading,
// 	],
// 	(shelves, isLoading) => {
// 		if (isLoading) return []
// 		return shelves.map(shelf => ({
// 			content: shelf.title,
// 			value: shelf.id
// 		}))
// 	}
// )
// export const getShelvesFromStorOrLocalSaver = createSelector(
// 	[
// 		getAllShelves,
// 	],
// 	(shelves) => {
// 		if (shelves.length < 1) {
// 			return localDataService.getShelves() ?? []
// 		}
// 		return shelves
// 	}
// )
export const getShelfIdAndIndexesList = (state: StateSchema) => state.cupboard.shelvesIdsAndIndexesCurrent ?? []
export const getShelfIdAndIndexesListInitial = (state: StateSchema) => state.cupboard.shelvesIdsAndIndexesInitial ?? []

export const getIsCupboardInfoOpen = (state: StateSchema) => state.cupboard.isCupboardInfoModalOpen