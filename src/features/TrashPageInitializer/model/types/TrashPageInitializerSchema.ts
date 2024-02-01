


// export interface CardSchemaExtended extends CardSchema {
// 	deleted: boolean
// }
// export interface TrashPageInitializerSchema {
// 	shelfId: string
// 	shelfTitle?: string
// 	boxId: string
// 	shelvesDataSaved?: {
// 		[shelfId: string]: ShelfRepresentedByBoxes
// 	}
// }
// type Sort

import { BoxSchemaDeleted, CardSchemaDeleted, ShelfSchemaDeleted } from '@/entities/Trash'

export type TrashPageEntityType = 'shelves' | 'boxes' | 'cards'

export interface TrashPageInitializerSchema {
	_trashPageMounted: boolean
	isLoading: boolean
	error: string
	//
	activeEntity: TrashPageEntityType
	// 
	isMultiSelectActive: boolean
	isCardEditModalOpen: boolean
	isMoveCardsModalOpen: boolean
	selectedCardIds: string[]
	abortedThunkIds: string[]
	shelves: ShelfSchemaDeleted[]
	boxes: BoxSchemaDeleted[]
	cards: CardSchemaDeleted[]
	restoreBoxModal: RestoreBoxModal
}

export interface RestoreBoxModal {
	shelfId: string
	boxId: string
	boxIndex: number
	isOpen: boolean
	shelfTitle: string
}