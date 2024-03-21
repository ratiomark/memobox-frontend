import { memo, useMemo } from 'react'
import { NavBarItem } from '../NavBarItem/NavBarItem'
import { useSelector } from 'react-redux'
import { getNavBarItems } from '../../model/selectors/getHeaderItems'
import cls from './NavBar.module.scss'
import { useLocation } from 'react-router-dom'
import { HeaderAdditionalBlock } from '../HeaderAdditionalBlock/HeaderAdditionalBlock'
import { WriteToUsModal } from '../Modals/WriteToUsModal/WriteToUsModalLazy'
import { getIsMobile } from '@/entities/UI'

const useHideNavBar = () => {
	const pathname = useLocation().pathname
	const currentLocation = pathname.split('/')[1]
	const isMobile = useSelector(getIsMobile)
	return isMobile || currentLocation === 'training'
}

export const NavBar = memo(() => {
	const hideNavBar = useHideNavBar()
	const navBarItemsList = useSelector(getNavBarItems)
	const NavBarItemsListRendered = useMemo(() => {
		return navBarItemsList.map(item => (
			<NavBarItem
				item={item}
				key={item.path}
			/>
		))
	}, [navBarItemsList])

	if (hideNavBar) return null

	return (
		<>
			<nav
				id='main-navbar'
				data-testid='navbar'
				className={cls.navigation}
			>
				<ul className={cls.items}>
					{NavBarItemsListRendered}
				</ul>
				<HeaderAdditionalBlock />
			</nav>
			<WriteToUsModal />
		</>
	)
})

NavBar.displayName = 'NavBar'
