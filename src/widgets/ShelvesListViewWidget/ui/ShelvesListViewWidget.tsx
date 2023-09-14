import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { Icon } from '@/shared/ui/Icon';
import { memo, useCallback, useMemo, useRef } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
	getViewPageIsLoading,
	getViewPageIsMounted,
	getViewPageShelfId,
	viewPageActions,
} from '@/features/ViewPageInitializer';
import { HorizontalScrollerList } from '@/shared/ui/HorizontalScrollerList';
import MultiSelectIcon from '@/shared/assets/icons/multiSelect.svg'
import cls from './ShelvesListViewWidget.module.scss';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { ShelvesListViewWidgetSkeleton, Skeleton } from '@/shared/ui/Skeleton';
import { HStack } from '@/shared/ui/Stack';


interface ShelvesListViewWidgetProps {
	className?: string
}

export const ShelvesListViewWidget = memo((props: ShelvesListViewWidgetProps) => {
	const {
		className
	} = props

	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
	const { t } = useTranslation()

	const dispatch = useAppDispatch()
	const shelfId = useSelector(getViewPageShelfId) ?? 'all'


	const onChangeShelf = useCallback((shelfId: string) => {
		dispatch(viewPageActions.setActiveShelfId(shelfId))
	}, [dispatch])

	const items = useMemo(() => {
		if (isShelvesLoading) return
		const items = [{ value: 'all', content: t('common shelf name'), onChange: () => onChangeShelf('all') }]
		shelvesData?.forEach(shelfItem => {
			items.push({
				value: shelfItem.id,
				content: shelfItem.title,
				onChange: () => onChangeShelf(shelfItem.id),
			})
		})
		// shelvesData?.forEach(shelfItem => {
		// 	items.push({
		// 		value: shelfItem.id + 'ds',
		// 		content: shelfItem.title + ' 2',
		// 		onChange: () => onChangeShelf(shelfItem.id + 'ds'),
		// 	})
		// })
		// shelvesData?.forEach(shelfItem => {
		// 	items.push({
		// 		value: shelfItem.id + 'dss',
		// 		content: shelfItem.title + ' 3',
		// 		onChange: () => onChangeShelf(shelfItem.id + 'dss'),
		// 	})
		// })
		// shelvesData?.forEach(shelfItem => {
		// 	items.push({
		// 		value: shelfItem.id+'ds',
		// 		content: shelfItem.title+ ' 2',
		// 		onChange: () => onChangeShelf(shelfItem.id+'ds'),
		// 	})
		// })
		// shelvesData?.forEach(shelfItem => {
		// 	items.push({
		// 		value: shelfItem.id+'dss',
		// 		content: shelfItem.title+ ' 3',
		// 		onChange: () => onChangeShelf(shelfItem.id+'dss'),
		// 	})
		// })
		// shelvesData?.forEach(shelfItem => {
		// 	items.push({
		// 		value: shelfItem.id+'ds',
		// 		content: shelfItem.title+ ' 2',
		// 		onChange: () => onChangeShelf(shelfItem.id+'ds'),
		// 	})
		// })
		// shelvesData?.forEach(shelfItem => {
		// 	items.push({
		// 		value: shelfItem.id+'dss',
		// 		content: shelfItem.title+ ' 3',
		// 		onChange: () => onChangeShelf(shelfItem.id+'dss'),
		// 	})
		// })
		return items
	}, [shelvesData, isShelvesLoading, onChangeShelf, t])


	const content = (
		<AnimateSkeletonLoader
			isLoading={isShelvesLoading}
			noDelay={(items && items?.length > 1)}
			skeletonComponent={<ShelvesListViewWidgetSkeleton />}
			commonWrapper={false}
			classNameAbsoluteParts={cls.shelfItems}
			componentAfterLoading={(
				<div
					className={cls.wrapper}
				>
					<Icon
						Svg={MultiSelectIcon}
						className={cls.listIcon}
					/>
					<HorizontalScrollerList value={shelfId} items={items} />
				</div>
			)}
		/>)


	return (
		<div className={clsx(
			cls.shelvesListViewWidget,
			className)}
		>
			{/* <Icon
				Svg={MultiSelectIcon}
			/> */}
			{/* <HorizontalScrollerList value={shelfId} items={items} /> */}
			{content}
		</div>
	)
})

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
