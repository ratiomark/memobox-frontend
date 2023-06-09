import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ViewPageInitializerSchema } from '../types/ViewPageInitializerSchema'
import { ShelfRepresentedByBoxes } from '@/entities/Box'
import { fetchBoxesDataByShelfId } from '../services/fetchBoxesDataByShelfId'

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
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchBoxesDataByShelfId.pending,
				(state) => {
					// state.isLoading = true
					// state.error = undefined
				})
			.addCase(
				fetchBoxesDataByShelfId.fulfilled,
				(state, action: PayloadAction<{ [shelfId: string]: ShelfRepresentedByBoxes }>) => {
					state.shelvesDataSaved = {...state.shelvesDataSaved, ...action.payload}
					// state.data = action.payload
					// state.isLoading = false
				})
			.addCase(
				fetchBoxesDataByShelfId.rejected,
				(state, action) => {
					// state.error = action.payload;
					// state.isLoading = false;
				})
	}
	// fetchBoxesDataByShelfId
	// extraReducers
})

export const { actions: viewPageActions } = viewPageSlice
export const { reducer: viewPageReducer } = viewPageSlice