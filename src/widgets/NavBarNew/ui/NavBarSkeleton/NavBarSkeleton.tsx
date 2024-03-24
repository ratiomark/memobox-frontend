import cls from './NavBarSkeleton.module.scss'
import { useLocation } from 'react-router-dom'
import { Skeleton } from '@/shared/ui/Skeleton'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { getIsMobile } from '@/entities/UI'

export const NavBarSkeleton = memo(() => {
	const location = useLocation()
	const isMobile = useSelector(getIsMobile)
	if (isMobile || location.pathname.split('/')[1] === 'training') return null

	return (
		<header
			data-testid='header-skeleton'
			className={cls.navbar}
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
				{/* <div className={cls.additional} >
					<Skeleton width={120} height={32} borderRadius='4px' />
					<div className={cls.additionalMini} >
						<Skeleton width={80} height={24} borderRadius='8px' />
						<Skeleton width={24} height={24} borderRadius='999px' />
					</div>
				</div> */}
			</nav>
		</header>
	)
})
NavBarSkeleton.displayName = 'HeaderSkeleton'
