import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './NotificationSettings.module.scss';
import { useSelector } from 'react-redux';
import { getUserNotificationSettings, getUserSettingsIsLoading, updateNotificationSettingsThunk } from '@/entities/User';
import { Card } from '@/shared/ui/Card';
import { Heading } from '@/shared/ui/Typography';
import { Switcher } from '@/shared/ui/Switcher';
import { SingleSetter } from '@/shared/ui/TimeSetter/SingleSetter';
import { WheelEvent, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';

interface NotificationSettingsProps {
	className?: string
	isOpen: boolean
	onClose: () => void
}

export const NotificationSettings = (props: NotificationSettingsProps) => {
	const {
		className,
		isOpen,
		onClose

	} = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	// const { minimumCardsForEmailNotification } = useSelector(getUserNotificationSettings)
	const isLoading = useSelector(getUserSettingsIsLoading)
	const notificationsSettings = useSelector(getUserNotificationSettings)
	console.log(notificationsSettings)
	const {
		emailNotificationsEnabled,
		minimumCardsForEmailNotification,
		minimumCardsForPush,
		mobilePushEnabled,
		notificationEmails = []
	} = notificationsSettings!

	const [emailMinNotifications, setEmailMinNotifications] = useState(minimumCardsForEmailNotification)
	const [pushMinNotifications, setPushMinNotifications] = useState(minimumCardsForPush)

	const [emailEnabled, setEmailEnabled] = useState(emailNotificationsEnabled)
	const [pushEnabled, setPushEnabled] = useState(mobilePushEnabled)

	const onToggleEmailEnabled = () => setEmailEnabled(prev => !prev)
	const onTogglePushEnabled = () => setPushEnabled(prev => !prev)

	const onCloseHandle = () => {
		// setEmailEnabled(emailNotificationsEnabled)
		// setPushEnabled(mobilePushEnabled)
		// setEmailMinNotifications(minimumCardsForEmailNotification ?? 15)
		// setPushMinNotifications(minimumCardsForPush ?? 15)
		onClose()
	}

	const onEmailUpClick = () => {
		if (emailMinNotifications === 30) return
		setEmailMinNotifications(prev => prev + 1)
	}
	const onEmailDownClick = () => {
		if (emailMinNotifications < 1) return
		setEmailMinNotifications(prev => prev - 1)
	}
	const onScrollEmailMinNotification = (e: WheelEvent<HTMLElement>) => {
		if (e.deltaY > 0) onEmailDownClick()
		else onEmailUpClick()
	}
	const onPushUpClick = () => {
		if (pushMinNotifications === 15) return
		setPushMinNotifications(prev => prev + 1)
	}
	const onPushDownClick = () => {
		if (pushMinNotifications < 1) return
		setPushMinNotifications(prev => prev - 1)
	}
	const onScrollPushMinNotification = (e: WheelEvent<HTMLElement>) => {
		if (e.deltaY > 0) onPushDownClick()
		else onPushUpClick()
	}

	const onSubmit = () => {
		dispatch(updateNotificationSettingsThunk({
			emailNotificationsEnabled: emailEnabled,
			mobilePushEnabled: pushEnabled,
			minimumCardsForEmailNotification: emailMinNotifications,
			minimumCardsForPush: pushMinNotifications,
			notificationEmails,
		}))
	}

	if (isLoading) return null
	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={onSubmit}
		>
			<div className={clsx(
				cls.NotificationSettings,
				className)}
			>
				<div className={cls.notificationBlock} >
					<Card className={cls.notificationCard} >
						<Heading size='s' title={'Email'} />
						<Switcher
							isChecked={emailEnabled}
							onClickSwitcher={onToggleEmailEnabled}
						/>
					</Card>
					<div className={cls.detailsBlock} >

						<SingleSetter
							title='Минимум карточек для почты'
							maxTime={30}
							time={emailMinNotifications}
							onUpClick={onEmailUpClick}
							onDownClick={onEmailDownClick}
							onWheelScroll={onScrollEmailMinNotification}
							disabled={!emailEnabled}
						/>
						<Button
							variant='filled'
							disabled={!emailEnabled}
						>
							Управление почтовыми адресами
						</Button>
					</div>
				</div>
				<div className={cls.notificationBlock} >
					<Card className={cls.notificationCard} >
						<Heading size='s' title={'Push notification'} />
						<Switcher
							isChecked={pushEnabled ?? false}
							onClickSwitcher={onTogglePushEnabled}
						/>
					</Card>
					<div className={clsx(cls.detailsBlock, cls.detailsBlock_last)} >
						<SingleSetter
							title='Минимум карточек для пуша'
							maxTime={15}
							time={pushMinNotifications}
							onUpClick={onPushUpClick}
							onDownClick={onPushDownClick}
							onWheelScroll={onScrollPushMinNotification}
							disabled={!pushEnabled}
						/>
					</div>
				</div>
				<ModalButtons
					onClose={onCloseHandle}
					onSubmit={onSubmit}
				/>
			</div>
		</HDialogHeadless>

	)
}