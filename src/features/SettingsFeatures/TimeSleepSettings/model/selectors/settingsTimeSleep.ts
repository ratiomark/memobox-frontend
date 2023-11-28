import { StateSchema } from '@/app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';


export const getTimeSleepEnabled = (state: StateSchema) => state.settingsTimeSleep?.isTimeSleepEnabled ?? true
export const getDayByDayOptionEnabled = (state: StateSchema) => state.settingsTimeSleep?.isDayByDayOptionEnabled ?? false
export const getGeneralTimeSleepData = (state: StateSchema) => state.settingsTimeSleep?.generalTimeSleepData
export const getDayByDayTimeSleepData = (state: StateSchema) => state.settingsTimeSleep?.dayByDayTimeSleepData

export const getCurrentTimeSleepSettings = createSelector(
	[
		getTimeSleepEnabled,
		getDayByDayOptionEnabled,
		getGeneralTimeSleepData,
		getDayByDayTimeSleepData
	],
	(isTimeSleepEnabled, isDayByDayOptionEnabled, generalTimeSleepData, dayByDayTimeSleepData) => {
		if (!isDayByDayOptionEnabled) {
			return ({
				isTimeSleepEnabled,
				isDayByDayOptionEnabled,
				generalTimeSleepData
			})
		}
		return ({
			isTimeSleepEnabled,
			isDayByDayOptionEnabled,
			generalTimeSleepData,
			dayByDayTimeSleepData
		})
	})