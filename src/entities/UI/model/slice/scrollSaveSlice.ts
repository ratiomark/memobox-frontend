import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScrollSaveSchema, UISchema } from '../types/ScrollSaveSchema'

const initialState: UISchema = {
	scroll: {},
	isMobile: false,
}

const uiSlice = createSlice({
	name: 'UISlice',
	initialState,
	reducers: {
		setScrollPosition: (state, action: PayloadAction<{ path: string; position: number }>) => {
			state.scroll[action.payload.path] = action.payload.position
		},
		setIsMobile: (state, action: PayloadAction<boolean>) => {
			state.isMobile = action.payload
		},
	},

})

export const { actions: uiActions } = uiSlice
export const { reducer: uiReducer } = uiSlice