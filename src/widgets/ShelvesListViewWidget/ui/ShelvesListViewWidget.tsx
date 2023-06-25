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

const testItems = [
	{
		'value': '6483a58bf88499913bd8dded',
		'content': 'shelf 0',
		'title': 'culpa'
	},
	{
		'value': '6483a58baa8e8dc4d1b95c5e',
		'content': 'shelf 1',
		'title': 'duis'
	},
	{
		'value': '6483a58be7c470df45f086f7',
		'content': 'shelf 2',
		'title': 'mollit'
	},
	{
		'value': '6483a58b6dd7dd8b504dbb9c',
		'content': 'shelf 3',
		'title': 'sint'
	},
	{
		'value': '6483a58b31c3a713db5f91c4',
		'content': 'shelf 4',
		'title': 'minim'
	},
	{
		'value': '6483a58bc887119e044d10b0',
		'content': 'shelf 5',
		'title': 'veniam'
	},
	{
		'value': '6483a58b4b7c55701846582a',
		'content': 'shelf 6',
		'title': 'aliquip'
	},
	{
		'value': '6483a58bb271509aa4c56387',
		'content': 'shelf 7',
		'title': 'adipisicing'
	},
	{
		'value': '6483a58bb65584c097cd95ff',
		'content': 'shelf 8',
		'title': 'ex'
	},
	{
		'value': '6483a58b92f733ec18d31a71',
		'content': 'shelf 9',
		'title': 'veniam'
	},
	{
		'value': '6483a58b23c6be25d8cfbe3c',
		'content': 'shelf 10',
		'title': 'ullamco'
	},
	{
		'value': '6483a58ba9acbf99e2b6cf5d',
		'content': 'shelf 11',
		'title': 'voluptate'
	},
	{
		'value': '6483a58b8de74e25b7af41cb',
		'content': 'shelf 12',
		'title': 'occaecat'
	},
	{
		'value': '6483a58b5bff673ac6d25924',
		'content': 'shelf 13',
		'title': 'laborum'
	},
	{
		'value': '6483a58be9f31fcf5109fa2e',
		'content': 'shelf 14',
		'title': 'id'
	},
	{
		'value': '6483a58bd9cf2419c2d3e432',
		'content': 'shelf 15',
		'title': 'duis'
	},
	{
		'value': '6483a58b49deee2850563ff0',
		'content': 'shelf 16',
		'title': 'consectetur'
	},
	{
		'value': '6483a58badadce71576a3857',
		'content': 'shelf 17',
		'title': 'elit'
	},
	{
		'value': '6483a58b34460130b3f3bf0e',
		'content': 'shelf 18',
		'title': 'laboris'
	},
	{
		'value': '6483a58b2e2661751aab51e6',
		'content': 'shelf 19',
		'title': 'cillum'
	},
	{
		'value': '6483a58b69443879c600e8b7',
		'content': 'shelf 20',
		'title': 'esse'
	},
	{
		'value': '6483a58be426efb5480c4f36',
		'content': 'shelf 21',
		'title': 'ea'
	},
	{
		'value': '6483a58b87b2e2d0fa2c69ff',
		'content': 'shelf 22',
		'title': 'mollit'
	},
	{
		'value': '6483a58b5126de2ea057af34',
		'content': 'shelf 23',
		'title': 'velit'
	},
	{
		'value': '6483a58b10dd4199a27826b2',
		'content': 'shelf 24',
		'title': 'sint'
	},
	{
		'value': '6483a58bc549cdcef38f8ea4',
		'content': 'shelf 25',
		'title': 'cupidatat'
	},
	{
		'value': '6483a58bbadfae5b539f18e2',
		'content': 'shelf 26',
		'title': 'laboris'
	},
	{
		'value': '6483a58b771e1e5bacd582ca',
		'content': 'shelf 27',
		'title': 'dolor'
	},
	{
		'value': '6483a58b6887b225a936ffb5',
		'content': 'shelf 28',
		'title': 'voluptate'
	},
	{
		'value': '6483a58b002f3c8b64510d28',
		'content': 'shelf 29',
		'title': 'elit'
	},
	{
		'value': '6483a58bce026ab71ccab143',
		'content': 'shelf 30',
		'title': 'amet'
	},
	{
		'value': '6483a58bb23bfb805ba4cba3',
		'content': 'shelf 31',
		'title': 'ipsum'
	},
	{
		'value': '6483a58b4f3b90028cfddea2',
		'content': 'shelf 32',
		'title': 'sit'
	},
	{
		'value': '6483a58b5331d95d4b1490c7',
		'content': 'shelf 33',
		'title': 'cillum'
	},
	{
		'value': '6483a58b57983dcad0dbbff8',
		'content': 'shelf 34',
		'title': 'pariatur'
	},
	{
		'value': '6483a58bd5e9e500ed927389',
		'content': 'shelf 35',
		'title': 'dolor'
	},
	{
		'value': '6483a58b7e007ba8f30449b5',
		'content': 'shelf 36',
		'title': 'sint'
	},
	{
		'value': '6483a58bc5fdeb9ad1ad325c',
		'content': 'shelf 37',
		'title': 'deserunt'
	},
	{
		'value': '6483a58b23c199bf3bebbfc7',
		'content': 'shelf 38',
		'title': 'esse'
	},
	{
		'value': '6483a58b21b0d3361390fc93',
		'content': 'shelf 39',
		'title': 'dolor'
	}
]
export const ShelvesListViewWidget = memo((props: ShelvesListViewWidgetProps) => {
	const {
		className
	} = props

	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
	const { t } = useTranslation()
	const navigate = useNavigate()
	const items = useMemo(() => {
		if (isShelvesLoading) return []
		const items = [{ value: 'all', content: 'Common shelf' }]
		shelvesData?.forEach(shelfItem => {
			items.push({
				value: shelfItem.id,
				content: shelfItem.title
			})
		})
		return items
	}, [shelvesData, isShelvesLoading])
	// }, [shelvesData, isShelvesLoading])
	// // нужно подтягивать полку + коробку которую последний раз смотрел пользвоатель, то есть юзать jsonSettings юзера. Если там будет пусто, то юзать первую полку с отображением "все".
	const dispatch = useAppDispatch()
	const shelfId = useSelector(getViewPageShelfId) ?? 'all'
	// const lastBoxId = useSelector(getLastBoxIdByShelfId(shelfId!))

	const onChangeShelf = useCallback((shelfId: string) => {
		dispatch(viewPageActions.setActiveShelfId(shelfId))
		navigate(obtainRouteView(shelfId))
	}, [dispatch, navigate])

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
