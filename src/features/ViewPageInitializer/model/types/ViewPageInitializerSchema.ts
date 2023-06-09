import { ShelfRepresentedByBoxes } from '@/entities/Box'
import { CardSchema } from '@/entities/Card'

export interface ViewPageInitializerSchema {
	shelfId: string
	shelfTitle?: string
	boxId: string
	shelvesDataSaved?: {
		[shelfId: string]: ShelfRepresentedByBoxes
	}
}