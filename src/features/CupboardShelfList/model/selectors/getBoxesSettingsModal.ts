import { StateSchema } from '@/app/providers/StoreProvider'
import { createSelector } from '@reduxjs/toolkit'

export const getShelfIdBoxesSettingsModal = (state: StateSchema) => {
	return state.cupboard.boxesSettingsShelfId
}

// export const getShelfBoxesSettings = createSelector(
// 	[getShelfBoxesSettings]
// )
export const getIsBoxesSettingsOpen = (state: StateSchema) => state.cupboard.isBoxesSettingsModalOpen