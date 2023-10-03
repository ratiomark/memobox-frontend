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
	shelvesIdsAndIndexesCurrent?: ShelfDndRepresentation[]
	shelvesIdsAndIndexesInitial?: ShelfDndRepresentation[]
	createNewCardModal: CreateNewCardModal
	createNewShelfModal: CreateNewShelfModal
	boxTimeSetterModal: BoxTimeSetterModal
	boxSettingsDropdownModal: BoxSettingsDropdownModal
	shelfDeletionProcess: {
		requestStatus: RequestStatusType
		shelfId: string
		isAnyShelfInDeletionProcess?: boolean
		// isShelf
	}
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
	cupboardData: DataBlock
	isCupboardInfoModalOpen: boolean
	abortedThunkIds: string[]
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
	// requestStatus: RequestStatusType
	boxCoordinates: BoxCoordinates
	boxTimingData: TimingBlock
	boxId: string
	shelfId: string
}
interface BoxSettingsDropdownModal {
	isOpen: boolean
	requestStatus: RequestStatusType
	boxId: string
	boxCoordinates: BoxCoordinates
}
interface CreateNewCardModal {
	isOpen: boolean
	requestStatus: RequestStatusType
	questionText: string | null
	answerText: string | null
	shelfId: string
	boxId: string
	boxIndex: number
}