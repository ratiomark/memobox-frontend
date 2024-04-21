import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { rtkApiUpdateJsonSavedData, rtkApiUpdateJsonSettings } from '../api/userApi'
import { getUserAuthData } from '../selectors/getUserAuthData'
import { JsonSavedData } from '../types/JsonSavedData'
import { getJsonSavedData } from '../selectors/getJsonSavedData'
import { localDataService } from '@/shared/lib/helpers/common/localDataService'
import { JsonSettings } from '../types/JsonSettings'
import { getJsonSettings } from '../..'
import { getUserJsonSettings } from '../selectors/getJsonSettings'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const updateJsonSettingsThunk = createAsyncThunk<JsonSettings, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'user/updateJsonSettings',
	async (_, thunkAPI) => {

		const { dispatch, getState, } = thunkAPI
		const userData = getUserAuthData(getState())
		const userJsonSettingsStore = getUserJsonSettings(getState())
		console.log('userJsonSettingsStore', userJsonSettingsStore)
		if (!userData) return thunkAPI.rejectWithValue('Нет userData')
		if (!userJsonSettingsStore) return thunkAPI.rejectWithValue('Нет userData')

		try {
			const response = await dispatch(rtkApiUpdateJsonSettings({
				jsonSettings: {
					...userJsonSettingsStore,
				},
				userId: localDataService.getUserId(),
			}))
				.unwrap() //разворачиваю в реальный результат


			if (!response) return thunkAPI.rejectWithValue('Нет userData')

			return response

		} catch (err) {
			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)
