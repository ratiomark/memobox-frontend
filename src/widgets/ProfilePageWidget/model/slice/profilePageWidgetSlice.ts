import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfilePageWidgetSchema } from '../types/ProfilePageWidgetSchema'

const initialState: ProfilePageWidgetSchema = {
	isChangeNameModalOpen: false,
	isChangeEmailModalOpen: false,
	isChangePasswordModalOpen: false,
	isChangeLanguageModalOpen: false,
}

const profilePageWidgetSlice = createSlice({
	name: 'profilePageWidget',
	initialState,
	reducers: {
		setIsChangeNameModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isChangeNameModalOpen = action.payload
		},
		setIsChangeEmailModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isChangeEmailModalOpen = action.payload
		},
		setIsChangePasswordModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isChangePasswordModalOpen = action.payload
		},
		setIsChangeLanguageModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isChangeLanguageModalOpen = action.payload
		},
	},
})

export const { actions: profilePageWidgetActions } = profilePageWidgetSlice
export const { reducer: profilePageWidgetReducer } = profilePageWidgetSlice