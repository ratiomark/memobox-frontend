import { rtkApi } from '@/shared/api/rtkApi';
import { CardSchema } from '../types/CardSchema';

export const cardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getCardsByShelfId: build.query<CardSchema[], string>({
			query: (id) => ({
				url: '/cards',
				method: 'GET',
				params: {
					shelf: Number(id),
				}
			}),
			// transformResponse: (response: MovieList, meta, arg) => {
			// 	const data = response.reduce((acc: MovieListIdMovie, current) => {
			// 		acc[current.id.toString()] = current
			// 		return acc
			// 	}, {})s
			// 	return data
			// },
		}),
		getBoxByShelfAndBoxId: build.query<CardSchema[], { shelfId: string, boxId: string }>({
			query: ({ shelfId, boxId }) => ({
				url: '/cards',
				method: 'GET',
				params: {
					shelf: Number(shelfId),
					box: Number(boxId)
				}
			}),
			// transformResponse: (response: MovieList, meta, arg) => {
			// 	const data = response.reduce((acc: MovieListIdMovie, current) => {
			// 		acc[current.id.toString()] = current
			// 		return acc
			// 	}, {})
			// 	return data
			// },
		}),
	}),
})
// export const getBoxesByShelfId = boxApi.endpoints.getBoxesByShelfId.initiate
// export const { useGetBoxesByShelfIdQuery } = boxApi
// export const cupboardGetShelves = cupboardApi.endpoints.getShelves.initiate
// export const { useGetBoxByShelfAndBoxIdQuery } = boxApi
// export const { useGetMovieByIdBeatFilmQuery } = beatFilmMoviesApi