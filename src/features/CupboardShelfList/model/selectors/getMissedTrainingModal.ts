import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { getCupboardState } from '../slice/cupboardShelfListSlice';

export const getMissedTrainingModalIsOpen = (state: StateSchema) => state.cupboard.missedTrainingModal.isOpen
export const getMissedTrainingModalShelfId = (state: StateSchema) => state.cupboard.missedTrainingModal.shelfId
export const getMissedTrainingModalBoxId = (state: StateSchema) => state.cupboard.missedTrainingModal.boxId

export const getMissedTrainingShelfValue = createSelector(
	[
		(state: StateSchema, shelfId: string) => getCupboardState.selectById(state, shelfId)
	],
	(shelf) => shelf?.missedTrainingAction ?? 'none'
)

export const getMissedTrainingBoxValue = createSelector(
	[
		(state: StateSchema, shelfId: string, boxId: string) => getCupboardState.selectById(state, shelfId)?.boxesData.find(box => box._id === boxId)
	],
	(box) => {
		console.log(box)
		if (!box) return 'none'
		if (box.specialType !== 'new') {
			return box.missedTrainingAction ?? 'none'
		}
	}
)
// export const getDeletionIds = (state: StateSchema) => state.cupboard.shelvesDeletionIds 