
export type SortColumnValue =
	| 'shelf'
	| 'createdAt'
	| 'lastTraining'


export interface SortColumnObject {
	value: SortColumnValue
	content: string
	enabled: boolean
	index: number
}

export interface ShelfNameItem {
	title: string,
	isCollapsed: boolean,
	id: string
}

export interface JsonSavedData {
	viewPageShelfId?: string
	viewPageBoxId?: string
	commonShelfCollapsed: boolean
	shelfNamesList: ShelfNameItem[]
	viewPageColumns: SortColumnObject[]
}