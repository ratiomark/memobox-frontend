
// export interface CardSchema {

// }

export interface CardSchema {
	_id: string,
	index: number,
	question: string,
	answer: string,
	shelf: number,
	box: number,
	state: 'train' | 'wait'
}
