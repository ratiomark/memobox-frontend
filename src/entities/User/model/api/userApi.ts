import { rtkApi } from '@/shared/api/rtkApi'
import { JsonSettings } from '../types/JsonSettings'
import { User } from '../types/user'
import { JsonSavedData } from '../types/JsonSavedData'

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
}
type ResponseWithToken = { token: string }

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
		getUserRefreshToken: build.query<UserWithToken, string>({
			query: (token) => ({
				url: '/auth/refresh',
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
		})
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
export const getUserRefreshToken= userApi.endpoints.getUserRefreshToken.initiate
