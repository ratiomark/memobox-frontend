import { BoxSchema } from '@/entities/Box'
import { CardSchemaExtended } from '@/entities/Card'
import { ShelfSchema } from '@/entities/Shelf'

export interface CardSchemaDeleted extends CardSchemaExtended {
	isDeleted: true
	deletedAt: string
}

export type BoxSchemaDeleted = BoxSchema & {
	isDeleted: true
	deletedAt: string
	cardsCount?: number
	// cards: CardSchemaDeleted[]
}

export interface ShelfSchemaDeleted extends ShelfSchema {
	isDeleted: true
	deletedAt: string
	boxesCount: number
	cardsCount: number
	card: CardSchemaDeleted[]
	// timeDeletion
}
