import { ShelfRepresentedByBoxes } from '@/entities/Box'
import { CardSchema, CardSchemaExtended } from '@/entities/Card'
import { SortColumnValue } from '@/entities/User'
import { SortOrderType } from '@/shared/types/SortOrderType'


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
	activeEntity: TrashPageEntityType
	_trashPageMounted: boolean
	// 
	isLoading: boolean
	error: string
	// 
	// cards: CardSchemaExtended[]
	// shelvesData: ShelvesDataTrashPage
	//

}