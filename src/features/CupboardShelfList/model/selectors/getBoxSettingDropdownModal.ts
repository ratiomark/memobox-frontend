import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { getCupboardState } from '../selectors/getCupboardCommon';

export const getBoxSettingsDropdownModalIsOpen = (state: StateSchema) => state.cupboard.boxSettingsDropdownModal.isOpen
export const getBoxSettingsDropdownCoordinates = (state: StateSchema) => state.cupboard.boxSettingsDropdownModal.boxCoordinates
export const getBoxSettingsDropdownBoxId = (state: StateSchema) => state.cupboard.boxSettingsDropdownModal.boxId
export const getBoxSettingsDropdownShelfId = (state: StateSchema) => state.cupboard.boxSettingsDropdownModal.shelfId

export const getBoxSettingsDropdownIsLearntBox = createSelector(
	[
		(state: StateSchema) => state,
		getBoxSettingsDropdownBoxId,
		getBoxSettingsDropdownShelfId,
	],
	(state, boxId, shelfId) => {
		const shelf = getCupboardState.selectById(state, shelfId)
		if (!shelf) return false
		const boxesData = shelf.boxesData
		return boxesData.find((box) => box.id === boxId)?.specialType === 'learnt'
	}
)

// export const getDeletionIds = (state: StateSchema) => state.cupboard.shelvesDeletionIds 