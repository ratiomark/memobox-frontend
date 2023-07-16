import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './TimeSleepSettings.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Switcher } from '@/shared/ui/Switcher';
import { SingleSetter } from '@/shared/ui/TimeSetter/SingleSetter';
import { Heading, MyText } from '@/shared/ui/Typography';
import { Card } from '@/shared/ui/Card';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { settingsTimeSleepActions, settingsTimeSleepReducer } from '../model/slice/timeSleepSlice';
import { WheelEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserTimeSleepSettings } from '@/entities/User';
import { getTimeSleepEnabled, getDayByDayOptionEnabled, getGeneralTimeSleepData, getDayByDayTimeSleepData } from '../model/selectors/settingsTimeSleep';
import { TimeControllerFunction } from '../model/types/TimeSleepTypes';
import { HoursMinutesWrapper } from './HoursMinutesWrapper/HoursMinutesWrapper';
import { GeneralHoursMinutesComponent } from './GeneralHoursMinutesComponent/GeneralHoursMinutesComponent copy';
import { DayByDayHoursMinutesComponent } from './DayByDayHoursMinutesComponent/DayByDayHoursMinutesComponent';



interface TimeSleepSettingsProps {
	className?: string
	isOpen: boolean
	onClose: () => void
}

const reducers: ReducersList = {
	settingsTimeSleep: settingsTimeSleepReducer,
}

export const TimeSleepSettings = (props: TimeSleepSettingsProps) => {
	const {
		className,
		isOpen,
		onClose
	} = props
	const { t } = useTranslation()
	const timeSleepSettingsFromUser = useSelector(getUserTimeSleepSettings)
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })
	const generalTimeSleepData = useSelector(getGeneralTimeSleepData)

	// const generalHoursUp = generalTimeSleepData?.up.hours
	// const generalMinutesUp = generalTimeSleepData?.up.minutes
	// const generalHoursDown = generalTimeSleepData?.down.hours
	// const generalMinutesDown = generalTimeSleepData?.down.minutes
	// const {down, up  } = generalTimeSleepData!
	const isTimeSleepEnabled = useSelector(getTimeSleepEnabled)
	const isDayByDayTimeSleepEnabled = useSelector(getDayByDayOptionEnabled)
	const dayByDayTimeSleepData = useSelector(getDayByDayTimeSleepData)

	useEffect(() => {
		dispatch(settingsTimeSleepActions.setInitialData(timeSleepSettingsFromUser!))
	}, [dispatch, timeSleepSettingsFromUser])

	const onCloseHandle = () => onClose()
	const onToggleTimeSleepEnabled = () => dispatch(settingsTimeSleepActions.toggleTimeSleepEnabled())
	const onToggleDayByDayEnabled = () => dispatch(settingsTimeSleepActions.toggleDayByDayTimeSleepEnabled())

	return (

		<HDialog
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className={clsx(
				cls.TimeSleepSettings,
				className)}
			>
				<div className={cls.timeSleepBlock} >
					<Card className={cls.timeSleepCard} >
						<Heading size='s' as='h1' title={'Время сна'} />
						<Switcher
							isChecked={isTimeSleepEnabled}
							onClickSwitcher={onToggleTimeSleepEnabled}
						/>
					</Card>
					<div className={cls.content} >

						{
							isDayByDayTimeSleepEnabled
								? <DayByDayHoursMinutesComponent />
								: <GeneralHoursMinutesComponent />
						}
						<div>
							<MyText text={t('enable day by day')}/>
							<Switcher
								isChecked={isDayByDayTimeSleepEnabled}
								onClickSwitcher={onToggleDayByDayEnabled}
							/>
						</div>
					</div>
					{/* <HoursMinutesWrapper
						dayType='general'
						timeSleepData={generalTimeSleepData}
					/> */}
					{/* <div className={cls.detailsBlock} >

						<SingleSetter
							// title='Минуты'
							maxTime={55}
							time={generalMinutesUp < 10 ? `0${generalMinutesUp}` : generalMinutesUp}
							onUpClick={() => onUpMinutes('general', 'up',)}
							onDownClick={() => onDownMinutes('general', 'up')}
							onWheelScroll={onScrollMinutesGeneralUp}
							disabled={!isTimeSleepEnabled}
						/>
					</div> */}
				</div>
				{/* <div className={cls.notificationBlock} >
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
				</div> */}
				<HStack justify='between' max>
					<Button onClick={onCloseHandle}>{t('cancel')}</Button>
					<Button variant='filled'>{t('save')}</Button>
				</HStack>
			</div>
		</HDialog>

	)
}