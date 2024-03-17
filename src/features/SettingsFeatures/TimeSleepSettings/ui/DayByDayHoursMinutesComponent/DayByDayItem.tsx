import clsx from 'clsx'
import cls from './DayByDayHoursMinutesComponent.module.scss'
import { useSelector } from 'react-redux';
import { getDayByDayTimeSleepData, getGeneralTimeSleepData } from '../../model/selectors/settingsTimeSleep';
import { HoursMinutesWrapper } from '../HoursMinutesWrapper/HoursMinutesWrapper';
import { MyText } from '@/shared/ui/Typography';
import { useTranslation } from 'react-i18next';
import { DaysOfWeek, daysOfWeek } from '@/entities/User';
import { Input } from '@/shared/ui/Input/Input';
import { HStack } from '@/shared/ui/Stack';
import { settingsTimeSleepActions } from '../../model/slice/timeSleepSlice';
import { MinutesToHoursAndMinutesPresenter } from '../GeneralHoursMinutesComponent/MinutesToHoursAndMinutesPresenter';
import { HoursMinutesWrapperV2 } from '../HoursMinutesWrapper copy/HoursMinutesWrapper';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { MouseEvent, MutableRefObject } from 'react';

interface DayByDayItemProps {
	day: DaysOfWeek
	dialogRef: MutableRefObject<HTMLDivElement | null>;
	// index: number
}

export const DayByDayItem = ({ day, dialogRef }: DayByDayItemProps) => {
	const dayByDayTimeSleepData = useSelector(getDayByDayTimeSleepData)
	const dispatch = useAppDispatch()
	const { t } = useTranslation('settings')
	const daySleepPeriods = dayByDayTimeSleepData?.[day] ?? []
	const onInputFocus = () => {
		if (dialogRef.current) {
			dialogRef.current.style.overflow = 'hidden';
		}
	}
	const onMouseEnter = (event: MouseEvent<HTMLInputElement>) => {
		event.currentTarget.focus();
		if (dialogRef.current) {
			dialogRef.current.style.overflow = 'hidden';
		}
	};
	const onMouseLeave = (event: MouseEvent<HTMLInputElement>) => {
		event.currentTarget.blur();
		if (dialogRef.current) {
			dialogRef.current.style.overflow = 'auto';
		}
	};
	const onInputBlur = () => {
		if (dialogRef.current) {
			dialogRef.current.style.overflow = 'auto';
		}
	};
	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const value = Number(event.target.value);
		if (value > 960) {
			dispatch(settingsTimeSleepActions.setPeriodDuration({ dayType: day, durationMinutes: 960, indexPeriod: index }))
		} else {
			dispatch(settingsTimeSleepActions.setPeriodDuration({ dayType: day, durationMinutes: value, indexPeriod: index }))
		}
	}
	let content = null
	if (daySleepPeriods?.length === 0) {
		content = (<MyText
			// variant={  'primary' : 'hint'}
			align='center'
			text={t('На этот день нет периодов сна')}
		// className={cls.title}
		/>)
	} else {
		content = daySleepPeriods.map((period, index) => {
			return (
				<HStack key={`${day}${index}`} max gap='gap_14'>
					<MyText
						// variant={  'primary' : 'hint'}
						align='center'
						text={t('start sleep')}
					// className={cls.title}
					/>
					<HoursMinutesWrapperV2
						dayType={day}
						startTimeSleepTimeObject={period.startTime}
						indexPeriod={index}
					// timeSleepData={generalSleepPeriod}
					/>
					<MyText
						// variant={isTimeSleepEnabled ? 'primary' : 'hint'}
						align='center'
						text={'длительность сна'}
					// text={t('end sleep')}
					// className={cls.title}
					/>
					<HStack justify='center' gap='gap_4'>
						<Input
							value={period.durationMinutes}
							max={960}
							min={60}
							step={15}
							onFocus={onInputFocus}
							onBlur={onInputBlur}
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
							onChangeEvent={(event) => onInputChange(event, index)}
							// onChangeEvent={(event) => {
							// 	const value = Number(event.target.value);
							// 	if (value > 960) {
							// 		dispatch(settingsTimeSleepActions.setPeriodDuration({ dayType: day, durationMinutes: 960, indexPeriod: index }))
							// 	} else {
							// 		dispatch(settingsTimeSleepActions.setPeriodDuration({ dayType: day, durationMinutes: value, indexPeriod: index }))
							// 	}
							// }}
							type='number'
							style={{ maxWidth: 90 }} />
						<p>минут
							<span><MinutesToHoursAndMinutesPresenter minutes={period.durationMinutes} /></span>
						</p>
					</HStack>
				</HStack>
			)
		})
	}
	// const hoursMinutesBlock = MinutesToHoursAndMinutesPresenter({ minutes: dayByDayTimeSleepData[day][index].durationMinutes })
	{/* <span><MinutesToHoursAndMinutesPresenter minutes={dayByDayTimeSleepData[day][index].durationMinutes} /></span> */ }


	return (
		<>
			{content}
		</>
		// return (
		// 	<div
		// 	// className={cls.DayByDayHoursMinutesComponent}
		// 	>
		// 		{content}
		// 		{/* <MyText align='center' text={t('start sleep')} className={cls.title} /> */}
		// 		{/* <MyText align='center' text={t('end sleep')} className={cls.title} /> */}
		// 		{/* {daysOfWeek.map((day, index) => {
		// 			return (
		// 				<>
		// 					<MyText text={t(`days.${day}`)} size='s' />
		// 					<HoursMinutesWrapper
		// 						dayType={day}
		// 						timeSleepData={dayByDayTimeSleepData?.[day][0]}
		// 					/>
		// 				</>
		// 			)
		// 		})} */}
		// 	</div>
	)
}