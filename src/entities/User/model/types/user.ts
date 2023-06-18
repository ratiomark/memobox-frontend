import { FeatureFlags } from '@/shared/types/FeatureFlags'
import { JsonSettings } from './JsonSettings'
import { JsonSavedData } from './JsonSavedData'
import { TimingBlock } from '@/shared/types/DataBlock'

export const UserRole = {
	ADMIN: 'ADMIN',
	USER: 'USER',
	MANAGER: 'MANAGER',
} as const

export type UserRole = keyof typeof UserRole

interface NotificationEmails {
	email: string
	verified: boolean
}

interface NotificationSettings {
	mobilePushEnabled: boolean
	emailNotificationsEnabled: boolean
	minimumCardsForPush: number
	minimumCardsForEmailNotification: number
	notificationEmails: NotificationEmails[]
}

interface TimeSleepSettings {
	timeSleepEnabled: boolean
}

// то что возвращает бекэнд
export interface User {
	id: string
	username: string
	// avatar?: string
	userSettings: {
		notifications: NotificationSettings
		missedTrainingAction: 'none' | 'additionalTraining' | 'sendBackwards'
		shelfTemplate: TimingBlock[]
	}
	role?: UserRole[]
	features?: Partial<FeatureFlags>
	jsonSettings?: JsonSettings
	jsonSavedData?: JsonSavedData
}

// а это интрефейс для стейта, чтобы описать кусок стора?
// если authData пустая, то юзер не авторизован, а если не пуст, то значит авторизован
export interface UserSchema {
	authData?: User
	_mounted: boolean
}