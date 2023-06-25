import { CupboardSchema } from '@/entities/Cupboard'
import { CommonShelfBackendResponse } from '@/entities/Cupboard'
import { ShelfSchema } from '@/entities/Shelf'
import { DataBlock } from '@/shared/types/DataBlock'
import { EntityState } from '@reduxjs/toolkit'

export interface CupboardPageSchema extends EntityState<ShelfSchema> {
	isLoading: boolean
	error: string
	commonShelf?: CommonShelfBackendResponse
	// commonShelfCollapsed?: boolean
	newCardModal: {
		shelfId: string
		boxIndex: number
		// boxId: string
		questionText: string
		answerText: string
		isOpen: boolean
	}
	boxesSettingsShelfId: string
	isBoxesSettingsModalOpen: boolean
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
}
