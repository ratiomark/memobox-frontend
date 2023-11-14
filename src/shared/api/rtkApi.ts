import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { localDataService } from '../lib/helpers/common/localDataService'
//  Определите интерфейс для ожидаемого ответа
interface RefreshResponse {
  token: string;
  accessToken: string;
}

// Функция проверки, которая утверждает, что объект соответствует интерфейсу RefreshResponse
function isRefreshResponse(object: any): object is RefreshResponse {
	return (
		object !== null &&
    typeof object === 'object' &&
    typeof object.token === 'string' &&
    typeof object.accessToken === 'string'
	);
}


const baseQuery : BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>= fetchBaseQuery({
	baseUrl: __API__,
	// credentials: 'include',
	prepareHeaders: (headers) => {
		const token = localDataService.getToken()
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}
		return headers
	}
})

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)
	// expired
	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
	console.log(result)
	if (result?.error?.status === 403) {
		console.log('sending refresh token')
		const refreshResult = await baseQuery({
			url: '/auth/refresh',
			headers: {
				'Authorization': `Bearer ${localDataService.getAccessToken()}`
			}
		}, api, extraOptions)
		
		// console.log(refreshResult)
		// const {token, accessToken} = refreshResult.data
		if (isRefreshResponse(refreshResult.data)) {
			// const user = api.getState().auth.user
			// store the new token 
			localDataService.setToken(refreshResult.data.token)
			localDataService.setAccessToken(refreshResult.data.accessToken)
			// retry the original query with new access token 
			result = await baseQuery(args, api, extraOptions)
		} 
	}

	return result
}

export const rtkApi = createApi({
	baseQuery:baseQueryWithReAuth,
	// baseQuery: baseQueryWithReAuth,
	tagTypes: ['Shelves', 'Cards'],
	endpoints: builder => ({})
})
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
