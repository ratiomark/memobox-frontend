import { BoxSchema, LearntCardBox, NewCardsBox, RegularCardsBox } from '@/entities/Box';
import { DataBlock } from '@/shared/types/DataBlock';

// type OnlyDefaultBoxes = [NewCardsBox, LearntCardBox]
// type FullRangeOfBoxes = [NewCardsBox, RegularCardsBox, LearntCardBox]

export interface ShelfSchema {
	id: string
	index: number
	data: DataBlock
	title: string
	isDeleting: boolean
	boxesData: BoxSchema[]
}
