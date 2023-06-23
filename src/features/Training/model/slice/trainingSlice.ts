import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TrainingSchema } from '../types/TrainingSchema'

const initialState: TrainingSchema = {

}

const trainingSlice = createSlice({
	name: 'training',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: trainingActions } = trainingSlice
export const { reducer: trainingReducer } = trainingSlice