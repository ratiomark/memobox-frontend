import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkExtraArg } from '@/app/providers/StoreProvider'
import { RegisterByEmailProps, rtkApiRegisterUser } from '../api/userApi'
import { loginUserByEmailThunk } from './loginByEmailAndPassThunk'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'
import { analyticsIdentifyUser, analyticsTrackEvent } from '@/shared/lib/analytics'


// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const id = 'registerByEmailThunk'
export const registerByEmailThunk = createAsyncThunk<null, RegisterByEmailProps, { rejectValue: string, extra: ThunkExtraArg }>(
	'user/registerByEmailThunk',
	async ({ email, password, name }, thunkAPI) => {
		try {
			const { dispatch } = thunkAPI;
			analyticsTrackEvent('user_sign_up_started');
			dispatch(
				toastsActions.addToast({
					id,
					toast: {
						status: 'pending',
						messageLoading: t('toast:register.messageLoading'),
						messageError: t('toast:messageError'),
						messageSuccess: t('toast:register.messageSuccess'),
						contentError: t('toast:logout.contentError'),
					},
				})
			)
			const response = await dispatch(
				rtkApiRegisterUser({ email, password, name })
			).unwrap()

			if (!response.id) {
				// Если ответ не соответствует ожидаемому, выбрасываем ошибку
				throw new Error('Unexpected response from server');
			}
			analyticsIdentifyUser(response.id, {
				email,
				firstName: name,
				id: response.id
			})
			analyticsTrackEvent('user_signed_up')
			dispatch(
				toastsActions.updateToastById({
					id,
					toast: { status: 'success' }
				}))
			await dispatch(loginUserByEmailThunk({ email, password }));
			return null;

		} catch (error) {
			thunkAPI.dispatch(
				toastsActions.updateToastById({
					id,
					toast: { status: 'error' }
				}))
			if (isErrorWithStatusAndData(error)) {
				analyticsTrackEvent('user_sign_up_failed', {
					error: {
						status: error.status,
						message: error.data.message,
					},
					email,
				});
				// можно использовать error.data для получения тела ответа сервера, если сервер отправляет полезные данные об ошибке
				console.log('Ошибка при регистрации:', error.status, error.data);
			} else if (isErrorWithStatusAndError(error)) {
				analyticsTrackEvent('user_sign_up_failed', {
					error: {
						status: error.status,
						message: error.error,
					},
					email,
				});
				console.log('Ошибка при регистрации:', error);
			} else {
				analyticsTrackEvent('user_sign_up_failed', {
					error,
					email,
				});
				console.log('Неизвестная ошибка при регистрации', error);
			}
			return thunkAPI.rejectWithValue('error on login');
		}
	}
);

interface CustomError {
	status?: number;
	error?: string;
}
interface CustomErrorFromServer {
	status?: number;
	data: {
		message: string;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorWithStatusAndError(error: any): error is CustomError {
	return 'status' in error && 'error' in error;
}
function isErrorWithStatusAndData(error: any): error is CustomErrorFromServer {
	return 'status' in error && 'data' in error;
}

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