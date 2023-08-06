import { useTranslation } from 'react-i18next';
import { ShelfTemplateSettings, TimeSleepSettings } from '@/features/SettingsFeatures';
import { Heading } from '@/shared/ui/Typography';
import { MouseEvent, useState } from 'react';
import { Card } from '@/shared/ui/Card';
import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
import './SettingsPageWidget.css';
import { Icon } from '@/shared/ui/Icon';
import { MissedTrainingSettings } from '@/features/SettingsFeatures';
import { NotificationSettings } from '@/features/SettingsFeatures'
import { BoxTimeSetterSettingsPageModal } from '@/features/SettingsFeatures';


interface SettingsPageWidgetProps {
	className?: string
}

export const SettingsPageWidget = (props: SettingsPageWidgetProps) => {
	const { t } = useTranslation('settings')

	const [settingModalStates, setSettingModalStates] = useState({
		shelfTemplateModal: false,
		notificationModal: false,
		timeSleepModal: false,
		missedTrainingModal: false
	})

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
			className={'card'}
			onClick={toggleShelfTemplateModal}>
			<Heading
				className={'settingTitle'}
				as='h2'
				title={t('shelf template')}
			/>
			<Icon
				Svg={InfoIcon}
				width={28}
				height={28}
				className={'info'}
			/>
		</Card>)
	const timeSleepSettings = (
		<Card
			tabIndex={0}
			className={'card'}
			onClick={toggleTimeSleepModal}>
			<Heading
				className={'settingTitle'}
				as='h2'
				title={t('time sleep')}
			/>
			<Icon
				Svg={InfoIcon}
				width={28}
				height={28}
				className={'info'}
			/>
		</Card>)
	const notificationSettings = (
		<Card
			tabIndex={0}
			className={'card'}
			onClick={toggleNotificationModal}>
			<Heading
				className={'settingTitle'}
				as='h2'
				title={t('notifications')}
			/>
			<Icon
				Svg={InfoIcon}
				width={28}
				height={28}
				className={'info'}
			/>
		</Card>)
	const missedTrainingSettings = (
		<Card
			tabIndex={0}
			className={'card'}
			onClick={toggleMissedTrainingModal}>
			{/* onClick={openMissedTraining}> */}
			<Heading
				className={'settingTitle'}
				as='h2'
				title={t('missed training')}
			/>
			<Icon
				Svg={InfoIcon}
				clickable
				onClick={onMissedTrainingInfoClick}
				width={28}
				height={28}
				className={'info'}
			/>
		</Card>)

	return (
		<div className={'settingsPageWidget'} >
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
				isOpen={settingModalStates.missedTrainingModal}
				onClose={toggleMissedTrainingModal}
			// lazy={true}
			/>
			<TimeSleepSettings
				isOpen={settingModalStates.timeSleepModal}
				onClose={toggleTimeSleepModal}
			/>
			{/* <BoxTimeSetterSettingsPageModal /> */}
		</div>
	)
}
// import { useTranslation } from 'react-i18next';
// import { ShelfTemplateSettings, TimeSleepSettings } from '@/features/SettingsFeatures';
// import { Heading, MyText } from '@/shared/ui/Typography';
// import { MouseEvent, useState } from 'react';
// import { Card } from '@/shared/ui/Card';
// import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
// import cls from './SettingsPageWidget.module.scss';
// import { Icon } from '@/shared/ui/Icon';
// import { MissedTrainingSettings } from '@/features/SettingsFeatures';
// import { NotificationSettings } from '@/features/SettingsFeatures'


// interface SettingsPageWidgetProps {
// 	className?: string
// }

// export const SettingsPageWidget = (props: SettingsPageWidgetProps) => {
// 	const { t } = useTranslation('settings')

// 	const [settingModalStates, setSettingModalStates] = useState({
// 		shelfTemplateModal: false,
// 		notificationModal: false,
// 		timeSleepModal: false,
// 		missedTrainingModal: false
// 	})

// 	const toggleShelfTemplateModal = () => {
// 		setSettingModalStates(prev => ({ ...prev, shelfTemplateModal: !prev.shelfTemplateModal }))
// 	}
// 	const toggleMissedTrainingModal = () => {
// 		setSettingModalStates(prev => ({ ...prev, missedTrainingModal: !prev.missedTrainingModal }))
// 	}
// 	const toggleTimeSleepModal = () => {
// 		setSettingModalStates(prev => ({ ...prev, timeSleepModal: !prev.timeSleepModal }))
// 	}
// 	const toggleNotificationModal = () => {
// 		setSettingModalStates(prev => ({ ...prev, notificationModal: !prev.notificationModal }))
// 	}

// 	const onMissedTrainingInfoClick = (e: MouseEvent<HTMLElement>) => {
// 		e.stopPropagation()
// 		// show info
// 	}

// 	const shelfTemplateSettings = (
// 		<Card
// 			tabIndex={0}
// 			className={cls.card}
// 			onClick={toggleShelfTemplateModal}>
// 			<Heading
// 				className={cls.settingTitle}
// 				as='h2'
// 				title={t('shelf template')}
// 			/>
// 			<Icon
// 				Svg={InfoIcon}
// 				width={28}
// 				height={28}
// 				className={cls.info}
// 			/>
// 		</Card>)
// 	const timeSleepSettings = (
// 		<Card
// 			tabIndex={0}
// 			className={cls.card}
// 			onClick={toggleTimeSleepModal}>
// 			<Heading
// 				className={cls.settingTitle}
// 				as='h2'
// 				title={t('time sleep')}
// 			/>
// 			<Icon
// 				Svg={InfoIcon}
// 				width={28}
// 				height={28}
// 				className={cls.info}
// 			/>
// 		</Card>)
// 	const notificationSettings = (
// 		<Card
// 			tabIndex={0}
// 			className={cls.card}
// 			onClick={toggleNotificationModal}>
// 			<Heading
// 				className={cls.settingTitle}
// 				as='h2'
// 				title={t('notifications')}
// 			/>
// 			<Icon
// 				Svg={InfoIcon}
// 				width={28}
// 				height={28}
// 				className={cls.info}
// 			/>
// 		</Card>)
// 	const missedTrainingSettings = (
// 		<Card
// 			tabIndex={0}
// 			className={cls.card}
// 			onClick={toggleMissedTrainingModal}>
// 			{/* onClick={openMissedTraining}> */}
// 			<Heading
// 				className={cls.settingTitle}
// 				as='h2'
// 				title={t('missed training')}
// 			/>
// 			<Icon
// 				Svg={InfoIcon}
// 				clickable
// 				onClick={onMissedTrainingInfoClick}
// 				width={28}
// 				height={28}
// 				className={cls.info}
// 			/>
// 		</Card>)

// 	return (
// 		<div className={cls.settingsPageWidget} >
// 			{shelfTemplateSettings}
// 			{timeSleepSettings}
// 			{notificationSettings}
// 			{missedTrainingSettings}
// 			<ShelfTemplateSettings
// 				isOpen={settingModalStates.shelfTemplateModal}
// 				onClose={toggleShelfTemplateModal}
// 			/>
// 			<NotificationSettings
// 				isOpen={settingModalStates.notificationModal}
// 				onClose={toggleNotificationModal}
// 			/>
// 			<MissedTrainingSettings
// 				isOpen={settingModalStates.missedTrainingModal}
// 				onClose={toggleMissedTrainingModal}
// 			// lazy={true}
// 			/>
// 			<TimeSleepSettings
// 				isOpen={settingModalStates.timeSleepModal}
// 				onClose={toggleTimeSleepModal}
// 			/>
// 		</div>
// 	)
// }
