import { HStack } from '@/shared/ui/Stack';
import cls from '../StatsAndActionsCupboardWidget.module.scss';
import { BigDataLabelsSkeleton } from '@/shared/ui/Skeleton/BigDataLabelsSkeleton/BigDataLabelsSkeleton';
// gap: var(--gap-between-widgets-view-page);
// width: var(--width-view-page-initializer);
export const StatsAndActionsCupboardWidgetSkeleton = () => {

	return (
		<div className='pageStyles'>
			<div className='pageWrapperStyles'>
				<HStack
					max
					className={cls.statsAndActionsCupboardWidget}
				>
					<BigDataLabelsSkeleton />
				</HStack>
			</div >
		</div>
	)
}
