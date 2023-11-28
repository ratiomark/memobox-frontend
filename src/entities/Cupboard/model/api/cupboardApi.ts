import { ShelfSchema } from '@/entities/Shelf'
import { rtkApi } from '@/shared/api/rtkApi'
import { CupboardSchema } from '../types/CupboardSchema'
import { TAG_CUPBOARD_PAGE } from '@/shared/api/const/tags'

export const cupboardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getCupboardData: build.query<CupboardSchema, void>({
			query: () => ({
				url: '/aggregate/cupboard',
				method: 'GET',
			}),
			// transformResponse: (response: CupboardSchema, meta, arg) => {
			// 	// console.log(response)
			// 	const shelves = response.shelves.map((shelf) => {
			// 		return {
			// 			...shelf,
			// 			isDeleting: false,
			// 			isDeleted: false,
			// 			// deletingRequestStatus: 'idle' as RequestStatusType
			// 		}
			// 	})
			// 	response.shelves = shelves
			// 	return response
			// },
			providesTags: [TAG_CUPBOARD_PAGE],
		}),
		restoreAllShelves: build.mutation<ShelfSchema[], void>({
			query: () => ({
				url: '/restoreAllShelves',
				method: 'POST',
			}),
		}),


		// updateShelvesOrder: build.mutation<ShelfSchema, ShelfSchema[]>({
		// 	query: (arg) => ({
		// 		url: '/shelves',
		// 		// params: { id: arg.id },
		// 		method: 'PUT',
		// 		// headers: {

		// 		// 	'Content-Type': 'application/json'
		// 		// },
		// 		body: arg
		// 		// body: { isCollapsed: arg.isCollapsed }
		// 	}),
		// 	invalidatesTags: ['Shelves']
		// }),
		// getMovieByIdBeatFilm: build.query<MovieSchema | undefined, string>({
		// 	query: (id) => ({
		// 		url: 'https://api.nomoreparties.co/beatfilm-movies',
		// 		method: 'GET'
		// 	}),
		// 	transformResponse: (response: MovieList, meta, arg) => {
		// 		// arg
		// 		console.log(meta)
		// 		const res = response.find(item => item.id.toString() === arg)
		// 		return res
		// 	},
		// }),
	}),
})
export const rtkApiGetCupboard = cupboardApi.endpoints.getCupboardData.initiate
export const { useGetCupboardDataQuery } = cupboardApi
// export const updateShelfListOrder = cupboardApi.endpoints.updateShelfListOrder.initiate
// export const restoreAllShelves = cupboardApi.endpoints.restoreAllShelves.initiate
// export const { useUpdateShelvesOrderMutation } = cupboardApi
