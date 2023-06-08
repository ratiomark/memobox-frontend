import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CupboardShelvesWidgetSchema } from '../types/CupboardShelvesWidgetSchema'

const initialState: CupboardShelvesWidgetSchema = {

}

const cupboardShelvesWidgetSlice = createSlice({
	name: 'cupboardShelvesWidget',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: cupboardShelvesWidgetActions } = cupboardShelvesWidgetSlice
export const { reducer: cupboardShelvesWidgetReducer } = cupboardShelvesWidgetSlice