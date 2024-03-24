import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CardAnswersObject, TrainingSchema } from '../types/TrainingSchema'

const initialState: TrainingSchema = {
	answerObject: {},
}

const trainingSlice = createSlice({
	name: 'training',
	initialState,
	reducers: {
		addCardToAnswerObj: (state, action: PayloadAction<CardAnswersObject>) => {
			state.answerObject = {...state.answerObject, ...action.payload}
		},
	},
})

export const { actions: trainingActions } = trainingSlice
export const { reducer: trainingReducer } = trainingSlice