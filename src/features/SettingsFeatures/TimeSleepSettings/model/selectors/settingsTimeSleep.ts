import { StateSchema } from '@/app/providers/StoreProvider';
import { DaysOfWeek } from '@/entities/User';
import { createSelector } from '@reduxjs/toolkit';


export const getTimeSleepEnabled = (state: StateSchema) => state.settingsTimeSleep?.isTimeSleepEnabled ?? true
export const getDayByDayOptionEnabled = (state: StateSchema) => state.settingsTimeSleep?.isDayByDayOptionEnabled ?? false
export const getGeneralTimeSleepData = (state: StateSchema) => state.settingsTimeSleep?.generalSleepPeriod
export const getDayByDayTimeSleepData = (state: StateSchema) => state.settingsTimeSleep?.dayByDaySleepPeriods

export const getTimeSleepDataLengthByDay = (day: DaysOfWeek) => {
	return createSelector(
		[
			getDayByDayTimeSleepData,
		],
		(dayByDayTimeSleepData) => {
			return dayByDayTimeSleepData?.[day]?.length ?? 0
		})
}

export const getTimeSleepDataByDay = (day: DaysOfWeek) => {
	return createSelector(
		[
			getDayByDayTimeSleepData,
		],
		(dayByDayTimeSleepData) => {
			return dayByDayTimeSleepData?.[day] ?? []
		})
}


export const getCurrentTimeSleepSettings = createSelector(
	[
		getTimeSleepEnabled,
		getDayByDayOptionEnabled,
		getGeneralTimeSleepData,
		getDayByDayTimeSleepData
	],
	(isTimeSleepEnabled, isDayByDayOptionEnabled, generalSleepPeriod, dayByDaySleepPeriods) => {
		if (!isDayByDayOptionEnabled) {
			return ({
				isTimeSleepEnabled,
				isDayByDayOptionEnabled,
				generalSleepPeriod
			})
		}
		return ({
			isTimeSleepEnabled,
			isDayByDayOptionEnabled,
			generalSleepPeriod,
			dayByDaySleepPeriods
		})
	})