
// export interface CardSchema {

// }

export interface CardSchema {
	id: string
	index: number
	question: string
	answer: string
	shelfId: string
	boxIndex: number
	boxId: string
	state: 'train' | 'wait'
	specialType: 'new' | 'none' | 'learnt'
	time: number
	createdAt: string
	lastTraining: string
}

export interface CardSchemaExtended extends CardSchema {
	isDeleting: boolean
	isDeleted: boolean
}