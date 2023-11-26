// import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { rtkApiUpdateJsonSavedData, setJsonSettingsMutation } from '../api/userApi'
// import { getUserAuthData } from '../selectors/getUserAuthData'
// import { JsonSavedData } from '../types/JsonSavedData'
// import { getJsonSavedData } from '../selectors/getJsonSavedData'
// import { localDataService } from '@/shared/lib/helpers/common/localDataService'

// // createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
// export const saveJsonSavedData = createAsyncThunk<JsonSavedData, JsonSavedData, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
// 	'user/saveJsonSavedData',
// 	async (newJsonSavedData, thunkAPI) => {

// 		const { dispatch, getState, } = thunkAPI
// 		const userJsonDataFromStore = getJsonSavedData(getState())

// 		if (!userJsonDataFromStore) return thunkAPI.rejectWithValue('Нет userData')

// 		try {
// 			const response = await dispatch(rtkApiUpdateJsonSavedData({
// 				jsonSavedData: {
// 					...userJsonDataFromStore,
// 					...newJsonSavedData
// 				},
// 				userId: localDataService.getUserId()
// 			}))
// 				.unwrap() //разворачиваю в реальный результат

// 			const jsonSavedDataFromResponse = response

// 			if (!jsonSavedDataFromResponse) return thunkAPI.rejectWithValue('Нет userData')

// 			return jsonSavedDataFromResponse

// 		} catch (err) {
// 			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
// 		}
// 	}
// )

// // createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения