import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { Icon } from '@/shared/ui/Icon';
import MultiSelectIcon from '@/shared/assets/icons/multiSelect.svg'
import cls from './ShelvesListViewWidget.module.scss';
import { memo, useCallback, useMemo } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getViewPageShelfId, viewPageActions } from '@/features/ViewPageInitializer';
import { ListBox } from '@/shared/ui/Popup';
import { MyText } from '@/shared/ui/Typography';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { HorizontalScrollerList } from '@/shared/ui/HorizontalScrollerList';
import { useNavigate } from 'react-router-dom';
import { obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { Skeleton } from '@/shared/ui/Skeleton';
// import { getLastBoxIdByShelfId } from '@/features/ViewPageInitializer/model/selectors/getViewPageInitializer';


interface ShelvesListViewWidgetProps {
	className?: string
}

export const ShelvesListViewWidget = memo((props: ShelvesListViewWidgetProps) => {
	const {
		className
	} = props

	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
	const { t } = useTranslation()
	const navigate = useNavigate()

	// }, [shelvesData, isShelvesLoading])
	// // нужно подтягивать полку + коробку которую последний раз смотрел пользвоатель, то есть юзать jsonSettings юзера. Если там будет пусто, то юзать первую полку с отображением "все".
	const dispatch = useAppDispatch()
	const shelfId = useSelector(getViewPageShelfId) ?? 'all'
	// const lastBoxId = useSelector(getLastBoxIdByShelfId(shelfId!))

	const onChangeShelf = useCallback((shelfId: string) => {
		dispatch(viewPageActions.setActiveShelfId(shelfId))
		// navigate(obtainRouteView(shelfId))
	}, [dispatch])
	
	const items = useMemo(() => {
		if (isShelvesLoading) return []
		const items = [{ value: 'all', content: t('common shelf name'), onChange: () => onChangeShelf('all') }]
		shelvesData?.forEach(shelfItem => {
			items.push({
				value: shelfItem.id,
				content: shelfItem.title,
				onChange: () => onChangeShelf(shelfItem.id),
			})
		})
		return items
	}, [shelvesData, isShelvesLoading, onChangeShelf, t])
	// const onChangeShelf = useCallback((shelfId: string) => {
	// 	dispatch(viewPageActions.setActiveShelfId(shelfId))
	// 	navigate(obtainRouteView(shelfId))
	// }, [dispatch, navigate])

	// if (!items) return <p>загрукза</p>

	return (
		<div className={clsx(
			cls.shelvesListViewWidget,
			className)}
		>
			<Icon
				Svg={MultiSelectIcon}
			/>
			{/* {isShelvesLoading ? <Skeleton width={400} height={18} /> : null} */}
			{/* Общая полка */}
			{/* горизонтальный скролл списка с полками */}
			{/* <AppLink text={} */}
			{/* <ListBox
				value={shelfId}
				items={items}
				onChange={onChangeShelf}
			/> */}
			<HorizontalScrollerList value={shelfId} items={items} />

		</div>
	)
})
ShelvesListViewWidget.displayName = 'ShelvesListViewWidget'

// export const ShelvesListViewWidget = memo((props: ShelvesListViewWidgetProps) => {
// 	const {
// 		className
// 	} = props
// 	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
// 	const { t } = useTranslation()
// 	const navigate = useNavigate()
// 	const items = useMemo(() => {
// 		return shelvesData?.map(shelfItem => {
// 			return {
// 				value: (shelfItem.index + 1).toString(),
// 				// value: shelfItem._id,
// 				content: shelfItem.title
// 			}
// 		})
// 	}, [shelvesData])
// 	// // нужно подтягивать полку + коробку которую последний раз смотрел пользвоатель, то есть юзать jsonSettings юзера. Если там будет пусто, то юзать первую полку с отображением "все".
// 	const dispatch = useAppDispatch()
// 	const shelfId = useSelector(getViewPageShelfId) ?? '1'
// 	// const lastBoxId = useSelector(getLastBoxIdByShelfId(shelfId!))

// 	const onChangeShelf = useCallback((shelfId: string) => {
// 		dispatch(viewPageActions.setActiveShelfId(shelfId))
// 		navigate(obtainRouteView(shelfId))
// 	}, [dispatch, navigate])

// 	// if (!items) return <p>загрукза</p>

// 	return (
// 		<div className={clsx(
// 			cls.shelvesListViewWidget,
// 			className)}
// 		>
// 			<Icon
// 				Svg={MultiSelectIcon}
// 			/>
// 			{/* Общая полка */}
// 			{/* горизонтальный скролл списка с полками */}
// 			{/* <AppLink text={} */}
// 			<ListBox
// 				value={shelfId}
// 				items={items}
// 				onChange={onChangeShelf}
// 			/>
// 			<HorizontalScrollerList value={shelfId} items={items} />

// 		</div>
// 	)
// })
// ShelvesListViewWidget.displayName = 'ShelvesListViewWidget'
