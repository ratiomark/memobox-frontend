import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContentPresenterTrashPageWidgetSchema } from '../types/ContentPresenterTrashPageWidgetSchema'

const initialState: ContentPresenterTrashPageWidgetSchema = {

}

const contentPresenterTrashPageWidgetSlice = createSlice({
	name: 'contentPresenterTrashPageWidget',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: contentPresenterTrashPageWidgetActions } = contentPresenterTrashPageWidgetSlice
export const { reducer: contentPresenterTrashPageWidgetReducer } = contentPresenterTrashPageWidgetSlice