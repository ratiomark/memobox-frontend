import i18n from '@/shared/config/i18n/i18n'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkExtraArg } from '@/app/providers/StoreProvider'
import { LoginByEmailProps, UserWithToken, rtkApiLoginUser, } from '../api/userApi'
import { userActions } from '../slice/userSlice'
import { isRefreshResponse } from '@/shared/api/helpers/checkResponse'
import { localDataService } from '@/shared/lib/helpers/common/localDataService'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'
import { indexedConfigService } from '@/shared/lib/helpers/common/indexedDBService'
import { analyticsIdentifyUser, analyticsTrackEvent } from '@/shared/lib/analytics'
// import posthog from 'posthog-js'


export const id = 'loginByEmailThunk'
export const loginUserByEmailThunk = createAsyncThunk<UserWithToken, LoginByEmailProps, { rejectValue: string, extra: ThunkExtraArg }>(
	'user/loginByEmailAndPassThunk',
	async ({ email, password }, thunkAPI) => {

		try {
			const { dispatch } = thunkAPI
			analyticsTrackEvent('user_sign_in_started');
			dispatch(
				toastsActions.addToast({
					id,
					toast: {
						status: 'pending',
						messageLoading: t('toast:login.messageLoading'),
						messageError: t('toast:messageError'),
						messageSuccess: t('toast:login.messageSuccess'),
						contentError: t('toast:logout.contentError'),
					},
				})
			)
			const response = await dispatch(rtkApiLoginUser({ email, password })).unwrap()

			if (!isRefreshResponse(response)) {
				return thunkAPI.rejectWithValue(i18n.t('error on login'))
			}

			dispatch(
				toastsActions.updateToastById({
					id,
					toast: { status: 'success' }
				}))

			// console.log('Login response', response)
			localDataService.setToken(response.token)
			localDataService.setRefreshToken(response.refreshToken)
			localDataService.setUserId(response.user.id)
			void indexedConfigService.setConfig('token', response.token)
			void indexedConfigService.setConfig('refreshToken', response.refreshToken)
			thunkAPI.dispatch(userActions.setAuthData(response))
			thunkAPI.dispatch(userActions.setProfileData(response.user))
			thunkAPI.dispatch(userActions.setJsonSavedData(response.user.jsonSavedData))
			thunkAPI.dispatch(userActions.setJsonSettings(response.user.jsonSettings))
			analyticsIdentifyUser(response.user.id, {
				email: response.user.email,
				email_verified: response.user.emailVerified,
				timezone: response.user.timezone,
				firstName: response.user.firstName,
				id: response.user.id,
			})
			analyticsTrackEvent('user_singed_in', {
				email,
			});
			return response

		} catch (error) {
			thunkAPI.dispatch(
				toastsActions.updateToastById({
					id,
					toast: { status: 'error' }
				}))
			if (isErrorWithStatusAndData(error)) {
				analyticsTrackEvent('user_sign_in_failed', {
					error: {
						status: error.status,
						message: error.data.message,
					},
					email,
				});
				// можно использовать error.data для получения тела ответа сервера, если сервер отправляет полезные данные об ошибке
				console.log('Ошибка при регистрации:', error.status, error.data);
			} else if (isErrorWithStatusAndError(error)) {
				analyticsTrackEvent('user_sign_in_failed', {
					error: {
						status: error.status,
						message: error.error,
					},
					email,
				});
				console.log('Ошибка при регистрации:', error);
			} else {
				analyticsTrackEvent('user_sign_in_failed', {
					error,
					email,
				});
				console.log('Неизвестная ошибка при регистрации', error);
			}
			return thunkAPI.rejectWithValue('error on login');
		}
		// } catch (err) {
		// 	thunkAPI.dispatch(
		// 		toastsActions.updateToastById({
		// 			id,
		// 			toast: { status: 'error' }
		// 		}))
		// 	return thunkAPI.rejectWithValue(i18n.t('error on login'))
		// }
	}
)


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