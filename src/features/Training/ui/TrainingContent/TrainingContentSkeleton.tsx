import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './TrainingContent.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';

interface TrainingContentProps {
	className?: string
}

export const TrainingContentSkeleton = (props: TrainingContentProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()

	return (
		<Skeleton width={'100%'} height={20} />
	)
}