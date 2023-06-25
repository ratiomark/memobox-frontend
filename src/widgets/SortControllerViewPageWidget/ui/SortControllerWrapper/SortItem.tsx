import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './SortControllerWrapper.module.scss';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getViewPageColumns } from '@/features/ViewPageInitializer';
import { MyText } from '@/shared/ui/Typography';
import TriangleIcon from '@/shared/assets/icons/triangleIcon2.svg'
import { Icon } from '@/shared/ui/Icon';
import { SortColumnObject, SortColumnValue } from '../../model/types/SortControllerViewPageWidgetSchema';

interface SortItemProps {
	className?: string
	column: SortColumnObject
	activeSort: SortColumnValue
}

export const SortItem = (props: SortItemProps) => {
	const {
		className,
		column,
		activeSort, 
	} = props

	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
	const { t } = useTranslation()
	const handleDirection = () => {
		if (sortDirection === 'asc') {
			setSortDirection('desc')
			return
		}
		setSortDirection('asc')
	}


	const sortValue = column.value

	return (
		<button
			className={clsx(cls[`${sortValue}Wrapper`], cls.wrapper)}
			key={sortValue}
			onClick={handleDirection}
		>
			<MyText text={t(column.content)} size='s' className={cls[sortValue]} />
			<Icon
				width={8}
				height={8}
				Svg={TriangleIcon}
				className={clsx(cls.arrow, sortDirection === 'asc' ? '' : cls.rotateArrow)}
				type={sortValue === activeSort ? 'main' : 'hint'}
			/>
		</button>
	)
}