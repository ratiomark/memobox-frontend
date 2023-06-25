
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

export interface JsonSavedData {
	viewPageShelfId?: string
	viewPageBoxId?: string
	commonShelfCollapsed: boolean
	shelfNamesList: { title: string, isCollapsed: boolean }[]
	viewPageColumns: SortColumnObject[]
}