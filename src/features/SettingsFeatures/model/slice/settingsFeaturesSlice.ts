
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SettingsFeaturesSchema } from '../types/SettingsFeaturesSchema'

const initialState: SettingsFeaturesSchema = {
	shelfTemplateModal: {
		isOpen: false
	},
	notificationModal: {
		isOpen: false
	},
	timeSleepModal: {
		isOpen: false
	},
	missedTrainingModal: {
		isOpen: false
	},
	manageEmailsModal: {
		isOpen: false
	},
	createNewEmailModal: {
		isOpen: false,
		emailValue: '',
	}
}

const settingsFeaturesSlice = createSlice({
	name: 'settingsFeaturesSlice',
	initialState,
	reducers: {
		setIsShelfTemplateModalOpen: (state, action: PayloadAction<boolean>) => {
			state.shelfTemplateModal.isOpen = action.payload
		},
		setIsNotificationModalOpen: (state, action: PayloadAction<boolean>) => {
			state.notificationModal.isOpen = action.payload
		},
		setIsTimeSleepModalOpen: (state, action: PayloadAction<boolean>) => {
			state.timeSleepModal.isOpen = action.payload
		},
		setIsMissedTrainingModalOpen: (state, action: PayloadAction<boolean>) => {
			state.missedTrainingModal.isOpen = action.payload
		},
		setIsManageEmailsModalOpen: (state, action: PayloadAction<boolean>) => {
			state.manageEmailsModal.isOpen = action.payload
		},
		setIsCreateNewEmailModalOpen: (state, action: PayloadAction<boolean>) => {
			state.createNewEmailModal.isOpen = action.payload
		},
		setCreateNewEmailValue: (state, action: PayloadAction<string>) => {
			state.createNewEmailModal.emailValue = action.payload
		},
	}
})

export const { actions: settingsFeaturesActions } = settingsFeaturesSlice
export const { reducer: settingsFeaturesReducer } = settingsFeaturesSlice