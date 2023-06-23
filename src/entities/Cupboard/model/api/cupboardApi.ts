import { ShelfSchema } from '@/entities/Shelf';
import { rtkApi } from '@/shared/api/rtkApi';
import { CupboardSchema } from '../types/CupboardSchema';

export const cupboardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getCupboardData: build.query<CupboardSchema, void>({
			query: () => ({
				url: '/cupboard',
				method: 'GET'
			}),
			transformResponse: (response: CupboardSchema, meta, arg) => {
				const shelves = response.shelves.map(shelf => {
					return { ...shelf, isDeleting: false }
				})
				response.shelves = shelves
				return response
			},
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