import { ShelfSchema } from '@/entities/Shelf';
import { rtkApi } from '@/shared/api/rtkApi';
import { CupboardSchema } from '../types/CupboardSchema';

export const cupboardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getCupboardData: build.query<CupboardSchema, void>({
			query: () => ({
				url: '/cupboard',
				// url: '/cupboard',
				method: 'GET'
			}),
			transformResponse: (response: CupboardSchema, meta, arg) => {
				// console.log(response)
				const shelves = response.shelves.map(shelf => {
					return { ...shelf, isDeleting: false }
				})
				response.shelves = shelves
				return response
			},
			providesTags: ['Shelves']
		}),
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
		getShelvesViewPage: build.query<ShelfSchema[], void>({
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
		updateShelvesOrder: build.mutation<ShelfSchema, ShelfSchema[]>({
			query: (arg) => ({
				url: '/shelves',
				// params: { id: arg.id },
				method: 'PUT',
				// headers: {

				// 	'Content-Type': 'application/json'
				// },
				body: arg
				// body: { isCollapsed: arg.isCollapsed }
			}),
			invalidatesTags: ['Shelves']
		}),
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
export const cupboardGetData = cupboardApi.endpoints.getCupboardData.initiate
export const { useGetCupboardDataQuery } = cupboardApi
export const cupboardGetShelves = cupboardApi.endpoints.getShelves.initiate
export const { useGetShelvesQuery } = cupboardApi
export const { useUpdateShelvesOrderMutation } = cupboardApi