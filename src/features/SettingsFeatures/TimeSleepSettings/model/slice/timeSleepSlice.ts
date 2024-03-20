import { createSlice, PayloadAction, } from '@reduxjs/toolkit'
import { DaysOfWeek, TimeSleepSettings } from '@/entities/User'
import { DayType, DeletePeriodPayloadAction, SetDurationMinutesPayloadAction, SetTimePayloadAction } from '../types/TimeSleepTypes'
import { daysOfWeekListValues } from '@/shared/const/daysOfWeek'

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
			const generalStartTime = state.generalSleepPeriod?.startTime
			const generalDuration = state.generalSleepPeriod?.durationMinutes
			const createNewDayByDay = () => {
				const dayByDaySleepPeriods = {} as TimeSleepSettings['dayByDaySleepPeriods']
				daysOfWeekListValues.forEach((day) => {
					dayByDaySleepPeriods[day] = [{ startTime: generalStartTime!, durationMinutes: generalDuration! }]
				})
				state.dayByDaySleepPeriods = dayByDaySleepPeriods
			}
			if (state.dayByDaySleepPeriods === undefined) {
				createNewDayByDay()
			} else {
				let periodsCount = 0
				daysOfWeekListValues.forEach((day) => {
					periodsCount += state.dayByDaySleepPeriods?.[day]?.length ?? 0
				})
				if (periodsCount === 0) {
					createNewDayByDay()
				}
			}
			state.isDayByDayOptionEnabled = !state.isDayByDayOptionEnabled
		},
		setStartTimeMinutes: (state, action: PayloadAction<SetTimePayloadAction>) => {
			const { dayType, operation } = action.payload
			if (dayType === 'general') {
				const currentMinute = state.generalSleepPeriod!.startTime.minutes
				const operationValue = operation === 'minus' ? -5 : 5
				if (currentMinute === 0 && operationValue === -5) return
				if (currentMinute === 55 && operationValue === 5) return
				state.generalSleepPeriod!.startTime.minutes = currentMinute + operationValue
			} else {
				const periodIndex = action.payload.indexPeriod
				const currentMinute = state.dayByDaySleepPeriods?.[dayType][periodIndex].startTime.minutes
				if (currentMinute !== undefined) {
					const operationValue = operation === 'minus' ? -5 : 5
					if (currentMinute === 0 && operationValue === -5) return
					if (currentMinute === 55 && operationValue === 5) return
					state.dayByDaySleepPeriods![dayType][periodIndex].startTime.minutes = currentMinute + operationValue
				}
			}
		},
		setStartTimeHours: (state, action: PayloadAction<SetTimePayloadAction>) => {
			const { dayType, operation } = action.payload
			if (dayType === 'general') {
				const currentHours = state.generalSleepPeriod!.startTime.hours
				const operationValue = operation === 'minus' ? -1 : 1
				if (currentHours === 0 && operationValue === -1) return
				if (currentHours === 23 && operationValue === 1) return
				state.generalSleepPeriod!.startTime.hours = currentHours + operationValue
			} else {
				const periodIndex = action.payload.indexPeriod
				const currentHours = state.dayByDaySleepPeriods?.[dayType][periodIndex].startTime.hours
				if (currentHours !== undefined) {
					const operationValue = operation === 'minus' ? -1 : 1
					if (currentHours === 0 && operationValue === -1) return
					if (currentHours === 23 && operationValue === 1) return
					state.dayByDaySleepPeriods![dayType][periodIndex].startTime.hours = currentHours + operationValue
				}
			}
		},
		setPeriodDuration: (state, action: PayloadAction<SetDurationMinutesPayloadAction>) => {
			const { dayType, durationMinutes } = action.payload
			if (dayType === 'general') {
				state.generalSleepPeriod!.durationMinutes = durationMinutes
			} else {
				const periodIndex = action.payload.indexPeriod
				const currentDurations = state.dayByDaySleepPeriods?.[dayType][periodIndex].durationMinutes
				if (currentDurations) {
					state.dayByDaySleepPeriods![dayType][periodIndex].durationMinutes = durationMinutes
				}
			}
		},
		createNewPeriod: (state, action: PayloadAction<DaysOfWeek>) => {
			const dayOfWeek = action.payload
			if (state.dayByDaySleepPeriods) {
				const amountOfPeriods = state.dayByDaySleepPeriods?.[dayOfWeek].length
				if (amountOfPeriods === 0) {
					state.dayByDaySleepPeriods[dayOfWeek] = [{ startTime: { hours: 23, minutes: 0 }, durationMinutes: 480 }]
				} else if (amountOfPeriods === 1) {
					state.dayByDaySleepPeriods[dayOfWeek].push({ startTime: { hours: 23, minutes: 0 }, durationMinutes: 480 })
				} else {
					return
				}
			}
		},
		deletePeriod: (state, action: PayloadAction<DeletePeriodPayloadAction>) => {
			const { dayType, indexPeriod } = action.payload
			if (state.dayByDaySleepPeriods && state.dayByDaySleepPeriods[dayType]) {
				if (indexPeriod === 0) {
					state.dayByDaySleepPeriods[dayType] = state.dayByDaySleepPeriods[dayType].slice(1)
					return
				}
				if (indexPeriod === 1) {
					state.dayByDaySleepPeriods[dayType] = state.dayByDaySleepPeriods[dayType].slice(0, 1)
					return
				}
			}
		}
	}
})

export const { actions: settingsTimeSleepActions } = timeSleepSettings
export const { reducer: settingsTimeSleepReducer } = timeSleepSettings