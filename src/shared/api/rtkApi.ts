import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { localDataService } from '../lib/helpers/common/localDataService'
import { isRefreshResponse } from './helpers/checkResponse';
import { TAG_CUPBOARD_PAGE, TAG_TRASH_PAGE, TAG_VIEW_PAGE } from './const/tags';

const getAuthToken = () => localDataService.getToken();
const getUserLang = () => localDataService.getLanguage()

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({
	baseUrl:
		import.meta.env.DEV
			? __API__
			: __API__BACK,
	prepareHeaders: (headers) => {
		const token = getAuthToken(); // вызываю так, чтобы не было замыкания
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		headers.set('Accept-Language', getUserLang());
		headers.set('x-custom-lang', getUserLang());
		return headers;
	}
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result?.error?.status === 401) {
		localDataService.setToken(localDataService.getRefreshToken());
		const refreshResult = await baseQuery({
			url: '/auth/refresh',
			method: 'POST',
			// Вот это работать не будет, поскольку prepareHeaders перезапишет этот хедер
			// headers: {
			// 	'Authorization': `Bearer ${localDataService.getRefreshToken()}`
			// }
		}, api, extraOptions);

		if (isRefreshResponse(refreshResult.data)) {
			localDataService.setToken(refreshResult.data.token);
			localDataService.setRefreshToken(refreshResult.data.refreshToken);
			// Повторный запрос с обновленным токеном
			result = await baseQuery(args, api, extraOptions);
		}
	}

	return result;
};

export const rtkApi = createApi({
	baseQuery: baseQueryWithReAuth,
	tagTypes: ['Shelves', TAG_CUPBOARD_PAGE, TAG_VIEW_PAGE, TAG_TRASH_PAGE],
	endpoints: builder => ({})
});

// const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({
// 	baseUrl: __API__,
// 	prepareHeaders: (headers, api) => {
// 		if (api.extra?.newToken) {
// 			// console.log('baseQuery использует новый токен')
// 			headers.set('Authorization', `Bearer ${api.extra.newToken}`)
// 			return headers
// 		}
// 		const token = localDataService.getToken()
// 		if (token) {
// 			headers.set('Authorization', `Bearer ${token}`)
// 		}
// 		return headers
// 	}
// })

// const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
// 	let result = await baseQuery(args, api, extraOptions)
// 	if (result?.error?.status === 401) {
// 		// if (result?.error?.data?.message === 'expired') {
// 		// console.log('ошибка 401, попытка получить новые токены')
// 		const refreshResult = await baseQuery({
// 			url: '/auth/refresh',
// 			method: 'POST',
// 		}, { ...api, extra: { newToken: localDataService.getRefreshToken() } }, extraOptions)
// 		// prepareHeaders: (headers) => {
// 		// 	headers.set('Authorization', `Bearer ${localDataService.getRefreshToken()}`)
// 		// 	return headers
// 		// },
// 		// headers: {
// 		// 'Authorization': `Bearer ${localDataService.getRefreshToken()}`
// 		// }
// 		// })
// 		// }, api, extraOptions)
// 		// const {token, accessToken} = refreshResult.data
// 		// console.log('проверка токенов')
// 		// console.log(refreshResult)
// 		if (isRefreshResponse(refreshResult.data)) {
// 			// console.log('новые токены получены')
// 			localDataService.setToken(refreshResult.data.token)
// 			localDataService.setRefreshToken(refreshResult.data.refreshToken)
// 			result = await baseQuery(args, {
// 				...api,
// 				extra: {
// 					newToken: refreshResult.data.token,
// 				}
// 			}, extraOptions)
// 		}
// 	}

// 	return result
// }

// export const rtkApi = createApi({
// 	baseQuery: baseQueryWithReAuth,
// 	tagTypes: ['Shelves', 'Cards'],
// 	endpoints: builder => ({})
// })


// export const rtkApi = createApi({
// 	// уникальное имя для сервиса, который будет встроенн в стор
// 	reducerPath: 'myApi',
// 	tagTypes: ['Shelves', 'Cards'],
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: __API__,
// 		// baseUrl: __API__BACK,
// 		// функция интерцептор, которая ?(будет добавлять соответствующий хедер в наш конфиг)?
// 		prepareHeaders: (headers) => {
// 			// const token = localStorage.getItem(KEY_USER_ID_LOCAL_STORAGE) || ''
// 			// if (token) {
// 			// добавляем поле Authorization в хедеры, потому что наш сервер использует этот заголовок как факт наличия авторизации
// 			headers.set('Authorization', localDataService.getToken())
// 			// }
// 			return headers
// 		}
// 	}),
// 	endpoints: (build) => ({})
// 	// обычно указывают эндпоинты в том же месте где создают API, но я хочу сделать так, чтобы эндпоинты инджектились асинхроно снаружи, тогда когда это требуется. То есть я разбиваю API на такие же чанки как и асинхронную подгрузку редьюсеров. Обычный вариант ниже
// 	// endpoints: (build) => ({
// 	// 	getPokemonById: build.query<Pokemon, string>({
// 	// 		query: (id) => `pokemon/${id}`
// 	// 	})
// 	// }),
// })
