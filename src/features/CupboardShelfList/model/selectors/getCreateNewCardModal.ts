import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { getCupboardState } from '../slice/cupboardShelfListSlice';
import { BoxSchema } from '@/entities/Box';
import { getCupboardIsLoading } from './getCupboardShelfList';
import { store } from '@/app/providers/StoreProvider';
import { t } from 'i18next';

export const getQuestionCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.questionText
export const getAnswerCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.answerText
export const getShelfIdCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.shelfId
const getBoxIdCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.boxId

export const getBoxIdCheckedCardModal = createSelector(
	[
		// (state: StateSchema) => state,
		getShelfIdCardModal,
		getBoxIdCardModal,
		() => getCupboardState.selectIds(store.getState()),
		() => getCupboardState.selectEntities(store.getState())
	],
	(shelfId, boxId, shelvesIds, shelves) => {
		if (boxId !== '') return boxId
		// const shelves = getCupboardState.selectEntities(state)
		// const shelvesIds = getCupboardState.selectIds(state)
		if (!shelvesIds || shelvesIds.length < 1) return
		if (shelfId === '') {
			return shelves[shelvesIds[0]]?.boxesData[0]._id
		}
		return shelves[shelfId]?.boxesData[0]._id
	}
)
// export const getBoxIdCheckedCardModal = createSelector(
// 	[
// 		(state: StateSchema) => state,
// 		getShelfIdCardModal,
// 		getBoxIdCardModal,
// 	],
// 	(state, shelfId, boxId) => {
// 		if (boxId !== '') return boxId
// 		const shelves = getCupboardState.selectEntities(state)
// 		const shelvesIds = getCupboardState.selectIds(state)
// 		if (!shelvesIds || shelvesIds.length < 1) return
// 		if (shelfId === '') {
// 			return shelves[shelvesIds[0]]?.boxesData[0]._id
// 		}
// 		return shelves[shelfId]?.boxesData[0]._id
// 	}
// )

export const getShelfBoxesItems = createSelector(
	[
		getShelfIdCardModal,
		getCupboardIsLoading,
		() => getCupboardState.selectIds(store.getState()),
		() => getCupboardState.selectEntities(store.getState())
	],
	(shelfId, isLoading, shelvesIds, shelves) => {
		let boxesItems: BoxSchema[]
		if (!shelvesIds || shelvesIds.length < 1 || isLoading) return []
		if (shelfId === '') {
			boxesItems = shelves[shelvesIds[0]]?.boxesData ?? []
		}
		boxesItems = shelves[shelfId]?.boxesData ?? []
		return boxesItems.map(box => {
			let content;
			switch (box.specialType) {
				case 'none':
					content = `${t('box text')} ${box.index}`
					break;
				case 'new':
					content = t('new cards')
					break
				default:
					content = t('learnt cards')
					break;
			}
			return {
				value: box.index,
				content,
			}
		})
	}
)
// export const getShelfBoxesItems = createSelector(
// 	[
// 		(state: StateSchema) => state,
// 		getShelfIdCardModal,
// 		getCupboardIsLoading,
// 	],
// 	(state, shelfId, isLoading) => {
// 		const shelves = getCupboardState.selectEntities(state)
// 		const shelvesIds = getCupboardState.selectIds(state)
// 		let boxesItems: BoxSchema[]
// 		if (!shelvesIds || shelvesIds.length < 1 || isLoading) return []
// 		if (shelfId === '') {
// 			boxesItems = shelves[shelvesIds[0]]?.boxesData ?? []
// 		}
// 		boxesItems = shelves[shelfId]?.boxesData ?? []
// 		return boxesItems.map(box => {
// 			let content;
// 			switch (box.specialType) {
// 				case 'none':
// 					content = `${t('box text')} ${box.index}`
// 					break;
// 				case 'new':
// 					content = t('new cards')
// 					break
// 				default:
// 					content = t('learnt cards')
// 					break;
// 			}
// 			return {
// 				value: box.index,
// 				content,
// 			}
// 		})
// 	}
// )


export const getBoxIndexCardModal = (state: StateSchema) => {
	return state.cupboard.createNewCardModal.boxIndex
}

export const getIsOpenCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.isOpen

// const shelfId = useSelector(getMissedTrainingModalShelfId)
// const boxId = useSelector(getMissedTrainingModalBoxId)
// const currentMissedTrainingValue = useSelector((state: StateSchema) => getMissedTrainingShelfValue(state, shelfId))
// const currentMissedTrainingValueOfBox = useSelector((state: StateSchema) => getMissedTrainingBoxValue(state, shelfId, boxId))
