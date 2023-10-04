import { SortColumnObject } from '../types/JsonSavedData'

export const jsonSavedDataColumnsMock: SortColumnObject[] = [
	{
		value: 'shelfId',
		content: 'shelf',
		enabled: true,
		index: 0
	},
	{
		value: 'createdAt',
		content: 'creation',
		enabled: true,
		index: 1
	},
	{
		value: 'lastTraining',
		content: 'last training',
		enabled: true,
		index: 2
	}
]

export const jsonSavedDataViewPageRowsCountMock = 2