import { StateSchema } from '@/app/providers/StoreProvider';

export const getQuestionCardModal = (state: StateSchema) => state.cupboard.newCardModal.questionText
export const getAnswerCardModal = (state: StateSchema) => state.cupboard.newCardModal.answerText
export const getShelfIdCardModal = (state: StateSchema) => state.cupboard.newCardModal.shelfId
// export const getBoxIdCardModal = (state: StateSchema) => state.cupboard.newCardModal.boxId
// export const getBoxIdCardModal = (state: StateSchema) => {
// 	return state.cupboard.newCardModal.boxId ?? 0
// }
export const getBoxIndexCardModal = (state: StateSchema) => {
	return state.cupboard.newCardModal.boxIndex
}
export const getIsOpenCardModal = (state: StateSchema) => state.cupboard.newCardModal.isOpen


// export const getDeletionIds = (state: StateSchema) => state.cupboard.shelvesDeletionIds 