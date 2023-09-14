import { infoIconSize } from '@/shared/const/iconSizes';
import cls from './StatsAndActionsCupboardWidget.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';
import { InfoButtonSkeleton } from '@/shared/ui/Skeleton/InfoButtonSkeleton/InfoButtonSkeleton';

export const CupboardMainButtonsSkeleton = () => {

	return (
		<div className={cls.ShelfButtons}>
			<Skeleton width={76} height={35} borderRadius='4px' />
			<Skeleton width={166} height={35} borderRadius='4px' />
			<InfoButtonSkeleton />
		</div>
	)
}
