import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BigDataLabelsSkeleton.module.scss';
import { Skeleton } from '..';

interface BigDatalabelSkeletonProps {
	className?: string
}

export const BigDataLabelsSkeleton = () => {
	return (
		<div className={cls.wrapper}>
			<Skeleton className={cls.BigDataLabelSkeleton} />
			<Skeleton className={cls.BigDataLabelSkeleton} />
			<Skeleton className={cls.BigDataLabelSkeleton} />
		</div>
	)
}