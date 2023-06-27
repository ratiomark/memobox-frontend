import { ShelfRepresentedByBoxes } from '@/entities/Box'
import { CardSchema } from '@/entities/Card'
import { SortColumnValue } from '@/entities/User'
import { SortOrderType } from '@/shared/types/SortOrderType'

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
	cards: CardSchema[]
	isLoading: boolean
	error: string
	//
	columnSettingsIsOpen: boolean
	sort: SortColumnValue
	sortOrder: SortOrderType
	multiSelectIsActive: boolean
	// 
	cardsDataCurrent: {
		[key: string]: CardSchema
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
	cardEditModalIsOpen: boolean
	// shelfTitle?: string
	// boxId: string
	shelvesDataSaved: {
		[shelfId: string]: {
			data: ShelfRepresentedByBoxes,
			isLoading: boolean
			lastBoxId: string
			error?: string
		}
	}
}