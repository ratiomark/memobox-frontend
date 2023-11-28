import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { getAllShelvesEntities, getAllShelvesIds, getCupboardState } from '../slice/cupboardShelfListSlice';
import { BoxSchema } from '@/entities/Box';
import { getCupboardIsLoading } from './getCupboardShelfList';
import { t } from 'i18next';

export const getQuestionCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.questionText
export const getCreateNewCardRequestStatus = (state: StateSchema) => state.cupboard.createNewCardModal.requestStatus
export const getAnswerCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.answerText
export const getShelfIdCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.shelfId
const getBoxIdCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.boxId

export const getBoxIdCheckedCardModal = createSelector(
	[
		getShelfIdCardModal,
		getBoxIdCardModal,
		getAllShelvesIds,
		getAllShelvesEntities,
	],
	(shelfId, boxId, shelvesIds, shelves) => {
		if (boxId !== '') return boxId
		if (!shelvesIds || shelvesIds.length < 1) return
		if (shelfId === '') {
			return shelves[shelvesIds[0]]?.boxesData[0].id
		}
		return shelves[shelfId]?.boxesData[0].id
	}
)

export const getShelfBoxesItems = createSelector(
	[
		getShelfIdCardModal,
		getCupboardIsLoading,
		getAllShelvesIds,
		getAllShelvesEntities,
	],
	(shelfId, isLoading, shelvesIds, shelves) => {
		let boxesItems: BoxSchema[]
		if (!shelvesIds || shelvesIds.length < 1 || isLoading) return []
		if (shelfId === '') {
			boxesItems = shelves[shelvesIds[0]]?.boxesData ?? []
		}
		boxesItems = shelves[shelfId]?.boxesData.toSorted((a, b) => a.index - b.index) ?? []
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
				// value: box.id,
				content,
			}
		})
	}
)
// export const getShelfBoxesItems = createSelector(
// 	[
// 		getShelfIdCardModal,
// 		getCupboardIsLoading,
// 		getAllShelvesIds,
// 		getAllShelvesEntities,
// 	],
// 	(shelfId, isLoading, shelvesIds, shelves) => {
// 		let boxesItems: BoxSchema[]
// 		if (!shelvesIds || shelvesIds.length < 1 || isLoading) return []
// 		if (shelfId === '') {
// 			boxesItems = shelves[shelvesIds[0]]?.boxesData ?? []
// 		}
// 		boxesItems = shelves[shelfId]?.boxesData.toSorted((a, b) => a.index - b.index) ?? []
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
// 				value: box.id,
// 				content,
// 			}
// 		})
// 	}
// )

export const getBoxIndexCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.boxIndex
// export const getBoxIdCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.boxId
export const getIsOpenCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.isOpen

