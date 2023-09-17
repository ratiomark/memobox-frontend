import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './SortControllerViewPageWidget.module.scss';
import { useSelector } from 'react-redux';
import { getViewPageColumns, getViewPageIsLoading, getViewPageSortOrder } from '@/features/ViewPageInitializer';
import { MyText } from '@/shared/ui/Typography';
import { SortItem } from './SortItem';
import { getViewPageSort, getViewPageSortChecked } from '@/features/ViewPageInitializer';
import { useMemo } from 'react';

interface SortControllerWrapperProps {
	className?: string
}

export const SortControllerViewPageWidget = (props: SortControllerWrapperProps) => {
	const {
		className
	} = props

	const columns = useSelector(getViewPageColumns)
	// const activeSort = useSelector(getViewPageSort)
	const activeSort = useSelector(getViewPageSortChecked)
	// const sortOrder = useSelector(getViewPageSortOrder)
	const viewPageIsLoading = useSelector(getViewPageIsLoading)

	const { t } = useTranslation()

	const columnsRendered = useMemo(() => {
		return columns?.map(column => {
			if (column.enabled) {
				return <SortItem key={column.value} column={column} activeSort={activeSort} />
			}
		})
	}, [columns, activeSort,])

	return (
		<div className={clsx(
			cls.SortControllerWrapper,
			className)}
		>
			<div className={cls.mainContentWrapper} >
				<MyText text={t('question')} className={cls.mainContent} size='s' />
				<MyText text={t('answer')} className={cls.mainContent} size='s' />
			</div>
			{columnsRendered}
		</div>
	)
}
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './SortControllerViewPageWidget.module.scss';
// import { useEffect, useMemo, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { getViewPageColumns, getViewPageSortOrder } from '@/features/ViewPageInitializer';
// import { MyText } from '@/shared/ui/Typography';
// import { SortItem } from './SortItem';
// import { getViewPageSort, getViewPageSortChecked } from '@/features/ViewPageInitializer';
// import { HStack } from '@/shared/ui/Stack';

// interface SortControllerWrapperProps {
// 	className?: string
// }

// export const SortControllerViewPageWidget = (props: SortControllerWrapperProps) => {
// 	const {
// 		className
// 	} = props

// 	const columns = useSelector(getViewPageColumns)
// 	// const activeSort = useSelector(getViewPageSort)
// 	const activeSort = useSelector(getViewPageSortChecked)
// 	// const sortOrder = useSelector(getViewPageSortOrder)

// 	const { t } = useTranslation()

// 	const columnsRendered = useMemo(() => {
// 		return columns?.map(column => {
// 			if (column.enabled) {
// 				return <SortItem key={column.value} column={column} activeSort={activeSort} />
// 			}
// 		})
// 	}, [columns, activeSort,])

// 	return (
// 		<div className={clsx(
// 			cls.SortControllerWrapper,
// 			className)}
// 		>
// 			<div className={cls.mainContentWrapper} >
// 				<MyText text={t('question')} className={cls.mainContent} size='s' />
// 				<MyText text={t('answer')} className={cls.mainContent} size='s' />
// 			</div>
// 			{columnsRendered}
// 		</div>
// 	)
// }