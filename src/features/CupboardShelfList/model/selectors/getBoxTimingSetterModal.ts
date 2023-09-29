import { StateSchema } from '@/app/providers/StoreProvider';

export const getTimingSetterModalIsOpen = (state: StateSchema) => state.cupboard.boxTimeSetterModal.isOpen
export const getBoxCoordinates = (state: StateSchema) => state.cupboard.boxTimeSetterModal.boxCoordinates
export const getBoxTimingData = (state: StateSchema) => state.cupboard.boxTimeSetterModal.boxTimingData
export const getTimingSetterBoxId = (state: StateSchema) => state.cupboard.boxTimeSetterModal.boxId
export const getTimingSetterShelfId = (state: StateSchema) => state.cupboard.boxTimeSetterModal.shelfId


// export const getDeletionIds = (state: StateSchema) => state.cupboard.shelvesDeletionIds 