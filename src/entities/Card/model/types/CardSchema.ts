
// export interface CardSchema {

// }

export interface CardSchema {
	_id: string,
	index: number,
	question: string,
	answer: string,
	shelf: string,
	box: number,
	state: 'train' | 'wait'
	time: number
	
}
