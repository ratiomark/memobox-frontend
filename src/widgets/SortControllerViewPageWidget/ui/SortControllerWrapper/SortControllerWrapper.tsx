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

interface SortControllerWrapperProps {
	className?: string
}

export const SortControllerWrapper = (props: SortControllerWrapperProps) => {
	const {
		className
	} = props

	const columns = useSelector(getViewPageColumns)
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
	const activeSort = 'createdAt'
	console.log(columns)
	const { t } = useTranslation()
	// const [params, setParams] = useSearchParams()
	// const { shelfId } = useParams()
	// if (shelfId === 'all') {
	const handleDirection = () => {
		if (sortDirection === 'asc') {
			setSortDirection('desc')
			return
		}
		setSortDirection('asc')
	}
	// }
	// useEffect(() => {
	// 	setParams({ sort: 'someCoolSort' })
	const columnsRendered = useMemo(() => {
		return columns?.map(item => {
			const sortValue = item.value
			// if (item.value === 'createdAt' || item.value === 'lastTraining') {
			// 	return <MyText saveOriginal text={formatDate(card[item.value])} size='s' />
			// }
			return (
				<button
					className={clsx(cls[`${sortValue}Wrapper`], cls.wrapper)}
					key={sortValue}
					onClick={handleDirection}
				>
					<MyText text={t(item.content)} size='s' className={cls[sortValue]} />
					<Icon
						width={8}
						height={8}
						Svg={TriangleIcon}
						className={clsx(cls.arrow, sortDirection === 'asc' ? '' : cls.rotateArrow)}
						type={sortValue === activeSort ? 'main' : 'hint'}
					/>
				</button>
			)
		})
	}, [columns, t, activeSort, sortDirection, handleDirection])


	// }, [])
	// console.log(params.get('sort'))


	return (
		<div className={clsx(
			cls.SortControllerWrapper,
			className)}
		>
			<MyText text={t('question')} className={cls.mainContent} size='s' />
			<MyText text={t('answer')} className={cls.mainContent} size='s' />
			{columnsRendered}
		</div>
	)
}