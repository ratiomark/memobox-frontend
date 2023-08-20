import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserSavedDataViewPageColumns } from '@/entities/User';
// import { SortColumnObject } from '@/entities/User/model/types/JsonSavedData';
// import { SortColumnObject } from '@/widgets/SortControllerViewPageWidget/model/types/SortControllerViewPageWidgetSchema';
import { createSelector } from '@reduxjs/toolkit';

export const getViewPageEditModalIsOpen = (state: StateSchema) => state.viewPage?.isCardEditModalOpen
export const getViewPageEditModalCardId = (state: StateSchema) => state.viewPage?.currentCardId
export const getViewPageCardEditedListIds = (state: StateSchema) => state.viewPage?.cardEditedListIds
const getViewPageCardModalHeightsAll = (state: StateSchema) => state.viewPage?.cardModalHeights
// export const getCardModalHeights = (state: StateSchema) => state.viewPage?.cardModalHeights


const getViewPageCardsDataEdited = (state: StateSchema) => state.viewPage?.cardsDataEdited
export const getViewPageCardDataEdited = createSelector(
	[
		getViewPageEditModalCardId,
		getViewPageCardsDataEdited,
	],
	(cardId, data) => {
		if (data && cardId) return data[cardId]
	}
)

const getViewPageCardsDataOriginal = (state: StateSchema) => state.viewPage?.cardsDataOriginal
export const getViewPageCardDataOriginal = createSelector(
	[
		getViewPageEditModalCardId,
		getViewPageCardsDataOriginal,
	],
	(cardId, data) => {
		if (data && cardId) return data[cardId]
	}
)

export const getViewPageIsCardInModalEdited = createSelector(
	[
		getViewPageEditModalCardId,
		getViewPageCardEditedListIds,
	],
	(cardId, listIds) => {
		return listIds?.includes(cardId!)
	}
)

export const getCardModalHeights = createSelector(
	[
		getViewPageEditModalCardId,
		getViewPageCardModalHeightsAll,
	],
	(cardId, cardModalHeights) => {
		if (cardModalHeights && cardId) return cardModalHeights[cardId]
	}
)