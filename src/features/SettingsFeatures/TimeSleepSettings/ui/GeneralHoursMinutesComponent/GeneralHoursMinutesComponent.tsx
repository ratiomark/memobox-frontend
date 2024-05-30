import cls from './GeneralHoursMinutes.module.scss'
import { useSelector } from 'react-redux';
import { getGeneralTimeSleepData, getTimeSleepEnabled } from '../../model/selectors/settingsTimeSleep';
import { MyText } from '@/shared/ui/Typography';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input/Input';
import { HStack } from '@/shared/ui/Stack';
import { settingsTimeSleepActions } from '../../model/slice/timeSleepSlice';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { MinutesToHoursAndMinutesPresenter } from './MinutesToHoursAndMinutesPresenter';
import { HoursMinutesWrapper } from '../HoursMinutesWrapper/HoursMinutesWrapper';


export const GeneralHoursMinutesComponent = () => {
	const generalTimeSleepData = useSelector(getGeneralTimeSleepData)
	const isTimeSleepEnabled = useSelector(getTimeSleepEnabled)

	const hoursMinutesBlock = MinutesToHoursAndMinutesPresenter({ minutes: generalTimeSleepData!.durationMinutes })
	const dispatch = useAppDispatch()
	const { t } = useTranslation('settings')
	const q = (
		<HStack max gap='gap_14'>
			<MyText
				variant={isTimeSleepEnabled ? 'primary' : 'hint'}
				align='center'
				text={t('start sleep')}
				className={cls.title}
			/>
			<HoursMinutesWrapper
				disabled={!isTimeSleepEnabled}
				dayType='general'
				startTimeSleepTimeObject={generalTimeSleepData?.startTime}
			// timeSleepData={generalSleepPeriod}
			/>
			<MyText
				variant={isTimeSleepEnabled ? 'primary' : 'hint'}
				align='center'
				text={t('sleep duration')}
				// text={t('end sleep')}
				className={cls.title}
			/>
			{isTimeSleepEnabled
				? (
					<HStack justify='center' gap='gap_4'>
						<Input
							value={generalTimeSleepData?.durationMinutes}
							max={960}
							min={60}
							step={15}
							onChangeEvent={(event) => {
								const value = Number(event.target.value);
								if (value > 960) {
									dispatch(settingsTimeSleepActions.setPeriodDuration({ dayType: 'general', durationMinutes: 960 }))
								} else {
									dispatch(settingsTimeSleepActions.setPeriodDuration({ dayType: 'general', durationMinutes: value }))
								}
							}}
							type='number'
							style={{ maxWidth: 90 }} />
						<p>{t('minutes')}
						</p>
						<span >{hoursMinutesBlock}</span>

					</HStack>
				)
				: null
			}

		</HStack>
	)
	return q
	// return (
	// 	<div
	// 		className={clsx(cls.GeneralHoursMinutes, [className])}
	// 	>
	// 		<MyText
	// 			variant={isTimeSleepEnabled ? 'primary' : 'hint'}
	// 			align='center'
	// 			text={t('start sleep')}
	// 			className={cls.title}
	// 		/>
	// 		<MyText
	// 			variant={isTimeSleepEnabled ? 'primary' : 'hint'}
	// 			align='center'
	// 			text={t('end sleep')}
	// 			className={cls.title}
	// 		/>
	// 		<HoursMinutesWrapperV2
	// 			disabled={!isTimeSleepEnabled}
	// 			dayType='general'
	// 			startTimeSleepTimeObject={generalTimeSleepData?.startTime}
	// 		/>
	// 	</div>
	// )
}