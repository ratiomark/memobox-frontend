import { ShelfRepresentedByBoxes } from '@/entities/Box'
import { CardSchema, CardSchemaExtended } from '@/entities/Card'
import { SortColumnValue } from '@/entities/User'
import { SortOrderType } from '@/shared/types/SortOrderType'
import { ShelvesDataViewPage } from '../services/fetchCards'


// export interface CardSchemaExtended extends CardSchema {
// 	deleted: boolean
// }
// export interface ViewPageInitializerSchema {
// 	shelfId: string
// 	shelfTitle?: string
// 	boxId: string
// 	shelvesDataSaved?: {
// 		[shelfId: string]: ShelfRepresentedByBoxes
// 	}
// }
// type Sort
export interface ViewPageInitializerSchema {
	shelfId: string
	boxId: string | number
	_viewPageMounted: boolean
	// 
	isLoading: boolean
	error: string
	// 
	cards: CardSchemaExtended[]
	shelvesData: ShelvesDataViewPage
	//
	isTableSettingsModalOpen: boolean
	sort: SortColumnValue
	sortOrder: SortOrderType
	isMultiSelectActive: boolean
	// 
	cardsDataCurrent: {
		[key: string]: CardSchemaExtended
	}
	cardsDataEdited: {
		[key: string]: {
			question: string
			answer: string
			shelf: string
			box: number
		}
	}
	currentCardId: string
	isCardEditModalOpen: boolean
	selectedCardIds: string[]
	// 
	isMoveCardsModalOpen: boolean
	// 
	shelvesDataSaved: {
		[shelfId: string]: {
			data: ShelfRepresentedByBoxes,
			isLoading: boolean
			lastBoxId: string
			error?: string
		}
	}
	//
	// boxesListEdges: {
	// 	leftSide: boolean
	// 	rightSide: boolean
	// },
	// shelvesListEdges: {
	// 	leftSide: boolean
	// 	rightSide: boolean
	// },
}