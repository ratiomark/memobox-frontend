import { DaysOfWeek } from '@/entities/User';

export type SleepMode = 'up' | 'down';
export type DayType = 'general' | DaysOfWeek;
export type TimeControllerFunction = (type: DayType, sleepMode: SleepMode) => void

export interface SetGeneralTimePayloadAction {
	dayType: 'general'
	operation: 'plus' | 'minus',
	// sleepMode: SleepMode
}
export interface SetSpecificDayTimePayloadAction {
	dayType: DaysOfWeek
	operation: 'plus' | 'minus',
	indexPeriod: number
}

export type SetTimePayloadAction = SetGeneralTimePayloadAction | SetSpecificDayTimePayloadAction

export interface SetGeneralDurationPayloadAction {
	dayType: 'general'
	durationMinutes: number
}
export interface SetSpecificDayDurationPayloadAction {
	dayType: DaysOfWeek
	durationMinutes: number
	indexPeriod: number
}

export type SetDurationMinutesPayloadAction = SetGeneralDurationPayloadAction | SetSpecificDayDurationPayloadAction

export interface DeletePeriodPayloadAction {
	dayType: DaysOfWeek
	indexPeriod: number
}