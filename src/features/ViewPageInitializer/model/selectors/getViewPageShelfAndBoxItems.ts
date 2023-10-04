import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserSavedDataViewPageColumns } from '@/entities/User';
import { createSelector } from '@reduxjs/toolkit';
import { getViewPageSort, getViewPageSortOrder } from './getViewPageSorting';
import { getViewPageIsLoading, getViewPageShelfId } from './getViewPageInitializer';
import { TabItem } from '@/shared/ui/Tabs/Tabs';
import { t } from 'i18next';

const getViewPageShelvesData = (state: StateSchema) => state.viewPage?.shelvesData

export const getViewPageShelfItems = createSelector(
	[
		getViewPageShelvesData,
		getViewPageIsLoading,
	],
	(shelvesData, isLoading) => {
		if (isLoading) return []
		const shelfItems = []
		for (const key in shelvesData) {
			if (Object.prototype.hasOwnProperty.call(shelvesData, key)) {
				shelfItems.push({
					value: key,
					content: shelvesData[key].shelfTitle,
					index: shelvesData[key].shelfIndex,
					boxesData: shelvesData[key].boxesItems,
				})
			}
		}
		shelfItems.sort((a, b) => a.index - b.index)
		return shelfItems
	}
)

export const getViewPageBoxItemsForWidget = createSelector(
	[
		getViewPageShelfId,
		getViewPageShelvesData,
		getViewPageIsLoading,
	],
	(shelfId,  shelvesDataObject, isLoading) => {
		if (isLoading || !shelvesDataObject) return []
		const tabs: TabItem[] = [
			{ value: 'all', content: t('all cards') as string },
			{ value: 'new', content: t('new cards') as string },
		]
		if (shelfId === 'all') {
			tabs.push(
				{ value: 'learning', content: t('learning cards') as string },
				{ value: 'learnt', content: t('learnt cards') as string })
			return tabs
		}
		const boxesData = shelvesDataObject[shelfId].boxesItems
		boxesData?.slice(1, boxesData?.length - 1).forEach(box => {
			tabs.push({ value: String(box.index), content: `${t('box text')} ${box.index}` })
		})
		tabs.push({ value: 'learnt', content: t('learnt cards') as string })
		return tabs
	}
)


// const tabs = useMemo(() => {
// 	if (viewPageIsLoading || isShelvesLoading) return
// 	const tabs: TabItem[] = [
// 		{ value: 'all', content: t('all cards') },
// 		{ value: 'new', content: t('new cards') },
// 	]
// 	if (shelfId === 'all') {
// 		tabs.push(
// 			{ value: 'learning', content: t('learning cards') },
// 			{ value: 'learnt', content: t('learnt cards') })
// 		return tabs
// 	}
// else {
// 		const boxesData = shelvesData?.find(shelf => shelf.id === shelfId)?.boxesData
// 		boxesData?.slice(1, boxesData?.length - 1).forEach(box => {
// 			tabs.push({ value: String(box.index), content: `${t('box text')} ${box.index}` })
// 		})
// 		tabs.push({ value: 'learnt', content: t('learnt cards') })
// 		return tabs
// 	}
// }, [isShelvesLoading, viewPageIsLoading, shelvesData, shelfId, t])