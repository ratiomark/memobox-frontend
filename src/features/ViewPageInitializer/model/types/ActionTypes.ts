import { CardSchemaExtended } from '@/entities/Card'

interface ShelfIdBoxIdBase {
	shelfId: string
	boxId: string
}
export interface ShelfIdBoxIdCardExtendedType extends ShelfIdBoxIdBase {
	card: CardSchemaExtended
}
export interface ShelfIdBoxIdCardIdType extends ShelfIdBoxIdBase {
	cardId: string
}