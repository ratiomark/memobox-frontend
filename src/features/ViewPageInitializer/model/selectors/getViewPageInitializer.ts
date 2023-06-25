import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserSavedDataViewPageColumns } from '@/entities/User';
// import { SortColumnObject } from '@/entities/User/model/types/JsonSavedData';
// import { SortColumnObject } from '@/widgets/SortControllerViewPageWidget/model/types/SortControllerViewPageWidgetSchema';
import { createSelector } from '@reduxjs/toolkit';

export const getViewPage = (state: StateSchema) => state.viewPage
export const getViewPageShelfId = (state: StateSchema) => state.viewPage?.shelfId
export const getViewPageBoxId = (state: StateSchema) => state.viewPage?.boxId
export const getViewPageIsMounted = (state: StateSchema) => state.viewPage?._viewPageMounted
export const getViewPageIsLoading = (state: StateSchema) => state.viewPage?.isLoading
// export const getViewPageSortItemsList = () => ['shelf', 'create', 'last']

export const getViewPageSavedShelf = (shelfId: string) =>
	(state: StateSchema) => state.viewPage?.shelvesDataSaved?.[shelfId]

export const getLastBoxIdByShelfId = (shelfId: string) =>
	(state: StateSchema) => state.viewPage?.shelvesDataSaved[shelfId].lastBoxId ?? 'new'
// export const getViewPageSavedShelf = (shelfId: string) =>
// (state: StateSchema) => state.viewPage?.shelvesDataSaved?.[shelfId]
export const getViewPageCards = (state: StateSchema) => state.viewPage?.cards
export const getViewPageCardsFiltered = createSelector(
	[
		getViewPageCards,
		getViewPageShelfId,
		getViewPageBoxId,
	],
	(cards, shelfId, boxId) => {
		// console.log('СЕЛЕКТОР ', shelfId, boxId)
		if (shelfId === 'all' && boxId === 'all') return cards
		if (shelfId === 'all' && boxId === 'new') return cards?.filter(card => card.specialType === 'new')
		if (shelfId === 'all' && boxId === 'learning') return cards?.filter(card => card.specialType === 'none')
		if (shelfId === 'all' && boxId === 'learnt') return cards?.filter(card => card.specialType === 'learnt')
		if (boxId === 'all') return cards?.filter(card => card.shelf === shelfId)
		if (boxId === 'new') return cards?.filter(card => (card.shelf === shelfId && card.specialType === 'new'))
		if (boxId === 'learnt') return cards?.filter(card => card.shelf === shelfId && card.specialType === 'learnt')
		return cards?.filter(card => (card.shelf === shelfId && card.box == boxId))
	}
)

export const getViewPageColumns = createSelector(
	[
		getViewPageShelfId,
		getUserSavedDataViewPageColumns,
		// getColumns,
	],
	(shelfId, columns) => {
		// const columns: SortColumnObject[] = [
		// 	{ value: 'shelf', content: 'shelf', enabled: true, index: 0 },
		// 	{ value: 'createdAt', content: 'creation', enabled: true, index: 1 },
		// 	{ value: 'lastTraining', content: 'last training', enabled: true, index: 2 },
		// ]
		if (shelfId === 'all') {
			return columns
		}
		return columns?.filter(column => column.value !== 'shelf')
	}
)