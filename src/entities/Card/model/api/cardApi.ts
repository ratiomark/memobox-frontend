import { rtkApi } from '@/shared/api/rtkApi';
import {
	AnswerType,
	CardSchema,
	CardSchemaBase,
	CardSchemaExtended,
	FetchCardsThunkResponse,
	NewCardSchema
} from '../types/CardSchema';

// eslint-disable-next-line custom-fsd-checker-plugin/layer-import-sequence
import { TAG_CUPBOARD_PAGE, TAG_VIEW_PAGE } from '@/shared/api/const/tags';
import { PrismaBatchPayload, ShelfBoxCardIdObject, ShelfBoxIdObject } from '@/shared/types/ApiTypesCommon';
import { getCurrentTimeZone } from '@/shared/lib/helpers/common/getCurrentTimeZone';


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

export interface CardSchemaAfterTraining extends CardSchemaBase {
	answer: AnswerType
}

type UpdateCardsRequest = MoveCardsRequest | RemoveCardsRequest
type RestoreSeveralCardsArg = Omit<ShelfBoxCardIdObject, 'cardId'> & { cardsIds: string[] }

export const cardApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({

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
			// 	const cardsUpdated = response.cards.map(card => ({ ...card, isDeleting: false }))
			// 	response.cards = cardsUpdated
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
		getCardsByShelfAndBoxId: build.query<CardSchema[], ShelfBoxIdObject>({
			query: ({ shelfId, boxId }) => ({
				url: '/cards',
				method: 'GET',
				body: {
					shelfId,
					boxId
				}
			}),
		}),
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
		deleteCardsSoft: build.mutation<PrismaBatchPayload, UpdateCardsRequestBase>({
			query: (arg) => ({
				url: '/cards/remove-cards',
				method: 'DELETE',
				body: arg
			}),
			invalidatesTags: [TAG_CUPBOARD_PAGE]
		}),
		deleteCardSoft: build.mutation<CardSchema, string>({
			query: (cardId) => ({
				url: `/cards/${cardId}`,
				method: 'DELETE',
			}),
			invalidatesTags: [TAG_CUPBOARD_PAGE]
		}),

		deleteCardFinal: build.mutation<CardSchema, string>({
			query: (cardId) => ({
				url: `/cards/final/${cardId}`,
				method: 'DELETE',
			}),
		}),

		restoreCardById: build.mutation<CardSchema, ShelfBoxCardIdObject>({
			query: ({ cardId, shelfId, boxId }) => ({
				url: `/cards/restore/${cardId}`,
				method: 'PATCH',
				body: {
					shelfId,
					boxId
				}
			}),
		}),
		restoreSeveralCards: build.mutation<PrismaBatchPayload, RestoreSeveralCardsArg>({
			query: ({ cardsIds, shelfId, boxId }) => ({
				url: '/cards/restore-several-cards',
				method: 'PATCH',
				body: {
					shelfId,
					boxId,
					cardsIds,
				}
			}),
		}),
		// 		  @Patch('restore/:cardId')
		//   restoreByCardId(
		// 		@GetCurrentUser('id') userId: UserId,
		// 		@Param('cardId') cardId: CardId,
		// 		@Body() body: { boxId: BoxId; shelfId: ShelfId },
		// 	) {
		// 	return this.cardsService.restoreByCardId(
		// 		userId,
		// 		body.shelfId,
		// 		body.boxId,
		// 		cardId,
		// 	);
		// }

		updateCard: build.mutation<CardSchema, Partial<CardSchema>>({
			query: (card) => ({
				url: `/cards/${card.id}`,
				method: 'PATCH',
				body: {
					...card
				}
			}),
		}),

		getTrainingCards: build.query<CardSchema[], ShelfBoxIdObject>({
			query: (arg) => ({
				url: `/cards/training/${arg.shelfId}/${arg.boxId}`,
				method: 'GET',
			}),
		}),

		sendTrainingAnswers: build.mutation<CardSchema[], CardSchemaAfterTraining[]>({
			query: (userResponses) => ({
				url: '/cards/training/answers',
				method: 'POST',
				body: {
					responses: userResponses,
				}
			}),
		}),
		dropCards: build.query<void, void>({
			query: () => ({
				url: '/aggregate/restore-db',
				// url: '/cards/drop',
				method: 'POST',
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
export const rtkApiDeleteCardsSoft = cardApi.endpoints.deleteCardsSoft.initiate
export const rtkApiDeleteCardSoft = cardApi.endpoints.deleteCardSoft.initiate
export const rtkApiSendTrainingAnswers = cardApi.endpoints.sendTrainingAnswers.initiate
export const rtkApiDropCards = cardApi.endpoints.dropCards.initiate
export const rtkApiDeleteCardFinal = cardApi.endpoints.deleteCardFinal.initiate
export const rtkApiRestoreCardById = cardApi.endpoints.restoreCardById.initiate
export const rtkApiRestoreSeveralCards = cardApi.endpoints.restoreSeveralCards.initiate






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