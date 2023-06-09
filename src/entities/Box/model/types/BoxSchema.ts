export interface BoxSchema {
	id: string
	position?: number
	data: {
		train: number,
		wait: number,
		all: number,
	},
}