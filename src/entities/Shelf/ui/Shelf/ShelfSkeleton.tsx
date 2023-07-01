import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Shelf.module.scss';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { ShelfButtons } from '../../../../features/CupboardShelfList/ui/ShelfButtons/ShelfButtons';
import { Heading, MyText } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ShelfButtonsSkeleton } from '../../../../features/CupboardShelfList/ui/ShelfButtons/ShelfButtonsSkeleton';
import { BoxesBlockSkeleton } from '@/entities/Box';
import { motion } from 'framer-motion'

interface ShelfProps {
	className?: string
	title?: string
	isCollapsed?: boolean
}

export const ShelfSkeleton = (props: ShelfProps) => {
	const {
		className,
		title,
		isCollapsed
	} = props

	return (
		<motion.div
			// initial={{ y: -300 }}
			// animate={{ y: 0 }}
			// transition={{ type:'spring', stiffness: 80, duration: 0.3 }}
			className={clsx(
				cls.shelf,
				[className])}
		>
			<div className={cls.topShelfPart}>
				<VStack align='start' gap='gap_8'>
					{title
						? <Heading as='h3' size='s' title={title} />
						: <Skeleton width={120} height={20} className={cls.titleSkeleton} borderRadius='999px' />
					}
					<CompleteSmallDataLabels
						isLoading={true}
					/>
				</VStack>
				<ShelfButtonsSkeleton />
			</div>
			<div className={clsx(cls.boxesWrapper, !isCollapsed ? cls.collapsed : '')}>
				<div className={cls.inner} >
					<BoxesBlockSkeleton />
				</div>
			</div>
		</motion.div>
	)
}