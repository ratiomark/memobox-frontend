import clsx from 'clsx'
import cls from './DayByDayHoursMinutesComponent.module.scss'
import { useSelector } from 'react-redux';
import { getDayByDayTimeSleepData, getGeneralTimeSleepData } from '../../model/selectors/settingsTimeSleep';
import { HoursMinutesWrapper } from '../HoursMinutesWrapper/HoursMinutesWrapper';
import { DaysOfWeek } from '@/entities/User';
import { MyText } from '@/shared/ui/Typography';
import { useTranslation } from 'react-i18next';

interface GeneralHoursMinutesProps {
	className?: string;
}
const daysOfWeek: DaysOfWeek[] = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday'
];
export const DayByDayHoursMinutesComponent = (props: GeneralHoursMinutesProps) => {
	const {
		className,
	} = props

	const dayByDayTimeSleepData = useSelector(getDayByDayTimeSleepData)
	const { t } = useTranslation('settings')

	return (	
		
		<div className={cls.DayByDayHoursMinutesComponent}>
			<div/>
			<MyText align='center' text={t('start sleep')} className={cls.title} />
			<MyText align='center' text={t('end sleep')} className={cls.title} />
			{daysOfWeek.map(day => {
				return (					
					<>
						<MyText text={t(`days.${day}`)} size='s' />
						<HoursMinutesWrapper
							dayType={day}
							timeSleepData={dayByDayTimeSleepData?.[day]}
						/>
					</>
				)
			})}
		</div>
	)
}


// import clsx from 'clsx'
// import cls from './DayByDayHoursMinutesComponent.module.scss'
// import { useSelector } from 'react-redux';
// import { getDayByDayTimeSleepData, getGeneralTimeSleepData } from '../../model/selectors/settingsTimeSleep';
// import { HoursMinutesWrapper } from '../HoursMinutesWrapper/HoursMinutesWrapper';
// import { DaysOfWeek } from '@/entities/User';
// import { MyText } from '@/shared/ui/Typography';
// import { useTranslation } from 'react-i18next';
// import { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';

// interface GeneralHoursMinutesProps {
// 	className?: string;
// }
// const daysOfWeek: DaysOfWeek[] = [
// 	'monday',
// 	'tuesday',
// 	'wednesday',
// 	'thursday',
// 	'friday',
// 	'saturday',
// 	'sunday'
// ];
// export const DayByDayHoursMinutesComponent = (props: GeneralHoursMinutesProps) => {
// 	const {
// 		className,
// 	} = props
// 	const dayByDayTimeSleepData = useSelector(getDayByDayTimeSleepData)
// 	const wrapperRef = useRef<HTMLDivElement>(null)

// 	// useEffect(() => {
// 	// 	wrapperRef.current!.scrollBy({ top: 100, left: 1000, behavior: 'smooth' })
// 	// }, [])

// 	const { t } = useTranslation('settings')
// 	return (
// 		// <div
// 		// 	ref={wrapperRef}
// 		// 	className={clsx(cls.DayByDayHoursMinutesComponent, [className])}
// 		// >
// 		<>
// 			<div className={cls.titles} >
				
// 				<MyText text={t('start sleep')} className={cls.title} />
// 				<MyText text={t('end sleep')} className={cls.title} />

// 			</div>
// 			{daysOfWeek.map(day => {
// 				return (
// 					<div key={day} className={cls.dayWrapper} >
// 						<MyText text={t(`days.${day}`)} size='s' />
// 						<HoursMinutesWrapper
// 							dayType={day}
// 							timeSleepData={dayByDayTimeSleepData?.[day]}
// 						/>
// 					</div>
// 				)
// 			})}
// 		</>


// 	)
// }