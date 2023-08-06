import clsx from 'clsx'
import cls from './GeneralHoursMinutes.module.scss'
import { useSelector } from 'react-redux';
import { getGeneralTimeSleepData, getTimeSleepEnabled } from '../../model/selectors/settingsTimeSleep';
import { HoursMinutesWrapper } from '../HoursMinutesWrapper/HoursMinutesWrapper';
import { motion } from 'framer-motion';
import { MyText } from '@/shared/ui/Typography';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

interface GeneralHoursMinutesProps {
	className?: string;
}

export const GeneralHoursMinutesComponent = (props: GeneralHoursMinutesProps) => {
	const {
		className,
	} = props
	const generalTimeSleepData = useSelector(getGeneralTimeSleepData)
	const isTimeSleepEnabled = useSelector(getTimeSleepEnabled)
	const { t } = useTranslation('settings')
	return (
		<div
			// layout
			className={clsx(cls.GeneralHoursMinutes, [className])}
		>
			<MyText
				variant={isTimeSleepEnabled ? 'primary' : 'hint'}
				align='center'
				text={t('start sleep')}
				className={cls.title}
			/>
			<MyText
				variant={isTimeSleepEnabled ? 'primary' : 'hint'}
				align='center'
				text={t('end sleep')}
				className={cls.title}
			/>
			<HoursMinutesWrapper
				disabled={!isTimeSleepEnabled}
				dayType='general'
				timeSleepData={generalTimeSleepData}
			/>
		</div>
	)
}