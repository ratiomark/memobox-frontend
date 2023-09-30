import clsx from 'clsx';
import cls from './DefaultButtonSkeleton.module.scss';
import { memo } from 'react';
import { Skeleton } from '../Skeleton';

interface SkeletonProps {
	className?: string
	width?: string | number
	height?: string | number
	borderRadius?: string
}

export const DefaultButtonSkeleton = memo((props: SkeletonProps) => {
	const {
		className,
		...otherProps
	} = props
	return (
		<Skeleton className={clsx(cls.DefaultButtonSkeleton, [className])} {...otherProps} />
	)
})
DefaultButtonSkeleton.displayName = 'DefaultButtonSkeleton'