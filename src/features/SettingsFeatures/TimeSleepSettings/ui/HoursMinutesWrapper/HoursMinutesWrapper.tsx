import clsx from 'clsx'
import cls from './HoursMinutesWrapper.module.scss'
import { SingleSetter } from '@/shared/ui/TimeSetter/SingleSetter';
import { settingsTimeSleepActions } from '../../model/slice/timeSleepSlice';
import { TimeSleepDataObject } from '@/entities/User';
import { WheelEvent } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { DayType, TimeControllerFunction } from '../../model/types/TimeSleepTypes';
import { MyText } from '@/shared/ui/Typography';

interface HoursMinutesWrapperProps {
	className?: string;
	dayType: DayType
	timeSleepData?: TimeSleepDataObject
}

const timeSleepDataObject: TimeSleepDataObject = {
	down: {
		hours: 0,
		minutes: 0,
	},
	up: {
		hours: 8,
		minutes: 0
	}
}

const getTimeRepresentation = (timeValue: number): number | string => (timeValue < 10 ? `0${timeValue}` : timeValue)
// onUpMinutes(day, up)
// [mo, th, wd].map(day=><HoursMinutesWrapper day={day}/>)
// должно быть 4 singleSetter. UP: hour + minutes, DOWN: hour + minutes
// должно быть 12 колбебок для каждого сеттера по 3.
export const HoursMinutesWrapper = (props: HoursMinutesWrapperProps) => {
	const {
		className,
		dayType,
		// onUpMinutes,
		// onDownMinutes,
		timeSleepData = timeSleepDataObject,
	} = props
	const dispatch = useAppDispatch()
	if (!timeSleepData) return null

	const hoursUp = getTimeRepresentation(timeSleepData.up.hours)
	const minutesUp = getTimeRepresentation(timeSleepData.up.minutes)
	const hoursDown = getTimeRepresentation(timeSleepData.down.hours)
	const minutesDown = getTimeRepresentation(timeSleepData.down.minutes)
	// подъем
	const onHoursUpPlusHandler = () => {
		if (timeSleepData['up'].hours === 23) return
		dispatch(settingsTimeSleepActions.setHours({ dayType, operation: 'plus', sleepMode: 'up' }))
	}

	const onHoursUpMinusHandler = () => {
		if (timeSleepData['up'].hours < 1) return
		dispatch(settingsTimeSleepActions.setHours({ dayType, operation: 'minus', sleepMode: 'up' }))
	}

	const onMinutesUpPlusHandler = () => {
		if (timeSleepData['up'].minutes === 55) return
		dispatch(settingsTimeSleepActions.setMinutes({ dayType, operation: 'plus', sleepMode: 'up' }))
	}

	const onMinutesUpMinusHandler = () => {
		if (timeSleepData['up'].minutes < 1) return
		dispatch(settingsTimeSleepActions.setMinutes({ dayType, operation: 'minus', sleepMode: 'up' }))
	}
	const onScrollHoursUpHandler = (e: WheelEvent<HTMLElement>) => {
		if (e.deltaY > 0) onHoursUpMinusHandler()
		else onHoursUpPlusHandler()
	}
	const onScrollMinutesUpHandler = (e: WheelEvent<HTMLElement>) => {
		if (e.deltaY > 0) onMinutesUpMinusHandler()
		else onMinutesUpPlusHandler()
	}
	// отбой
	const onHoursDownPlusHandler = () => {
		if (timeSleepData['down'].hours === 23) return
		dispatch(settingsTimeSleepActions.setHours({ dayType, operation: 'plus', sleepMode: 'down' }))
	}

	const onHoursDownMinusHandler = () => {
		if (timeSleepData['down'].hours < 1) return
		dispatch(settingsTimeSleepActions.setHours({ dayType, operation: 'minus', sleepMode: 'down' }))
	}

	const onMinutesDownPlusHandler = () => {
		if (timeSleepData['down'].minutes === 55) return
		dispatch(settingsTimeSleepActions.setMinutes({ dayType, operation: 'plus', sleepMode: 'down' }))
	}

	const onMinutesDownMinusHandler = () => {
		if (timeSleepData['down'].minutes < 1) return
		dispatch(settingsTimeSleepActions.setMinutes({ dayType, operation: 'minus', sleepMode: 'down' }))
	}

	const onScrollHoursDownHandler = (e: WheelEvent<HTMLElement>) => {
		if (e.deltaY > 0) onHoursDownMinusHandler()
		else onHoursDownPlusHandler()
	}

	const onScrollMinutesDownHandler = (e: WheelEvent<HTMLElement>) => {
		if (e.deltaY > 0) onMinutesDownMinusHandler()
		else onMinutesDownPlusHandler()
	}


	const hoursUpComponent = (<SingleSetter
		maxTime={23}
		time={hoursUp}
		onUpClick={onHoursUpPlusHandler}
		onDownClick={onHoursUpMinusHandler}
		onWheelScroll={onScrollHoursUpHandler}
	// disabled={!isTimeSleepEnabled}
	/>)
	const minutesUpComponent = (<SingleSetter
		maxTime={55}
		time={minutesUp}
		onUpClick={onMinutesUpPlusHandler}
		onDownClick={onMinutesUpMinusHandler}
		onWheelScroll={onScrollMinutesUpHandler}
	/>)
	const hoursDownComponent = (<SingleSetter
		maxTime={23}
		time={hoursDown}
		onUpClick={onHoursDownPlusHandler}
		onDownClick={onHoursDownMinusHandler}
		onWheelScroll={onScrollHoursDownHandler}
	// disabled={!isTimeSleepEnabled}
	/>)
	const minutesDownComponent = (<SingleSetter
		maxTime={55}
		time={minutesDown}
		onUpClick={onMinutesDownPlusHandler}
		onDownClick={onMinutesDownMinusHandler}
		onWheelScroll={onScrollMinutesDownHandler}
	/>)

	return (
		<div className={cls.wrapper} >
			<MyText text={'timer'} className={cls.dayType} />
			<div className={cls.hoursAndMinutesBlock} >
				{hoursDownComponent}
				{minutesDownComponent}
			</div>
			<div className={cls.hoursAndMinutesBlock} >
				{hoursUpComponent}
				{minutesUpComponent}
			</div>
		</div>
	)
}