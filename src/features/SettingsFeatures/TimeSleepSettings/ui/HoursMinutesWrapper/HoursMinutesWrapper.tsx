import cls from './HoursMinutesWrapper.module.scss'
import { SingleSetter } from '@/shared/ui/TimeSetter/SingleSetter';
import { settingsTimeSleepActions } from '../../model/slice/timeSleepSlice';
import { WheelEvent, memo } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { DayType } from '../../model/types/TimeSleepTypes';
import { TimeSleepAtomicDataObject } from '@/entities/User';
import { getTimeRepresentation } from '@/shared/lib/helpers/common/getTimeRepresentation';

interface HoursMinutesWrapperProps {
	className?: string
	disabled?: boolean
	dayType: DayType
	startTimeSleepTimeObject?: TimeSleepAtomicDataObject
	maxTimeHours?: number
	maxTimeMinutes?: number
	indexPeriod?: number
}

const timeSleepDataObject = {
	hours: 0,
	minutes: 0,
}

export const HoursMinutesWrapper = memo((props: HoursMinutesWrapperProps) => {
	const {
		className,
		dayType,
		disabled,
		startTimeSleepTimeObject = timeSleepDataObject,
		indexPeriod = 0,
	} = props
	const dispatch = useAppDispatch()
	const hours = getTimeRepresentation(startTimeSleepTimeObject.hours)
	const minutes = getTimeRepresentation(startTimeSleepTimeObject.minutes)

	const onHoursPlusHandler = () => {
		if (dayType === 'general') {
			dispatch(settingsTimeSleepActions.setStartTimeHours({ dayType, operation: 'plus' }))
			return
		}
		dispatch(settingsTimeSleepActions.setStartTimeHours({ dayType, operation: 'plus', indexPeriod }))
	}

	const onHoursMinusHandler = () => {
		if (dayType === 'general') {
			dispatch(settingsTimeSleepActions.setStartTimeHours({ dayType, operation: 'minus' }))
			return
		}
		dispatch(settingsTimeSleepActions.setStartTimeHours({ dayType, operation: 'minus', indexPeriod }))
	}

	const onMinutesPlusHandler = () => {
		if (dayType === 'general') {
			dispatch(settingsTimeSleepActions.setStartTimeMinutes({ dayType, operation: 'plus' }))
			return
		}
		dispatch(settingsTimeSleepActions.setStartTimeMinutes({ dayType, operation: 'plus', indexPeriod }))
	}

	const onMinutesMinusHandler = () => {
		if (dayType === 'general') {
			dispatch(settingsTimeSleepActions.setStartTimeMinutes({ dayType, operation: 'minus' }))
			return
		}
		dispatch(settingsTimeSleepActions.setStartTimeMinutes({ dayType, operation: 'minus', indexPeriod }))
	}

	const onScrollHoursHandler = (e: WheelEvent<HTMLElement> | globalThis.WheelEvent) => {
		if (e.deltaY > 0) onHoursMinusHandler()
		else onHoursPlusHandler()
	}

	const onScrollMinutesHandler = (e: WheelEvent<HTMLElement> | globalThis.WheelEvent) => {
		if (e.deltaY > 0) onMinutesMinusHandler()
		else onMinutesPlusHandler()
	}

	const hoursComponent = (<SingleSetter
		maxTime={23}
		disabled={disabled}
		time={hours}
		onUpClick={onHoursPlusHandler}
		onDownClick={onHoursMinusHandler}
		onWheelScroll={onScrollHoursHandler}
	// disabled={!isTimeSleepEnabled}
	/>)
	const minutesComponent = (<SingleSetter
		maxTime={55}
		disabled={disabled}
		time={minutes}
		onUpClick={onMinutesPlusHandler}
		onDownClick={onMinutesMinusHandler}
		onWheelScroll={onScrollMinutesHandler}
	/>)

	return (
		// <div className={cls.wrapper} >
		<>
			<div className={cls.hoursAndMinutesBlock} >
				{hoursComponent}
				:
				{minutesComponent}
			</div>
		</>
	)
})
HoursMinutesWrapper.displayName = 'HoursMinutesWrapper'
