import clsx from 'clsx'
import cls from './GeneralHoursMinutes.module.scss'
import { useSelector } from 'react-redux';
import { getGeneralTimeSleepData } from '../../model/selectors/settingsTimeSleep';
import { HoursMinutesWrapper } from '../HoursMinutesWrapper/HoursMinutesWrapper';

interface GeneralHoursMinutesProps {
	className?: string;
}

export const GeneralHoursMinutesComponent = (props: GeneralHoursMinutesProps) => {
	const {
		className,
	} = props
	const generalTimeSleepData = useSelector(getGeneralTimeSleepData)

	return (
		<div className={clsx(cls.GeneralHoursMinutes, [className])} >
			<HoursMinutesWrapper
				dayType='general'
				timeSleepData={generalTimeSleepData}
			/>
		</div>
	)
}