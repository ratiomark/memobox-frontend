import { ShelfSchema } from '@/entities/Shelf';
import { DataBlock } from '@/shared/types/DataBlock';
export interface CommonShelfBackendResponse {
	isCollapsed?: boolean
	new: { all: number }
	learning: DataBlock
	learnt: DataBlock
	data: DataBlock
}

export interface CupboardSchema {
	// data: DataBlock
	commonShelf: CommonShelfBackendResponse
	shelves: ShelfSchema[]
}