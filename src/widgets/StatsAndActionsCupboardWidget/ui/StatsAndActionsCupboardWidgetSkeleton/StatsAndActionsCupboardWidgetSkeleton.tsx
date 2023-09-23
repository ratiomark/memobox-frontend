import cls from '../StatsAndActionsCupboardWidget.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { CupboardMainButtonsSkeleton } from './CupboardMainButtonsSkeleton';
import { BigDataLabelsSkeleton } from '@/shared/ui/Skeleton/BigDataLabelsSkeleton/BigDataLabelsSkeleton';

export const StatsAndActionsCupboardWidgetSkeleton = () => {

	return (
		<div className='pageStyles'>
			<div className='pageWrapperStyles'>
				<HStack max className={cls.statsAndActionsCupboardWidget}>
					<BigDataLabelsSkeleton />
					<CupboardMainButtonsSkeleton />
				</HStack>
			</div >
		</div>
	)
}
