import { createSlice, PayloadAction, } from '@reduxjs/toolkit'
import { isEqual } from 'lodash'
import { DaysOfWeek, TimeSleepSettings } from '@/entities/User'
import { SetTimePayloadAction } from '../types/TimeSleepTypes'


const initialState: Partial<TimeSleepSettings> = {

}


const timeSleepSettings = createSlice({
	name: 'settingsShelfTemplate',
	initialState,
	reducers: {
		setInitialData: (state, action: PayloadAction<TimeSleepSettings>) => {
			return action.payload
		},
		toggleTimeSleepEnabled: (state) => {
			state.isTimeSleepEnabled = !state.isTimeSleepEnabled
		},
		toggleDayByDayTimeSleepEnabled: (state) => {
			state.isDayByDayOptionEnabled = !state.isDayByDayOptionEnabled
		},
		setMinutes: (state, action: PayloadAction<SetTimePayloadAction>) => {
			const { dayType, operation, sleepMode } = action.payload
			if (dayType === 'general') {
				const currentMinute = state.generalTimeSleepData![sleepMode].minutes
				const operationValue = operation === 'minus' ? -5 : 5
				state.generalTimeSleepData![sleepMode].minutes = currentMinute + operationValue
			} else {
				const currentMinute = state.dayByDayTimeSleepData![dayType][sleepMode].minutes
				const operationValue = operation === 'minus' ? -5 : 5
				state.dayByDayTimeSleepData![dayType][sleepMode].minutes = currentMinute + operationValue
			}
		},
		setHours: (state, action: PayloadAction<SetTimePayloadAction>) => {
			const { dayType, operation, sleepMode } = action.payload
			if (dayType === 'general') {
				const currentMinute = state.generalTimeSleepData![sleepMode].hours
				const operationValue = operation === 'minus' ? -1 : 1
				state.generalTimeSleepData![sleepMode].hours = currentMinute + operationValue
			} else {
				const currentMinute = state.dayByDayTimeSleepData![dayType][sleepMode].hours
				const operationValue = operation === 'minus' ? -1 : 1
				state.dayByDayTimeSleepData![dayType][sleepMode].hours = currentMinute + operationValue
			}
		}
		// setGeneral: (state) => {
		// 	state.isTimeSleepEnabled = !state.isDayByDayOptionEnabled
		// },
	}
})

export const { actions: settingsTimeSleepActions } = timeSleepSettings
export const { reducer: settingsTimeSleepReducer } = timeSleepSettings