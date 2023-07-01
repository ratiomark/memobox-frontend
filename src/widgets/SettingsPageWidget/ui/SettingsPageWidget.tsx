import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ShelfTemplateSettings } from '@/features/SettingsFeatures';
import { VStack } from '@/shared/ui/Stack';
import { Heading } from '@/shared/ui/Typography';
import { MouseEvent, useState } from 'react';
import { Card } from '@/shared/ui/Card';
import {
	getUserMissedTrainingSettings,
	getUserSettings,
	getUserShelfTemplateSettings
} from '@/entities/User';
import { useSelector } from 'react-redux';
import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
import cls from './SettingsPageWidget.module.scss';
import { Icon } from '@/shared/ui/Icon';
import { MissedTrainingSettings } from '@/features/SettingsFeatures';
import { NotificationSettings } from '@/features/SettingsFeatures/NotificationSettings/NotificationSettings';



interface SettingsPageWidgetProps {
	className?: string
}

export const SettingsPageWidget = (props: SettingsPageWidgetProps) => {
	const { t, i18n } = useTranslation('settings')
	// const userSettings = useSelector(getUserSettings)

	const [settingModalStates, setSettingModalStates] = useState({
		shelfTemplateModal: false,
		notificationModal: false,
		timeSleepModal: false,
		missedTrainingModal: false
	})

	const missedTrainingSetting = useSelector(getUserMissedTrainingSettings)

	const toggleShelfTemplateModal = () => {
		setSettingModalStates(prev => ({ ...prev, shelfTemplateModal: !prev.shelfTemplateModal }))
	}
	const toggleMissedTrainingModal = () => {
		setSettingModalStates(prev => ({ ...prev, missedTrainingModal: !prev.missedTrainingModal }))
	}
	const toggleTimeSleepModal = () => {
		setSettingModalStates(prev => ({ ...prev, timeSleepModal: !prev.timeSleepModal }))
	}
	const toggleNotificationModal = () => {
		setSettingModalStates(prev => ({ ...prev, notificationModal: !prev.notificationModal }))
	}

	const onMissedTrainingInfoClick = (e: MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		// show info
	}

	const shelfTemplateSettings = (
		<Card
			tabIndex={0}
			className={cls.card}
			onClick={toggleShelfTemplateModal}>
			{/* onClick={openShelfTemplate}> */}
			<Heading
				className={cls.settingTitle}
				as='h2'
				title={t('shelf template')}
			/>
			<Icon
				Svg={InfoIcon}
				width={28}
				height={28}
				className={cls.info}
			/>
		</Card>)
	const timeSleepSettings = (
		<Card
			tabIndex={0}
			className={cls.card}
			onClick={toggleTimeSleepModal}>
			<Heading
				className={cls.settingTitle}
				as='h2'
				title={t('time sleep')}
			/>
			<Icon
				Svg={InfoIcon}
				width={28}
				height={28}
				className={cls.info}
			/>
		</Card>)
	const notificationSettings = (
		<Card
			tabIndex={0}
			className={cls.card}
			onClick={toggleNotificationModal}>
			<Heading
				className={cls.settingTitle}
				as='h2'
				title={t('notifications')}
			/>
			<Icon
				Svg={InfoIcon}
				width={28}
				height={28}
				className={cls.info}
			/>
		</Card>)
	const missedTrainingSettings = (
		<Card
			tabIndex={0}
			className={cls.card}
			onClick={toggleMissedTrainingModal}>
			{/* onClick={openMissedTraining}> */}
			<Heading
				className={cls.settingTitle}
				as='h2'
				title={t('missed training')}
			/>
			<Icon
				Svg={InfoIcon}
				clickable
				onClick={onMissedTrainingInfoClick}
				width={28}
				height={28}
				className={cls.info}
			/>
		</Card>

	)

	return (
		<div className={cls.settingsPageWidget} >
			{shelfTemplateSettings}
			{timeSleepSettings}
			{notificationSettings}
			{missedTrainingSettings}
			<ShelfTemplateSettings
				isOpen={settingModalStates.shelfTemplateModal}
				onClose={toggleShelfTemplateModal}
			/>
			<NotificationSettings
				isOpen={settingModalStates.notificationModal}
				onClose={toggleNotificationModal}
			/>

			<MissedTrainingSettings
				missedTrainingSetting={missedTrainingSetting}
				isOpen={settingModalStates.missedTrainingModal}
				onClose={toggleMissedTrainingModal}
			// lazy={true}
			/>
		</div>
	)
}
// const [isShelfTemplateOpen, setIsShelfTemplateOpen] = useState(false)
// const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
// const [isTimeSleepOpen, setIsTimeSleepOpen] = useState(false)
// const [isMissedTrainingOpen, setIsMissedTrainingOpen] = useState(false)
// const openShelfTemplate = () => setIsShelfTemplateOpen(true)
// const closeShelfTemplate = () => setIsShelfTemplateOpen(false)
// const openNotifications = () => setIsNotificationsOpen(true)
// const closeNotifications = () => setIsNotificationsOpen(false)
// const openTimeSleep = () => setIsTimeSleepOpen(true)
// const closeTimeSleep = () => setIsTimeSleepOpen(false)
// const openMissedTraining = (e: MouseEvent<HTMLDivElement>) => {
// 	setIsMissedTrainingOpen(true)
// }