import cls from './HeaderSkeleton.module.scss'
import { useLocation } from 'react-router-dom'
import { Skeleton } from '@/shared/ui/Skeleton'
import { memo } from 'react'

export const HeaderSkeleton = memo(() => {
	const location = useLocation()
	if (location.pathname.split('/')[1] === 'training') return null

	return (
		<header
			data-testid='header-skeleton'
			className={cls.header}
		>
			<nav className={cls.navigation} >
				<ul className={cls.items}>
					{new Array(5).fill(5).map((_, i) => {
						return (
							<li className={cls.item} key={i}>
								<Skeleton width={24} height={24} borderRadius='999px' />
								<Skeleton width={80} height={24} borderRadius='8px' />
							</li>
						)
					})}
				</ul>
				<div className={cls.additional} >
					<Skeleton width={120} height={32} borderRadius='4px' />
					<div className={cls.additionalMini} >
						<Skeleton width={80} height={24} borderRadius='8px' />
						<Skeleton width={24} height={24} borderRadius='999px' />
					</div>
				</div>
			</nav>
		</header>
	)
})
HeaderSkeleton.displayName = 'HeaderSkeleton'
