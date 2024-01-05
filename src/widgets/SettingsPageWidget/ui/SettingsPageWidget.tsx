import { TFunction, useTranslation } from 'react-i18next';
import { ShelfTemplateSettingsModal, TimeSleepSettingsModal, settingsFeaturesActions, settingsFeaturesReducer } from '@/features/SettingsFeatures';
import { Heading } from '@/shared/ui/Typography';
import { Card } from '@/shared/ui/Card';
import InfoIcon from '@/shared/assets/icons/infoIcon.svg'
import './SettingsPageWidget.css';
import { Icon } from '@/shared/ui/Icon';
import { MissedTrainingSettingsModal } from '@/features/SettingsFeatures';
import { NotificationSettingsModal } from '@/features/SettingsFeatures'
import { useGetUserSettingsQuery, userActions } from '@/entities/User';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import {
	getIsTimeSleepModalOpen,
	getIsMissedTrainingModalOpen,
	getIsNotificationModalOpen,
	getIsShelfTemplateModalOpen,
} from '@/features/SettingsFeatures';
import { useEffect, ReactNode, KeyboardEvent, MouseEvent } from 'react';


interface SettingsPageWidgetProps {
	className?: string
}

const reducers: ReducersList = {
	settingsFeatures: settingsFeaturesReducer,
}

export const SettingsPageWidget = (props: SettingsPageWidgetProps) => {
	const { t } = useTranslation('settings')
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })
	const { isLoading, data, error } = useGetUserSettingsQuery()

	useEffect(() => {
		if (data) {
			console.log('data', data)
			dispatch(userActions.setSettings(data))
			if (!data.timeSleep.dayByDayTimeSleepData) {
				const d = data.timeSleep.generalTimeSleepData
				dispatch(userActions.setDayByDayTimeSleepDataInitial(d))
			}
		}
	}, [data, dispatch])

	useEffect(() => {
		dispatch(userActions.setSettingsIsLoading(isLoading))
	}, [isLoading, dispatch])


	const settingsDataBlocks = [
		{
			title: t('shelf template'),
			toggleModalFn: (isOpen: boolean) => dispatch(settingsFeaturesActions.setIsShelfTemplateModalOpen(isOpen)),
			ModalComponent: <ShelfTemplateSettingsModal />,
			isOpenSelectorFn: getIsShelfTemplateModalOpen,
		},
		{
			title: t('time sleep'),
			toggleModalFn: (isOpen: boolean) => dispatch(settingsFeaturesActions.setIsTimeSleepModalOpen(isOpen)),
			ModalComponent: <TimeSleepSettingsModal />,
			isOpenSelectorFn: getIsTimeSleepModalOpen,
		},
		{
			title: t('notifications'),
			toggleModalFn: (isOpen: boolean) => dispatch(settingsFeaturesActions.setIsNotificationModalOpen(isOpen)),
			ModalComponent: <NotificationSettingsModal />,
			isOpenSelectorFn: getIsNotificationModalOpen,
		},
		{
			title: t('missed training'),
			toggleModalFn: (isOpen: boolean) => dispatch(settingsFeaturesActions.setIsMissedTrainingModalOpen(isOpen)),
			ModalComponent: <MissedTrainingSettingsModal />,
			isOpenSelectorFn: getIsMissedTrainingModalOpen,
		},
	]

	return (
		<div className={'settingsPageWidget'} >
			{settingsDataBlocks.map((block, i) => (
				<SettingsCardSlot
					key={i}
					isLoading={isLoading}
					isOpenSelectorFn={block.isOpenSelectorFn}
					toggleModalFn={block.toggleModalFn}
					title={block.title}
					ModalComponent={block.ModalComponent}
				/>)
			)}
		</div>
	)
}

interface SettingsCardSlotProps {
	isLoading: boolean
	isOpenSelectorFn: (state: StateSchema) => boolean | undefined
	toggleModalFn: (isOpen: boolean) => void
	title: string
	ModalComponent: ReactNode
}

const SettingsCardSlot = (props: SettingsCardSlotProps) => {
	const {
		isOpenSelectorFn,
		toggleModalFn,
		isLoading,
		title,
		ModalComponent,
	} = props
	const isOpen = useSelector(isOpenSelectorFn)
	const toggleModalIsOpen = () => {
		toggleModalFn(!isOpen)
	}

	const onEnterToggleModalIsOpen = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') toggleModalIsOpen()
	}

	const onSettingInfoClick = (e: MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		// show info
	}

	return (
		<>
			<Card
				tabIndex={0}
				className={'card'}
				onKeyDown={onEnterToggleModalIsOpen}
				onClick={toggleModalIsOpen}
				isLoading={isLoading}>
				<Heading
					className={'settingTitle'}
					as='h2'
					title={title}
				/>
				<Icon
					Svg={InfoIcon}
					clickable
					onClick={onSettingInfoClick}
					width={28}
					height={28}
					className={'info'}
				/>
			</Card>
			{ModalComponent}
		</>
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
