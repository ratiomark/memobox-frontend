import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './SortControllerViewPageWidget.module.scss';
import { MyText } from '@/shared/ui/Typography';
import TriangleIcon from '@/shared/assets/icons/triangleIcon2.svg'
import { Icon } from '@/shared/ui/Icon';
import { MouseEvent, useState } from 'react';
import { SortColumnObject, SortColumnValue } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { viewPageActions } from '@/features/ViewPageInitializer';
import { SortOrderType } from '@/shared/types/SortOrderType';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';

interface SortItemProps {
	className?: string
	column: SortColumnObject
	activeSort: SortColumnValue
}

export const SortItem = (props: SortItemProps) => {
	const {
		column,
		activeSort,
	} = props

	const [sortOrder, setSortOrder] = useState<SortOrderType>(localDataService.getSortOrderViewPage())
	const dispatch = useAppDispatch()
	const { t } = useTranslation('viewPage')

	const onSortClick = () => {
		// console.log('SORT')
		if (sortOrder === 'asc') {
			setSortOrder('desc')
			dispatch(viewPageActions.setActiveSort(column.value))
			dispatch(viewPageActions.setSortOrder('desc'))
			localDataService.setSortOrderViewPage('desc')
			localDataService.setSortValueViewPage(column.value)
			return
		}
		setSortOrder('asc')
		dispatch(viewPageActions.setActiveSort(column.value))
		dispatch(viewPageActions.setSortOrder('asc'))
		localDataService.setSortOrderViewPage('asc')
		localDataService.setSortValueViewPage(column.value)
		// dispatch(viewPageActions.setActiveSort(column.value))
		// dispatch(viewPageActions.setSortOrder(sortOrder))
	}

	const handleDirection = (e: MouseEvent) => {
		e.stopPropagation()
		// console.log('ORDER')
		if (sortOrder === 'asc') {
			setSortOrder('desc')
			dispatch(viewPageActions.setActiveSort(column.value))
			dispatch(viewPageActions.setSortOrder('desc'))
			localDataService.setSortOrderViewPage('desc')
			localDataService.setSortValueViewPage(column.value)
			return
		}
		setSortOrder('asc')
		dispatch(viewPageActions.setActiveSort(column.value))
		dispatch(viewPageActions.setSortOrder('asc'))
		localDataService.setSortOrderViewPage('asc')
		localDataService.setSortValueViewPage(column.value)
	}


	const sortValue = column.value

	return (
		<button
			className={clsx(cls[`${sortValue}Wrapper`], cls.wrapper)}
			key={sortValue}
			onClick={onSortClick}
		>
			<MyText
				className={cls[sortValue]}
				text={t(column.content)}
				size='s'
				variant={activeSort === column.value ? 'accent' : 'primary'}
			/>
			<Icon
				// clickable
				onClick={handleDirection}
				width={8}
				height={8}
				Svg={TriangleIcon}
				className={clsx(cls.arrow, sortOrder === 'asc' ? '' : cls.rotateArrow)}
				type={sortValue === activeSort ? 'main' : 'hint'}
			/>
		</button>
	)
}