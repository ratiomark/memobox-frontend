import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './TimeSleepSettings.module.scss';
import { Switcher } from '@/shared/ui/Switcher';
import { Heading, MyText } from '@/shared/ui/Typography';
import { Card } from '@/shared/ui/Card';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { settingsTimeSleepActions, settingsTimeSleepReducer } from '../model/slice/timeSleepSlice';
import { WheelEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserTimeSleepSettings } from '@/entities/User';
import { getTimeSleepEnabled, getDayByDayOptionEnabled, getGeneralTimeSleepData, getDayByDayTimeSleepData } from '../model/selectors/settingsTimeSleep';
import { GeneralHoursMinutesComponent } from './GeneralHoursMinutesComponent/GeneralHoursMinutesComponent copy';
import { DayByDayHoursMinutesComponent } from './DayByDayHoursMinutesComponent/DayByDayHoursMinutesComponent';
import { AnimatePresence, motion } from 'framer-motion';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';



interface TimeSleepSettingsProps {
	className?: string
	isOpen: boolean
	onClose: () => void
}

const reducers: ReducersList = {
	settingsTimeSleep: settingsTimeSleepReducer,
}

export const TimeSleepSettings = (props: TimeSleepSettingsProps) => {
	const {
		className,
		isOpen,
		onClose
	} = props
	const { t } = useTranslation('settings')
	const timeSleepSettingsFromUser = useSelector(getUserTimeSleepSettings)
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })
	const isTimeSleepEnabled = useSelector(getTimeSleepEnabled)
	const isDayByDayTimeSleepEnabled = useSelector(getDayByDayOptionEnabled)

	useEffect(() => {
		dispatch(settingsTimeSleepActions.setInitialData(timeSleepSettingsFromUser!))
	}, [dispatch, timeSleepSettingsFromUser])

	const onCloseHandle = () => onClose()
	const onToggleTimeSleepEnabled = () => dispatch(settingsTimeSleepActions.toggleTimeSleepEnabled())
	const onToggleDayByDayEnabled = () => dispatch(settingsTimeSleepActions.toggleDayByDayTimeSleepEnabled())

	const dayActivator = (<div className={cls.dayByDayActivator} >
		<MyText text={t('enable day by day')} variant={isTimeSleepEnabled ? 'primary' : 'hint'} />
		<Switcher
			isChecked={isTimeSleepEnabled ? isDayByDayTimeSleepEnabled : false}
			disabled={!isTimeSleepEnabled}
			onClickSwitcher={onToggleDayByDayEnabled}
		/>
	</div>)


	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={() => alert('Сохраняю настройки')}
		>
			<div className={clsx(
				cls.TimeSleepSettings,
				className)}
			>
				<motion.div
					// layout
					className={cls.timeSleepBlock}
				>
					<Card className={cls.timeSleepCard} >
						<Heading size='s' as='h1' title={t('time sleep')} />
						<Switcher
							isChecked={isTimeSleepEnabled}
							onClickSwitcher={onToggleTimeSleepEnabled}
						/>
					</Card>
					<div className={cls.content} >
						<motion.div
							layout

						>
							<AnimatePresence mode='wait'>
								{isTimeSleepEnabled
									&& isDayByDayTimeSleepEnabled
									&& (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: 'auto', opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
										>
											<div className={cls.inner}>
												<DayByDayHoursMinutesComponent />
											</div>
										</motion.div>)

								}

							</AnimatePresence>
							<AnimatePresence mode='wait'>
								{isTimeSleepEnabled && !isDayByDayTimeSleepEnabled
									&& <motion.div
										// layout
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ opacity: 0, height: 0 }}
									// transition={{ duration: 6 }}
									>

										<GeneralHoursMinutesComponent />
									</motion.div>}
							</AnimatePresence>
							<AnimatePresence mode='wait'>
								{!isTimeSleepEnabled
									&& <motion.div
										// layout
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ opacity: 0, height: 0 }}
									// transition={{ duration: 6 }}
									>

										<GeneralHoursMinutesComponent />
									</motion.div>}
							</AnimatePresence>
						</motion.div>
						{dayActivator}

					</div>
				</motion.div>
				<ModalButtons
					onClose={onCloseHandle}
					onSubmit={() => alert('Сохраняю настройки')}
				/>
				{/* <HStack justify='between' max>
					<Button onClick={onCloseHandle}>{t('cancel')}</Button>
					<Button variant='filled'>{t('save')}</Button>
				</HStack> */}
			</div>
		</HDialogHeadless>

	)
}