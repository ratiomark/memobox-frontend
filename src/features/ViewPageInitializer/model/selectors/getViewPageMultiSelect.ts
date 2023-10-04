import { StateSchema } from '@/app/providers/StoreProvider';

export const getViewPageSelectedCardIds = (state: StateSchema) => state.viewPage?.selectedCardIds
export const getViewPageMultiSelectIsActive = (state: StateSchema) => state.viewPage?.isMultiSelectActive

export const getMultiSelectDeleteCardIds = (state: StateSchema) => state.viewPage?.multiSelectDeleteCardIdList ?? []
export const getCardIdsSelectedForDeletionByRandomId = (id: string) => (state: StateSchema) => state.viewPage?.multiSelectDeleteCardIdObject[id] ?? []

export const getMultiSelectMoveCardIds = (state: StateSchema) => state.viewPage?.multiSelectMoveCardIdList ?? []
export const getCardIdsSelectedForMoveByRandomId = (id: string) => (state: StateSchema) => state.viewPage?.multiSelectMoveCardIdObject[id] ?? []