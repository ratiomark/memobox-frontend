import { ShelvesDataViewPage } from '@/entities/Shelf'

export interface NewCardSchema {
	question: string | null
	answer: string | null
	shelfId: string
	boxId: string
}

export interface CardSchemaBase {
	id: string
	question: string | null
	answer: string | null
	shelfId: string
	boxId: string
}

export interface CardSchema extends CardSchemaBase {
	index: number
	boxIndex: number
	isDeleted: boolean
	state: 'train' | 'wait'
	specialType: 'new' | 'none' | 'learnt'
	createdAt: string
	lastTraining: string
	nextTraining: string
	// createdAt: string | null
	// lastTraining: string | null
	// nextTraining: string | null
	// createdAt: Date | string
	// lastTraining: Date | string
	// nextTraining: Date | string
}

export interface CardSchemaExtended extends CardSchema {
	isDeleting?: boolean
}

export interface FetchCardsThunkResponse {
	cards: CardSchemaExtended[]
	shelvesAndBoxesData: ShelvesDataViewPage
}

export type AnswerType = 'good' | 'bad' | 'middle'