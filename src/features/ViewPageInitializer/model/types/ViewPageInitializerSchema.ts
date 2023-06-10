import { ShelfRepresentedByBoxes } from '@/entities/Box'
import { CardSchema } from '@/entities/Card'

// export interface ViewPageInitializerSchema {
// 	shelfId: string
// 	shelfTitle?: string
// 	boxId: string
// 	shelvesDataSaved?: {
// 		[shelfId: string]: ShelfRepresentedByBoxes
// 	}
// }
export interface ViewPageInitializerSchema {
	shelfId: string
	_viewPageMounted: boolean
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