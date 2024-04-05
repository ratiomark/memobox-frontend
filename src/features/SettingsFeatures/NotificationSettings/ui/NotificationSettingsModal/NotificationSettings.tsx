import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './NotificationSettings.module.scss';
import { useSelector } from 'react-redux';
import { getUserNotificationSettings, getUserSettingsAwaitingResponse, getUserSettingsIsLoading, updateNotificationSettingsThunk } from '@/entities/User';
import { Card } from '@/shared/ui/Card';
import { Heading } from '@/shared/ui/Typography';
import { Switcher } from '@/shared/ui/Switcher';
import { SingleSetter } from '@/shared/ui/TimeSetter/SingleSetter';
import { WheelEvent, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { NotificationSettings as NotificationSettingsType } from '@/entities/User';
import { getIsNotificationModalOpen } from '../../../model/selectors/getModals';
import { settingsFeaturesActions } from '../../../model/slice/settingsFeaturesSlice';
import { ManageEmailsModal } from '../ManageEmailsModal/ManageEmailsModal';
import { subscribeToPushThunk } from '../../model/services/subscribeToPushThunk';

interface NotificationSettingsProps {
	className?: string
	isOpen: boolean
	onClose: () => void
}

const minEmailNotificationConst = 5

export const NotificationSettingsModal = () => {
	const isOpen = useSelector(getIsNotificationModalOpen)
	const dispatch = useAppDispatch()
	const onClose = () => {
		dispatch(settingsFeaturesActions.setIsNotificationModalOpen(false))
	}

	const isLoading = useSelector(getUserSettingsIsLoading)
	const notificationsSettings = useSelector(getUserNotificationSettings)

	if (!notificationsSettings || isLoading) return null

	return (
		<NotificationSettingsLoaded
			notificationsSettings={notificationsSettings}
			isOpen={isOpen}
			onClose={onClose}
		/>)
}

export const NotificationSettingsLoaded = (props: NotificationSettingsProps & { notificationsSettings: NotificationSettingsType }) => {
	const {
		className,
		isOpen,
		onClose,
		notificationsSettings,
	} = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const settingsAwaitingResponseObj = useSelector(getUserSettingsAwaitingResponse)
	const {
		emailNotificationsEnabled,
		minimumCardsForEmailNotification,
		minimumCardsForPush,
		mobilePushEnabled,
		notificationEmails = []
	} = notificationsSettings

	const [emailMinNotifications, setEmailMinNotifications] = useState(minimumCardsForEmailNotification)
	const [pushMinNotifications, setPushMinNotifications] = useState(minimumCardsForPush)

	const [emailEnabled, setEmailEnabled] = useState(emailNotificationsEnabled)
	const [pushEnabled, setPushEnabled] = useState(mobilePushEnabled)

	const onToggleEmailEnabled = () => setEmailEnabled(prev => !prev)

	// const sub = () => {
	// 	Notification.requestPermission().then((permission) => {
	// 		if (permission === 'granted') {
	// 			subscribeUserToPush();
	// 		} else {
	// 			console.log('Permission denied.');
	// 		}
	// 	});
	// }

	// async function unsubscribeFromPush() {
	// 	const registration = await navigator.serviceWorker.ready;
	// 	const subscription = await registration.pushManager.getSubscription();
	// 	const api = import.meta.env.DEV
	// 		? __API__
	// 		: __API__BACK
	// 	// Теперь отправьте объект подписки на ваш сервер
	// 	if (!subscription) return
	// 	await fetch(api + '/notifications/push/unsubscribe', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({ subscription }),
	// 	});
	// }


	// async function subscribeUserToPush() {
	// 	const swRegistration = await navigator.serviceWorker.ready; // Убедитесь, что SW зарегистрирован
	// 	const VAPID_PUBLIC_KEY = 'BN1AMPF6naRQmxIfr367bePCH_EM7o3q7bf61-CrYKWJJfqfpbUi5n30mFZCiGwggqI65Z4U96dDC7o61Zubric'
	// 	const subscription = await swRegistration.pushManager.subscribe({
	// 		userVisibleOnly: true,
	// 		applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
	// 	});
	// 	const api = import.meta.env.DEV
	// 		? __API__
	// 		: __API__BACK
	// 	// Теперь отправьте объект подписки на ваш сервер
	// 	const userAgent = navigator.userAgent;
	// 	let browserName = 'unknown';
	// 	let osName = 'unknown';

	// 	if (userAgent.match(/chrome|chromium|crios/i)) {
	// 		browserName = 'chrome';
	// 	} else if (userAgent.match(/firefox|fxios/i)) {
	// 		browserName = 'firefox';
	// 	} // Добавьте другие браузеры по необходимости
	// 	console.log(userAgent)
	// 	if (userAgent.match(/android/i)) {
	// 		osName = 'android';
	// 	} else if (userAgent.match(/iphone|ipad|ipod/i)) {
	// 		osName = 'ios';
	// 	} // Добавьте другие ОС по необходимости

	// 	await fetch(api + '/notifications/push/subscribe', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({ subscription, browserName, osName }),
	// 	});
	// }

	// // Вспомогательная функция для преобразования VAPID ключа из URL-safe base64 в Uint8Array
	// function urlBase64ToUint8Array(base64String: string) {
	// 	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	// 	const base64 = (base64String + padding)
	// 		.replace(/\-/g, '+')
	// 		.replace(/_/g, '/');

	// 	const rawData = window.atob(base64);
	// 	const outputArray = new Uint8Array(rawData.length);

	// 	for (let i = 0; i < rawData.length; ++i) {
	// 		outputArray[i] = rawData.charCodeAt(i);
	// 	}
	// 	return outputArray;
	// }

	const onTogglePushEnabled = () => {
		dispatch(subscribeToPushThunk())
		setPushEnabled(prev => !prev)
	}




	const onManageEmailsClick = () => {
		onClose()
		dispatch(settingsFeaturesActions.setIsManageEmailsModalOpen(true))
	}

	const onCloseHandle = () => {
		setEmailMinNotifications(minimumCardsForEmailNotification)
		setPushMinNotifications(minimumCardsForPush)
		setEmailEnabled(emailNotificationsEnabled)
		setPushEnabled(mobilePushEnabled)
		onClose()
	}

	const onEmailUpClick = () => {
		if (emailMinNotifications === 30) return
		setEmailMinNotifications(prev => prev + 1)
	}
	const onEmailDownClick = () => {
		if (emailMinNotifications <= minEmailNotificationConst) return
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
		if (pushMinNotifications <= minEmailNotificationConst) return
		setPushMinNotifications(prev => prev - 1)
	}
	const onScrollPushMinNotification = (e: WheelEvent<HTMLElement>) => {
		if (e.deltaY > 0) onPushDownClick()
		else onPushUpClick()
	}

	const onSubmit = () => {
		const emailMinNotificationsChecked = emailMinNotifications < minEmailNotificationConst
			? minEmailNotificationConst
			: emailMinNotifications
		const pushMinNotificationsChecked = pushMinNotifications < minEmailNotificationConst
			? minEmailNotificationConst
			: pushMinNotifications

		dispatch(updateNotificationSettingsThunk({
			emailNotificationsEnabled: emailEnabled,
			mobilePushEnabled: pushEnabled,
			minimumCardsForEmailNotification: emailMinNotificationsChecked,
			minimumCardsForPush: pushMinNotificationsChecked,
			notificationEmails,
		}))
		onClose()
	}

	return (
		<>

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
								minTime={minEmailNotificationConst}
								time={emailMinNotifications}
								onUpClick={onEmailUpClick}
								onDownClick={onEmailDownClick}
								onWheelScroll={onScrollEmailMinNotification}
								disabled={!emailEnabled}
							/>
							<Button
								variant='filled'
								disabled={!emailEnabled}
								onClick={onManageEmailsClick}
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
								minTime={minEmailNotificationConst}
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
						isSubmitDisabled={settingsAwaitingResponseObj['notifications']}
					/>
				</div>
			</HDialogHeadless>
			<ManageEmailsModal />
		</>
	)
}