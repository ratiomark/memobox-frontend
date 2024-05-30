import clsx from 'clsx'
import cls from './HeaderAdditionalBlock.module.scss'
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { obtainRouteProfile, obtainRouteSubscription } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Dropdown } from '@/shared/ui/Popup';
import { DropdownItem } from '@/shared/ui/Popup/ui/Dropdown/Dropdown';
import { MyText } from '@/shared/ui/Typography';
import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { headerActions } from '../../model/slice/headerSlice';
import { useTranslation } from 'react-i18next';
import { getUserName, logoutThunk } from '@/entities/User';
import { useSelector } from 'react-redux';

interface HeaderAdditionalBlockProps {
	className?: string;
}

export const HeaderAdditionalBlock = (props: HeaderAdditionalBlockProps) => {
	const {
		className,
	} = props
	const [isAdditionalOpen, setIsAdditionalOpen] = useState(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation('header')
	const userName = useSelector(getUserName)

	const toggleIsAdditionalOpen = () => setIsAdditionalOpen(prev => !prev)

	const onProfileClick = useCallback(() => {
		navigate(obtainRouteProfile())
	}, [navigate])

	const onHelpClick = useCallback(() => {
		dispatch(headerActions.setIsHelpModalOpen(true))
	}, [dispatch])

	const onWriteToUsClick = useCallback(() => {
		dispatch(headerActions.setIsWriteToUsModalOpen(true))
	}, [dispatch])

	const onLogoutClick = useCallback(() => {
		dispatch(logoutThunk())
	}, [dispatch])

	const onSubscriptionClick = () => navigate(obtainRouteSubscription())


	const additionalItems: DropdownItem[] = useMemo(() => {
		return [
			{
				content: t('profile'),
				onClick: onProfileClick
			},
			{
				content: t('help'),
				onClick: onHelpClick
			},
			{
				content: t('write to us'),
				onClick: onWriteToUsClick
			},
			{
				content: t('log out'),
				onClick: onLogoutClick
			},

		]
	}, [t, onProfileClick, onHelpClick, onWriteToUsClick, onLogoutClick])


	return (
		<div className={clsx(cls.HeaderAdditionalBlock, [className])} >
			{/* <Button
				className={cls.subscribeButton}
				onClick={onSubscriptionClick}
			>
				{t('subscription button')}
			</Button> */}
			<Dropdown
				listDirection='bottom_left'
				items={additionalItems}
				asMainWrapper='div'
				asListWrapper='ul'
				trigger={
					<menu
						className={cls.dropDownTrigger}
					// onClick={toggleIsAdditionalOpen}
					>
						<MyText variant='header' text={userName} />
						{/* <MyText variant='header' text={t('additional')} /> */}
						<Icon
							className={
								clsx(cls.arrow, !isAdditionalOpen ? cls.rotateArrow : '')}
							type='hint'
							Svg={ArrowBottomIcon}
							width={24}
							height={24}
						/>

					</menu>
				}
			/>
		</div>
	)
}