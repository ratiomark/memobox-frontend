import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getViewPage = (state: StateSchema) => state.viewPage
export const getViewPageShelfId = (state: StateSchema) => state.viewPage?.shelfId
export const getViewPageBoxId = (state: StateSchema) => state.viewPage?.boxId
export const getViewPageIsMounted = (state: StateSchema) => state.viewPage?._viewPageMounted
export const getViewPageIsLoading = (state: StateSchema) => state.viewPage?.isLoading

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
		// (state: StateSchema, shelfId: string, boxId?: string) => {
		// 	if (shelfId === 'all' && !boxId) return state.viewPage?.cards
		// 	else if (!boxId) return state.viewPage?.cards.filter(card => card.shelf === shelfId)

		// }
	],
	(cards, shelfId, boxId) => {
		if (shelfId === 'all' && boxId === 'new') return cards?.filter(card => card.box === 0)
		// if (shelfId === 'all' && boxId === 'learnt') return cards?.filter(card => card.box === )
		if (shelfId === 'all' && boxId === 'all') return cards
		// if (shelfId === 'all' && boxId === 'learning') return cards.fil
		if (boxId === 'all') return cards?.filter(card => card.shelf === shelfId)
		// if (boxId === 'new') return cards?.filter(card => card.shelf === shelfId && card.box === 0)
		// if (boxId === 'all') return cards?.filter(card => card.shelf === shelfId)
	}
	// (box) => box?.specialType !== 'new' ? box?.missedTrainingAction ?? 'none' : 'none'
)