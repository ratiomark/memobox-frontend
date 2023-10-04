import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserSavedDataViewPageColumns } from '@/entities/User';
import { createSelector } from '@reduxjs/toolkit';
import { getViewPageSort, getViewPageSortOrder } from './getViewPageSorting';
import { getViewPageIsLoading } from './getViewPageInitializer';

const getViewPageShelvesData = (state: StateSchema) => state.viewPage?.shelvesData

export const getShelfItems = createSelector(
	[
		getViewPageShelvesData,
		getViewPageIsLoading,
	],
	(shelves, isLoading) => {
		if (isLoading || !shelves) return []
		return shelves.map(shelf => ({
			content: shelf.title,
			value: shelf.id
		}))
	}
)
