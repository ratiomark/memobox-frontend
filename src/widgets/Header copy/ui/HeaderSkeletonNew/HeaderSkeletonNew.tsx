import cls from './HeaderSkeleton.module.scss'
// import cls from '../Header/Header.module.scss'
import clsAdditional from '../HeaderAdditionalBlock/HeaderAdditionalBlock.module.scss'
import { useLocation } from 'react-router-dom'
import { Skeleton } from '@/shared/ui/Skeleton'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { getIsMobile } from '@/entities/UI'

export const HeaderSkeletonNew = memo(() => {
	const location = useLocation()
	const currentLocation = location.pathname.split('/')[1]
	const isMobile = useSelector(getIsMobile)
	if( isMobile || currentLocation === 'training' || currentLocation === 'login') return null
	// if (isMobile || location.pathname.split('/')[1] === 'training') return null

	return (
		<header
			data-testid='header-skeleton'
			className={cls.header}
		>
			<div className={clsAdditional.HeaderAdditionalBlock}>
				<div className={cls.additionalMini} >
					<Skeleton width={80} height={24} borderRadius='8px' />
					<Skeleton width={24} height={24} borderRadius='999px' />
				</div>
			</div>
		</header>
	)
})
HeaderSkeletonNew.displayName = 'HeaderSkeleton'
