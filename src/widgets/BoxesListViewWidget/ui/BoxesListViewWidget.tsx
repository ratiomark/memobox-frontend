import {
	getViewPageIsLoading,
	getViewPageShelfId,
	viewPageActions
} from '@/features/ViewPageInitializer';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Skeleton, TabsSkeleton } from '@/shared/ui/Skeleton';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { getViewPageBoxIdChecked } from '@/features/ViewPageInitializer';
import cls from './BoxesListViewWidget.module.scss'
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';

export const BoxesListViewWidget = memo(() => {
	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
	// console.log('Я тут BoxesListViewWidget')
	// console.log(shelvesData)
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const shelfId = useSelector(getViewPageShelfId) ?? 'all'
	const boxId = useSelector(getViewPageBoxIdChecked)
	const viewPageIsLoading = useSelector(getViewPageIsLoading)

	const tabs = useMemo(() => {
		if (viewPageIsLoading || isShelvesLoading) return
		const tabs: TabItem[] = [
			{ value: 'all', content: t('all cards') },
			{ value: 'new', content: t('new cards') },
		]
		if (shelfId === 'all') {
			tabs.push(
				{ value: 'learning', content: t('learning cards') },
				{ value: 'learnt', content: t('learnt cards') })
			return tabs
		} else {
			const boxesData = shelvesData?.find(shelf => shelf.id === shelfId)?.boxesData
			boxesData?.slice(1, boxesData?.length - 1).forEach(box => {
				tabs.push({ value: String(box.index), content: `${t('box text')} ${box.index}` })
			})
			tabs.push({ value: 'learnt', content: t('learnt cards') })
			return tabs
		}
	}, [isShelvesLoading, viewPageIsLoading, shelvesData, shelfId, t])

	const onBoxClick = useCallback((tabItem: TabItem) => {
		dispatch(viewPageActions.setActiveBoxId(tabItem.value))
	}, [dispatch])

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
			isLoading={isShelvesLoading || viewPageIsLoading}
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



// import {
// 	getViewPageIsLoading,
// 	getViewPageShelfId,
// 	viewPageActions
// } from '@/features/ViewPageInitializer';
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { Skeleton } from '@/shared/ui/Skeleton';
// import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
// import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
// import { useGetShelvesQuery } from '@/entities/Cupboard';
// import { getViewPageBoxIdChecked } from '@/features/ViewPageInitializer';
// import cls from './BoxesListViewWidget.module.scss'

// export const BoxesListViewWidget = memo(() => {
// 	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
// 	const { t } = useTranslation()
// 	const dispatch = useAppDispatch()
// 	const shelfId = useSelector(getViewPageShelfId) ?? 'all'
// 	const boxId = useSelector(getViewPageBoxIdChecked)
// 	const viewPageIsLoading = useSelector(getViewPageIsLoading)

// 	const tabs = useMemo(() => {
// 		if (viewPageIsLoading || isShelvesLoading) return
// 		const tabs: TabItem[] = [
// 			{ value: 'all', content: t('all cards') },
// 			{ value: 'new', content: t('new cards') },
// 		]
// 		if (shelfId === 'all') {
// 			tabs.push(
// 				{ value: 'learning', content: t('learning cards') },
// 				{ value: 'learnt', content: t('learnt cards') })
// 			return tabs
// 		} else {
// 			const boxesData = shelvesData?.find(shelf => shelf.id === shelfId)?.boxesData
// 			boxesData?.slice(1, boxesData?.length - 1).forEach(box => {
// 				tabs.push({ value: String(box.index), content: `${t('box text')} ${box.index}` })
// 			})
// 			tabs.push({ value: 'learnt', content: t('learnt cards') })
// 			return tabs
// 		}
// 	}, [isShelvesLoading, viewPageIsLoading, shelvesData, shelfId, t])

// 	const onBoxClick = useCallback((tabItem: TabItem) => {
// 		dispatch(viewPageActions.setActiveBoxId(tabItem.value))
// 	}, [dispatch])


// 	if (!tabs) {
// 		return <Skeleton width={700} height={40} borderRadius='8px' />
// 	}

// 	const hasActive = tabs.find((item) => item.value === boxId)

// 	return (
// 		<div
// 			className={cls.boxesListViewWidgetWrapper}
// 		>
// 			<Tabs
// 				tabs={tabs}
// 				onTabClick={onBoxClick}
// 				// className={cls.tabsList}
// 				value={hasActive ? boxId?.toString() : 'new'}
// 			/>
// 		</div>
// 	)
// })

// BoxesListViewWidget.displayName = 'BoxesListViewWidget'