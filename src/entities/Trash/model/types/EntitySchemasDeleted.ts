import { CardSchemaExtended } from '@/entities/Card'
import { ShelfSchema } from '@/entities/Shelf'

export interface CardSchemaDeleted extends CardSchemaExtended {
	isDeleted: true
	dateTimeDeletion: string
}
// export interface BoxSchemaDeleted extends CardSchemaExtended {
// 	isDeleted: true
// }
export interface ShelfSchemaDeleted extends ShelfSchema {
	isDeleted: true
	dateTimeDeletion: string
	// timeDeletion
}
