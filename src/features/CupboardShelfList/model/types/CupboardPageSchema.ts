import { BoxCoordinates } from '@/entities/Box'
import { CupboardSchema } from '@/entities/Cupboard'
import { CommonShelfBackendResponse } from '@/entities/Cupboard'
import { ShelfDndRepresentation, ShelfSchema } from '@/entities/Shelf'
import { DataBlock, TimingBlock } from '@/shared/types/DataBlock'
import { RequestStatusType } from '@/shared/types/GeneralTypes'
import { EntityState } from '@reduxjs/toolkit'


export interface CupboardPageSchema extends EntityState<ShelfSchema> {
	isDataAlreadyInStore: boolean
	isFirstRender: boolean
	isNeedRefetch: boolean
	isNeedStop: boolean
	isLoading: boolean
	error: string
	commonShelf?: CommonShelfBackendResponse
	shelvesTitles: string[]
	shelvesIdsAndIndexes?: ShelfDndRepresentation[]
	shelvesIdsAndIndexesInitial?: ShelfDndRepresentation[]
	createNewCardModal: CreateNewCardModal
	createNewShelfModal: CreateNewShelfModal
	boxTimeSetterModal: BoxTimeSetterModal
	boxSettingsDropdownModal: BoxSettingsDropdownModal
	shelfBoxesTemplateModal: {
		isOpen: boolean
		shelfId: string
	}
	missedTrainingModal: {
		shelfId: string
		boxId: string
		isOpen: boolean
	},
	notificationShelfModal: {
		shelfId: string
		isOpen: boolean
	},
	// shelvesDeletionIds?: string[]
	cupboardData: DataBlock
	isCupboardInfoModalOpen: boolean
	// boxCoordinates: {
	// 	x: number
	// 	y: number
	// }
}
interface CreateNewShelfModal {
	isOpen: boolean
	shelfTitle: string
	isAwaitingResponse: boolean
	isResponseSuccessful?: boolean
	requestStatus: RequestStatusType
}
interface BoxTimeSetterModal {
	isOpen: boolean
	boxCoordinates: BoxCoordinates
	boxTimingData: TimingBlock
	boxId: string
}
interface BoxSettingsDropdownModal {
	isOpen: boolean
	boxId: string
	boxCoordinates: BoxCoordinates
}
interface CreateNewCardModal {
	shelfId: string
	boxIndex: number
	boxId: string
	questionText: string
	answerText: string
	isOpen: boolean
}