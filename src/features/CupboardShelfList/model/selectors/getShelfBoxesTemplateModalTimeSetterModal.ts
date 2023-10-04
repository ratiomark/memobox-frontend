import { StateSchema } from '@/app/providers/StoreProvider';
import { BOX_TIMING_DATA_DEFAULT } from '@/shared/const/timingBlock';

export const getTimingSetterModalIsOpen = (state: StateSchema) => state.shelfBoxesTemplateSettings?.boxTimeSetterModal.isOpen ?? false

export const getBoxCoordinates = (state: StateSchema) => state.shelfBoxesTemplateSettings?.boxTimeSetterModal.boxCoordinates ?? { x: 0, y: 0 }

export const getBoxTimingData = (state: StateSchema) => state.shelfBoxesTemplateSettings?.boxTimeSetterModal.boxTimingData ?? BOX_TIMING_DATA_DEFAULT

export const getTimingSetterBoxId = (state: StateSchema) => state.shelfBoxesTemplateSettings?.boxTimeSetterModal.boxId
export const getTimingSetterModalBoxData = (state: StateSchema) => state.shelfBoxesTemplateSettings?.boxTimeSetterModal.boxData
