import { rtkApi } from '@/shared/api/rtkApi'
import { JsonSettings } from '../types/JsonSettings'
import { User } from '../types/user'
import { TimeSleepSettings, UserSettings } from '../types/userSettings'
import { JsonSavedData } from '../types/JsonSavedData'
import { MissedTrainingValue } from '../types/userSettings'
import { TimingBlock } from '@/shared/types/DataBlock'


interface SetJsonSettings {
	userId: string
	jsonSettings: JsonSettings
}
interface SetJsonSavedData {
	userId: string
	jsonSavedData: JsonSavedData
}

export interface UserWithToken extends User {
	token: string
	refreshToken: string
	tokenExpires: number
	user: Partial<User>
}

// type ResponseWithToken = { token: string }

export interface AuthByEmailProps {
	email: string
	password: string
}


// test comment API
const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		loginUser: build.mutation<UserWithToken, AuthByEmailProps>({
			query: (arg) => ({
				url: '/auth/email/login',
				method: 'POST',
				body: {
					...arg
				}
			})
		}),
		registerUser: build.mutation<UserWithToken, AuthByEmailProps>({
			query: (arg) => ({
				url: '/auth/email/register',
				method: 'POST',
				body: {
					...arg
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
		getMe: build.mutation<User, void>({
			query: () => ({
				url: '/auth/me',
				method: 'GET',
			})
		}),
		setJsonSavedData: build.mutation<JsonSavedData, SetJsonSavedData>({
			query: ({ userId, jsonSavedData }) => ({
				url: `/users/${userId}`,
				method: 'PATCH',
				body: {
					jsonSavedData
				}
			})
		}),
		getUserDataById: build.query<User, string>({
			query: (userId) => ({
				url: `/users/${userId}`,
				method: 'GET',
			})
		}),
		getUserTokenValid: build.query<UserWithToken, string>({
			query: (token) => ({
				url: '/auth',
				method: 'POST',
				body: {
					token
				}
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
	}),
})

// позволяет получить определенный эндпоинт и использовать его. К примеру я юзаю его в thunk saveJsonSetting так:
// dispatch(setJsonSettingsMutation({ jsonSettings, userId: userData.id }))
export const setJsonSettingsMutation = userApi.endpoints.setJsonSettings.initiate
export const setJsonSavedDataMutation = userApi.endpoints.setJsonSavedData.initiate
export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate
export const rtkApiLoginUser = userApi.endpoints.loginUser.initiate
export const rtkApiRegisterUser = userApi.endpoints.registerUser.initiate
export const rtkApiGetMe = userApi.endpoints.getMe.initiate
export const getUserTokenValid = userApi.endpoints.getUserTokenValid.initiate
export const getTokensOnInitWithUserSettings = userApi.endpoints.getTokensOnInitWithUserSettings.initiate
export const rtkApiUpdateShelfTemplate = userApi.endpoints.updateShelfTemplate.initiate
export const rtkApiUpdateTimeSleep = userApi.endpoints.updateTimeSleep.initiate
export const rtkApiSetDefaultShelfTemplate = userApi.endpoints.setDefaultShelfTemplate.initiate
export const rtkApiLogout = userApi.endpoints.logout.initiate
export const { useGetUserSettingsQuery } = userApi
export const { useUpdateMissedTrainingMutation } = userApi
