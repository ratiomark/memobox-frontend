
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