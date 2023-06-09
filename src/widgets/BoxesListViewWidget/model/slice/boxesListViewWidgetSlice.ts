import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BoxesListViewWidgetSchema } from '../types/BoxesListViewWidgetSchema'

const initialState: BoxesListViewWidgetSchema = {

}

const boxesListViewWidgetSlice = createSlice({
	name: 'boxesListViewWidget',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: boxesListViewWidgetActions } = boxesListViewWidgetSlice
export const { reducer: boxesListViewWidgetReducer } = boxesListViewWidgetSlice