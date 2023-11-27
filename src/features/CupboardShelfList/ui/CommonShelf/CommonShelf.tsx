import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { CommonShelfButtons } from '../CommonShelfButtons/CommonShelfButtons';
import { Heading } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCupboardCommonShelf, getCupboardCommonShelfCollapsed, getCupboardIsFirstRender } from '../../model/selectors/getCupboardShelfList';
import { Box, BoxesBlockSkeleton } from '@/entities/Box';
import { CommonShelfBoxes } from '../CommonShelfBoxes/CommonShelfBoxes';
import { Skeleton } from '@/shared/ui/Skeleton';
import { CommonShelfButtonsSkeleton } from '../CommonShelfButtons/CommonShelfButtonsSkeleton';
import { AnimatePresence, motion } from 'framer-motion'
import cls from './CommonShelf.module.scss';
import { AnimateSkeletonLoader, Collapsible } from '@/shared/ui/Animations';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';
import { DURATION_SHELF_COLLAPSING_SEC } from '@/shared/const/animation';



interface ShelfProps {
	data?: {
		all: number
		train: number
		wait: number
	}
	isLoading: boolean
	// id?: string | number
	// title?: string
	// position?: number
	// collapsed: boolean
	className?: string
}

export const CommonShelf = memo((props: ShelfProps) => {
	const {
		className,
		data,
		isLoading,
		// collapsed
	} = props
	const commonShelfCollapsed = useSelector(getCupboardCommonShelfCollapsed)
	const isFirstRender = useSelector(getCupboardIsFirstRender)
	// useEffect(() => {
	// 	localDataService.setCommonShelfCollapsed(commonShelfCollapsed)
	// }, [commonShelfCollapsed])
	// const commonShelf = useSelector(getCupboardCommonShelf)
	// const { isSuccess, isLoading, data } = useGetCupboardDataQuery()
	const { t } = useTranslation()

	useEffect(() => {
		// console.log('Common shelf ', isLoading)
	}, [isLoading])

	const boxesBlock = (
		<AnimateSkeletonLoader
			skeletonComponent={<BoxesBlockSkeleton />}
			componentAfterLoading={<CommonShelfBoxes />}
			noDelay={!isLoading}
			classNameForCommonWrapper={cls.substitute}
			classNameAbsoluteParts={cls.setBoxesLeft}
			isLoading={isLoading}
		/>)

	const buttons = (
		<AnimateSkeletonLoader
			skeletonComponent={<CommonShelfButtonsSkeleton />}
			componentAfterLoading={<CommonShelfButtons />}
			noDelay={!isLoading}
			classNameForCommonWrapper={cls.commonWrapper}
			isLoading={isLoading}
		/>)



	return (

		<motion.div
			layout
			// transition={{ type: 'spring', stiffness: 80, duration: 0.3 }}
			className={clsx(
				cls.shelf,
				[className])}
		>
			<div className={cls.topShelfPart}>
				<VStack align='start' gap='gap_8'>
					<Heading as='h3' size='s' title={t('common shelf name')} noSelect />
					<CompleteSmallDataLabels data={data} isLoading={isLoading} />
				</VStack>
				<div>
					{buttons}
				</div>
			</div>
			<Collapsible
				// mode='sync'
				// delay={2}
				animationDuration={DURATION_SHELF_COLLAPSING_SEC}
				initial={isFirstRender}
				isOpen={isLoading ?
					!localDataService.getCommonShelfCollapsed()
					// ? false
					// : true
					: !commonShelfCollapsed}
			>

				{/* {isLoading && !commonShelfCollapsed && <div className={cls.substitute} />} */}
				{boxesBlock}
			</Collapsible>
			{/* <div className={clsx(cls.boxesWrapper, !commonShelfCollapsed ? cls.collapsed : '')}>
				<div className={cls.inner} >
					{boxesBlock}
				</div>
			</div> */}
		</motion.div>
	)
})
