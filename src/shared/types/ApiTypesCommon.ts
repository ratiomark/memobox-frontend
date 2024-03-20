export interface ShelfIdObject {
	shelfId: string
}
export interface BoxIdObject {
	boxId: string
}
export type ShelfBoxIdObject = ShelfIdObject & BoxIdObject
export type ShelfBoxCardIdObject = ShelfBoxIdObject & {
	cardId: string
}

export type PrismaBatchPayload = { count: number }