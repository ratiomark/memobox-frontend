import clsx from 'clsx'
import cls from './DayByDayHoursMinutesComponent.module.scss'
import { useSelector } from 'react-redux';
import { getDayByDayTimeSleepData, getTimeSleepDataByDay, getTimeSleepDataLengthByDay } from '../../model/selectors/settingsTimeSleep';
import { MyText } from '@/shared/ui/Typography';
import { useTranslation } from 'react-i18next';
import { DaysOfWeek } from '@/entities/User';
import { Input } from '@/shared/ui/Input/Input';
import { HStack } from '@/shared/ui/Stack';
import { settingsTimeSleepActions } from '../../model/slice/timeSleepSlice';
import { MinutesToHoursAndMinutesPresenter } from '../GeneralHoursMinutesComponent/MinutesToHoursAndMinutesPresenter';

import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { MouseEvent, MutableRefObject } from 'react';
import { HoursMinutesWrapper } from '../HoursMinutesWrapper/HoursMinutesWrapper';
import { Button } from '@/shared/ui/Button';
import TrashIcon from '@/shared/assets/icons/trashIcon2.svg'
import PlusIcon from '@/shared/assets/icons/plusIcon.svg'
import { Icon } from '@/shared/ui/Icon';
// {
// 	isMultiSelectActive
// 		? (
// 			<Icon
// 				Svg={PlusIcon}
// 				type='main'
// 				clickable
// 				withFill={false}
// 				width={22}
// 				height={22}
// 				onClick={onOpenCardEditModalEyeIcon}
// 				buttonSameSize={false}
// 				className={clsx(cls.icon, cls.eyeIcon)} />
// 		)
// ? <div className={cls.icon} />

interface DayByDayItemProps {
	day: DaysOfWeek
	dialogRef: MutableRefObject<HTMLDivElement | null>;
	// index: number
}

export const DayByDayItem = ({ day, dialogRef }: DayByDayItemProps) => {
	const daySleepPeriodsLength = useSelector(getTimeSleepDataLengthByDay(day))
	const daySleepPeriods = useSelector(getTimeSleepDataByDay(day))
	const dispatch = useAppDispatch()
	const { t } = useTranslation('settings')
	// const daySleepPeriods = dayByDayTimeSleepData?.[day] ?? []
	console.log('day: ', day)
	console.log('daySleepPeriodsLength', daySleepPeriodsLength)
	const onInputFocus = () => {
		if (dialogRef.current) {
			dialogRef.current.style.overflow = 'hidden';
		}
	}
	const onAddNewPeriod = () => {
		dispatch(settingsTimeSleepActions.createNewPeriod(day))
	};
	const onDeletePeriod = (day: DaysOfWeek, index: number) => {
		dispatch(settingsTimeSleepActions.deletePeriod({ dayType: day, indexPeriod: index }))
	};
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
	const addPeriodButton = (
		<Icon
			Svg={PlusIcon}
			type='main'
			clickable
			width={22}
			height={22}
			onClick={onAddNewPeriod}
			buttonSameSize={false}
			className={clsx(cls.icon, cls.eyeIcon)} />
	)
	let content = null
	if (daySleepPeriods?.length === 0) {
		content = (
			<HStack max justify='between' gap='gap_32'>
				<MyText
					align='center'
					text={t('no sleep period')}
				// className={cls.title}
				/>
				{addPeriodButton}
			</HStack>
		)
	} else {
		content = daySleepPeriods.map((period, index) => {
			return (
				<HStack key={`${day}${index}`} max justify='between' gap='gap_32'>
					<HStack gap='gap_14'>
						<MyText
							// variant={  'primary' : 'hint'}
							align='center'
							text={t('start sleep')}
						// className={cls.title}
						/>
						<HoursMinutesWrapper
							dayType={day}
							startTimeSleepTimeObject={period.startTime}
							indexPeriod={index}
						// timeSleepData={generalSleepPeriod}
						/>
						<MyText
							// variant={isTimeSleepEnabled ? 'primary' : 'hint'}
							align='center'
							text={t('sleep duration')}
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
							<p>{t('minutes')}
							</p>
							<span><MinutesToHoursAndMinutesPresenter minutes={period.durationMinutes} /></span>
						</HStack>
					</HStack>
					<HStack gap='gap_14'>



						<Icon
							Svg={TrashIcon}
							type='cancel'
							clickable
							withFill={false}
							width={22}
							height={22}
							onClick={() => onDeletePeriod(day, index)}
							buttonSameSize={false}
							className={clsx(cls.icon, cls.removeIcon)}
						/>
						{daySleepPeriodsLength < 2
							? addPeriodButton
							: <div style={{ width: 28, height: 28 }} />
						}
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