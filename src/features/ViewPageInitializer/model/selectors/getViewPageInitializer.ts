import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserSavedDataViewPageColumns } from '@/entities/User';
// import { SortColumnObject } from '@/entities/User/model/types/JsonSavedData';
// import { SortColumnObject } from '@/widgets/SortControllerViewPageWidget/model/types/SortControllerViewPageWidgetSchema';
import { createSelector } from '@reduxjs/toolkit';

export const getViewPage = (state: StateSchema) => state.viewPage
export const getViewPageIsMounted = (state: StateSchema) => state.viewPage?._viewPageMounted
export const getViewPageIsLoading = (state: StateSchema) => state.viewPage?.isLoading
// 
export const getViewPageShelfId = (state: StateSchema) => state.viewPage?.shelfId
export const getViewPageBoxId = (state: StateSchema) => state.viewPage?.boxId
// 
export const getViewPageSort = (state: StateSchema) => state.viewPage?.sort ?? 'createdAt'
// export const getViewPageSort = (state: StateSchema) => state.viewPage?.sort ?? 'createdAt'
export const getViewPageSortOrder = (state: StateSchema) => state.viewPage?.sortOrder ?? 'asc'
export const getViewPageColumnSettingsIsOpen = (state: StateSchema) => state.viewPage?.columnSettingsIsOpen ?? false

export const getViewPageSavedShelf = (shelfId: string) =>
	(state: StateSchema) => state.viewPage?.shelvesDataSaved?.[shelfId]

export const getLastBoxIdByShelfId = (shelfId: string) =>
	(state: StateSchema) => state.viewPage?.shelvesDataSaved[shelfId].lastBoxId ?? 'new'

export const getViewPageCards = (state: StateSchema) => state.viewPage?.cards

export const getViewPageSortChecked = createSelector(
	[
		getViewPageShelfId,
		getViewPageSort,
	],
	(shelfId, sort) => {
		if (shelfId !== 'all' && sort === 'shelf') return 'createdAt'
		return sort
	}
)

export const getViewPageCardsFiltered = createSelector(
	[
		getViewPageCards,
		getViewPageShelfId,
		getViewPageBoxId,
	],
	(cards, shelfId, boxId) => {
		if (shelfId === 'all' && boxId === 'all') return cards
		if (shelfId === 'all' && boxId === 'new') return cards?.filter(card => card.specialType === 'new')
		if (shelfId === 'all' && boxId === 'learning') return cards?.filter(card => card.specialType === 'none')
		if (shelfId === 'all' && boxId === 'learnt') return cards?.filter(card => card.specialType === 'learnt')
		if (boxId === 'all') return cards?.filter(card => card.shelf === shelfId)
		if (boxId === 'new') return cards?.filter(card => (card.shelf === shelfId && card.specialType === 'new'))
		if (boxId === 'learnt') return cards?.filter(card => card.shelf === shelfId && card.specialType === 'learnt')
		return cards?.filter(card => (card.shelf === shelfId && card.box == boxId)) ?? []
	}
)

export const getViewPageCardsSorted = createSelector(
	[
		getViewPageCardsFiltered,
		// VAR: использую getViewPageSortChecked вместо getViewPageSort чтобы пофискить проблему в общей полкой, когда там используется shelf как столбец сортировки
		getViewPageSortChecked,
		getViewPageSortOrder,
	],
	(cards, sort, sortOrder) => {
		if (cards?.length) {
			return [...cards].sort((a, b) => {
				if (sortOrder === 'asc') {
					if (a[sort] > b[sort]) {
						return -1
					} else if (a[sort] < b[sort]) {
						return 1
					} else {
						return 0
					}
				} else {
					if (a[sort] < b[sort]) {
						return -1
					} else if (a[sort] > b[sort]) {
						return 1
					} else {
						return 0
					}
				}
			})
		}
		return []
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