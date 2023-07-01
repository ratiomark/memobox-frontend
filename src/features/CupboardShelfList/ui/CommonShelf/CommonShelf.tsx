import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { CommonShelfButtons } from '../CommonShelfButtons/CommonShelfButtons';
import { Heading } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { memo } from 'react';

import cls from './CommonShelf.module.scss';
import { useSelector } from 'react-redux';
import { getCupboardCommonShelf, getCupboardCommonShelfCollapsed } from '../../model/selectors/getCupboardShelfList';
import { Box, BoxesBlockSkeleton } from '@/entities/Box';
import { CommonShelfBoxes } from '../CommonShelfBoxes/CommonShelfBoxes';
import { Skeleton } from '@/shared/ui/Skeleton';
import { CommonShelfButtonsSkeleton } from '../CommonShelfButtons/CommonShelfButtonsSkeleton';
import { motion } from 'framer-motion'
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
	// const commonShelf = useSelector(getCupboardCommonShelf)
	// const { isSuccess, isLoading, data } = useGetCupboardDataQuery()
	const { t } = useTranslation()

	// if (isLoading) return <p>Загрузка</p>
	// if (!isSuccess) return <p>Неудача</p>

	const boxesBlock = commonShelfCollapsed
		? <div className={cls.substitute} />
		: isLoading
			? <BoxesBlockSkeleton />
			: <CommonShelfBoxes />

	const buttons = isLoading
		? <CommonShelfButtonsSkeleton />
		: <CommonShelfButtons />

	return (

		<motion.div
			// initial={{ y: -300 }}
			// animate={{ y: 0 }}
			// transition={{ type: 'spring', stiffness: 80, duration: 0.3 }}
			className={clsx(
				cls.shelf,
				[className])}
		>
			<div className={cls.topShelfPart}>
				<VStack align='start' gap='gap_8'>
					<Heading as='h3' size='s' title={t('common shelf name')} />
					<CompleteSmallDataLabels data={data} isLoading={isLoading} />
				</VStack>
				{buttons}
			</div>
			<div className={clsx(cls.boxesWrapper, !commonShelfCollapsed ? cls.collapsed : '')}>
				<div className={cls.inner} >
					{boxesBlock}
				</div>
			</div>
		</motion.div>
	)
})
CommonShelf.displayName = 'CommonShelf'