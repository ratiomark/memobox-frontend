import {
	getViewPageIsLoading,
	getViewPageShelfId,
	viewPageActions
} from '@/features/ViewPageInitializer';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { TabsSkeleton } from '@/shared/ui/Skeleton';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import { memo, useCallback, useMemo, } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { getViewPageBoxIdChecked } from '@/features/ViewPageInitializer';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import cls from './BoxesListViewWidget.module.scss'
import { getViewPageBoxItemsForWidget } from '@/features/ViewPageInitializer';

export const BoxesListViewWidget = memo(() => {
	// const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
	const dispatch = useAppDispatch()
	// const shelfId = useSelector(getViewPageShelfId)
	const boxId = useSelector(getViewPageBoxIdChecked)
	const viewPageIsLoading = useSelector(getViewPageIsLoading)

	const tabs = useSelector(getViewPageBoxItemsForWidget)

	const onCancelMultiSelect = useCallback(() => {
		dispatch(viewPageActions.cancelMultiSelect())
	}, [dispatch])

	const onBoxClick = useCallback((tabItem: TabItem) => {
		onCancelMultiSelect()
		dispatch(viewPageActions.setActiveBoxIdAndSpecialIndex({
			boxId: tabItem.value as string,
			boxSpecialIndex: tabItem.additional as string
		}))
		// dispatch(viewPageActions.setActiveBoxSpecialIndex(tabItem.additional))
		// dispatch(viewPageActions.setActiveBoxId(tabItem.value))
	}, [dispatch, onCancelMultiSelect])

	let tabsRendered;
	if (tabs) {
		const hasActive = tabs.find((item) => item.value === boxId)
		tabsRendered = (
			<Tabs
				tabs={tabs}
				onTabClick={onBoxClick}
				value={hasActive ? boxId?.toString() : 'new'}
			/>)
	}

	const content = (
		<AnimateSkeletonLoader
			isLoading={viewPageIsLoading}
			// isLoading={isShelvesLoading || viewPageIsLoading}
			noDelay={(tabs && tabs?.length > 1)}
			skeletonComponent={<TabsSkeleton />}
			// commonWrapper={false}
			classNameAbsoluteParts={cls.tabsItems}
			componentAfterLoading={tabsRendered}
		/>)


	return (
		<div
			className={cls.boxesListViewWidgetWrapper}
		>
			{content}
		</div>
	)
})



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
// 	} else {
// 		const boxesData = shelvesData?.find(shelf => shelf.id === shelfId)?.boxesData
// 		boxesData?.slice(1, boxesData?.length - 1).forEach(box => {
// 			tabs.push({ value: String(box.index), content: `${t('box text')} ${box.index}` })
// 		})
// 		tabs.push({ value: 'learnt', content: t('learnt cards') })
// 		return tabs
// 	}
// }, [isShelvesLoading, viewPageIsLoading, shelvesData, shelfId, t])