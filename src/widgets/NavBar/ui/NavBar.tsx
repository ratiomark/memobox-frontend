// import { getUserAuthData } from '@/entities/User'
// import { LoginModal } from '@/features/AuthByUsername'
// import { memo, useCallback, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSelector } from 'react-redux'
// import cls from './NavBar.module.scss'
// import clsx from 'clsx'
// import { Button } from '@/shared/ui/Button/Button'
// import { HStack } from '@/shared/ui/Stack'

// interface NavBarProps {
// 	className?: string
// }

// export const NavBar = memo(({ className }: NavBarProps) => {
// 	const { t } = useTranslation()
// 	const [isAuthOpen, setIsAuthOpen] = useState(false)
// 	const userAuthData = useSelector(getUserAuthData)


// 	const onClose = useCallback(() => {
// 		setIsAuthOpen(false)
// 	}, [])
// 	const onShowModal = useCallback(() => {
// 		setIsAuthOpen(true)
// 	}, [])



// 	if (userAuthData) {
// 		return (
// 			<header className={clsx(cls.navBar_redesigned, className)}>
// 				<HStack gap='gap_16' justify='end' className={cls.links}>
// 					{/* <NotificationButtonNavBar /> */}
// 					{/* <AvatarDropDownNavBar /> */}
// 				</HStack>
// 			</header>

// 		)
// 	} else {
// 		return (
// 			<header className={clsx(cls.navBar, className)}>
// 				<div className={cls.links}>
// 					<Button onClick={onShowModal} size='size_m'>
// 						{t('log in')}
// 					</Button>
// 				</div>

// 				{isAuthOpen && <LoginModal isOpen={isAuthOpen} onClose={onClose} />}
// 			</header>
// 		)
// 	}
// })
// NavBar.displayName = 'NavBar'