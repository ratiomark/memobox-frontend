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


export interface TimeSleepAtomicDataObject {
	hours: number;
	minutes: number;
}

export interface SleepPeriod {
	startTime: TimeSleepAtomicDataObject; // Формат "HH:mm"
	durationMinutes: number;
}

export interface SleepPeriodBackendFormat {
	startTime: string; // Формат "HH:mm"
	durationMinutes: number;
}

export interface TimeSleepSettings {
	isTimeSleepEnabled: boolean;
	isDayByDayOptionEnabled: boolean;
	generalSleepPeriod: SleepPeriod;
	dayByDaySleepPeriods: {
		[key in DaysOfWeek]: SleepPeriod[];
	};
}

export type DaysOfWeek =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday'


// export type DayByDayTimeSleepData = {
// 	[key in DaysOfWeek]: TimeSleepDataObject[]
// }

// export interface TimeSleepSettings {
// 	isTimeSleepEnabled: boolean
// 	isDayByDayOptionEnabled: boolean
// 	generalTimeSleepData: TimeSleepDataObject
// 	dayByDayTimeSleepData?: DayByDayTimeSleepData
// }

export type MissedTrainingValue = 'none' | 'additional' | 'backwards'

export interface UserSettings {
	notifications: NotificationSettings
	missedTraining: MissedTrainingValue
	shelfTemplate: TimingBlock[]
	timeSleep: TimeSleepSettings
}
// import { TimingBlock } from '@/shared/types/DataBlock'
// interface NotificationEmails {
// 	email: string
// 	verified: boolean
// }

// export interface NotificationSettings {
// 	mobilePushEnabled: boolean
// 	emailNotificationsEnabled: boolean
// 	minimumCardsForPush: number
// 	minimumCardsForEmailNotification: number
// 	notificationEmails: NotificationEmails[]
// }

// export interface TimeSleepDataObject {
// 	up: {
// 		hours: number
// 		minutes: number
// 	}
// 	down: {
// 		hours: number
// 		minutes: number
// 	}
// }

// export type DaysOfWeek =
// 	| 'monday'
// 	| 'tuesday'
// 	| 'wednesday'
// 	| 'thursday'
// 	| 'friday'
// 	| 'saturday'
// 	| 'sunday'


// export type DayByDayTimeSleepData = {
// 	[key in DaysOfWeek]: TimeSleepDataObject
// }

// export interface TimeSleepSettings {
// 	isTimeSleepEnabled: boolean
// 	isDayByDayOptionEnabled: boolean
// 	generalTimeSleepData: TimeSleepDataObject
// 	dayByDayTimeSleepData?: DayByDayTimeSleepData
// }

// export type MissedTrainingValue = 'none' | 'additional' | 'backwards'

// export interface UserSettings {
// 	notifications: NotificationSettings
// 	missedTraining: MissedTrainingValue
// 	shelfTemplate: TimingBlock[]
// 	timeSleep: TimeSleepSettings
// }