import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './StatsPageSkeleton.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack } from '@/shared/ui/Stack';

interface StatsPageSkeletonProps {
	className?: string
}

export const StatsPageSkeleton = (props: StatsPageSkeletonProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()

	return (
		<div className='pageStyles'>
			<div className='pageWrapperStyles'>

				<HStack
					max
					className={clsx(cls.statsAndActionsCupboardWidget, 'blockWithDivider')}
				>
					<div className={cls.wrapper} >
						<Skeleton width={160} height={56} className={cls.dataLabel} />
						<Skeleton width={160} height={56} className={cls.dataLabel} />
						<Skeleton width={160} height={56} className={cls.dataLabel} />
					</div>
					<Skeleton width={26} height={26} borderRadius='9999px' />
				</HStack>
				<HStack max className={clsx(cls.knowledgeLevels, 'blockWithDivider')}>
					<Skeleton width={160} height={82} className={cls.dataLabel} />
					<Skeleton width={160} height={82} className={cls.dataLabel} />
					<Skeleton width={160} height={82} className={cls.dataLabel} />
					<Skeleton width={160} height={82} className={cls.dataLabel} />
					<Skeleton width={160} height={82} className={cls.dataLabel} />
				</HStack>
			</div >
		</div>
	)
}