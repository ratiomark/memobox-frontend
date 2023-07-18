import { rtkApi } from '@/shared/api/rtkApi';
import { CupboardSchema } from '@/entities/Cupboard';
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
		updateShelfWithTag: build.mutation<ShelfSchema, Partial<ShelfSchema>>({
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
			invalidatesTags: ['Shelves']
		}),
	}),
})
export const memoboxGetShelves = memoboxApi.endpoints.getShelves.initiate
export const { useGetShelvesQuery } = memoboxApi
export const { useUpdateShelfMutation } = memoboxApi
export const { useUpdateShelfWithTagMutation } = memoboxApi