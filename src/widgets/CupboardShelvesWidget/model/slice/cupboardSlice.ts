import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CupboardPageSchema } from '../types/CupboardPageSchema'

const initialState: CupboardPageSchema = {
	shelvesDeletionIds: []
}

const cupboardSlice = createSlice({
	name: 'cupboardShelvesWidget',
	initialState,
	reducers: {
		addShelfToDeletion: (state, action: PayloadAction<string>) => {
			state.shelvesDeletionIds?.push(action.payload)
		},
	},
})

export const { actions: cupboardShelvesWidgetActions } = cupboardSlice
export const { reducer: cupboardShelvesWidgetReducer } = cupboardSlice