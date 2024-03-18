/* eslint-disable custom-fsd-checker-plugin/public-api-imports */
/* eslint-disable custom-fsd-checker-plugin/layer-import-sequence */
import { CardSchemaAfterTraining } from '@/entities/Card/model/api/cardApi'
import { CardAnswersObject } from '@/features/Training/model/types/TrainingSchema'

export const mapCardsObjectToCardAfterTraining = (answersObject: CardAnswersObject ): CardSchemaAfterTraining[] => {
	return [
		...Object.entries(answersObject).map(([cardId, value]) => ({
			...answersObject[cardId].card,
			answer: answersObject[cardId].answer,
		}))
	]
}
// const userResponses: CardSchemaAfterTraining[]= [
// 				...Object.entries(answersObject).map(([cardId, value]) => ({
// 					...answersObject[cardId].card,
// 					answer: answersObject[cardId].answer,
// 				}))
// 			]