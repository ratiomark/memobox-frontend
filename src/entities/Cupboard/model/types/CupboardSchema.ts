import { ShelfSchema } from '@/entities/Shelf';
import { DataBlock } from '@/shared/types/DataBlock';

export interface CupboardSchema {
	data: DataBlock
	commonShelfCollapsed: boolean
	shelves: ShelfSchema[]
}