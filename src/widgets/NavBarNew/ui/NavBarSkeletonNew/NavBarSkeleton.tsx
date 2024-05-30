import cls from './NavBarSkeleton.module.scss'
import clsNavBar from '../NavBar/NavBar.module.scss'
import { useLocation } from 'react-router-dom'
import { Skeleton } from '@/shared/ui/Skeleton'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { getIsMobile } from '@/entities/UI'

export const NavBarSkeletonNew = memo(() => {
	const location = useLocation()
	const currentLocation = location.pathname.split('/')[1]
	const isMobile = useSelector(getIsMobile)
	if (isMobile || currentLocation === 'training' || currentLocation === 'login') return null

	return (
		<nav
			id='main-navbar'
			data-testid='navbar'
			className={clsNavBar.navigation}
		>
			<ul className={clsNavBar.items}>
				{new Array(5).fill(5).map((_, i) => {
					return (
						<li className={cls.item} key={i}>
							<Skeleton width={24} height={24} borderRadius='999px' />
							<Skeleton width={'70%'} height={20} borderRadius='8px' />
						</li>
					)
				})}
			</ul>
			{/* <HeaderAdditionalBlock /> */}
		</nav>
	)
})
NavBarSkeletonNew.displayName = 'HeaderSkeleton'
