import { rtkApi } from '@/shared/api/rtkApi';
import { CardSchema, CardSchemaExtended } from '../types/CardSchema';

// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { FetchCardsThunkResponse } from '@/features/ViewPageInitializer';

// type 
// type: 'moveCards' | 'removeCards'
interface UpdateCardsRequestBase {
	cardIds: string[]
}

interface MoveCardsRequest extends UpdateCardsRequestBase {
	requestAction: 'moveCards'
	shelfId: string
	boxIndex: number | string
}

interface RemoveCardsRequest extends UpdateCardsRequestBase {
	requestAction: 'removeCards'
}

type UpdateCardsRequest = MoveCardsRequest | RemoveCardsRequest

export const cardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getCardsByShelfId: build.query<CardSchema[], string>({
			query: (id) => ({
				url: '/cards',
				method: 'GET',
				params: {
					shelf: id,
					// box: boxId
				}
			}),
		}),
		getAllCards: build.query<FetchCardsThunkResponse, void>({
			query: () => ({
				url: '/cards',
				method: 'GET',
			}),
			transformResponse: (response: FetchCardsThunkResponse, meta, arg) => {
				response.cards.forEach(card => (
					{
						...card,
						deleted: false,
					}
				))
				return response
			},
			providesTags: ['Cards']
		}),
		// 	transformResponse: (response: FetchCardsThunkResponse, meta, arg) => {
		// 		const newCards = response.cards.map(card => {
		// 			return ({
		// 				...card,
		// 				question: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":${card.question},"type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
		// 				answer: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":${card.answer},"type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
		// 				deleted: false,
		// 			})
		// 		})
		// 		response.cards = newCards
		// 		return response
		// 	},
		// 	providesTags: ['Cards']
		// }),
		updateCards: build.mutation<CardSchema[], UpdateCardsRequest>({
			query: (arg) => ({

				url: '/cards',
				method: 'PATCH',
				body: { ...arg }
			}),
			invalidatesTags: ['Cards']
		}),
		// getAllCards: build.query<CardSchemaExtended[], void>({
		// 	query: () => ({
		// 		url: '/cards',
		// 		method: 'GET',
		// 	}),
		// 	transformResponse: (response: CardSchema[], meta, arg) => { 
		// 		return response.map(card=>({...card, deleted: false}))
		// 	}
		// }),
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

export const { useGetCardsByShelfIdQuery } = cardApi
export const { useGetAllCardsQuery } = cardApi
export const { useUpdateCardsMutation } = cardApi
export const getAllCards = cardApi.endpoints.getAllCards.initiate
// export const { useGetBoxesByShelfIdQuery } = boxApi
// export const cupboardGetShelves = cupboardApi.endpoints.getShelves.initiate

// export const { useGetBoxByShelfAndBoxIdQuery } = boxApi
// export const { useGetMovieByIdBeatFilmQuery } = beatFilmMoviesApi