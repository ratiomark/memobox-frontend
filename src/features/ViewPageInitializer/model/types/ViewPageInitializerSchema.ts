import { CardSchema } from '@/entities/Card'

export interface ViewPageInitializerSchema {
	shelfId: string
	shelfTitle?: string
	boxId: string
	shelvesDataSaved?: {
		[boxId: string]: CardSchema[]
	}
}