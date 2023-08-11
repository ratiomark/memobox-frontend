import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { HDialog } from '@/shared/ui/HDialog';
import cls from './NotificationSettings.module.scss';
import { useSelector } from 'react-redux';
import { getUserNotificationSettings } from '@/entities/User';
import { Card } from '@/shared/ui/Card';
import { Heading } from '@/shared/ui/Typography';
import { Switcher } from '@/shared/ui/Switcher';
import { TimeSetter } from '@/shared/ui/TimeSetter';
import { SingleSetter } from '@/shared/ui/TimeSetter/SingleSetter';
import { WheelEvent, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { ModalButtons } from '@/shared/ui/ModalButtons';

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
	// const { minimumCardsForEmailNotification } = useSelector(getUserNotificationSettings)
	const notificationsSettings = useSelector(getUserNotificationSettings)
	const {
		emailNotificationsEnabled,
		minimumCardsForEmailNotification,
		minimumCardsForPush,
		mobilePushEnabled,
		notificationEmails
	} = notificationsSettings!

	const [emailMinNotifications, setEmailMinNotifications] = useState(minimumCardsForEmailNotification ?? 15)
	const [pushMinNotifications, setPushMinNotifications] = useState(minimumCardsForPush ?? 15)

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

	// console.log(notificationsSettings)
	return (
		<HDialog
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={() => alert('Сохраняю настройки')}
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
							isChecked={pushEnabled}
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
						onSubmit={() => alert('Сохраняю настройки')}
					/>
			</div>
		</HDialog>

	)
}