import { rtkApi } from '@/shared/api/rtkApi'
import { JsonSettings } from '../types/JsonSettings'
import { User } from '../types/user'
import { NotificationSettings, TimeSleepSettings, UserSettings } from '../types/userSettings'
import { JsonSavedData } from '../types/JsonSavedData'
import { MissedTrainingValue } from '../types/userSettings'
import { TimingBlock } from '@/shared/types/DataBlock'
import { getCurrentTimeZone } from '@/shared/lib/helpers/common/getCurrentTimeZone'
import { getBrowserLanguage } from '@/shared/lib/helpers/common/getBrowserLanguage'


interface SetJsonSettings {
	userId: string
	jsonSettings: JsonSettings
}
interface SetJsonSavedData {
	userId: string
	jsonSavedData: JsonSavedData
}

export interface UserWithToken {
	token: string
	refreshToken: string
	tokenExpires: number
	// user: Pick<User, 'id'>
	user: User
}

// type ResponseWithToken = { token: string }

export interface RegisterByEmailProps {
	email: string
	password: string
	name: string
}

export interface LoginByEmailProps {
	email: string
	password: string
}

interface SubscribeDevicePushNotification {
	subscription: PushSubscription
	browserName: string
	osName: string
}
interface UnsubscribeDevicePushNotification {
	subscription: PushSubscription
}
// test comment API
export const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		loginUser: build.mutation<UserWithToken, LoginByEmailProps>({
			query: (arg) => ({
				url: '/auth/email/login',
				method: 'POST',
				body: {
					...arg,
				}
			})
		}),
		registerUser: build.mutation<null, RegisterByEmailProps>({
			query: (arg) => ({
				url: '/auth/email/register',
				method: 'POST',
				body: {
					...arg,
					firstName: arg.name,
					timezone: getCurrentTimeZone(),
					language: getBrowserLanguage()
				}
			})
		}),
		logout: build.mutation<void, void>({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			})
		}),
		// mutation потому что буду патчить изенения. Получаю юзера, аргументом SetJsonSettings
		setJsonSettings: build.mutation<User, SetJsonSettings>({
			query: ({ userId, jsonSettings }) => ({
				url: `/users/${userId}`,
				method: 'PATCH',
				body: {
					jsonSettings
				}
			})
		}),
		setUserLang: build.mutation<User, { userId: string, language: string }>({
			query: ({ userId, language }) => ({
				url: `/users/${userId}`,
				method: 'PATCH',
				body: {
					language,
					// const timeZones = Intl.supportedValuesOf('timeZone');
				}
			})
		}),
		getMe: build.mutation<User, void>({
			query: () => ({
				url: '/auth/me',
				method: 'GET',
			})
		}),
		updateJsonSavedData: build.mutation<JsonSavedData, SetJsonSavedData>({
			query: ({ userId, jsonSavedData }) => ({
				url: `/users/${userId}/json-saved-data`,
				method: 'PATCH',
				body: jsonSavedData
			})
		}),
		getUserDataById: build.query<User, string>({
			query: (userId) => ({
				url: `/users/${userId}`,
				method: 'GET',
			})
		}),
		getTokensOnInitWithUserSettings: build.query<UserWithToken, string>({
			query: (userId) => ({
				url: '/auth/refresh-init',
				method: 'POST',
				body: {
					userId
				},
			})
		}),
		// getTokensByRefreshToken: build.query<UserWithToken, string>({
		// 	query: (refreshToken) => ({
		// 		url: '/auth/refresh',
		// 		method: 'POST',
		// 		headers: {
		// 			'Authorization': `Bearer ${refreshToken}`,
		// 		}
		// 	})
		// }),
		// settings
		getUserSettings: build.query<UserSettings, void>({
			query: () => ({
				url: '/settings',
				method: 'GET',
			})
		}),
		updateMissedTraining: build.mutation<{ missedTraining: MissedTrainingValue }, { missedTraining: MissedTrainingValue }>({
			query: (arg) => ({
				url: '/settings/missed-training',
				method: 'PATCH',
				body: {
					...arg
				}
			})
		}),
		updateShelfTemplate: build.mutation<{ shelfTemplate: TimingBlock[] }, TimingBlock[]>({
			query: (arg) => ({
				url: '/settings/shelf-template',
				method: 'PATCH',
				body: {
					shelfTemplate: arg
				}
			})
		}),
		setDefaultShelfTemplate: build.mutation<{ shelfTemplate: TimingBlock[] }, void>({
			query: () => ({
				url: '/settings/shelf-template',
				method: 'DELETE',
			})
		}),
		updateTimeSleep: build.mutation<TimeSleepSettings, TimeSleepSettings>({
			query: (arg) => ({
				url: '/settings/time-sleep',
				method: 'PATCH',
				body: {
					...arg
				}
			})
		}),
		updateNotificationSettings: build.mutation<NotificationSettings, NotificationSettings>({
			query: (arg) => ({
				url: '/settings/notification',
				method: 'PATCH',
				body: {
					...arg
				}
			})
		}),
		addNotificationEmail: build.mutation<NotificationSettings, string>({
			query: (arg) => ({
				url: '/settings/notification/add-email',
				method: 'POST',
				body: {
					email: arg
				}
			})
		}),
		switchPushNotification: build.mutation<NotificationSettings, boolean>({
			query: (newState) => ({
				url: '/settings/switchPushNotification',
				method: 'PATCH',
				body: {
					pushEnabled: newState
				}
			})
		}),
		subscribeDevicePushNotification: build.mutation<{ message: 'Subscribed' }, SubscribeDevicePushNotification>({
			query: (arg) => ({
				url: '/notifications/push/subscribe',
				method: 'POST',
				body: arg
			})
		}),
		unsubscribeDevicePushNotification: build.mutation<void, UnsubscribeDevicePushNotification>({
			query: (arg) => ({
				url: '/notifications/push/unsubscribe',
				method: 'POST',
				body: arg
			})
		}),
		confirmEmail: build.mutation<{ email_confirmed: boolean }, { hash: string }>({
			query: ({ hash }) => ({
				url: '/auth/email/confirm',
				method: 'POST',
				body: {
					hash
				}
			})
		}),
	}),
})

