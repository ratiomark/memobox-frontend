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
}

export const memoboxApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getCards: build.query<Card[], void>({
			query: () => ({
				url: '/cards',
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
export const memoboxGetAllCards = memoboxApi.endpoints.getCards.initiate
export const { useGetCardsQuery } = memoboxApi
export const memoboxGetShelves = memoboxApi.endpoints.getShelves.initiate
export const { useGetShelvesQuery } = memoboxApi
// export const { useGetMovieByIdBeatFilmQuery } = beatFilmMoviesApi