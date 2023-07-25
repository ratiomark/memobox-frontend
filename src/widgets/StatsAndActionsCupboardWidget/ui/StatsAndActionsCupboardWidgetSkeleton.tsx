import { HStack } from '@/shared/ui/Stack';
import cls from './StatsAndActionsCupboardWidget.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ButtonsSkeleton } from './ButtonsSkeleton';
import { Page } from '@/widgets/Page';

export const StatsAndActionsCupboardWidgetSkeleton = () => {

	return (
		<div className='pageStyles'>
			<div className='pageWrapperStyles'>

				<HStack
					max
					className={cls.statsAndActionsCupboardWidget}
				>
					<div className={cls.wrapper} >
						<Skeleton width={160} height={56} borderRadius='5' />
						<Skeleton width={160} height={56} borderRadius='5' />
						<Skeleton width={160} height={56} borderRadius='5' />
					</div>
					<ButtonsSkeleton />
				</HStack>
			</div >
		</div>
	)
}
