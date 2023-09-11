import clsx from 'clsx'
import cls from './CardModalSkeleton.module.scss'
import { Skeleton } from '..';
import { HDialog } from '../../HDialog';

interface CardModalSkeletonProps {
	className?: string;
}

export const CardModalSkeleton0 = (props: CardModalSkeletonProps) => {
	return (
		<div className={cls.CardModalSkeleton} style={{ height: window.innerHeight * 0.9 }} >
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
		</div>
	)
}
export const CardModalSkeleton = (props: CardModalSkeletonProps) => {
	return (
		<HDialog isOpen={true}>
			<CardModalSkeleton0 />
		</HDialog>
	)
}