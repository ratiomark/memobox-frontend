import { DataBlock, MissedTrainingValues, TimingBlock } from '@/shared/types/DataBlock'

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

export interface RegularAndLearntCardsBox extends BoxBaseSchema {
	specialType: 'none' | 'learnt',
	data: DataBlock
	timing: TimingBlock
	missedTrainingAction?: MissedTrainingValues
}

// export interface LearntCardBox extends BoxBaseSchema {
// 	specialType: 'learnt',
// 	data: DataBlock
// 	timing: TimingBlock
// }

export type BoxSchema =
	| NewCardsBox
	| RegularAndLearntCardsBox
	// | LearntCardBox