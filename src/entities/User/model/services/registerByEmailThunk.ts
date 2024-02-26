import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkExtraArg } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { RegisterByEmailProps, UserWithToken, rtkApiRegisterUser, } from '../api/userApi'
import { userActions } from '../slice/userSlice'
import { loginUserByEmailThunk } from './loginByEmailAndPassThunk'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const registerByEmailThunk = createAsyncThunk<null, RegisterByEmailProps, { rejectValue: string, extra: ThunkExtraArg }>(
	'user/registerByEmailThunk',
	async ({ email, password, name }, thunkAPI) => {
		try {
			const { dispatch } = thunkAPI;

			// в случае успеха ничего не возращает, status 201 - Created
			await dispatch(rtkApiRegisterUser({ email, password, name })).unwrap();
			
			// Нет необходимости проверять response.status здесь, так как ошибки будут перехвачены в блоке catch

			await dispatch(loginUserByEmailThunk({ email, password }));
			return null;
		} catch (error) {
			// Обработка ошибок
			// Если ошибка содержит структуру, определённую RTK Query (например, error.status), можно использовать её
			if (isErrorWithStatus(error)) {
				console.log('Ошибка при регистрации:', error.status, error.data);
				// можно использовать error.data для получения тела ответа сервера, если сервер отправляет полезные данные об ошибке
			}
			else {
				console.log('Неизвестная ошибка при регистрации', error);
			}
			return thunkAPI.rejectWithValue('error on login');
		}
	}
);

interface CustomError {
	status?: number;
	data?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorWithStatus(error: any): error is CustomError {
	return 'status' in error;
}

// export const registerByEmailThunk = createAsyncThunk<null, RegisterByEmailProps, { rejectValue: string, extra: ThunkExtraArg }>(
// 	'user/registerByEmailThunk',
// 	async ({ email, password, name }, thunkAPI) => {

// 		try {
// 			const { dispatch } = thunkAPI
// 			const response = await dispatch(rtkApiRegisterUser({ email, password, name })).unwrap()

// 			console.log('Регистрация. Ответ сервера:   ', response)
// 			if (!response.status!==201) {
// 				console.log('ОШИБКА ПРИ РЕГИСТРАЦИИ  ', response)
// 				throw new Error()
// 			}
// 			// сейчас сетает null, так как после регистрации сервер не возвращает ничего
// 			await dispatch(loginUserByEmailThunk({ email, password }))
// 			// thunkAPI.dispatch(userActions.setAuthData(response))
// 			return null

// 		} catch (err) {
// 			return thunkAPI.rejectWithValue(i18n.t('error on login'))
// 		}
// 	}
// )

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