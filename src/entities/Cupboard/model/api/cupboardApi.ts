import { rtkApi } from '@/shared/api/rtkApi';

interface Card {
	_id: string,
	index: number,
	question: string,
	answer: string,
	shelf: number,
	box: number,
	state: 'train' | 'wait'
}

interface Shelf {
	_id: string,
	index: number,
	data: {
		train: number,
		wait: number,
		all: number,
	},
	title: string,
}

interface Cupboard {
	train: number,
	wait: number,
	all: number,
	shelvesCount: number
}

export const cupboardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getCupboardData: build.query<Cupboard, void>({
			query: () => ({
				url: '/cupboard',
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
		getShelves: build.query<Shelf[], void>({
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