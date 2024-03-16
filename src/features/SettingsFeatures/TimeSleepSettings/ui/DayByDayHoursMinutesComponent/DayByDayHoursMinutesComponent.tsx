import clsx from 'clsx'
import cls from './DayByDayHoursMinutesComponent.module.scss'
import { useSelector } from 'react-redux';
import { getDayByDayTimeSleepData, getGeneralTimeSleepData } from '../../model/selectors/settingsTimeSleep';
import { HoursMinutesWrapper } from '../HoursMinutesWrapper/HoursMinutesWrapper';
import { MyText } from '@/shared/ui/Typography';
import { useTranslation } from 'react-i18next';
import { daysOfWeek } from '@/entities/User';


export const DayByDayHoursMinutesComponent = () => {
	const dayByDayTimeSleepData = useSelector(getDayByDayTimeSleepData)
	const { t } = useTranslation('settings')

	return (

		<div className={cls.DayByDayHoursMinutesComponent}>
			<div />
			<MyText align='center' text={t('start sleep')} className={cls.title} />
			<MyText align='center' text={t('end sleep')} className={cls.title} />
			{daysOfWeek.map(day => {
				return (
					<>
						<MyText text={t(`days.${day}`)} size='s' />
						<HoursMinutesWrapper
							dayType={day}
							timeSleepData={dayByDayTimeSleepData?.[day][0]}
						/>
					</>
				)
			})}
		</div>
	)
}