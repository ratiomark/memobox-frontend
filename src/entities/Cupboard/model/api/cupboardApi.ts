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
			// transformResponse: (response: MovieList, meta, arg) => {
			// 	const data = response.reduce((acc: MovieListIdMovie, current) => {
			// 		acc[current.id.toString()] = current
			// 		return acc
			// 	}, {})s
			// 	return data
			// },
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
// export const { useGetMovieByIdBeatFilmQuery } = beatFilmMoviesApi