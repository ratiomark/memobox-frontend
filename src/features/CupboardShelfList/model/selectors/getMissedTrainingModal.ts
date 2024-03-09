import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { getCupboardState } from '../selectors/getCupboardCommon';

export const getMissedTrainingModalIsOpen = (state: StateSchema) => state.cupboard.missedTrainingModal.isOpen
export const getMissedTrainingModalShelfId = (state: StateSchema) => state.cupboard.missedTrainingModal.shelfId
export const getMissedTrainingModalBoxId = (state: StateSchema) => state.cupboard.missedTrainingModal.boxId

export const getMissedTrainingShelfValue = createSelector(
	[
		(state: StateSchema) => state,
		getMissedTrainingModalShelfId,
	],
	(state, shelfId) => getCupboardState.selectById(state, shelfId)?.missedTrainingValue ?? 'none'
)

export const getMissedTrainingBoxValue = createSelector(
	[
		(state: StateSchema) => state,
		getMissedTrainingModalShelfId,
		getMissedTrainingModalBoxId,
	],
	(state, shelfId, boxId) => {
		const box = getCupboardState.selectById(state, shelfId)?.boxesData.find(box => box.id === boxId)
		return box?.missedTrainingValue ?? 'none'

	}
)
// export const getMissedTrainingBoxValue = createSelector(
// 	[
// 		(state: StateSchema, shelfId: string, boxId: string) => getCupboardState.selectById(state, shelfId)?.boxesData.find(box => box.id === boxId)
// 	],
// 	(box) => {
// 		// console.log(box)
// 		if (!box) return 'none'
// 		if (box.specialType !== 'new') {
// 			return box.missedTrainingValue ?? 'none'
// 		}
// 	}
// )
// export const getDeletionIds = (state: StateSchema) => state.cupboard.shelvesDeletionIds 