import { StateSchema } from '@/app/providers/StoreProvider';
import { timingDataDefault } from '@/shared/const/timingBlock';

export const getTimingSetterModalIsOpen = (state: StateSchema) => state.settingsShelfTemplate?.boxTimeSetterModal.isOpen ?? false

export const getBoxCoordinates = (state: StateSchema) => state.settingsShelfTemplate?.boxTimeSetterModal.boxCoordinates ?? { x: 0, y: 0 }

export const getBoxTimingData = (state: StateSchema) => state.settingsShelfTemplate?.boxTimeSetterModal.boxTimingData ?? timingDataDefault

export const getTimingSetterBoxId = (state: StateSchema) => state.settingsShelfTemplate?.boxTimeSetterModal.boxId
