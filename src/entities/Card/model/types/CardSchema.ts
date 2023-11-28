
// export interface CardSchema {

// }

export interface NewCardSchema {
	question: string | null
	answer: string | null
	shelfId: string
	boxId: string
}

export interface CardSchema {
	id: string
	index: number
	question: string | null
	answer: string | null
	shelfId: string
	boxIndex: number
	boxId: string
	isDeleted: boolean
	state: 'train' | 'wait'
	specialType: 'new' | 'none' | 'learnt'
	time: number
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