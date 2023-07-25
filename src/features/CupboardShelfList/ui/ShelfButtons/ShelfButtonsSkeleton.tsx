import cls from './ShelfButtons.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';


export const ShelfButtonsSkeleton = () => {
	return (
		<div className={cls.ShelfButtons} >
			<Skeleton width={211} height={35} borderRadius='4px' />
			<Skeleton width={107} height={35} borderRadius='4px' />
			<Skeleton width={76} height={35} borderRadius='4px' />
			<Skeleton width={166} height={35} borderRadius='4px' />
			<Skeleton width={32} height={32} borderRadius='999px' />
		</div >
	)
}
