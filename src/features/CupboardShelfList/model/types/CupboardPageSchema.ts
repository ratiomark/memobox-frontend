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
	isMounted?: boolean
	isRefetching: boolean
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
	boxDeletionProcess: {
		isAnyBoxInDeletionProcess?: boolean
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
	renameShelfModal: RenameShelfModal
	cupboardData: DataBlock
	isCupboardInfoModalOpen: boolean
	isCupboardAppearanceModalOpen: boolean
	abortedThunkIds: string[]
	skipTrainingHotKey: boolean
}


interface CreateNewShelfModal {
	isOpen: boolean
	shelfTitle: string
	isAwaitingResponse: boolean
	isResponseSuccessful?: boolean
	requestStatus: RequestStatusType
	shelvesCreated: number // выполняет роль триггера для useEffect в useCupboardButtonsSizes
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
	shelfId: string
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

interface RenameShelfModal {
	isOpen: boolean
	requestStatus: RequestStatusType
	title: string
	shelfId: string
}