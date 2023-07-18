import clsx from 'clsx'
import cls from './GeneralHoursMinutes.module.scss'
import { useSelector } from 'react-redux';
import { getGeneralTimeSleepData, getTimeSleepEnabled } from '../../model/selectors/settingsTimeSleep';
import { HoursMinutesWrapper } from '../HoursMinutesWrapper/HoursMinutesWrapper';
import { motion } from 'framer-motion';

interface GeneralHoursMinutesProps {
	className?: string;
}

export const GeneralHoursMinutesComponent = (props: GeneralHoursMinutesProps) => {
	const {
		className,
	} = props
	const generalTimeSleepData = useSelector(getGeneralTimeSleepData)
	const isTimeSleepEnabled = useSelector(getTimeSleepEnabled)

	return (
		<div
			// layout
			className={clsx(cls.GeneralHoursMinutes, [className])} >
			<HoursMinutesWrapper
				disabled={!isTimeSleepEnabled}
				dayType='general'
				timeSleepData={generalTimeSleepData}
			/>
		</div>
	)
}