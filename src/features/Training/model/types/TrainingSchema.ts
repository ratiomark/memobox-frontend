import { CardSchema, AnswerType, CardSchemaBase } from '@/entities/Card'

export interface TrainingSchema {
	answerObject: CardAnswersObject

}



export type CardAnswersObject = {
	[cardId: string]: {
		answer: AnswerType,
		card: CardSchemaBase
	}
}

type CardAnswersList = (Partial<CardSchema> & { answer: AnswerType })[]


// "question": "",
// "answer": "",
// "lastTraining": "---",
// "nextTraining": null,
// "isDeleted": false,
// "createdAt": "2024-03-06T10:50:40.602Z",
// "updatedAt": "2024-03-06T10:50:40.602Z",
// "deletedAt": null,
// "userId": "4d8a17d5-b87e-40fe-95bb-c6b84768d855",
// "shelfId": "c4eceb7e-22b1-42ed-b3ab-304ec39dd5d6",
// "boxId": "aaef2dc2-8e80-4990-b309-2c35d215ba96",
// "boxIndex": 0,
// "specialType": "new",
// "state": "train"