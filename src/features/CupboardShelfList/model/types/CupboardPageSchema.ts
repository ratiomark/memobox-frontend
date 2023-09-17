import { BoxCoordinates } from '@/entities/Box'
import { CupboardSchema } from '@/entities/Cupboard'
import { CommonShelfBackendResponse } from '@/entities/Cupboard'
import { ShelfSchema } from '@/entities/Shelf'
import { DataBlock, TimingBlock } from '@/shared/types/DataBlock'
import { EntityState } from '@reduxjs/toolkit'


export interface CupboardPageSchema extends EntityState<ShelfSchema> {
	isDataAlreadyInStore: boolean
	isFirstRender: boolean
	isNeedRefetch: boolean
	isNeedStop: boolean
	isLoading: boolean
	error: string
	commonShelf?: CommonShelfBackendResponse
	// commonShelfCollapsed?: boolean
	createNewCardModal: {
		shelfId: string
		boxIndex: number
		// boxId: string
		questionText: string
		answerText: string
		isOpen: boolean
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
	// shelvesDeletionIds?: string[]
	// shelves: ShelfSchema[]
	cupboardData: DataBlock
	boxTimeSetterModal: {
		isOpen: boolean
		boxCoordinates: BoxCoordinates
		boxTimingData: TimingBlock
		boxId: string
	},
	boxSettingsDropdownModal: {
		isOpen: boolean,
		boxId: string,
		boxCoordinates: BoxCoordinates
	},
	isCupboardInfoModalOpen: boolean,
	// boxCoordinates: {
	// 	x: number
	// 	y: number
	// }
}
