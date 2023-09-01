import { StateSchema } from '@/app/providers/StoreProvider';

export const getQuestionCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.questionText
export const getAnswerCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.answerText
export const getShelfIdCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.shelfId
// export const getBoxIdCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.boxId
// export const getBoxIdCardModal = (state: StateSchema) => {
// 	return state.cupboard.createNewCardModal.boxId ?? 0
// }
export const getBoxIndexCardModal = (state: StateSchema) => {
	return state.cupboard.createNewCardModal.boxIndex
}
export const getIsOpenCardModal = (state: StateSchema) => state.cupboard.createNewCardModal.isOpen


// export const getDeletionIds = (state: StateSchema) => state.cupboard.shelvesDeletionIds 