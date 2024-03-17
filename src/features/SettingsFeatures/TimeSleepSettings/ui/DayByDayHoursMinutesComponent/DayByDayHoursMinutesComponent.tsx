import clsx from 'clsx'
import cls from './DayByDayHoursMinutesComponent.module.scss'
import { useSelector } from 'react-redux';
import { getDayByDayTimeSleepData, getGeneralTimeSleepData } from '../../model/selectors/settingsTimeSleep';
import { HoursMinutesWrapper } from '../HoursMinutesWrapper/HoursMinutesWrapper';
import { MyText } from '@/shared/ui/Typography';
import { useTranslation } from 'react-i18next';
import { daysOfWeek } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import { DayByDayItem } from './DayByDayItem';
import { MutableRefObject } from 'react';


export const DayByDayHoursMinutesComponent = ({ dialogRef }: { dialogRef: MutableRefObject<HTMLDivElement | null> }) => {
	// const dayByDayTimeSleepData = useSelector(getDayByDayTimeSleepData)
	// const dispatch = useAppDispatch()
	const { t } = useTranslation('settings')

	return (

		<div
			className={cls.DayByDayHoursMinutesComponent}
		>
			{daysOfWeek.map(day => (
				<HStack max gap='gap_14' key={day} align='center'>
					<MyText text={t(`days.${day}`)} size='s' className={cls.dayLabel} />
					<HStack>
						<DayByDayItem dialogRef={dialogRef} day={day} />
					</HStack>
				</HStack>)
			)}
		</div>
	)
}