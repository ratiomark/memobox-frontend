import { memo, useMemo } from 'react'
import { HeaderItem } from '../HeaderItem/HeaderItem'
import { useSelector } from 'react-redux'
import { getHeaderItems } from '../../model/selectors/getHeaderItems'
import clsx from 'clsx'
import cls from './Header.module.scss'
import { useLocation } from 'react-router-dom'
import { HeaderAdditionalBlock } from '../HeaderAdditionalBlock/HeaderAdditionalBlock'
import { WriteToUsModal } from '../Modals/WriteToUsModal/WriteToUsModal'
import './Header.css'

export const Header = memo(() => {
	const headerItemsList = useSelector(getHeaderItems)
	const location = useLocation()
	const HeaderItemsListRendered = useMemo(() => {
		return headerItemsList.map(item => (
			<HeaderItem
				item={item}
				key={item.path}
			/>
		))
	}, [headerItemsList])

	if (location.pathname.split('/')[1] === 'training') return null

	return (
		<>
			<header
				data-testid='header'
				className={clsx(
					cls.header,
					'header')}
			>
				<nav className={cls.navigation} >
					<ul className={cls.items}>
						{HeaderItemsListRendered}
					</ul>
					<HeaderAdditionalBlock />
				</nav>
			</header>
			<WriteToUsModal />
		</>
	)
})

Header.displayName = 'Header'
