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


// test comment API
const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
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
		getUserTokenValid: build.query<{token: string}, string>({
			query: (token) => ({
				url: '/auth',
				method: 'POST',
				body: {
					token
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
