import { BoxSchema } from '@/entities/Box';
import { DataBlock, MissedTrainingValues } from '@/shared/types/DataBlock';

// type OnlyDefaultBoxes = [NewCardsBox, LearntCardBox]
// type FullRangeOfBoxes = [NewCardsBox, RegularCardsBox, LearntCardBox]

export interface ShelfSchema {
	id: string
	index: number
	data: DataBlock
	title: string
	collapsed: boolean
	isDeleting: boolean
	isLoading: boolean
	missedTrainingAction?: MissedTrainingValues
	notificationEnabled?: boolean
	boxesData: BoxSchema[]
}
