import { TimingBlock } from '@/shared/types/DataBlock'
interface NotificationEmails {
	email: string
	verified: boolean
}

export interface NotificationSettings {
	mobilePushEnabled: boolean
	emailNotificationsEnabled: boolean
	minimumCardsForPush: number
	minimumCardsForEmailNotification: number
	notificationEmails: NotificationEmails[]
}

export interface TimeSleepDataObject {
	up: {
		hours: number
		minutes: number
	}
	down: {
		hours: number
		minutes: number
	}
}

export type DaysOfWeek =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday'


export type DayByDayTimeSleepData = {
	[key in DaysOfWeek]: TimeSleepDataObject
}

export interface TimeSleepSettings {
	isTimeSleepEnabled: boolean
	isDayByDayOptionEnabled: boolean
	generalTimeSleepData: TimeSleepDataObject
	dayByDayTimeSleepData?: DayByDayTimeSleepData
}

export type MissedTrainingValue = 'none' | 'additional' | 'backwards'

export interface UserSettings {
	notifications: NotificationSettings
	missedTraining: MissedTrainingValue
	shelfTemplate: TimingBlock[]
	timeSleep: TimeSleepSettings
}