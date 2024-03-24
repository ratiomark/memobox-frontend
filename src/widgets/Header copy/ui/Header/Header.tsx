import { memo, useMemo } from 'react'
import { HeaderItem } from '../HeaderItem/HeaderItem'
import { useSelector } from 'react-redux'
import { getHeaderItems } from '../../model/selectors/getHeaderItems'
import cls from './Header.module.scss'
import { useLocation } from 'react-router-dom'
import { HeaderAdditionalBlock } from '../HeaderAdditionalBlock/HeaderAdditionalBlock'
import { WriteToUsModal } from '../Modals/WriteToUsModal/WriteToUsModalLazy'
import { getIsMobile } from '@/entities/UI'
const useHideHeader = () => {
	const pathname = useLocation().pathname
	const currentLocation = pathname.split('/')[1]
	const isMobile = useSelector(getIsMobile)
	return isMobile || currentLocation === 'training'
}
export const Header = memo(() => {
	const hideHeader = useHideHeader()

	if (hideHeader) return null

	return (
		<>
			<header
				data-testid='header'
				className={cls.header}
			>

				<HeaderAdditionalBlock />
			</header>
			{/* <WriteToUsModal /> */}
		</>
	)
})

Header.displayName = 'Header'
