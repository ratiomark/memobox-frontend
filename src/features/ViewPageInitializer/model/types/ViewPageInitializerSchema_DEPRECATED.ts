// import { ShelfRepresentedByBoxes } from '@/entities/Box'
// import { CardSchemaExtended } from '@/entities/Card'
// import { SortColumnValue } from '@/entities/User'
// import { SortOrderType } from '@/shared/types/SortOrderType'
// import { ShelvesDataViewPage } from '../services/fetchCards'


// // export interface CardSchemaExtended extends CardSchema {
// // 	deleted: boolean
// // }
// // export interface ViewPageInitializerSchema {
// // 	shelfId: string
// // 	shelfTitle?: string
// // 	boxId: string
// // 	shelvesDataSaved?: {
// // 		[shelfId: string]: ShelfRepresentedByBoxes
// // 	}
// // }
// // type Sort
// export interface ViewPageInitializerSchema {
// 	shelfId: string
// 	boxId: string
// 	boxSpecialIndex: string
// 	_viewPageMounted: boolean
// 	// 
// 	isLoading: boolean
// 	error: string
// 	// 
// 	cards: CardSchemaExtended[]
// 	cardsShelfIdBoxIdObj: CardsShelfIdBoxIdObj
// 	shelfIdsBoxSpecialIndexesObj: ShelfIdsBoxSpecialIndexesObj
// 	shelvesData: ShelvesDataViewPage
// 	shelfIds: string[]
// 	//
// 	isTableSettingsModalOpen: boolean
// 	sort: SortColumnValue
// 	sortOrder: SortOrderType
// 	isMultiSelectActive: boolean
// 	// 
// 	cardsDataOriginal: {
// 		[cardId: string]: CardSchemaExtended
// 	}
// 	cardsDataEdited: CardsDataEditedObj
// 	selectedCardIds: string[]
// 	isCardEditModalOpen: boolean
// 	currentCardId: string
// 	cardEditedListIds: string[]
// 	cardModalHeights: {
// 		[key: string]: {
// 			minHeightQuestion?: number
// 			currentHeightQuestion?: number
// 			minHeightAnswer?: number
// 			currentHeightAnswer?: number
// 		}
// 	},
// 	// 
// 	isMoveCardsModalOpen: boolean
// 	abortedThunkIds: string[]
// 	multiSelectDeleteCardIdList: string[]
// 	multiSelectDeleteCardIdObject: {
// 		[randomId: string]: string[]
// 	}
// 	multiSelectMoveCardIdList: string[]
// 	multiSelectMoveCardIdObject: {
// 		[randomId: string]: string[]
// 	}
// 	// 
// 	shelvesDataSaved: {
// 		[shelfId: string]: {
// 			data: ShelfRepresentedByBoxes,
// 			isLoading: boolean
// 			lastBoxId: string
// 			error?: string
// 		}
// 	}
// 	//
// 	// boxesListEdges: {
// 	// 	leftSide: boolean
// 	// 	rightSide: boolean
// 	// },
// 	// shelvesListEdges: {
// 	// 	leftSide: boolean
// 	// 	rightSide: boolean
// 	// },
// }

// export interface CardsShelfIdBoxIdObj {
// 	[shelfId: string]: {
// 		[boxId: string]: CardSchemaExtended[]
// 	}
// }

// interface CardsDataEditedObj {
// 	[cardId: string]: {
// 		question: string
// 		answer: string
// 		shelfId: string
// 		boxIndex: number
// 	}
// }

// interface ShelfIdsBoxSpecialIndexesObj {
// 	[shelfId: string]: {
// 		[boxSpecialIndex: string]: string
// 	}
// }