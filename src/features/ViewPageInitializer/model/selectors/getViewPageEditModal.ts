import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserSavedDataViewPageColumns } from '@/entities/User';
// import { SortColumnObject } from '@/entities/User/model/types/JsonSavedData';
// import { SortColumnObject } from '@/widgets/SortControllerViewPageWidget/model/types/SortControllerViewPageWidgetSchema';
import { createSelector } from '@reduxjs/toolkit';

export const getViewPageEditModalIsOpen = (state: StateSchema) => state.viewPage?.isCardEditModalOpen
export const getViewPageEditModalCardId = (state: StateSchema) => state.viewPage?.currentCardId
export const getViewPageCardsDataEdited = (state: StateSchema) => state.viewPage?.cardsDataEdited

export const getViewPageEditedData = createSelector(
	[
		getViewPageEditModalCardId,
		getViewPageCardsDataEdited,
	],
	(cardId, data) => {
		if (data && cardId) return data[cardId]
	}
)
export const getViewPageCardsDataCurrent = (state: StateSchema) => state.viewPage?.cardsDataCurrent

export const getViewPageCurrentData = createSelector(
	[
		getViewPageEditModalCardId,
		getViewPageCardsDataCurrent,
	],
	(cardId, data) => {
		if (data && cardId) return data[cardId]
	}
)