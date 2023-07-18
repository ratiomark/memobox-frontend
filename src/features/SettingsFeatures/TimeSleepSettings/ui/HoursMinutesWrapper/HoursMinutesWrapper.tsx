import clsx from 'clsx'
import cls from './HoursMinutesWrapper.module.scss'
import { SingleSetter } from '@/shared/ui/TimeSetter/SingleSetter';
import { settingsTimeSleepActions } from '../../model/slice/timeSleepSlice';
import { TimeSleepDataObject } from '@/entities/User';
import { WheelEvent, memo } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { DayType, TimeControllerFunction } from '../../model/types/TimeSleepTypes';
import { MyText } from '@/shared/ui/Typography';

interface HoursMinutesWrapperProps {
	className?: string
	disabled?: boolean
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

export const HoursMinutesWrapper = memo((props: HoursMinutesWrapperProps) => {
	const {
		className,
		dayType,
		disabled,
		timeSleepData = timeSleepDataObject,
	} = props
	const dispatch = useAppDispatch()
	const hoursUp = getTimeRepresentation(timeSleepData.up.hours)
	const minutesUp = getTimeRepresentation(timeSleepData.up.minutes)
	const hoursDown = getTimeRepresentation(timeSleepData.down.hours)
	const minutesDown = getTimeRepresentation(timeSleepData.down.minutes)

	// подъем
	const onHoursUpPlusHandler = () => {
		dispatch(settingsTimeSleepActions.setHours({ dayType, operation: 'plus', sleepMode: 'up' }))
	}

	const onHoursUpMinusHandler = () => {
		dispatch(settingsTimeSleepActions.setHours({ dayType, operation: 'minus', sleepMode: 'up' }))
	}

	const onMinutesUpPlusHandler = () => {
		dispatch(settingsTimeSleepActions.setMinutes({ dayType, operation: 'plus', sleepMode: 'up' }))
	}

	const onMinutesUpMinusHandler = () => {
		dispatch(settingsTimeSleepActions.setMinutes({ dayType, operation: 'minus', sleepMode: 'up' }))
	}
	const onScrollHoursUpHandler = (e: WheelEvent<HTMLElement> | globalThis.WheelEvent) => {
		if (e.deltaY > 0) onHoursUpMinusHandler()
		else onHoursUpPlusHandler()
	}
	const onScrollMinutesUpHandler = (e: WheelEvent<HTMLElement> | globalThis.WheelEvent) => {
		if (e.deltaY > 0) onMinutesUpMinusHandler()
		else onMinutesUpPlusHandler()
	}
	// отбой
	const onHoursDownPlusHandler = () => {
		dispatch(settingsTimeSleepActions.setHours({ dayType, operation: 'plus', sleepMode: 'down' }))
	}

	const onHoursDownMinusHandler = () => {
		dispatch(settingsTimeSleepActions.setHours({ dayType, operation: 'minus', sleepMode: 'down' }))
	}

	const onMinutesDownPlusHandler = () => {
		dispatch(settingsTimeSleepActions.setMinutes({ dayType, operation: 'plus', sleepMode: 'down' }))
	}

	const onMinutesDownMinusHandler = () => {
		dispatch(settingsTimeSleepActions.setMinutes({ dayType, operation: 'minus', sleepMode: 'down' }))
	}

	const onScrollHoursDownHandler = (e: WheelEvent<HTMLElement> | globalThis.WheelEvent) => {
		if (e.deltaY > 0) onHoursDownMinusHandler()
		else onHoursDownPlusHandler()
	}

	const onScrollMinutesDownHandler = (e: WheelEvent<HTMLElement> | globalThis.WheelEvent) => {
		if (e.deltaY > 0) onMinutesDownMinusHandler()
		else onMinutesDownPlusHandler()
	}


	const hoursUpComponent = (<SingleSetter
		maxTime={23}
		disabled={disabled}
		time={hoursUp}
		onUpClick={onHoursUpPlusHandler}
		onDownClick={onHoursUpMinusHandler}
		onWheelScroll={onScrollHoursUpHandler}
	// onWheelCapture
	// disabled={!isTimeSleepEnabled}
	/>)
	const minutesUpComponent = (<SingleSetter
		maxTime={55}
		disabled={disabled}
		time={minutesUp}
		onUpClick={onMinutesUpPlusHandler}
		onDownClick={onMinutesUpMinusHandler}
		onWheelScroll={onScrollMinutesUpHandler}
	/>)
	const hoursDownComponent = (<SingleSetter
		maxTime={23}
		disabled={disabled}
		time={hoursDown}
		onUpClick={onHoursDownPlusHandler}
		onDownClick={onHoursDownMinusHandler}
		onWheelScroll={onScrollHoursDownHandler}
	// disabled={!isTimeSleepEnabled}
	/>)
	const minutesDownComponent = (<SingleSetter
		maxTime={55}
		disabled={disabled}
		time={minutesDown}
		onUpClick={onMinutesDownPlusHandler}
		onDownClick={onMinutesDownMinusHandler}
		onWheelScroll={onScrollMinutesDownHandler}
	/>)

	return (
		<div className={cls.wrapper} >
			{/* <MyText text={'timer'} className={cls.dayType} /> */}
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
})
HoursMinutesWrapper.displayName = 'HoursMinutesWrapper'