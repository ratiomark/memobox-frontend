import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setFeatureFlag } from '@/shared/lib/features'
import { saveJsonSettings } from '../services/saveJsonSettings'
import { JsonSettings } from '../types/JsonSettings'
import { initAuthData } from '../services/initAuthDataThunk'
import { JsonSavedData, SortColumnObject } from '../types/JsonSavedData'
import { UserSchema } from '../types/user'
import { DayByDayTimeSleepData, MissedTrainingValue, NotificationSettings, TimeSleepDataObject, UserSettings } from '../types/userSettings'
import { jsonSavedDataColumnsMock } from '../mockData/jsonSavedDataMock'
import { UserWithToken } from '../api/userApi'
import { localDataService } from '@/shared/lib/helpers/common/localDataService'
import { TimingBlock } from '@/shared/types/DataBlock'
import { daysOfWeek } from '../const/daysOfWeek'
import { updateJsonSavedDataThunk } from '../services/updateJsonSavedData'
import { updateNotificationSettingsThunk } from '../services/userSettings/updateNotificationThunk'
import { updateMissedTrainingThunk } from '../services/userSettings/updateMissedTrainingThunk'

const initialState: UserSchema = {
	_mounted: false,
	userSettingsAwaitingResponseObject: {
		notifications: false,
		timeSleep: false,
		missedTraining: false,
		shelfTemplate: false,
	},
	jsonSavedData: {
		viewPageCardRowsCount: 2,
		commonShelfCollapsed: true,
		shelfNamesList: [],
		viewPageColumns: jsonSavedDataColumnsMock,
	},
	userProfileData: {
		email: '',
		firstName: '',
		emailVerified: false,
		id: '',
		subscriptionExpiresAt: 0,
		subscriptionType: 'none',
	},
	help: `jsonCommonSettings - общие данные, например была ли посещена страница Х, видел ли окно Y
userSettings - настройки системы, время сна, уведомления и т.д. В общем, все что живет на странице "настройки"
jsonSavedData - данные по UI:
- Развернута ли общая полка
- массив полок в формате [{title: 'название полки', isCollapsed: true/false}]
- количество строк на странице обзора в таблице карточек
- и т.д.`
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<UserWithToken>) => {
			state.authData = { id: action.payload.user.id }
			// обновляю флаги фич
			setFeatureFlag(action.payload.user.features)
			// localDataService.setToken(action.payload[KEY_USER_TOKEN_LOCAL_STORAGE])
			// localDataService.setRefreshToken(action.payload[KEY_USER_REFRESH_TOKEN_LOCAL_STORAGE])
			state._mounted = true
		},
		setProfileData: (state, action: PayloadAction<UserWithToken['user']>) => {
			state.userProfileData = action.payload
		},
		// 
		setJsonSavedData: (state, action: PayloadAction<JsonSavedData>) => {
			state.jsonSavedData = action.payload
		},
		updateJsonSavedData: (state, action: PayloadAction<Partial<JsonSavedData>>) => {
			state.jsonSavedData = { ...state.jsonSavedData, ...action.payload }
		},
		createCopyOfJsonSavedData: (state) => {
			state.jsonSavedDataOriginal = state.jsonSavedData
		},
		returnJsonSavedDataToOriginalState: (state) => {
			if (state.jsonSavedDataOriginal) {
				state.jsonSavedData = state.jsonSavedDataOriginal
			}
		},
		setJsonSettings: (state, action: PayloadAction<JsonSettings>) => {
			state.jsonCommonSettings = action.payload
		},
		// VAR: тестирую jsonSavedData как отедльное поле
		setColumn: (state, action: PayloadAction<SortColumnObject>) => {
			if (state.jsonSavedData) {
				const columns = [...state.jsonSavedData.viewPageColumns]
				const columnsFiltered = columns.filter(column => {
					return column.value !== action.payload.value
				})
				columnsFiltered.push(action.payload)
				columnsFiltered.sort((a, b) => a.index - b.index)
				state.jsonSavedData.viewPageColumns = columnsFiltered.sort((a, b) => a.index - b.index)
				// state.jsonSavedData.viewPageColumns = [...columnsFiltered, action.payload]
			}
		},
		setColumns: (state, action: PayloadAction<SortColumnObject[]>) => {
			state.jsonSavedData.viewPageColumns = action.payload
		},
		setViewPageCardRowsCount: (state, action: PayloadAction<number | string>) => {
			state.jsonSavedData.viewPageCardRowsCount = action.payload
		},
		reorderColumns: (state, action: PayloadAction<SortColumnObject[]>) => {
			// const shelfColumn = state.jsonSavedData.viewPageColumns[0] as SortColumnObject
			const newColumns: SortColumnObject[] = [state.jsonSavedData.viewPageColumns[0]]
			// newColumns.push({ ...shelfColumn, index: 0 })
			action.payload.forEach((column, index) => newColumns.push({ ...column, index: index + 1 }))
			state.jsonSavedData.viewPageColumns = newColumns
			// state.jsonSavedData!.viewPageColumns = action.payload.map((column, index) => ({ ...column, index }));
			// return newOrder.map((id) => state.find((item) => item.id === id)!);
		},
		// settings
		setSettingsAwaitingResponse(state, action: PayloadAction<{
			settings: keyof UserSettings,
			isLoading: boolean
		}>) {
			state.userSettingsAwaitingResponseObject[action.payload.settings] = action.payload.isLoading
		},
		setSettingsIsLoading: (state, action: PayloadAction<boolean>) => {
			state.userSettingsIsLoading = action.payload
		},
		setSettings: (state, action: PayloadAction<UserSettings>) => {
			state.userSettings = action.payload
		},
		setDayByDayTimeSleepDataInitial: (state, action: PayloadAction<TimeSleepDataObject>) => {
			if (state.userSettings?.timeSleep && !state.userSettings?.timeSleep.dayByDayTimeSleepData) {
				const dayByDayTimeSleepData = {} as DayByDayTimeSleepData
				daysOfWeek.forEach(day => {
					dayByDayTimeSleepData[day] = action.payload
				})
				state.userSettings.timeSleep.dayByDayTimeSleepData = dayByDayTimeSleepData
			}
		},
		setSettingsMissedTraining: (state, action: PayloadAction<MissedTrainingValue>) => {
			if (state.userSettings) {
				state.userSettings.missedTraining = action.payload
			}
		},
		setSettingsShelfTemplate: (state, action: PayloadAction<TimingBlock[]>) => {
			if (state.userSettings) {
				state.userSettings.shelfTemplate = action.payload
			}
		},
		// 
		logout: (state) => {
			state.authData = undefined
			localDataService.logout()
			// localStorage.removeItem(KEY_USER_ID_LOCAL_STORAGE)
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				saveJsonSettings.fulfilled,
				(state, action: PayloadAction<JsonSettings>) => {
					state.jsonCommonSettings = action.payload
				})
			.addCase(
				updateJsonSavedDataThunk.fulfilled,
				(state, action: PayloadAction<JsonSavedData>) => {
					state.jsonSavedData = action.payload
					state.jsonSavedDataOriginal = action.payload
				})
			.addCase(
				updateNotificationSettingsThunk.fulfilled,
				(state, action: PayloadAction<NotificationSettings>) => {
					state.userSettings!.notifications = action.payload
				})
			.addCase(
				updateMissedTrainingThunk.fulfilled,
				(state, action: PayloadAction<MissedTrainingValue>) => {
					state.userSettings!.missedTraining = action.payload
				})
			// .addCase(
			// 	updateJsonSavedData.fulfilled,
			// 	(state, action: PayloadAction<JsonSavedData>) => {
			// 		// if(action.payload)
			// 			state.jsonSavedData = action.payload.jsonSavedData 
			// 	})

			.addCase(
				initAuthData.fulfilled,
				(state, action: PayloadAction<UserWithToken>) => {
					const {
						user,
						...otherData
					} = action.payload
					state.authData = { id: user.id }
					// setFeatureFlag(action.payload.features)
					state.jsonSavedData = user.jsonSavedData!
					state.jsonCommonSettings = user.jsonSettings!
					state._mounted = true
				})
			// .addCase(
			// 	initAuthData.fulfilled,
			// 	(state, action: PayloadAction<UserWithToken>) => {
			// 		const {
			// 			user,
			// 			...otherData
			// 		} = action.payload
			// 		state.authData = {
			// 			...otherData,
			// 			email: user.email!,
			// 			firstName: user.firstName!
			// 		}
			// 		// setFeatureFlag(action.payload.features)
			// 		state.jsonSavedData = user.jsonSavedData!
			// 		state.jsonCommonSettings = user.jsonSettings!
			// 		state._mounted = true
			// 	})
			.addCase(
				initAuthData.rejected,
				(state) => {
					state._mounted = true
				})
	}
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice