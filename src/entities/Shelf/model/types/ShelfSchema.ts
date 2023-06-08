
// export interface ShelfSchema {

// }
export interface ShelfSchema {
	_id: string,
	index: number,
	data: {
		train: number,
		wait: number,
		all: number,
	},
	title: string,
}
