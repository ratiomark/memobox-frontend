import clsx from 'clsx'
import cls from './DayByDayHoursMinutesComponent.module.scss'
import { useSelector } from 'react-redux';
import { getGeneralTimeSleepData } from '../../model/selectors/settingsTimeSleep';
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
	const generalTimeSleepData = useSelector(getGeneralTimeSleepData)
	const { t } = useTranslation('settings')
	return (
		<div className={clsx(cls.GeneralHoursMinutes, [className])} >
			{daysOfWeek.map(day => {
				return (
					<div key={day}>
						<MyText text={t(`days.${day}`)} />
						<HoursMinutesWrapper
							dayType={day}
							timeSleepData={generalTimeSleepData}
						/>
					</div>
				)

			})}

		</div>
	)
}