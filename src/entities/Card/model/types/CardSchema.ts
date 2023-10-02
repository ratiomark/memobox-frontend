
// export interface CardSchema {

// }

export interface CardSchema {
	id: string,
	index: number,
	question: string,
	answer: string,
	shelf: string,
	box: number,
	state: 'train' | 'wait'
	specialType: 'new' | 'none' | 'learnt'
	time: number
	createdAt: string
	lastTraining: string
}

export interface CardSchemaExtended extends CardSchema {
	isDeleting: boolean
	deleted: boolean
}