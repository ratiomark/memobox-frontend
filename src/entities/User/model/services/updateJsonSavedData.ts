import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { rtkApiUpdateJsonSavedData } from '../api/userApi'
import { getUserAuthData } from '../selectors/getUserAuthData'
import { JsonSavedData } from '../types/JsonSavedData'
import { getJsonSavedData } from '../selectors/getJsonSavedData'
import { localDataService } from '@/shared/lib/helpers/common/localDataService'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const updateJsonSavedDataThunk = createAsyncThunk<JsonSavedData, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'user/updateJsonSavedDataThunk',
	async (_, thunkAPI) => {

		const { dispatch, getState, } = thunkAPI
		const userData = getUserAuthData(getState())
		const userJsonDataFromStore = getJsonSavedData(getState())

		if (!userData) return thunkAPI.rejectWithValue('Нет userData')

		try {
			const response = await dispatch(rtkApiUpdateJsonSavedData({
				jsonSavedData: {
					...userJsonDataFromStore,
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
