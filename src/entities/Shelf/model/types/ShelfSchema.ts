import { BoxSchema, ShelfRepresentedByBoxes } from '@/entities/Box';
import { DataBlock, TimingBlock } from '@/shared/types/DataBlock';
import { MissedTrainingValue } from '@/entities/User';
import { RequestStatusType } from '@/shared/types/GeneralTypes';
import { CardSchemaExtended } from '@/entities/Card';

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



interface ShelfData {
	maxIndexBox: number
	boxesItems: { index: number, id: string }[]
	shelfTitle: string
	shelfIndex: number
}
export interface FetchBoxesThunkResponse {
	[shelfId: string]: ShelfRepresentedByBoxes
}

export interface ShelvesDataViewPage {
	[shelfId: string]: ShelfData
}

// export interface ShelfUpdateBoxListItem{
// 	timing: TimingBlock
// 	id: string
// 	index: number
// }