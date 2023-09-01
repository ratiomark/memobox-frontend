import { StateSchema } from '@/app/providers/StoreProvider';

export const getBoxSettingsDropdownModalIsOpen = (state: StateSchema) => state.cupboard.boxSettingsDropdownModal.isOpen
export const getBoxSettingsDropdownCoordinates = (state: StateSchema) => state.cupboard.boxSettingsDropdownModal.boxCoordinates
export const getBoxSettingsDropdownBoxId = (state: StateSchema) => state.cupboard.boxSettingsDropdownModal.boxId


// export const getDeletionIds = (state: StateSchema) => state.cupboard.shelvesDeletionIds 