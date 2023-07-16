import { DaysOfWeek } from '@/entities/User';

export type SleepMode = 'up' | 'down';
export type DayType = 'general' | DaysOfWeek;
export type TimeControllerFunction = (type: DayType, sleepMode: SleepMode) => void

export interface SetTimePayloadAction {
	dayType: DayType
	operation: 'plus' | 'minus',
	sleepMode: SleepMode
}
