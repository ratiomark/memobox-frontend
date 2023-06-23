import { memo, useMemo } from 'react'
import { HeaderItem } from '../HeaderItem/HeaderItem'
import { useSelector } from 'react-redux'
import { getHeaderItems } from '../../model/selectors/getHeaderItems'
import clsx from 'clsx'
import { HStack, VStack } from '@/shared/ui/Stack'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LangSwitcher } from '../LangSwitcher/LangSwitcher'

import cls from './Header.module.scss'

interface SidebarProps {
	className?: string
}

export const Header = memo(({ className }: SidebarProps) => {
	const headerItemsList = useSelector(getHeaderItems)

	const HeaderItemsListRendered = useMemo(() => {
		return headerItemsList.map(item => (
			<HeaderItem
				item={item}
				key={item.path}
			/>
		))
	}, [headerItemsList])


	return (

		<header
			data-testid='header'
			className={clsx(
				cls.header,
				// { [cls.collapsed]: collapsed },
				className)}
		>
			{/* <HStack as={'nav'} gap="gap_8" align='start' max className={cls.items}> */}
			<nav className={cls.items}>
				{HeaderItemsListRendered}
			</nav>

		</header>
	)
})

// < div className = { clsx(cls.switchers) } >
// 	{/* <ThemeSwitcher /> */ }
// 	< LangSwitcher className = { cls.lang } />
// 		</ >
Header.displayName = 'Header'
// // import { ThemeSwitcher } from '@/features/ThemeSwitcher'
// import { memo, useMemo, useState } from 'react'
// import { LangSwitcher } from '../LangSwitcher/LangSwitcher'
// import { SidebarItem } from '../SidebarItem/SidebarItem'
// import { useTranslation } from 'react-i18next'
// import { useSelector } from 'react-redux'
// import { getSidebarItems } from '../../model/selectors/getSidebarItems'
// import clsx from 'clsx'
// import { ToggleFeatures } from '@/shared/lib/features'
// import ArrowIcon from '@/shared/assets/icons_redesigned/arrow-bottom.svg';
// import cls from './Sidebar.module.scss'
// import { AppLogo } from '@/shared/ui/AppLogo'
// import { Button } from '@/shared/ui/Button/Button'
// import { Icon } from '@/shared/ui/Icon/Icon'
// import { VStack } from '@/shared/ui/Stack'
// import { ThemeSwitcher } from '@/features/ThemeSwitcher'


// interface SidebarProps {
// 	className?: string
// }

// export const Sidebar = memo(({ className }: SidebarProps) => {
// 	const [collapsed, setCollapsed] = useState(false)
// 	const headerItemsList = useSelector(getSidebarItems)

// 	const onToggle = () => {
// 		setCollapsed((prev) => !prev)
// 	}

// 	const SideBarItemsRendered = useMemo(() => {
// 		return sidebarItemsList.map(item => (
// 			<SidebarItem
// 				item={item}
// 				collapsed={collapsed}
// 				key={item.path}
// 			/>
// 		))
// 	}, [sidebarItemsList, collapsed])


// 	return (
// 		<ToggleFeatures
// 			name='isAppRedesigned'
// 			off={
// 				<menu
// 					data-testid='sidebar'
// 					className={clsx(
// 						cls.Sidebar,
// 						{ [cls.collapsed]: collapsed },
// 						className)}
// 				>
// 					<Button
// 						data-testid='toggle-sidebar'
// 						className={cls.collapseBtn}
// 						size='size_l'
// 						square
// 						onClick={onToggle}>
// 						{collapsed ? '>' : '<'}
// 					</Button>

// 					<VStack as={'nav'} gap="gap_8" align='start' className={cls.items}>
// 						{SideBarItemsRendered}
// 					</VStack>

// 					<div className={clsx(cls.switchers, { [cls.switchers_collapsed]: collapsed })}>
// 						{/* <ThemeSwitcher /> */}
// 						<LangSwitcher short={collapsed} className={cls.lang} />
// 					</div>
// 				</menu>}


// 			on={
// 				<menu
// 					data-testid='sidebar'
// 					className={clsx(
// 						cls.SidebarRedesigned,
// 						{ [cls.collapsedRedesigned]: collapsed },
// 						className)}
// 				>
// 					<AppLogo className={cls.appLogo} size={collapsed ? 30 : 50} />

// 					<VStack as='nav' gap="gap_8" className={cls.items}>
// 						{SideBarItemsRendered}
// 					</VStack>

// 					<Icon
// 						data-testid="sidebar-toggle"
// 						onClick={onToggle}
// 						className={cls.collapseBtn}
// 						Svg={ArrowIcon}
// 						clickable
// 					/>

// 					<div className={clsx(cls.switchers, { [cls.switchers_collapsed]: collapsed })}>
// 						<ThemeSwitcher />
// 						<LangSwitcher short={collapsed} className={cls.lang} />
// 					</div>
// 				</menu>
// 			}
// 		/>

// 	)
// })
// Sidebar.displayName = 'Sidebar'