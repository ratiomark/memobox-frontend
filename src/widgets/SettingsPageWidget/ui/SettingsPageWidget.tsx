import { useTranslation } from 'react-i18next';
import { ShelfTemplateSettings, TimeSleepSettings } from '@/features/SettingsFeatures';
import { Heading } from '@/shared/ui/Typography';
import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import { Card } from '@/shared/ui/Card';
import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
import './SettingsPageWidget.css';
import { Icon } from '@/shared/ui/Icon';
import { MissedTrainingSettings } from '@/features/SettingsFeatures';
import { NotificationSettings } from '@/features/SettingsFeatures'
import { BoxTimeSetterSettingsPageModal } from '@/features/SettingsFeatures';
import { useGetUserSettingsQuery, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';


interface SettingsPageWidgetProps {
	className?: string
}

export const SettingsPageWidget = (props: SettingsPageWidgetProps) => {
	const { t } = useTranslation('settings')
	// запросить настройки и сохранить в стейт редакса
	const { isLoading, data, error } = useGetUserSettingsQuery()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (data) {
			console.log('data', data)
			dispatch(userActions.setSettings(data))
			if (!data.timeSleep.dayByDayTimeSleepData) {
				const d = data.timeSleep.generalTimeSleepData
				dispatch(userActions.setDayByDayTimeSleepDataInitial(d))
			}
			// console.log(data)
		}
	}, [data, dispatch])

	useEffect(() => {
		dispatch(userActions.setSettingsIsLoading(isLoading))
	}, [isLoading, dispatch])

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
	const onEnterToggleShelfTemplateModal = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') toggleShelfTemplateModal()
	}
	const onEnterToggleTimeSleepModal = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') toggleTimeSleepModal()
	}
	const onEnterToggleNotificationModal = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') toggleNotificationModal()
	}
	const onEnterToggleMissedTrainingModal = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') toggleMissedTrainingModal()
	}

	const onMissedTrainingInfoClick = (e: MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		// show info
	}
	const onNotificationInfoClick = (e: MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		// show info
	}
	const onTimeSleepInfoClick = (e: MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		// show info
	}
	const onShelfTemplateInfoClick = (e: MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		// show info
	}

	const shelfTemplateSettings = (
		<Card
			tabIndex={0}
			className={'card '}
			onKeyDown={onEnterToggleShelfTemplateModal}
			onClick={toggleShelfTemplateModal}
			isLoading={isLoading}>
			<Heading
				className={'settingTitle'}
				as='h2'
				title={t('shelf template')}
			/>
			<Icon
				Svg={InfoIcon}
				clickable
				onClick={onShelfTemplateInfoClick}
				width={28}
				height={28}
				className={'info'}
			/>
		</Card>)
	const timeSleepSettings = (
		<Card
			tabIndex={0}
			className={'card'}
			onKeyDown={onEnterToggleTimeSleepModal}
			onClick={toggleTimeSleepModal}
			isLoading={isLoading}>
			<Heading
				className={'settingTitle'}
				as='h2'
				title={t('time sleep')}
			/>
			<Icon
				Svg={InfoIcon}
				clickable
				onClick={onTimeSleepInfoClick}
				width={28}
				height={28}
				className={'info'}
			/>
		</Card>)
	const notificationSettings = (
		<Card
			tabIndex={0}
			className={'card'}
			onKeyDown={onEnterToggleNotificationModal}
			onClick={toggleNotificationModal}
			isLoading={isLoading}>
			<Heading
				className={'settingTitle'}
				as='h2'
				title={t('notifications')}
			/>
			<Icon
				Svg={InfoIcon}
				clickable
				onClick={onNotificationInfoClick}
				width={28}
				height={28}
				className={'info'}
			/>
		</Card>)
	const missedTrainingSettings = (
		<Card
			tabIndex={0}
			className={'card'}
			onKeyDown={onEnterToggleMissedTrainingModal}
			onClick={toggleMissedTrainingModal}
			isLoading={isLoading}>
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
