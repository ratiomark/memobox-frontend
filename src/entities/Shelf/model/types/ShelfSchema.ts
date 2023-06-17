import { BoxSchema } from '@/entities/Box';
import { DataBlock } from '@/shared/types/DataBlock';

// type OnlyDefaultBoxes = [NewCardsBox, LearntCardBox]
// type FullRangeOfBoxes = [NewCardsBox, RegularCardsBox, LearntCardBox]

export interface ShelfSchema {
	id: string
	index: number
	data: DataBlock
	title: string
	collapsed: boolean
	isDeleting: boolean
	boxesData: BoxSchema[]
}
