import { CardSchema } from '@/entities/Card';
import { CupboardSchema } from '@/entities/Cupboard';
import { ShelfSchema } from '@/entities/Shelf';
import { rtkApi } from '@/shared/api/rtkApi';
import { BoxSchema } from '../..';

export interface ShelfRepresentedByBoxes {
	[boxId: string]: CardSchema[]
}

export const boxApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getBoxesByShelfId: build.query<ShelfRepresentedByBoxes, string>({
			query: (id) => ({
				url: '/cards',
				method: 'GET',
				params: {
					shelf: id,
				}
			}),
			transformResponse: (response: CardSchema[], meta, arg) => {

				const data: ShelfRepresentedByBoxes = {}
				response.forEach(card => {
					const box = card.box.toString()
					box in data ? data[box].push(card) : data[box] = [card]
				})
				return data
			},
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
		updateBoxWithTag: build.mutation<CupboardSchema, { shelfId: string, box: Partial<BoxSchema> }>({
			query: (arg) => ({
				url: '/updateBox',
				method: 'PATCH',
				body: {
					// ...arg,
					...arg
				}
			}),
			invalidatesTags: ['Shelves']
		}),
	}),
})
export const getBoxesByShelfId = boxApi.endpoints.getBoxesByShelfId.initiate
export const { useUpdateBoxWithTagMutation} =boxApi
// export const { useGetBoxesByShelfIdQuery } = boxApi
// export const cupboardGetShelves = cupboardApi.endpoints.getShelves.initiate
// export const { useGetBoxByShelfAndBoxIdQuery } = boxApi
// export const { useGetMovieByIdBeatFilmQuery } = beatFilmMoviesApi