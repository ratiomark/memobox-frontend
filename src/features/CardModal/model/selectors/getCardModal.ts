import { StateSchema } from '@/app/providers/StoreProvider';

export const getCardModal = (state: StateSchema) => state.cardModal
export const getCardModalQuestion = (state: StateSchema) => state.cardModal.questionText
export const getCardModalAnswer = (state: StateSchema) => state.cardModal.answerText
// export const getCardModal = (state: StateSchema) => state.cardModal
// export const getCardModal = (state: StateSchema) => state.cardModal
// export const getCardModal = (state: StateSchema) => state.cardModal