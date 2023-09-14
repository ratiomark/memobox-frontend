import cls from '../StatsAndActionsCupboardWidget.module.scss';
import { DefaultButtonSkeleton } from '@/shared/ui/Skeleton';
import { InfoButtonSkeleton } from '@/shared/ui/Skeleton/InfoButtonSkeleton/InfoButtonSkeleton';

export const CupboardMainButtonsSkeleton = () => {

	return (
		<div className={cls.ShelfButtons}>
			<DefaultButtonSkeleton width={70} />
			<DefaultButtonSkeleton width={166} />
			<InfoButtonSkeleton />
		</div>
	)
}
