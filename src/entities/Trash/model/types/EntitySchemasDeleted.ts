import { BoxSchema } from '@/entities/Box'
import { CardSchemaExtended } from '@/entities/Card'
import { ShelfSchema } from '@/entities/Shelf'
import { TimingBlock } from '@/shared/types/DataBlock'

export interface CardSchemaDeleted extends CardSchemaExtended {
	isDeleted: true
	deletedAt: string
}

export type BoxSchemaDeleted = BoxSchema & {
	isDeleted: true
	deletedAt: string
	cardsCount?: number
	card: CardSchemaDeleted[]
	_count: {
		card: number
	}
	timing: TimingBlock
	// specialType: 'new' | 'none' | 'learnt'
	// cards: CardSchemaDeleted[]
}

export interface ShelfSchemaDeleted extends ShelfSchema {
	isDeleted: true
	deletedAt: string
	box: BoxSchemaDeleted[]
	boxesCount: number
	card: CardSchemaDeleted[]
	cardsCount: number
	// timeDeletion
}
