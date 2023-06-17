import { StateSchema } from '@/app/providers/StoreProvider'

export const getShelfIdBoxesSettingsModal = (state: StateSchema) => {
	return state.cupboard.boxesSettingsShelfId
}
export const getIsBoxesSettingsOpen = (state: StateSchema) => state.cupboard.isBoxesSettingsModalOpen