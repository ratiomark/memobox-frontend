import { CupboardSchema } from '@/entities/Cupboard'
import { ShelfSchema } from '@/entities/Shelf'
import { DataBlock } from '@/shared/types/DataBlock'
import { EntityState } from '@reduxjs/toolkit'

export interface CupboardPageSchema extends EntityState<ShelfSchema> {
	isLoading: boolean
	error: string
	// shelvesDeletionIds?: string[]
	// shelves: ShelfSchema[]
	cupboardData: DataBlock
}
