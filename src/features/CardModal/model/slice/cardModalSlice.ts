import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CardModalSchema } from '../types/CardModalSchema'

const initialState: CardModalSchema = {
	questionText: '',
	answerText: '',
	isOpen: false,
}

const cardModalSlice = createSlice({
	name: 'cardModal',
	initialState,
	reducers: {
		setQuestionText: (state, action: PayloadAction<string>) => {
			state.questionText = action.payload
		},
		setAnswerText: (state, action: PayloadAction<string>) => {
			state.answerText = action.payload
		},
		setShelf: (state, action: PayloadAction<string>) => {
			state.shelfId = action.payload
		},
		openModalNewCard: (state) => {
			state.isOpen = true
		},
		closeModalNewCard: (state) => {
			state.isOpen = false
		},

	},
})

export const { actions: cardModalActions } = cardModalSlice
export const { reducer: cardModalReducer } = cardModalSlice