import { BoxSchema } from '@/entities/Box';
import { DataBlock } from '@/shared/types/DataBlock';
import { MissedTrainingValue } from '@/entities/User';
import { RequestStatusType } from '@/shared/types/GeneralTypes';

// type OnlyDefaultBoxes = [NewCardsBox, LearntCardBox]
// type FullRangeOfBoxes = [NewCardsBox, RegularCardsBox, LearntCardBox]

export interface ShelfSchema {
	id: string
	index: number
	data: DataBlock
	title: string
	isCollapsed: boolean
	isDeleting: boolean
	isDeleted: boolean
	isLoading: boolean
	deletingRequestStatus: RequestStatusType
	missedTrainingValue?: MissedTrainingValue
	notificationEnabled?: boolean
	boxesData: BoxSchema[]
	box: BoxSchema[]
}

export interface ShelfDndRepresentation {
	id: string
	index: number
}