import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShelvesListViewWidgetSchema } from '../types/ShelvesListViewWidgetSchema'

const initialState: ShelvesListViewWidgetSchema = {

}

const shelvesListViewWidgetSlice = createSlice({
	name: 'shelvesListViewWidget',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: shelvesListViewWidgetActions } = shelvesListViewWidgetSlice
export const { reducer: shelvesListViewWidgetReducer } = shelvesListViewWidgetSlice