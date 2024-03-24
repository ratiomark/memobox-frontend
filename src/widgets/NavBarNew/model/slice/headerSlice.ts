import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NavBarSchema } from '../types/HeaderSchema'

const initialState: NavBarSchema = {
	isHelpModalOpen: false,
	isWriteToUsModalOpen: false,
}

const navBarSlice = createSlice({
	name: 'navBar',
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

export const { actions: navBarActions } = navBarSlice
export const { reducer: navBarReducer } = navBarSlice