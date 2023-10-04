import { StateSchema } from '@/app/providers/StoreProvider';
import { BOX_TIMING_DATA_DEFAULT } from '@/shared/const/timingBlock';

export const getTimingSetterModalIsOpen = (state: StateSchema) => state.settingsShelfTemplate?.boxTimeSetterModal.isOpen ?? false

export const getBoxCoordinates = (state: StateSchema) => state.settingsShelfTemplate?.boxTimeSetterModal.boxCoordinates ?? { x: 0, y: 0 }

export const getBoxTimingData = (state: StateSchema) => state.settingsShelfTemplate?.boxTimeSetterModal.boxTimingData ?? BOX_TIMING_DATA_DEFAULT

export const getTimingSetterBoxId = (state: StateSchema) => state.settingsShelfTemplate?.boxTimeSetterModal.boxId
