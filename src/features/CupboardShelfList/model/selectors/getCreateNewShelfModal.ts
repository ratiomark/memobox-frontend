import { StateSchema } from '@/app/providers/StoreProvider';

export const getCreateNewShelfModalIsOpen = (state: StateSchema) => state.cupboard.createNewShelfModal.isOpen
export const getCreateNewShelfModalShelfTitle = (state: StateSchema) => state.cupboard.createNewShelfModal.shelfTitle
export const getCreateNewShelfModalShelvesTitles = (state: StateSchema) => state.cupboard.shelvesTitles

export const getCreateNewShelfModalIsAwaitingResponse = (state: StateSchema) => state.cupboard.createNewShelfModal.isAwaitingResponse
export const getCreateNewShelfModalIsResponseSuccessful = (state: StateSchema) => state.cupboard.createNewShelfModal.isResponseSuccessful
export const getCreateNewShelfModalRequestStatus = (state: StateSchema) => state.cupboard.createNewShelfModal.requestStatus