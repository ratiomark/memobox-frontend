import cls from './BigDataLabelsSkeleton.module.scss';
import { Skeleton } from '..';


export const BigDataLabelsSkeleton = () => {
	return (
		<div className={cls.wrapper}>
			<Skeleton className={cls.BigDataLabelSkeleton} />
			<Skeleton className={cls.BigDataLabelSkeleton} />
			<Skeleton className={cls.BigDataLabelSkeleton} />
		</div>
	)
}