import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './TimeSetter.module.scss';
import { CSSProperties, MouseEvent, WheelEvent, useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon';
import { MyText } from '../Typography';
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg'
import { Button } from '../Button';
import { SingleSetter } from './SingleSetter';
import { Portal } from '../Portal/Portal';
import { HStack } from '../Stack';
import useLockedBody from '@/shared/lib/helpers/hooks/useLockedBody';
import { TimingBlock } from '@/shared/types/DataBlock';
import { timingDataDefault } from '@/shared/const/timingBlock';

interface TimeSetterProps {
	className?: string
	timingData?: TimingBlock
	// minutes: number
	// hours: number
	// days: number
	// weeks: number
	// months: number
	onClose: () => void
	lockSelector?: string
	overlay?: boolean
	onSaveTime: (timeObject: TimingBlock) => void
	styles?: CSSProperties
}

let singleSetterMaxWidth: number;
export const TimeSetter = (props: TimeSetterProps) => {
	const {
		className,
		timingData = timingDataDefault,
		// minutes: minutesProps = 0,
		// hours: hoursProps = 0,
		// days: daysProps = 0,
		// weeks: weeksProps = 0,
		// months: monthsProps = 0,
		onClose,
		// lockSelector = '[data-testid="MainPage"]',
		overlay = true,
		onSaveTime,
	} = props
	// const [locked, setLocked] = useLockedBody(false, lockSelector)
	// const timeSetterRef = useRef<HTMLDivElement>()
	const [minutes, setMinutes] = useState(timingData.minutes)
	const [hours, setHours] = useState(timingData.hours)
	const [days, setDays] = useState(timingData.days)
	const [weeks, setWeeks] = useState(timingData.weeks)
	const [months, setMonths] = useState(timingData.months)
	// const [minutes, setMinutes] = useState(minutesProps)
	// const [hours, setHours] = useState(hoursProps)
	// const [days, setDays] = useState(daysProps)
	// const [weeks, setWeeks] = useState(weeksProps)
	// const [months, setMonths] = useState(monthsProps)
	const [disabled, setDisabled] = useState(false)


	const onSaveTimeHandle = () => {
		onSaveTime({ minutes, hours, days, weeks, months })
	}

	useEffect(() => {
		const total = minutes + hours + days + weeks + months
		if (total) setDisabled(false)
		else setDisabled(true)
	}, [minutes, hours, days, weeks, months])

	useEffect(() => {
		const singleSetters = document.querySelectorAll('[data-time-setter="time-setter-single-setter-component"]') as NodeListOf<HTMLDivElement>
		if (!singleSetterMaxWidth) {
			const singleSettersWidthList: number[] = []
			singleSetters.forEach(button => singleSettersWidthList.push(button.clientWidth))
			singleSetterMaxWidth = Math.ceil(Math.max(...singleSettersWidthList))
			console.log('Установленна одинаковая ширина столбцов')
		}
		singleSetters.forEach(div => div.style.minWidth = `${singleSetterMaxWidth + 2}px`)
	}, [])



	// useEffect(() => {
	// 	setLocked(true)
	// 	return () => setLocked(!locked)
	// }, [setLocked, locked])

	const onUpClickMinutes = () => {
		if (minutes === 59) return //setMinutes(0);
		setMinutes(minutes => minutes + 1)
	}
	const onDownClickMinutes = () => {
		if (minutes === 0) return //setMinutes(59);
		setMinutes(minutes => minutes - 1)
	}
	const onScrollMinutes = (e: WheelEvent<HTMLElement> | globalThis.WheelEvent) => {
		if (e.deltaY > 0) onDownClickMinutes()
		else onUpClickMinutes()
	}
	// hours
	const onUpClickHours = () => {
		if (hours === 23) return //setHours(0);
		setHours(hours => hours + 1)
	}
	const onDownClickHours = () => {
		if (hours === 0) return //setHours(23);
		setHours(hours => hours - 1)
	}
	const onScrollHours = (e: WheelEvent<HTMLElement> | globalThis.WheelEvent) => {
		if (e.deltaY > 0) onDownClickHours()
		else onUpClickHours()
	}
	// days
	const onUpClickDays = () => {
		if (days === 29) return //setDays(0);
		setDays(days => days + 1)
	}
	const onDownClickDays = () => {
		if (days === 0) return //setDays(23);
		setDays(days => days - 1)
	}
	const onScrollDays = (e: WheelEvent<HTMLElement> | globalThis.WheelEvent) => {
		if (e.deltaY > 0) onDownClickDays()
		else onUpClickDays()
	}
	// weeks
	const onUpClickWeeks = () => {
		if (weeks === 4) return //setHours(0);
		setWeeks(weeks => weeks + 1)
	}
	const onDownClickWeeks = () => {
		if (weeks === 0) return //setHours(23);
		setWeeks(weeks => weeks - 1)
	}
	const onScrollWeeks = (e: WheelEvent<HTMLElement> | globalThis.WheelEvent) => {
		if (e.deltaY > 0) onDownClickWeeks()
		else onUpClickWeeks()
	}
	// months
	const onUpClickMonths = () => {
		if (months === 24) return //setHours(0);
		setMonths(months => months + 1)
	}
	const onDownClickMonths = () => {
		if (months === 0) return //setHours(23);
		setMonths(months => months - 1)
	}
	const onScrollMonths = (e: WheelEvent<HTMLElement> | globalThis.WheelEvent) => {
		if (e.deltaY > 0) onDownClickMonths()
		else onUpClickMonths()
	}

	const { t } = useTranslation()

	return (
		<div
			className={clsx(
				cls.TimeSetter,
				className
			)}
			id='timeSetter'
		// ref={timeSetterRef}
		>
			<HStack gap='gap_16' className={cls.setterWrapper} align='center'>
				{/* <div className={cls.line} /> */}
				<SingleSetter
					time={minutes}
					onUpClick={onUpClickMinutes}
					onDownClick={onDownClickMinutes}
					onWheelScroll={onScrollMinutes}
					maxTime={59}
					title={t('minutes')}
				/>
				<SingleSetter
					time={hours}
					onUpClick={onUpClickHours}
					onDownClick={onDownClickHours}
					onWheelScroll={onScrollHours}
					maxTime={23}
					title={t('hours')}
				/>
				<SingleSetter
					time={days}
					onUpClick={onUpClickDays}
					onDownClick={onDownClickDays}
					onWheelScroll={onScrollDays}
					maxTime={29}
					title={t('days')}
				/>
				<SingleSetter
					time={weeks}
					onUpClick={onUpClickWeeks}
					onDownClick={onDownClickWeeks}
					onWheelScroll={onScrollWeeks}
					maxTime={4}
					title={t('weeks')}
				/>
				<SingleSetter
					time={months}
					onUpClick={onUpClickMonths}
					onDownClick={onDownClickMonths}
					onWheelScroll={onScrollMonths}
					maxTime={24}
					title={t('months')}
				/>
			</HStack>
			<HStack justify='between' className={cls.buttonsWrapper}  >
				<Button fontWeight='300' onClick={onClose}>
					{t('cancel')}
				</Button>
				<Button
					fontWeight='300'
					variant='filled'
					disabled={disabled}
					onClick={onSaveTimeHandle}
				>
					{t('save')}
				</Button>
			</HStack>
			{/* {overlay &&
				<Portal>
					<div className={cls.overlay} onClick={onClose} />
				</Portal>
			} */}
		</div>

	)
}
