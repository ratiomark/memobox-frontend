import { DataBlock } from '@/shared/types/DataBlock'

interface BoxBaseSchema {
	_id: string
	index: number
}

export interface NewCardsBox extends BoxBaseSchema {
	specialType: 'new',
	data: {
		all: number,
	},
}

export interface RegularCardsBox extends BoxBaseSchema {
	specialType: 'none',
	data: DataBlock
}

export interface LearntCardBox extends BoxBaseSchema {
	specialType: 'learnt',
	data: DataBlock
}

export type BoxSchema =
	| NewCardsBox
	| RegularCardsBox
	| LearntCardBox