import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommonShelfSchema } from '../types/CommonShelfSchema'

const initialState: CommonShelfSchema = {

}

const commonShelfSlice = createSlice({
	name: 'commonShelf',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: commonShelfActions } = commonShelfSlice
export const { reducer: commonShelfReducer } = commonShelfSlice