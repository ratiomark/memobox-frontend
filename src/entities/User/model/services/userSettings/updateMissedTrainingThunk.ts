import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { rtkApiUpdateMissedTraining } from '../../api/userApi'
import { getJsonSettings } from '../../selectors/getJsonSettings'
import { getUserAuthData } from '../../selectors/getUserAuthData'
import { MissedTrainingValue } from '../../types/userSettings'

export const updateMissedTrainingThunk = () => { }
// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
// export const updateMissedTrainingThunk = createAsyncThunk<MissedTrainingValue, MissedTrainingValue, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
// 	'user/updateMissedTrainingThunk',
// 	async (missedTraining, thunkAPI) => {

// 		const { dispatch, getState, } = thunkAPI
// 		const userData = getUserAuthData(getState())
// 		const currentUserSettings = getJsonSettings(getState())

// 		if (!userData) return thunkAPI.rejectWithValue('Нет userData')

// 		try {
// 			const response = await dispatch(rtkApiUpdateMissedTraining({ missedTraining })).unwrap() //разворачиваю в реальный результат

// 			// const jsonSettingsFromResponse = response.jsonSettings

// 			// if (!jsonSettingsFromResponse) return thunkAPI.rejectWithValue('Нет userData')

// 			return response.missedTraining

// 		} catch (err) {
// 			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
// 		}
// }
// )

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения