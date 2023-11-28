import { DataBlock, TimingBlock } from '@/shared/types/DataBlock'
import { MissedTrainingValue } from '@/entities/User'

interface BoxBaseSchema {
	id: string
	index: number
	missedTrainingValue?: MissedTrainingValue
}

export interface NewCardsBox extends BoxBaseSchema {
	specialType: 'new',
	data: {
		all: number,
	},
}

export interface RegularAndLearntCardsBox extends BoxBaseSchema {
	specialType: 'none' | 'learnt',
	data: DataBlock
	timing: TimingBlock
}

export interface BoxCoordinates {
	x: number
	y: number
}

export type BoxSchema =
	| NewCardsBox
	| RegularAndLearntCardsBox