import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { CommonShelfButtons } from '../CommonShelfButtons/CommonShelfButtons';
import { Heading } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCupboardCommonShelfCollapsed, getCupboardData, getIsCupboardFirstRender, getIsCupboardLoading, getIsCupboardRefetching } from '../../model/selectors/getCupboardShelfList';
import { BoxesBlockSkeleton } from '@/entities/Box';
import { CommonShelfBoxes } from '../CommonShelfBoxes/CommonShelfBoxes';
import { CommonShelfButtonsSkeleton } from '../CommonShelfButtons/CommonShelfButtonsSkeleton';
import { motion } from 'framer-motion'
import cls from './CommonShelf.module.scss';
// eslint-disable-next-line custom-fsd-checker-plugin/public-api-imports
import shelfCls from '@/entities/Shelf/ui/Shelf.module.scss';
import { AnimateSkeletonLoader, Collapsible } from '@/shared/ui/Animations';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';
import { DURATION_SHELF_COLLAPSING_SEC } from '@/shared/const/animation';

export const CommonShelfSkeleton = memo(() => {
	const data = useSelector(getCupboardData)
	const isCupboardLoading = useSelector(getIsCupboardLoading)
	const commonShelfCollapsed = useSelector(getCupboardCommonShelfCollapsed)
	const isFirstRender = useSelector(getIsCupboardFirstRender)
	const isRefetching = useSelector(getIsCupboardRefetching)
	const isLoading = isCupboardLoading && isFirstRender

	const { t } = useTranslation()

	const boxesBlock = (
		<AnimateSkeletonLoader
			skeletonComponent={<BoxesBlockSkeleton />}
			componentAfterLoading={<CommonShelfBoxes />}
			noDelay={!isLoading}
			// noDelay={!isCupboardLoading && !isFirstRender}
			classNameForCommonWrapper={cls.substitute}
			classNameAbsoluteParts={cls.setBoxesLeft}
			isLoading={true}
		/>)

	const buttons = (
		<AnimateSkeletonLoader
			skeletonComponent={<CommonShelfButtonsSkeleton />}
			componentAfterLoading={<CommonShelfButtons />}
			noDelay={!isLoading}
			// noDelay={!isCupboardLoading && !isFirstRender}
			classNameForCommonWrapper={cls.commonWrapper}
			isLoading={true}
		/>)



	return (
		<motion.div
			layout
			// transition={{ type: 'spring', stiffness: 80, duration: 0.3 }}
			className={shelfCls.shelf}
		>
			<div className={shelfCls.shelfTitleContainer} >

				<Heading as='h3' noSelect size='xs' title={t('common shelf name')} />
			</div>
			<div className={shelfCls.topShelfPart}>
				<div className={shelfCls.smallDataLabelsWrapper} >
					<CompleteSmallDataLabels data={data} isLoading={true} />
				</div>
				<div>
					{buttons}
				</div>

			</div>
			<Collapsible
				// mode='sync'
				// delay={2}
				animationDuration={DURATION_SHELF_COLLAPSING_SEC}
				initial={isFirstRender}
				// isOpen={!localDataService.getCommonShelfCollapsed()}
				isOpen={isLoading ?
					!localDataService.getCommonShelfCollapsed()
					// 	// ? false
					// 	// : true
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
