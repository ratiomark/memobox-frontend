import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './TimeSetter.module.scss';
import { CSSProperties, WheelEvent, useEffect, useRef, useState } from 'react';
import { MyText } from '../Typography';
import { Button } from '../Button';
import { SingleSetter } from './SingleSetter';
import { HStack } from '../Stack';
import { TimingBlock } from '@/shared/types/DataBlock';
import { timingDataDefault } from '@/shared/const/timingBlock';

interface TimeSetterProps {
	className?: string
	timingData?: TimingBlock
	title?: string
	onClose: () => void
	lockSelector?: string
	overlay?: boolean
	onSaveTime: (timeObject: TimingBlock) => void
	styles?: CSSProperties
	id?: string
}

let singleSetterMaxWidth: number;
export const TimeSetter = (props: TimeSetterProps) => {
	const {
		className,
		timingData = timingDataDefault,
		title,
		onClose,
		onSaveTime,
		id,
	} = props
	const { t } = useTranslation()
	// const timeSetterRef = useRef<HTMLDivElement>(null)
	const [minutes, setMinutes] = useState(timingData.minutes)
	const [hours, setHours] = useState(timingData.hours)
	const [days, setDays] = useState(timingData.days)
	const [weeks, setWeeks] = useState(timingData.weeks)
	const [months, setMonths] = useState(timingData.months)
	const [disabled, setDisabled] = useState(false)

	// useEffect(() => {
	// 	if (timeSetterRef.current && startCallback) {
	// 		const sizes = { width: timeSetterRef.current.offsetWidth, height: timeSetterRef.current.offsetHeight }
	// 		// const sizes = timeSetterRef.current.getBoundingClientRect()
	// 		// const sizes = timeSetterRef.current.rect()
	// 		console.log(sizes)
	// 		startCallback(sizes)
	// 		// startCallback({ width: sizes.width, height: sizes.height })
	// 		// startCallback({ width: sizes.width, height: sizes.height })
	// 	}
	// }, [startCallback])

	const onSaveTimeHandle = () => {
		console.log('Внутри тайм сеттера')
		console.log({ minutes, hours, days, weeks, months })
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
			// console.log('Установленна одинаковая ширина столбцов')
		}
		singleSetters.forEach(div => div.style.minWidth = `${singleSetterMaxWidth + 2}px`)
	}, [])

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

	return (
		<div
			className={clsx(
				title
					? cls.TimeSetterWithTitle
					: cls.TimeSetter,
				className
			)}
			id={id}
		// ref={timeSetterRef}
		>
			{title && <MyText text={title} align='center' className={cls.timeSetterTitle} />}
			<div className={cls.singleSettersColumnsWrapper} >
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
			</div>
			<HStack justify='end' gap='gap_14' max className={cls.buttonsWrapper}  >
				<Button fontWeight='300' onClick={onClose}>
					{t('cancel no keys')}
				</Button>
				<Button
					fontWeight='300'
					variant='filled'
					disabled={disabled}
					onClick={onSaveTimeHandle}
				>
					{t('save no keys')}
				</Button>
			</HStack>
		</div>

	)
}
