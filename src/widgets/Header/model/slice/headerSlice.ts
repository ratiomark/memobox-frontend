import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HeaderSchema } from '../types/HeaderSchema'

const initialState: HeaderSchema = {
	isHelpModalOpen: false,
	isWriteToUsModalOpen: false,
}

const headerSlice = createSlice({
	name: 'header',
	initialState,
	reducers: {
		setIsHelpModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isHelpModalOpen = action.payload
		},
		setIsWriteToUsModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isWriteToUsModalOpen = action.payload
		},
	},
})

export const { actions: headerActions } = headerSlice
export const { reducer: headerReducer } = headerSlice