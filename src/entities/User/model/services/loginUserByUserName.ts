import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkExtraArg } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { LoginByUserNameProps, UserWithToken, loginUser, } from '../api/userApi'
import { userActions } from '../slice/userSlice'


// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const loginUserByUserName = createAsyncThunk<UserWithToken, LoginByUserNameProps, { rejectValue: string, extra: ThunkExtraArg }>(
	'user/loginByUserName',
	async ({ username, password }, thunkAPI) => {

		try {
			const { dispatch } = thunkAPI
			const response = await dispatch(loginUser({ username, password })).unwrap()

			if (!response.token) {
				throw new Error()
			}

			thunkAPI.dispatch(userActions.setAuthData(response))

			return response

		} catch (err) {
			return thunkAPI.rejectWithValue(i18n.t('error on login'))
		}
	}
)

// Вообще внутри thunkAPI находятся разные приколюхи, например dispatch, чтобы вызвать какой нибудь экш или getState чтобы получить акутально состояние стейта. По умолчанию, если я что-то возвращаю из createAsyncThunk, то это оборачивается в fulfillWithValue, именно таким образом thunk автоматически пробрасывает значения в slice

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения

// const fetchUserByUserName = createAsyncThunk<User, LoginByUserNameProps>(
// 	'login/loginByUserName',
// 	async ({ username, password }, thunkAPI) => {
// 		const response = await axios.post('http://localhost:8000/login', { username, password })
// 		return null
// 	}
// )

// axios может принимать не деструктурированный объект
// const fetchUserByUserName = createAsyncThunk<User, LoginByUserNameProps>(
// 	'login/loginByUserName',
// 	async (authData, thunkAPI) => {
// 		const response = await axios.post('http://localhost:8000/login', authData)
// 		return null
// 	}
// )