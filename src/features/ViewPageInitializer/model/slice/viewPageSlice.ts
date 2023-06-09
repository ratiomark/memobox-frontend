import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ViewPageInitializerSchema } from '../types/ViewPageInitializerSchema'

const initialState: ViewPageInitializerSchema = {
	shelfId: '',
	boxId: '',
}

const viewPageSlice = createSlice({
	name: 'viewPage',
	initialState,
	reducers: {
		setShelfId: (state, action: PayloadAction<string>) => {
			state.shelfId = action.payload
		},
		setBoxId: (state, action: PayloadAction<string>) => {
			state.boxId = action.payload
		},
	},
})

export const { actions: viewPageActions } = viewPageSlice
export const { reducer: viewPageReducer } = viewPageSlice