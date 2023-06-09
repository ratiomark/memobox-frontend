import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CardListViewWidgetSchema } from '../types/CardListViewWidgetSchema'

const initialState: CardListViewWidgetSchema = {

}

const cardListViewWidgetSlice = createSlice({
	name: 'cardListViewWidget',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: cardListViewWidgetActions } = cardListViewWidgetSlice
export const { reducer: cardListViewWidgetReducer } = cardListViewWidgetSlice