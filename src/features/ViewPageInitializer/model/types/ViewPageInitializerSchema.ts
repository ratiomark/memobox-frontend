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
	columnSettingsIsOpen: boolean
	sort: SortColumnValue
	sortOrder: SortOrderType
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