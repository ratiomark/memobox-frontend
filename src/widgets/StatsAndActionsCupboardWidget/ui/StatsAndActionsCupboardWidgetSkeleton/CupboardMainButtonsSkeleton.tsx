import cls from '../StatsAndActionsCupboardWidget.module.scss';
import { DefaultButtonSkeleton, Skeleton } from '@/shared/ui/Skeleton';

export const CupboardMainButtonsSkeleton = () => {
	return (
		<div className={cls.ShelfButtons}>
			<DefaultButtonSkeleton width={90} />
			<DefaultButtonSkeleton width={Number(localStorage.getItem('maxButtonWidth') ?? 160)} className={cls.trainButton} />
			<Skeleton width={24} height={24} borderRadius='999px' className={cls.arrow} />
			{/* <InfoButtonSkeleton /> */}
		</div>
	)
}
// import cls from '../StatsAndActionsCupboardWidget.module.scss';
// import { DefaultButtonSkeleton } from '@/shared/ui/Skeleton';
// import { InfoButtonSkeleton } from '@/shared/ui/Skeleton/InfoButtonSkeleton/InfoButtonSkeleton';

// export const CupboardMainButtonsSkeleton = () => {

// 	return (
// 		<div className={cls.ShelfButtons}>
// 			<DefaultButtonSkeleton width={70} />
// 			<DefaultButtonSkeleton width={166} />
// 			<InfoButtonSkeleton />
// 		</div>
// 	)
// }
