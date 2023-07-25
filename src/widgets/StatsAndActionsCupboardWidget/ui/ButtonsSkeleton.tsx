import cls from './StatsAndActionsCupboardWidget.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';

export const ButtonsSkeleton = () => {

	return (

		<div className={cls.ShelfButtons}>
			<Skeleton width={76} height={35} borderRadius='4px' />
			<Skeleton width={166} height={35} borderRadius='4px' />
			<Skeleton width={32} height={32} borderRadius='999px' />
		</div>
	)
}
