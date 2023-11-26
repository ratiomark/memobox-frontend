import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserWithToken, getTokensOnInitWithUserSettings } from '../api/userApi'
import { localDataService } from '@/shared/lib/helpers/common/localDataService'
import { isRefreshResponse } from '@/shared/api/helpers/checkResponse'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const initAuthData = createAsyncThunk<UserWithToken, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'user/initAuthData',
	async (_, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		const refreshToken = localDataService.getRefreshToken()
		const userId = localDataService.getUserId()

		if (!refreshToken) return rejectWithValue('Нет токена')

		// нужно чтобы rtk baseQuery взял рефреш токен, а не access токен
		localDataService.setToken(refreshToken);

		try {
			const response = await dispatch(getTokensOnInitWithUserSettings(userId)).unwrap()
			if (!isRefreshResponse(response)) {
				return rejectWithValue('Токен не валидный')
			}

			// console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
			localDataService.setToken(response.token)
			localDataService.setRefreshToken(response.refreshToken)

			return response

		} catch (err) {
			return rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения