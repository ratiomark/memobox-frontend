import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SortControllerViewPageWidgetSchema } from '../types/SortControllerViewPageWidgetSchema'

const initialState: SortControllerViewPageWidgetSchema = {

}

const sortControllerViewPageWidgetSlice = createSlice({
	name: 'sortControllerViewPageWidget',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: sortControllerViewPageWidgetActions } = sortControllerViewPageWidgetSlice
export const { reducer: sortControllerViewPageWidgetReducer } = sortControllerViewPageWidgetSlice