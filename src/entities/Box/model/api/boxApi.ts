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
					const box = card.boxIndex.toString()
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
		updateBoxWithTag: build.mutation<BoxSchema, Partial<BoxSchema>>({
			query: (box) => ({
				url: `/boxes/${box.id}`,
				method: 'PATCH',
				body: {
					// ...box,
					...box
				}
			}),
			// invalidatesTags: ['Shelves']
		}),
		deleteBoxFromShelf: build.mutation<BoxSchema[], { shelfId: string, index: number, boxId: string }>({
			query: (arg) => ({
				url: `/boxes/${arg.boxId}`,
				method: 'DELETE',
				body: {
					// ...arg,
					...arg
				}
			}),
			// invalidatesTags: ['Shelves']
		}),
		deleteBoxFromTrash: build.mutation<string, { boxId: string }>({
			query: ({ boxId }) => ({
				url: `boxes/final/${boxId}`,
				method: 'DELETE',
			}),
		}),
		// updateBoxWithTag: build.mutation<CupboardSchema, { shelfId: string, box: Partial<BoxSchema> }>({
		// 	query: (arg) => ({
		// 		url: `/boxes/${arg.box.id}`,
		// 		method: 'PATCH',
		// 		body: {
		// 			// ...arg,
		// 			...arg.box
		// 		}
		// 	}),
		// 	// invalidatesTags: ['Shelves']
		// }),
	}),
})
export const getBoxesByShelfId = boxApi.endpoints.getBoxesByShelfId.initiate
export const { useUpdateBoxWithTagMutation } = boxApi
export const updateBoxWithTag = boxApi.endpoints.updateBoxWithTag.initiate
export const rtkApiDeleteBoxFromShelf = boxApi.endpoints.deleteBoxFromShelf.initiate
export const rtkApiDeleteBoxFromTrash = boxApi.endpoints.deleteBoxFromTrash.initiate
// export const { useGetBoxesByShelfIdQuery } = boxApi
// export const { useGetBoxByShelfAndBoxIdQuery } = boxApi
// export const { useGetMovieByIdBeatFilmQuery } = beatFilmMoviesApi