import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Shelf.module.scss';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { ShelfButtons } from '../ShelfButtons/ShelfButtons';
import { Heading, MyText } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ShelfButtonsSkeleton } from '../ShelfButtons/ShelfButtonsSkeleton';


interface ShelfProps {
	className?: string
}

export const ShelfSkeleton = (props: ShelfProps) => {
	const {
		className,
	} = props

	return (
		<div className={clsx(
			cls.shelf,
			[className])}
		>
			<div className={cls.topShelfPart}>
				<VStack align='start' gap='gap_8'>
					<Skeleton width={120} height={20} className={cls.titleSkeleton} borderRadius='999px' />
					<CompleteSmallDataLabels
						isLoading={true}
					/>
				</VStack>
				<ShelfButtonsSkeleton />
			</div>
		</div>
	)
}