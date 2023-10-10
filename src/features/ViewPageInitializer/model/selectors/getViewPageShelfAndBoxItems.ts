import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserSavedDataViewPageColumns } from '@/entities/User';
import { createSelector } from '@reduxjs/toolkit';
import { getViewPageSort, getViewPageSortOrder } from './getViewPageSorting';
import { getViewPageIsLoading, getViewPageShelfId } from './getViewPageInitializer';
import { TabItem } from '@/shared/ui/Tabs/Tabs';
import { t } from 'i18next';
import { getViewPageCardDataEdited } from './getViewPageEditModal';

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
	(shelfId, shelvesDataObject, isLoading) => {
		if (isLoading || !shelvesDataObject) return []
		if (shelfId === 'all') {
			return [
				{ value: 'all', additional: 'all', content: t('all cards') as string },
				{ value: 'new', additional: 'new', content: t('new cards') as string },
				{ value: 'learning', additional: 'learning', content: t('learning cards') as string },
				{ value: 'learnt', additional: 'learnt', content: t('learnt cards') as string }] as TabItem[]
		}
		const tabs: TabItem[] = [
			{
				value: 'all',
				additional: 'all',
				content: t('all cards') as string
			},
		]
		const boxesData = shelvesDataObject[shelfId].boxesItems
		tabs.push({
			value: boxesData[0].id,
			additional: 'new',
			content: t('new cards') as string
		})
		boxesData.slice(1, boxesData.length - 1).forEach(box => {
			tabs.push({
				value: box.id,
				additional: box.index.toString(),
				content: `${t('box text')} ${box.index}`
			})
		})
		tabs.push({
			value: boxesData.at(boxesData.length - 1)!.id,
			additional: 'learnt',
			content: t('learnt cards') as string
		})
		return tabs
	}
)

// const editedShelf = cardEditedData?.shelfId
export const getViewPageBoxItemsEditCardModal = createSelector(
	[
		getViewPageCardDataEdited,
		getViewPageShelvesData,
		getViewPageIsLoading,
	],
	(cardDataEdited, shelvesDataObject, isLoading) => {
		if (isLoading || !shelvesDataObject ||!cardDataEdited ) {
			return [] as TabItem[]
		}
		const shelfId = cardDataEdited.shelfId
		const tabs: TabItem[] = []
		const boxesData = shelvesDataObject[shelfId].boxesItems
		tabs.push({
			value: boxesData[0].id,
			additional: 'new',
			content: t('new cards') as string
		})
		boxesData.slice(1, boxesData.length - 1).forEach(box => {
			tabs.push({
				value: box.id,
				additional: box.index.toString(),
				content: `${t('box text')} ${box.index}`
			})
		})
		tabs.push({
			value: boxesData.at(boxesData.length - 1)!.id,
			additional: 'learnt',
			content: t('learnt cards') as string
		})
		return tabs
	}
)
// export const getViewPageBoxItemsForWidget = createSelector(
// 	[
// 		getViewPageShelfId,
// 		getViewPageShelvesData,
// 		getViewPageIsLoading,
// 	],
// 	(shelfId,  shelvesDataObject, isLoading) => {
// 		if (isLoading || !shelvesDataObject) return []
// 		const tabs: TabItem[] = [
// 			{ value: 'all', content: t('all cards') as string },
// 			{ value: 'new', content: t('new cards') as string },
// 		]
// 		if (shelfId === 'all') {
// 			tabs.push(
// 				{ value: 'learning', content: t('learning cards') as string },
// 				{ value: 'learnt', content: t('learnt cards') as string })
// 			return tabs
// 		}
// 		const boxesData = shelvesDataObject[shelfId].boxesItems
// 		boxesData?.slice(1, boxesData?.length - 1).forEach(box => {
// 			tabs.push({ value: String(box.index), content: `${t('box text')} ${box.index}` })
// 		})
// 		tabs.push({ value: 'learnt', content: t('learnt cards') as string })
// 		return tabs
// 	}
// )


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