import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SettingsPageWidgetSchema } from '../types/SettingsPageWidgetSchema'

const initialState: SettingsPageWidgetSchema = {

}

const settingsPageWidgetSlice = createSlice({
	name: 'settingsPageWidget',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: settingsPageWidgetActions } = settingsPageWidgetSlice
export const { reducer: settingsPageWidgetReducer } = settingsPageWidgetSlice