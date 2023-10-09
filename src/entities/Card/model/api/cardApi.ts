import { rtkApi } from '@/shared/api/rtkApi';
import { CardSchema, CardSchemaExtended, NewCardSchema } from '../types/CardSchema';

// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { FetchCardsThunkResponse } from '@/features/ViewPageInitializer';

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
		// NSA: готово
		createNewCard: build.query<CardSchema, NewCardSchema>({
			query: ({ question, answer, shelfId, boxId }) => ({
				url: '/cards',
				method: 'POST',
				body: {
					question,
					answer,
					shelfId,
					boxId
				}
			}),
		}),
		// NSA: это запрос для станицы /view
		getAllCards: build.query<FetchCardsThunkResponse, void>({
			query: () => ({
				url: '/cards',
				method: 'GET',
			}),
			transformResponse: (response: FetchCardsThunkResponse, meta, arg) => {
				response.cards.forEach(card => (
					{
						...card,
						// id: card._id,
						deleted: false,
						isDeleting: false,
					}
				))
				return response
			},
			providesTags: ['Cards']
		}),
		getCardsByShelfId: build.query<CardSchema[], string>({
			query: (shelfId) => ({
				url: '/cards',
				method: 'GET',
				body: {
					shelfId
				}
			}),
		}),
		getCardsByShelfAndBoxId: build.query<CardSchema[], {shelfId: string, boxId: string}>({
			query: ({shelfId, boxId}) => ({
				url: '/cards',
				method: 'GET',
				body: {
					shelfId,
					boxId
				}
			}),
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
				body: {
					...arg
				}
			}),
			invalidatesTags: ['Cards']
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

export const { useGetCardsByShelfIdQuery } = cardApi
export const { useGetAllCardsQuery } = cardApi
export const { useUpdateCardsMutation } = cardApi
export const getAllCards = cardApi.endpoints.getAllCards.initiate
export const createNewCard = cardApi.endpoints.createNewCard.initiate
// export const { useGetBoxesByShelfIdQuery } = boxApi
// export const cupboardGetShelves = cupboardApi.endpoints.getShelves.initiate

// export const { useGetBoxByShelfAndBoxIdQuery } = boxApi
// export const { useGetMovieByIdBeatFilmQuery } = beatFilmMoviesApi