import { HStack } from '@/shared/ui/Stack';
import cls from './StatsAndActionsCupboardWidget.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';
import { CupboardMainButtonsSkeleton } from './CupboardMainButtonsSkeleton';
import { Page } from '@/widgets/Page';
import { BigDataLabelsSkeleton } from '@/shared/ui/Skeleton/BigDataLabelsSkeleton/BigDataLabelsSkeleton';

export const StatsAndActionsCupboardWidgetSkeleton = () => {

	return (
		<div className='pageStyles'>
			<div className='pageWrapperStyles'>
				<HStack
					max
					className={cls.statsAndActionsCupboardWidget}
				>
					<BigDataLabelsSkeleton />
					<CupboardMainButtonsSkeleton />
				</HStack>
			</div >
		</div>
	)
}
