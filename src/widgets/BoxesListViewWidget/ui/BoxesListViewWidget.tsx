import { obtainRouteView, } from '@/app/providers/router/config/routeConfig/routeConfig';
import { getViewPageIsLoading, getViewPageIsMounted, getViewPageSavedShelf, getViewPageShelfId, viewPageActions } from '@/features/ViewPageInitializer';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import clsx from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import cls from './BoxesListViewWidget.module.scss';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { t } from 'i18next';
// import { useSelector } from 'react-redux';
// import { getViewPage } from '@/features/ViewPageInitializer/model/selectors/getViewPageInitializer';
const commonShelf = [
	{ value: 'all', content: t('all') },
	{ value: 'new', content: t('new') },
	{ value: 'learning', content: t('learning') },
	{ value: 'learnt', content: t('learnt') }
]

interface BoxesListViewWidgetProps {
	className?: string
}

export const BoxesListViewWidget = memo((props: BoxesListViewWidgetProps) => {
	const {
		className
	} = props
	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
	const dispatch = useAppDispatch()
	const shelfId = useSelector(getViewPageShelfId) ?? 'all'
	// const viewPageIsMounted = useSelector(getViewPageIsMounted)
	const viewPageIsLoading = useSelector(getViewPageIsLoading)

	const { boxId } = useParams<{ boxId: string }>()
	const navigate = useNavigate()
	const { t } = useTranslation()


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
			boxesData?.slice(1, boxesData?.length - 2).forEach(box => {
				tabs.push({ value: box.index, content: `${t('box text')} ${box.index}` })
			})
			tabs.push({ value: 'learnt', content: t('learnt cards') })
			return tabs
		}
	}, [isShelvesLoading, viewPageIsLoading, shelvesData, shelfId, t])

	const onBoxClick = useCallback((tabItem: TabItem) => {
		dispatch(viewPageActions.setActiveBoxId(tabItem.value))
		navigate(obtainRouteView(shelfId, tabItem.value))
	}, [dispatch, shelfId, navigate])

	if (!tabs) {
		return <Skeleton width={500} height={40} />
	}

	return (
		<div className={clsx(
			cls.boxesListViewWidget,
			className)}
		>
			<Tabs
				tabs={tabs}
				onTabClick={onBoxClick}
				value={boxId ?? 'new'}
			/>

		</div>
	)
})
BoxesListViewWidget.displayName = 'BoxesListViewWidget'
// import { obtainRouteView, } from '@/app/providers/router/config/routeConfig/routeConfig';
// import { getViewPageIsMounted, getViewPageSavedShelf, getViewPageShelfId, viewPageActions } from '@/features/ViewPageInitializer';
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { Skeleton } from '@/shared/ui/Skeleton';
// import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
// import clsx from 'clsx';
// import { memo, useCallback, useMemo } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import cls from './BoxesListViewWidget.module.scss';
// // import { useSelector } from 'react-redux';
// // import { getViewPage } from '@/features/ViewPageInitializer/model/selectors/getViewPageInitializer';

// interface BoxesListViewWidgetProps {
// 	className?: string
// }

// export const BoxesListViewWidget = memo((props: BoxesListViewWidgetProps) => {
// 	const {
// 		className
// 	} = props
// 	const dispatch = useAppDispatch()
// 	const shelfId = useSelector(getViewPageShelfId) ?? 'all'
// 	const viewPageIsMounted = useSelector(getViewPageIsMounted)
// 	const shelfDataSaved = useSelector(getViewPageSavedShelf(shelfId ?? 'all'))
// 	const { boxId } = useParams<{ boxId: string }>()
// 	const navigate = useNavigate()
// 	const { t } = useTranslation()

// 	const tabs = useMemo(() => {
// 		const isLoading = shelfDataSaved?.isLoading ?? true
// 		if (isLoading) return
// 		const data = shelfDataSaved!.data
// 		const tabs = [{
// 			value: 'all', content: 'all',
// 		},
// 		{
// 			value: 'new', content: 'new',
// 		}]
// 		Object.keys(data).forEach(item => {
// 			tabs.push({ value: item, content: `коробка ${item}` })
// 		})
// 		tabs.push({ value: 'learnt', content: 'learnt' })
// 		return tabs
// 	}, [shelfDataSaved])

// 	const onBoxClick = useCallback((tabItem: TabItem) => {
// 		dispatch(viewPageActions.setLastBoxId({ boxId: tabItem.value, shelfId }))
// 		navigate(obtainRouteView(shelfId, tabItem.value))
// 	}, [dispatch, shelfId, navigate])

// 	if (!tabs) {
// 		return <Skeleton width={500} height={40} />
// 	}

// 	return (
// 		<div className={clsx(
// 			cls.boxesListViewWidget,
// 			className)}
// 		>
// 			<Tabs
// 				tabs={tabs}
// 				onTabClick={onBoxClick}
// 				value={boxId ?? shelfDataSaved?.lastBoxId ?? 'new'}
// 			/>

// 		</div>
// 	)
// })
// BoxesListViewWidget.displayName = 'BoxesListViewWidget'