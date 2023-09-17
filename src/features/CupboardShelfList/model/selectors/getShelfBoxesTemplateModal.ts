import { StateSchema } from '@/app/providers/StoreProvider';

export const getBoxesTemplateModalIsOpen = (state: StateSchema) => state.cupboard.shelfBoxesTemplateModal.isOpen
export const getBoxesTemplateModalShelfId = (state: StateSchema) => state.cupboard.shelfBoxesTemplateModal.shelfId
export const getBoxesTemplateModalListEdges = (state: StateSchema) => state.shelfBoxesTemplateSettings?.boxesSettingsListEdges ?? {
	leftSide: true,
	rightSide: false,
}
export const getBoxesTemplateModalCurrentShelfTemplate = (state: StateSchema) => state.shelfBoxesTemplateSettings?.currentShelfTemplate
export const getBoxesTemplateModalMode = (state: StateSchema) => state.shelfBoxesTemplateSettings?.mode
export const getBoxesTemplateModalChanged = (state: StateSchema) => state.shelfBoxesTemplateSettings?.isCurrentTemplateEqualToInitial