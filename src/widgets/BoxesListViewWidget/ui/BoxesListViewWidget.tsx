import { obtainRouteView, } from '@/app/providers/router/config/routeConfig/routeConfig';
import { getViewPageBoxId, getViewPageIsLoading, getViewPageIsMounted, getViewPageSavedShelf, getViewPageShelfId, viewPageActions } from '@/features/ViewPageInitializer';
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
import { getViewPageBoxIdChecked } from '@/features/ViewPageInitializer';
// import { useSelector } from 'react-redux';
// import { getViewPage } from '@/features/ViewPageInitializer/model/selectors/getViewPageInitializer';
import { motion } from 'framer-motion'
import { CardScroller } from '@/shared/ui/CardScroller';
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

	// const { boxId } = useParams<{ boxId: string }>()
	const boxId = useSelector(getViewPageBoxIdChecked)
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
	// const onBoxClick = useCallbackd((tabItem: TabItem) => {
	// 	dispatch(viewPageActions.setActiveBoxId(tabItem.value))
	// 	navigate(obtainRouteView(shelfId, tabItem.value))
	// }, [dispatch, shelfId, navigate])

	if (!tabs) {
		return <Skeleton width={500} height={40} />
	}
	const hasActive = tabs.find((item) => item.value === boxId)
	// console.log(hasActive, boxId)
	// return (
	// 	<div style={{ maxWidth: 500, }}>

	// 		{/* <CardScroller /> */}
	// 	</div>
	// )
	return (
		<div className={cls.boxesListViewWidgetWrapper}>
			{/* <motion.div
				// layout
				// initial={{ x: -120, opacity: 0 }}
				// animate={{ x: 0, opacity: 1 }}
				// viewport={{ once: true }}
				// transition={{ type: 'spring', duration: 0.5 }}
				// layoutRoot
				className={clsx(
					cls.boxesListViewWidget,
					className)}
			>
				<Tabs
					tabs={tabs}
					onTabClick={onBoxClick}
					className={cls.tabsList}
					value={hasActive ? boxId?.toString() : 'new'}
				/>
			</motion.div> */}
			{/* <div className={cls.additional}>
				</div> */}

			<Tabs
				tabs={tabs}
				onTabClick={onBoxClick}
				// className={cls.tabsList}
				value={hasActive ? boxId?.toString() : 'new'}
				/>
			{/* <div   style={{ position: 'absolute', right: 0, top: 0, height: '100%', }} className={cls.rightTransparent}/> */}
			
		</div>
	)
})

BoxesListViewWidget.displayName = 'BoxesListViewWidget'