import { obtainRouteView, } from '@/app/providers/router/config/routeConfig/routeConfig';
import { getViewPageIsMounted, getViewPageSavedShelf, getViewPageShelfId, viewPageActions } from '@/features/ViewPageInitializer';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import clsx from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cls from './BoxesListViewWidget.module.scss';
// import { useSelector } from 'react-redux';
// import { getViewPage } from '@/features/ViewPageInitializer/model/selectors/getViewPageInitializer';

interface BoxesListViewWidgetProps {
	className?: string
}

export const BoxesListViewWidget = memo((props: BoxesListViewWidgetProps) => {
	const {
		className
	} = props
	const dispatch = useAppDispatch()
	const shelfId = useSelector(getViewPageShelfId) ?? '1'
	const viewPageIsMounted = useSelector(getViewPageIsMounted)
	const shelfDataSaved = useSelector(getViewPageSavedShelf(shelfId ?? '1'))
	const navigate = useNavigate()
	const { t } = useTranslation()

	const tabs = useMemo(() => {
		// console.log('РЕНДЕР', viewPageIsMounted, shelfDataSaved)
		if (!viewPageIsMounted || shelfDataSaved?.isLoading) return []
		const tabs = [{
			value: 'all', content: 'all',
		},
		{
			value: 'new', content: 'new',
		}]
		Object.keys(shelfDataSaved!.data).forEach(item => {
			tabs.push({ value: item, content: `коробка ${item}` })
		})
		tabs.push({ value: 'learnt', content: 'learnt' })
		return tabs
	}, [shelfDataSaved, viewPageIsMounted])

	const onBoxClick = useCallback((tabItem: TabItem) => {
		dispatch(viewPageActions.setLastBoxId({ boxId: tabItem.value, shelfId }))
		navigate(obtainRouteView(shelfId, tabItem.value))
	}, [dispatch, shelfId, navigate])

	if (!viewPageIsMounted || shelfDataSaved?.isLoading) {
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
				value={shelfDataSaved?.lastBoxId ?? 'new'}
			/>

		</div>
	)
})
BoxesListViewWidget.displayName = 'BoxesListViewWidget'