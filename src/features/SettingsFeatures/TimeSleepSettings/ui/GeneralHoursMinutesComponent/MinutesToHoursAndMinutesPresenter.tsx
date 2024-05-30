import cls from './GeneralHoursMinutes.module.scss'
import { MyText } from '@/shared/ui/Typography';
import { useTranslation } from 'react-i18next';


interface MinutesToHoursAndMinutesPresenterProps {
	minutes: number | undefined
	isTimeSleepEnabled?: boolean
}


export const MinutesToHoursAndMinutesPresenter = ({ minutes, isTimeSleepEnabled = true }: MinutesToHoursAndMinutesPresenterProps) => {
	const { t } = useTranslation('settings')
	if (!minutes) return null
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	if (remainingMinutes === 0) {
		return <MyText
			variant={isTimeSleepEnabled ? 'primary' : 'hint'}
			align='center'
			text={`(${hours} ${t('hours short')})`}
			// text={t('end sleep')}
			as={'span'}
			className={cls.title}
		/>
	}
	return (
		<MyText
			variant={isTimeSleepEnabled ? 'primary' : 'hint'}
			align='center'
			text={`(${hours} ${t('hours short')} ${remainingMinutes} ${t('minutes short')})`}
			// text={t('end sleep')}
			as={'span'}
			className={cls.title}
		/>
	);
};
