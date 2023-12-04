import { FeatureFlags } from '@/shared/types/FeatureFlags'
import { JsonSettings } from './JsonSettings'
import { JsonSavedData } from './JsonSavedData'
import { TimingBlock } from '@/shared/types/DataBlock'
import { UserSettings } from './userSettings'

export const UserRole = {
	ADMIN: 'ADMIN',
	USER: 'USER',
	MANAGER: 'MANAGER',
} as const

export type UserRole = keyof typeof UserRole


// то что возвращает бекэнд
export type User = {
	id: string
	username: string
	name: string
	email: string
	emailVerified: boolean
	subscriptionType: 'none' | 'trial' | 'paid' | 'canceled'
	subscriptionExpiresAt: string | number
	// avatar?: string
	role?: UserRole[]
	features?: Partial<FeatureFlags>
	// userSettings: UserSettings
	jsonSettings?: JsonSettings
	jsonSavedData?: JsonSavedData
}

// а это интрефейс для стейта, чтобы описать кусок стора?
// если authData пустая, то юзер не авторизован, а если не пуст, то значит авторизован
export interface UserSchema {
	_mounted: boolean
	help: string
	authData?: Omit<User, 'jsonSavedData' | 'userSettings'>
	userSettings?: UserSettings
	userSettingsIsLoading?: boolean
	userSettingsAwaitingResponseObject: {
		[key in keyof UserSettings]: boolean
	}
	jsonSavedData: JsonSavedData
	jsonSavedDataOriginal?: JsonSavedData
	jsonCommonSettings?: JsonSettings
	jsonCommonSettingsOriginal?: JsonSettings
}
// export type ExtendedTimingBlockForRealShelf = ExtendedTimingBlock & {
// 	missedTrainingValue?: MissedTrainingValue
// }
// export type MissedTrainingValue = 'none' | 'additional' | 'backwards'
// import { FeatureFlags } from '@/shared/types/FeatureFlags'
// import { JsonSettings } from './JsonSettings'
// import { JsonSavedData } from './JsonSavedData'
// import { TimingBlock } from '@/shared/types/DataBlock'

// export const UserRole = {
// 	ADMIN: 'ADMIN',
// 	USER: 'USER',
// 	MANAGER: 'MANAGER',
// } as const

// export type UserRole = keyof typeof UserRole

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

// export interface TimeSleepSettings {
// 	isTimeSleepEnabled: boolean
// 	isDayByDayOptionEnabled: boolean
// 	generalTimeSleepData: TimeSleepDataObject
// 	dayByDayTimeSleepData?: {
// 		[key in DaysOfWeek]: TimeSleepDataObject
// 	}
// }
// export interface UserSettings {
// 	notifications: NotificationSettings
// 	missedTrainingValue: 'none' | 'additionalTraining' | 'sendBackwards'
// 	shelfTemplate: TimingBlock[]
// 	timeSleep: TimeSleepSettings
// }
// // то что возвращает бекэнд
// export interface User {
// 	id: string
// 	username: string
// 	name: string
// 	email: string
// 	emailVerified: boolean
// 	subscriptionType: 'none' | 'trial' | 'paid' | 'canceled'
// 	subscriptionExpiresAt: string | number
// 	// avatar?: string
// 	userSettings: {
// 		notifications: NotificationSettings
// 		missedTrainingValue: 'none' | 'additionalTraining' | 'sendBackwards'
// 		shelfTemplate: TimingBlock[]
// 		timeSleep: TimeSleepSettings
// 	}
// 	role?: UserRole[]
// 	features?: Partial<FeatureFlags>
// 	jsonSettings?: JsonSettings
// 	jsonSavedData?: JsonSavedData
// }

// // а это интрефейс для стейта, чтобы описать кусок стора?
// // если authData пустая, то юзер не авторизован, а если не пуст, то значит авторизован
// export interface UserSchema {
// 	authData?: Omit<User, 'jsonSavedData'>
// 	jsonSavedData?: JsonSavedData
// 	userSettings: UserSettings
// 	_mounted: boolean
// }