import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserWithToken,  getUserRefreshToken,  getUserTokenValid } from '../api/userApi'
import { localDataService } from '@/shared/lib/helpers/common/localDataService'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const initAuthData = createAsyncThunk<UserWithToken, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'user/initAuthData',
	async (_, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		const userToken = localDataService.getAccessToken()
		// const userToken = localDataService.getToken()
		if (!userToken) return rejectWithValue('Нет токена')
		try {
			const response = await dispatch(getUserRefreshToken(userToken)).unwrap() //разворачиваю в реальный результат
			// const response = await dispatch(getUserTokenValid(userToken)).unwrap() //разворачиваю в реальный результат
			console.log('Проверка токена. Ответ сервера:   ', response)
			if (!response.token) {
				return rejectWithValue('Токен не валидный')
			}
			if (!response.jsonSavedData) {
				console.log('jsonSavedData не получен')
			}
			if (!response.jsonSettings) {
				console.log('jsonSettings не получен')
			}
			return response

		} catch (err) {
			return rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения