


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
	restoreBoxModal: {
		shelfId: string
		boxId: string
		boxIndex: number
		isOpen: boolean
	},
}