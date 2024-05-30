import { memo, useMemo } from 'react'
import { NavBarItem } from '../NavBarItem/NavBarItem'
import { useSelector } from 'react-redux'
import { getNavBarItems } from '../../model/selectors/getHeaderItems'
import cls from './NavBar.module.scss'
import { useLocation } from 'react-router-dom'
import { HeaderAdditionalBlock } from '../HeaderAdditionalBlock/HeaderAdditionalBlock'
import { WriteToUsModal } from '../Modals/WriteToUsModal/WriteToUsModalLazy'
import { getIsMobile } from '@/entities/UI'
import langIcon from '@/shared/assets/icons/langIcon.svg'
import { useCustomTranslate } from '@/features/LanguageSwitcher'
import { Icon } from '@/shared/ui/Icon'
const useHideNavBar = () => {
	const pathname = useLocation().pathname
	const currentLocation = pathname.split('/')[1]
	const isMobile = useSelector(getIsMobile)
	return isMobile || currentLocation === 'training' || currentLocation === 'login'
	// return isMobile || currentLocation === 'training' || currentLocation === 'login' || currentLocation === 'forgot-password'
}

export const NavBar = memo(() => {
	const hideNavBar = useHideNavBar()
	const navBarItemsList = useSelector(getNavBarItems)
	const { currentLang, setLang } = useCustomTranslate()
	const NavBarItemsListRendered = useMemo(() => {
		if (import.meta.env.DEV) {
			return navBarItemsList.map(item => (
				<NavBarItem
					item={item}
					key={item.path}
				/>
			))
		}
		return navBarItemsList.slice(0, navBarItemsList.length - 1).map(item => (
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
				{/* <HeaderAdditionalBlock /> */}
				<Icon
					clickable
					// width={24}
					// height={24}
					style={{
						position: 'absolute',
						bottom: 30,
						right: '50%'
					}}
					onClick={() => setLang(currentLang === 'ru' ? 'en' : 'ru')}
					Svg={langIcon}
				/>
			</nav>
			
			<WriteToUsModal />
		</>
	)
})

NavBar.displayName = 'NavBar'
