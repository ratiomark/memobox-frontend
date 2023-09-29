import { rtkApi } from '@/shared/api/rtkApi';
import { CommonShelfBackendResponse, CupboardSchema } from '@/entities/Cupboard';
import { ShelfSchema } from '../types/ShelfSchema';


export const memoboxApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getShelves: build.query<ShelfSchema[], void>({
			query: () => ({
				url: '/shelves',
				method: 'GET'
			}),
			// transformResponse: (response: MovieList, meta, arg) => {
			// 	const data = response.reduce((acc: MovieListIdMovie, current) => {
			// 		acc[current.id.toString()] = current
			// 		return acc
			// 	}, {})
			// 	return data
			// },
		}),
		getCupboardData: build.query<CupboardSchema, void>({
			query: () => ({
				url: '/cupboard',
				method: 'GET'
			}),
		}),
		updateShelf: build.mutation<ShelfSchema, Partial<ShelfSchema>>({
			query: (arg) => ({
				url: `/shelves/${arg.id}`,
				// params: { id: arg.id },
				method: 'PATCH',
				// headers: {
				// 	'Content-Type': 'application/json'
				// },
				body: {
					// обновленные данные объекта
					// isCollapsed: arg.isCollapsed
					// ...arg,
					...arg
				}
				// body: { isCollapsed: arg.isCollapsed }
			}),
			// invalidatesTags: ['Shelves']
		}),
		updateCommonShelf: build.mutation<CommonShelfBackendResponse, boolean>({
			query: (arg) => ({
				url: '/commonShelf/isCollapsed',
				// params: { id: arg.id },
				method: 'PATCH',
				// headers: {
				// 	'Content-Type': 'application/json'
				// },
				body: { isCollapsed: arg }
				// обновленные данные объекта
				// isCollapsed: arg.isCollapsed
				// ...arg,
				// arg
				// body: { isCollapsed: arg.isCollapsed }
			}),
			// invalidatesTags: ['Shelves']
		}),
		updateShelfWithTag: build.mutation<CupboardSchema, Partial<ShelfSchema>>({
			query: (arg) => ({
				url: `/shelves/${arg.id}`,
				method: 'PATCH',
				body: {
					// ...arg,
					...arg
				}
			}),
			invalidatesTags: ['Shelves']
		}),
		removeShelf: build.mutation<void, string>({
			query: (arg) => ({
				url: '/shelves',
				// params: { id: arg.id },
				method: 'DELETE',
				// headers: {
				// 	'Content-Type': 'application/json'
				// },
				body: {
					shelfId: arg
					// обновленные данные объекта
					// isCollapsed: arg.isCollapsed
					// ...arg,
				}
				// body: { isCollapsed: arg.isCollapsed }
			}),
			invalidatesTags: ['Shelves']
		}),
	}),
})
export const memoboxGetShelves = memoboxApi.endpoints.getShelves.initiate
export const removeShelfByIdMutation = memoboxApi.endpoints.removeShelf.initiate
export const updateShelfWithTag = memoboxApi.endpoints.updateShelfWithTag.initiate
export const { useGetShelvesQuery } = memoboxApi
export const { useUpdateShelfMutation } = memoboxApi
export const { useUpdateShelfWithTagMutation } = memoboxApi
export const { useUpdateCommonShelfMutation } = memoboxApi
export const { useRemoveShelfMutation } = memoboxApi