// позволяет получить определенный эндпоинт и использовать его. К примеру я юзаю его в thunk saveJsonSetting так:
// dispatch(setJsonSettingsMutation({ jsonSettings, userId: userData.id }))
export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate
export const rtkApiUpdateJsonSavedData = userApi.endpoints.updateJsonSavedData.initiate
export const rtkApiLoginUser = userApi.endpoints.loginUser.initiate
export const rtkApiRegisterUser = userApi.endpoints.registerUser.initiate
export const rtkApiGetMe = userApi.endpoints.getMe.initiate
export const getTokensOnInitWithUserSettings = userApi.endpoints.getTokensOnInitWithUserSettings.initiate
export const rtkApiUpdateShelfTemplate = userApi.endpoints.updateShelfTemplate.initiate
export const rtkApiUpdateMissedTraining = userApi.endpoints.updateMissedTraining.initiate
export const rtkApiUpdateTimeSleep = userApi.endpoints.updateTimeSleep.initiate
export const rtkApiUpdateNotifications = userApi.endpoints.updateNotificationSettings.initiate
export const rtkApiAddNotificationEmail = userApi.endpoints.addNotificationEmail.initiate
export const rtkApiSetDefaultShelfTemplate = userApi.endpoints.setDefaultShelfTemplate.initiate
export const rtkApiSwitchPushNotification = userApi.endpoints.switchPushNotification.initiate
export const rtkApiSubscribeDevicePushNotification = userApi.endpoints.subscribeDevicePushNotification.initiate
export const rtkApiUnsubscribeDevicePushNotification = userApi.endpoints.unsubscribeDevicePushNotification.initiate
export const rtkApiLogout = userApi.endpoints.logout.initiate
export const { useGetUserSettingsQuery } = userApi
export const { useUpdateMissedTrainingMutation } = userApi
export const { useConfirmEmailMutation } = userApi
export const { useSetUserLangMutation } = userApi
