import { rtkApi } from '@/shared/api/rtkApi'
import { CommonShelfBackendResponse, CupboardSchema } from '@/entities/Cupboard'
import { ShelfDndRepresentation, ShelfSchema } from '../types/ShelfSchema'

export const shelvesApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getShelves: build.query<ShelfSchema[], void>({
			query: () => ({
				url: '/shelves',
				method: 'GET',
			}),
		}),
		createNewShelf: build.mutation<any, string>({
			query: (title) => ({
				url: '/shelves',
				method: 'POST',
				body: {
					title,
				},
			}),
		}),
		updateShelfListOrder: build.mutation<ShelfSchema[], ShelfDndRepresentation[]>({
			query: (arg) => ({
				url: '/shelves/update-order',
				method: 'PATCH',
				body: arg,
			}),
		}),
		// getCupboardData: build.query<CupboardSchema, void>({
		// 	query: () => ({
		// 		url: '/aggregate/cupboard',
		// 		method: 'GET',
		// 	}),
		// }),
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
					...arg,
				},
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
				body: { isCollapsed: arg },
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
					...arg,
				},
			}),
			invalidatesTags: ['Shelves'],
		}),
		removeShelf: build.mutation<string, { shelfId: string, index: number }>({
			query: ({ shelfId, index }) => ({
				url: `/shelves/${shelfId}`,
				// params: { id: arg.id },
				method: 'DELETE',
				// headers: {
				// 	'Content-Type': 'application/json'
				// },
				body: {
					index,
					// shelfId: arg,
					// обновленные данные объекта
					// isCollapsed: arg.isCollapsed
					// ...arg,
				},
				// body: { isCollapsed: arg.isCollapsed }
			}),
			invalidatesTags: ['Shelves'],
		}),
	}),
})
export const rtkRemoveShelfById = shelvesApi.endpoints.removeShelf.initiate
export const updateShelfWithTag = shelvesApi.endpoints.updateShelfWithTag.initiate
export const rtkCreateNewShelf = shelvesApi.endpoints.createNewShelf.initiate
export const rtkUpdateShelfListOrder = shelvesApi.endpoints.updateShelfListOrder.initiate
export const { useGetShelvesQuery } = shelvesApi
export const { useUpdateShelfMutation } = shelvesApi
export const { useUpdateShelfWithTagMutation } = shelvesApi
export const { useUpdateCommonShelfMutation } = shelvesApi
export const { useRemoveShelfMutation } = shelvesApi
