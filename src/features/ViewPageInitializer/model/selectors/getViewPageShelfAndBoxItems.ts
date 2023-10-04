import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserSavedDataViewPageColumns } from '@/entities/User';
import { createSelector } from '@reduxjs/toolkit';
import { getViewPageSort, getViewPageSortOrder } from './getViewPageSorting';
import { getViewPageIsLoading } from './getViewPageInitializer';

const getViewPageShelvesData = (state: StateSchema) => state.viewPage?.shelvesData

export const getViewPageShelfItems = createSelector(
	[
		getViewPageShelvesData,
		getViewPageIsLoading,
	],
	(shelvesData, isLoading) => {
		if (isLoading) return []
		const shelvesItems = []
		for (const key in shelvesData) {
			if (Object.prototype.hasOwnProperty.call(shelvesData, key)) {
				shelvesItems.push({ value: key, content: shelvesData[key].shelfTitle, index: shelvesData[key].shelfIndex })
			}
		}
		return shelvesItems.sort((a, b) => a.index - b.index)
		// return shelves.map(shelf => ({
		// 	content: shelf.title,
		// 	value: shelf.id
		// }))
	}
)
