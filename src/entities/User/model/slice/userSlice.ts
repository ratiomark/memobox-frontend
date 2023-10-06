import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { KEY_USER_ID_LOCAL_STORAGE, KEY_USER_LOCAL_STORAGE } from '@/shared/const/localStorage'
import { User, UserSchema } from '../types/user'
import { setFeatureFlag } from '@/shared/lib/features'
import { saveJsonSettings } from '../services/saveJsonSettings'
import { JsonSettings } from '../types/JsonSettings'
import { initAuthData } from '../services/initAuthData'
import { JsonSavedData, SortColumnObject } from '../types/JsonSavedData'
import { updateJsonSavedData } from '../..'
import { jsonSavedDataColumnsMock } from '../mockData/jsonSavedDataMock'

const initialState: UserSchema = {
	_mounted: false,
	jsonSavedData: {
		viewPageCardRowsCount: 2,
		commonShelfCollapsed: true,
		shelfNamesList: [],
		viewPageColumns: jsonSavedDataColumnsMock,
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
		setAuthData: (state, action: PayloadAction<User>) => {
			state.authData = action.payload
			// обновляю флаги фич
			setFeatureFlag(action.payload.features)
			localStorage.setItem(KEY_USER_ID_LOCAL_STORAGE, action.payload.id)
			state._mounted = true
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
		// setColumns
		logout: (state) => {
			state.authData = undefined
			localStorage.removeItem(KEY_USER_ID_LOCAL_STORAGE)
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				saveJsonSettings.fulfilled,
				(state, action: PayloadAction<JsonSettings>) => {
					if (state.authData) {
						state.authData.jsonSettings = action.payload
					}

				})
			// .addCase(
			// 	updateJsonSavedData.fulfilled,
			// 	(state, action: PayloadAction<JsonSavedData>) => {
			// 		// if(action.payload)
			// 			state.jsonSavedData = action.payload.jsonSavedData 
			// 	})

			.addCase(
				initAuthData.fulfilled,
				(state, action: PayloadAction<User>) => {
					const {
						jsonSavedData,
						userSettings,
						...otherData
					} = action.payload
					state.authData = { ...otherData }
					setFeatureFlag(action.payload.features)
					state._mounted = true
					if (jsonSavedData) {
						state.jsonSavedData = jsonSavedData
					}
					state.userSettings = userSettings
				})
			.addCase(
				initAuthData.rejected,
				(state) => {
					state._mounted = true
				})
	}
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice