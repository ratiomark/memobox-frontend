import { rtkApi } from '@/shared/api/rtkApi';
import { CardSchema, CardSchemaExtended, NewCardSchema } from '../types/CardSchema';

// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { FetchCardsThunkResponse } from '@/features/ViewPageInitializer';
import { TAG_CUPBOARD_PAGE, TAG_VIEW_PAGE } from '@/shared/api/const/tags';

interface UpdateCardsRequestBase {
	cardIds: string[]
}

interface MoveCardsRequest extends UpdateCardsRequestBase {
	cardIds: string[]
	shelfId: string
	boxId: string
}

interface RemoveCardsRequest extends UpdateCardsRequestBase {
	requestAction: 'removeCards'
}

type UpdateCardsRequest = MoveCardsRequest | RemoveCardsRequest

export const cardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		// NSA: готово
		createNewCard: build.mutation<CardSchema, NewCardSchema>({
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
			invalidatesTags: []
		}),

		getAllCards: build.query<FetchCardsThunkResponse, void>({
			query: () => ({
				url: '/aggregate/view',
				method: 'GET',
			}),
			// transformResponse: (response: FetchCardsThunkResponse, meta, arg) => {
			// 	const newCards = response.shelvesAndBoxesData
			// 	return response
			// },
			providesTags: [TAG_VIEW_PAGE]
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
		getCardsByShelfAndBoxId: build.query<CardSchema[], { shelfId: string, boxId: string }>({
			query: ({ shelfId, boxId }) => ({
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
		// 	providesTags: []
		// }),
		updateCards: build.mutation<CardSchema[], UpdateCardsRequest>({
			query: (arg) => ({
				url: '/cards',
				method: 'PATCH',
				body: {
					...arg
				}
			}),
			invalidatesTags: []
		}),





		moveCards: build.mutation<CardSchema[], MoveCardsRequest>({
			query: (arg) => ({
				url: '/cards/move-cards',
				method: 'PATCH',
				body: arg
			}),
			invalidatesTags: [TAG_CUPBOARD_PAGE]
		}),
		removeSoftCards: build.mutation<{ count: number }, UpdateCardsRequestBase>({
			query: (arg) => ({
				url: '/cards/remove-cards',
				method: 'DELETE',
				body: arg
			}),
			invalidatesTags: [TAG_CUPBOARD_PAGE]
		}),
		removeSoftCard: build.mutation<CardSchema, string>({
			query: (cardId) => ({
				url: `/cards/${cardId}`,
				method: 'DELETE',
			}),
			invalidatesTags: [TAG_CUPBOARD_PAGE]
		}),















		updateCard: build.mutation<CardSchema, Partial<CardSchema>>({
			query: (card) => ({
				url: `/cards/${card.id}`,
				method: 'PATCH',
				body: {
					...card
				}
			}),
		}),

		getTrainingCards: build.query<CardSchema[], { shelfId: string, boxId: string }>({
			query: (arg) => ({
				url: `/cards/training/${arg.shelfId}/${arg.boxId}`,
				method: 'GET',
			}),
		}),

		// getBoxByShelfAndBoxId: build.query<CardSchema[], { shelfId: string, boxId: string }>({
		// 	query: ({ shelfId, boxId }) => ({
		// 		url: '/cards',
		// 		method: 'GET',
		// 		params: {
		// 			shelf: Number(shelfId),
		// 			box: Number(boxId)
		// 		}
		// 	}),
		// }),
	}),
})

export const { useGetCardsByShelfIdQuery } = cardApi
export const { useGetAllCardsQuery } = cardApi
export const { useUpdateCardsMutation } = cardApi
export const { useGetTrainingCardsQuery } = cardApi
export const getAllCards = cardApi.endpoints.getAllCards.initiate
export const createNewCard = cardApi.endpoints.createNewCard.initiate
export const rtkApiUpdateCard = cardApi.endpoints.updateCard.initiate
export const rtkApiMoveCards = cardApi.endpoints.moveCards.initiate
export const rtkApiDeleteCards = cardApi.endpoints.removeSoftCards.initiate
export const rtkApiDeleteCard = cardApi.endpoints.removeSoftCard.initiate
// export const { useGetBoxesByShelfIdQuery } = boxApi
// export const cupboardGetShelves = cupboardApi.endpoints.getShelves.initiate

// export const { useGetBoxByShelfAndBoxIdQuery } = boxApi
// export const { useGetMovieByIdBeatFilmQuery } = beatFilmMoviesApi


// getAllCards: build.query<FetchCardsThunkResponse, void>({
// 	query: () => ({
// 		url: '/cards',
// 		method: 'GET',
// 	}),
// 	transformResponse: (response: FetchCardsThunkResponse, meta, arg) => {
// 		response.cards.forEach(card => (
// 			{
// 				...card,
// 				// id: card._id,
// 				deleted: false,
// 				isDeleting: false,
// 			}
// 		))
// 		return response
// 	},
// 	providesTags: []
// }),