import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { Icon } from '@/shared/ui/Icon';
import MultiSelectIcon from '@/shared/assets/icons/multiSelect.svg'
import cls from './ShelvesListViewWidget.module.scss';
import { useCallback, useMemo } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getViewPageShelfId, viewPageActions } from '@/features/ViewPageInitializer';
import { ListBox } from '@/shared/ui/Popup';
import { MyText } from '@/shared/ui/Typography';
import { AppLink } from '@/shared/ui/AppLink/AppLink';


interface ShelvesListViewWidgetProps {
	className?: string
}

export const ShelvesListViewWidget = (props: ShelvesListViewWidgetProps) => {
	const {
		className
	} = props
	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
	const { t } = useTranslation()

	const items = useMemo(() => {
		return shelvesData?.map(shelfItem => {
			return {
				value: shelfItem._id,
				content: shelfItem.title
			}
		})
	}, [shelvesData])
	// нужно подтягивать полку + коробку которую последний раз смотрел пользвоатель, то есть юзать jsonSettings юзера. Если там будет пусто, то юзать первую полку с отображением "все".
	const dispatch = useAppDispatch()
	const shelfId = useSelector(getViewPageShelfId)
	const onChangeShelf = useCallback((shelfId: string) => {
		dispatch(viewPageActions.setShelfId(shelfId))
	}, [dispatch])

	return (
		<div className={clsx(
			cls.shelvesListViewWidget,
			className)}
		>
			<Icon
				Svg={MultiSelectIcon}
			/>
			{/* Общая полка */}
			{/* горизонтальный скролл списка с полками */}
			{/* <AppLink text={} */}
			{/* <ListBox
				value={shelfId}
				items={items}
				onChange={onChangeShelf}
			/> */}
			{/* {shelvesData?.map(item => (

				<p key={item.title}>{item.title}</p>
			))} */}
		</div>
	)
}