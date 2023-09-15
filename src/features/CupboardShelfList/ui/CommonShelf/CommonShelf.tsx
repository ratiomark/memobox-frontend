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
	useEffect(() => {
		localDataService.setCommonShelfCollapsed(commonShelfCollapsed)
	}, [commonShelfCollapsed])
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
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
// import { CommonShelfButtons } from '../CommonShelfButtons/CommonShelfButtons';
// import { Heading } from '@/shared/ui/Typography';
// import { VStack } from '@/shared/ui/Stack';
// import { memo } from 'react';

// import cls from './CommonShelf.module.scss';
// import { useSelector } from 'react-redux';
// import { getCupboardCommonShelf, getCupboardCommonShelfCollapsed } from '../../model/selectors/getCupboardShelfList';
// import { Box, BoxesBlockSkeleton } from '@/entities/Box';
// import { CommonShelfBoxes } from '../CommonShelfBoxes/CommonShelfBoxes';
// import { Skeleton } from '@/shared/ui/Skeleton';
// import { CommonShelfButtonsSkeleton } from '../CommonShelfButtons/CommonShelfButtonsSkeleton';
// import { AnimatePresence, motion } from 'framer-motion'
// import { Collapsible } from '@/shared/ui/Collapsible';
// interface ShelfProps {
// 	data?: {
// 		all: number
// 		train: number
// 		wait: number
// 	}
// 	isLoading: boolean
// 	// id?: string | number
// 	// title?: string
// 	// position?: number
// 	// collapsed: boolean
// 	className?: string
// }

// export const CommonShelf = memo((props: ShelfProps) => {
// 	const {
// 		className,
// 		data,
// 		isLoading,
// 		// collapsed
// 	} = props
// 	const commonShelfCollapsed = useSelector(getCupboardCommonShelfCollapsed)
// 	// const commonShelf = useSelector(getCupboardCommonShelf)
// 	// const { isSuccess, isLoading, data } = useGetCupboardDataQuery()
// 	const { t } = useTranslation()

// 	// if (isLoading) return <p>Загрузка</p>
// 	// if (!isSuccess) return <p>Неудача</p>

// 	const boxesBlockSkeleton = (
// 		<AnimatePresence>
// 			{isLoading &&
// 				<motion.div
// 					style={{ position: 'relative' }}
// 					exit={{
// 						opacity: 0,
// 						// backgroundColor: '#fbfbfb',
// 						transition: {
// 							opacity: {
// 								duration: 0.5
// 								// duration: 11.5
// 								// duration: 0.3
// 							}
// 						}
// 					}}
// 				>
// 					<div style={{ position: 'absolute', inset: 0 }}>

// 						<BoxesBlockSkeleton />
// 					</div>
// 				</motion.div>
// 			}
// 		</AnimatePresence>
// 	)

// 	const commonShelfBoxes = (
// 		<AnimatePresence>
// 			{!isLoading &&
// 				<motion.div
// 					// ref={cardListRef}
// 					// ref={ref}
// 					// tabIndex={1}
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1 }}
// 					transition={{ duration: 0.5, delay: 0.5 }}
// 				// transition={{ duration: 1, delay: 11.51 }}
// 				// transition={{ duration: 0.4, delay: 0.31 }}
// 				>
// 					<CommonShelfBoxes />
// 				</motion.div>
// 			}
// 		</AnimatePresence>
// 	)

// 	const boxesBlock = (<>
// 		{boxesBlockSkeleton}
// 		{commonShelfBoxes}
// 	</>)
// 	// const boxesBlock = commonShelfCollapsed
// 	// 	? <div className={cls.substitute} />
// 	// 	: <>
// 	// 		{boxesBlockSkeleton}
// 	// 		{commonShelfBoxes}
// 	// 	</>
// 	// : <div style={{ position: 'relative', zIndex: 9999 }}>
// 	// 	{boxesBlockSkeleton}
// 	// 	{commonShelfBoxes}
// 	// </div>
// 	// const boxesBlock = commonShelfCollapsed
// 	// 	? <div className={cls.substitute} />
// 	// 	: isLoading
// 	// 		? <BoxesBlockSkeleton />
// 	// 		: <CommonShelfBoxes />

// 	// const buttons = isLoading
// 	// 	? <CommonShelfButtonsSkeleton />
// 	// 	: <CommonShelfButtons />

// 	const buttonsSkeleton = (
// 		<AnimatePresence>
// 			{isLoading &&

// 				<motion.div
// 					style={{ position: 'relative' }}
// 					exit={{
// 						opacity: 0,
// 						// backgroundColor: '#fbfbfb',
// 						transition: {
// 							opacity: {
// 								duration: 0.5
// 								// duration: 11.5
// 								// duration: 0.3
// 							}
// 						}
// 					}}
// 				>
// 					<div style={{ position: 'absolute', inset: 0 }}>

// 						<CommonShelfButtonsSkeleton />
// 					</div>
// 				</motion.div>
// 			}
// 		</AnimatePresence>
// 	)

// 	const commonShelfButtons = (
// 		<AnimatePresence>
// 			{!isLoading &&
// 				<motion.div
// 					// ref={cardListRef}
// 					// ref={ref}
// 					// tabIndex={1}
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1 }}
// 					transition={{ duration: 0.5, delay: 0.5 }}
// 				// transition={{ duration: 1, delay: 11.51 }}
// 				// transition={{ duration: 0.4, delay: 0.31 }}
// 				>
// 					<CommonShelfButtons />
// 				</motion.div>
// 			}
// 		</AnimatePresence>
// 	)

// 	const buttons = (<>
// 		{buttonsSkeleton}
// 		{commonShelfButtons}
// 	</>)

// 	return (

// 		<motion.div
// 			// initial={{ y: -300 }}
// 			// animate={{ y: 0 }}
// 			// transition={{ type: 'spring', stiffness: 80, duration: 0.3 }}
// 			className={clsx(
// 				cls.shelf,
// 				[className])}
// 		>
// 			<div className={cls.topShelfPart}>
// 				<VStack align='start' gap='gap_8'>
// 					<Heading as='h3' size='s' title={t('common shelf name')} />
// 					<CompleteSmallDataLabels data={data} isLoading={isLoading} />
// 				</VStack>
// 				<div>
// 					{buttons}

// 				</div>
// 			</div>
// 			{/* <Collapsible
// 				// mode='sync'
// 				// delay={2}
// 				// initial={false}
// 				isOpen={!commonShelfCollapsed}
// 			>

// 				{boxesBlock}
// 			</Collapsible> */}
// 			<div className={clsx(cls.boxesWrapper, !commonShelfCollapsed ? cls.collapsed : '')}>
// 				<div className={cls.inner} >
// 					{isLoading && <div className={cls.substitute} />}
// 					{boxesBlock}
// 				</div>
// 			</div>
// 		</motion.div>
// 	)
// })
