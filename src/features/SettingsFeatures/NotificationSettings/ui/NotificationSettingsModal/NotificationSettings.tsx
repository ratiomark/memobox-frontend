import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './NotificationSettings.module.scss';
import { useSelector } from 'react-redux';
import { getIsUserDeviceSubscribedToPush, getUserNotificationSettings, getUserPushNotificationPermission, getUserSettingsAwaitingResponse, getUserSettingsIsLoading, updateNotificationSettingsThunk, userActions } from '@/entities/User';
import { Card } from '@/shared/ui/Card';
import { Heading, MyText } from '@/shared/ui/Typography';
import { Switcher } from '@/shared/ui/Switcher';
import { SingleSetter } from '@/shared/ui/TimeSetter/SingleSetter';
import { WheelEvent, useEffect, useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { NotificationSettings as NotificationSettingsType } from '@/entities/User';
import { getIsNotificationModalOpen } from '../../../model/selectors/getModals';
import { settingsFeaturesActions } from '../../../model/slice/settingsFeaturesSlice';
import { ManageEmailsModal } from '../ManageEmailsModal/ManageEmailsModal';
import { subscribeToPushThunk } from '../../model/services/subscribeToPushThunk';
import { switchPushNotificationThunk } from '../../model/services/switchPushNotificationThunk';
import { unsubscribeFromPushThunk } from '../../model/services/unsubscribeFromPushThunk';
import { VStack } from '@/shared/ui/Stack';
import { MyTooltip } from '@/shared/ui/Tooltip';

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
	const dialogCustomId = 'notificationSettingsModalId'
	const { t } = useTranslation()
	const { t: t2 } = useTranslation('tooltip')
	const dispatch = useAppDispatch()
	const settingsAwaitingResponseObj = useSelector(getUserSettingsAwaitingResponse)
	const isDevicePushEnable = useSelector(getIsUserDeviceSubscribedToPush)
	const notificationPermission = useSelector(getUserPushNotificationPermission)
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
	


	useEffect(() => {
		const initialCheck = async () => {
			dispatch(userActions.setPushNotificationPermission(Notification.permission))
			dispatch(userActions.setPushNotificationIsSubscribed(Notification.permission === 'granted'))
		}
		initialCheck()
	}, [dispatch])

	const onToggleEmailEnabled = () => setEmailEnabled(prev => !prev)
	// const checkPermission = async () => {
	// 	// const permission = await Notification.permission
	// 	const permissionDenied = Notification.permission === 'denied'
	// 	// console.log(permission)
	// 	// if (permission === 'granted') {
	// 	// 	// await subscribeUserToPush();
	// 	// } else if (permission === 'denied') {
	// 	// 	//
	// 	// }
	// }


	const onTogglePushEnabled = () => {
		dispatch(switchPushNotificationThunk(!mobilePushEnabled))
		// checkPermission()
		// setPushEnabled(prev => !prev)
	}

	const onToggleDeviceSubscription = async () => {
		// let res: boolean;
		if (isDevicePushEnable) {
			await dispatch(unsubscribeFromPushThunk())
		} else {
			await dispatch(subscribeToPushThunk())
		}
		// setDeviceIsSubscribed(prev => !prev)
	}

	const deviceSwitcher = (
		<MyTooltip
			isModalOpen={isOpen}
			delay={200}
			portalId={dialogCustomId}
			content={
				<VStack align='left'>
					{Notification.permission === 'denied' && t2('push_denied')}
					{Notification.permission === 'default' && <div style={{ maxWidth: 200 }}>
						{t2('push_default')}
					</div>
					}
				</VStack>
			}
			trigger={
				<div>
					<Switcher
						isChecked={isDevicePushEnable ?? false}
						disabled={!mobilePushEnabled}
						onClickSwitcher={onToggleDeviceSubscription}
					/>
				</div>
			}
		/>)

	const deviceSubscriptionBlock = (<div className={cls.deviceSubscription} >
		<MyText text={t('Пуши для этого устройства')} variant={mobilePushEnabled ? 'primary' : 'hint'} />
		{deviceSwitcher}
		{/* <Switcher
			isChecked={deviceIsSubscribed ?? false}
			disabled={!mobilePushEnabled}
			onClickSwitcher={onToggleDeviceSubscription}
		/> */}
	</div>)

	const onManageEmailsClick = () => {
		onClose()
		dispatch(settingsFeaturesActions.setIsManageEmailsModalOpen(true))
	}

	const onCloseHandle = () => {
		setEmailMinNotifications(minimumCardsForEmailNotification)
		setPushMinNotifications(minimumCardsForPush)
		setEmailEnabled(emailNotificationsEnabled)
		// setPushEnabled(mobilePushEnabled)
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
		if (pushMinNotifications === 30) return
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
			mobilePushEnabled: mobilePushEnabled,
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
				customId={dialogCustomId}
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
								isChecked={mobilePushEnabled ?? false}
								onClickSwitcher={onTogglePushEnabled}
							/>
						</Card>
						<div className={clsx(cls.detailsBlock,
							// cls.detailsBlock_last
						)}
						>
							<SingleSetter
								title='Минимум карточек для пуша'
								maxTime={30}
								minTime={minEmailNotificationConst}
								time={pushMinNotifications}
								onUpClick={onPushUpClick}
								onDownClick={onPushDownClick}
								onWheelScroll={onScrollPushMinNotification}
								disabled={!mobilePushEnabled}
							/>
							{deviceSubscriptionBlock}
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