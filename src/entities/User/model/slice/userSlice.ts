import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { USER_ID_LS_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'
import { User, UserSchema } from '../types/user'
import { setFeatureFlag } from '@/shared/lib/features'
import { saveJsonSettings } from '../services/saveJsonSettings'
import { JsonSettings } from '../types/JsonSettings'
import { initAuthData } from '../services/initAuthData'
import { SortColumnObject } from '../types/JsonSavedData'

const initialState: UserSchema = {
	_mounted: false
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<User>) => {
			state.authData = action.payload
			// обновляю флаги фич
			setFeatureFlag(action.payload.features)
			localStorage.setItem(USER_ID_LS_KEY, action.payload.id)
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
			state.jsonSavedData!.viewPageColumns = action.payload
		},
		reorderColumns: (state, action: PayloadAction<SortColumnObject[]>) => {
			const shelfColumn = state.jsonSavedData!.viewPageColumns.find(column => column.value === 'shelf') as SortColumnObject
			const newColumns: SortColumnObject[] = []
			newColumns.push({ ...shelfColumn, index: 0 })
			action.payload.forEach((column, index) => newColumns.push({ ...column, index: index + 1 }))
			state.jsonSavedData!.viewPageColumns = newColumns
			// state.jsonSavedData!.viewPageColumns = action.payload.map((column, index) => ({ ...column, index }));
			// return newOrder.map((id) => state.find((item) => item.id === id)!);
		},
		// setColumns
		logout: (state) => {
			state.authData = undefined
			localStorage.removeItem(USER_ID_LS_KEY)
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
			.addCase(
				initAuthData.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.authData = action.payload
					setFeatureFlag(action.payload.features)
					state._mounted = true
					// VAR: тестирую jsonSavedData как отедльное поле
					state.jsonSavedData = action.payload.jsonSavedData
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