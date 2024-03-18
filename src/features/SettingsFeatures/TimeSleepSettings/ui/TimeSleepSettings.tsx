import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './TimeSleepSettings.module.scss';
import { Switcher } from '@/shared/ui/Switcher';
import { Heading, MyText } from '@/shared/ui/Typography';
import { Card } from '@/shared/ui/Card';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { settingsTimeSleepActions, settingsTimeSleepReducer } from '../model/slice/timeSleepSlice';
import { WheelEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserSettingsIsLoading, getUserTimeSleepSettings } from '@/entities/User';
import { getTimeSleepEnabled, getDayByDayOptionEnabled, getGeneralTimeSleepData, getDayByDayTimeSleepData } from '../model/selectors/settingsTimeSleep';
import { GeneralHoursMinutesComponent } from './GeneralHoursMinutesComponent/GeneralHoursMinutesComponent';
import { DayByDayHoursMinutesComponent } from './DayByDayHoursMinutesComponent/DayByDayHoursMinutesComponent';
import { AnimatePresence, motion } from 'framer-motion';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { updateTimeSleepThunk } from '../model/services/updateTimeSleepThunk';
import { getIsTimeSleepModalOpen } from '../../model/selectors/getModals';
import { settingsFeaturesActions } from '../../model/slice/settingsFeaturesSlice';

const reducers: ReducersList = {
	settingsTimeSleep: settingsTimeSleepReducer,
}


export const TimeSleepSettingsModal = () => {
	const isOpen = useSelector(getIsTimeSleepModalOpen)
	const isLoading = useSelector(getUserSettingsIsLoading)
	const timeSleepSettingsFromUser = useSelector(getUserTimeSleepSettings)
	const { t } = useTranslation('settings')
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })
	const isTimeSleepEnabled = useSelector(getTimeSleepEnabled)
	const isDayByDayTimeSleepEnabled = useSelector(getDayByDayOptionEnabled)
	const dialogRef = useRef<HTMLDivElement>(null);


	useEffect(() => {
		if (timeSleepSettingsFromUser) {
			dispatch(settingsTimeSleepActions.setInitialData(timeSleepSettingsFromUser))
		}
	}, [dispatch, timeSleepSettingsFromUser])

	const onClose = () => {
		dispatch(settingsFeaturesActions.setIsTimeSleepModalOpen(false))
	}

	const onCloseHandle = () => {
		if (timeSleepSettingsFromUser) {
			dispatch(settingsTimeSleepActions.setInitialData(timeSleepSettingsFromUser))
		}
		onClose()
	}
	const onToggleTimeSleepEnabled = () => dispatch(settingsTimeSleepActions.toggleTimeSleepEnabled())
	const onToggleDayByDayEnabled = () => dispatch(settingsTimeSleepActions.toggleDayByDayTimeSleepEnabled())


	if (!timeSleepSettingsFromUser || isLoading) return null

	const onSubmitHandle = () => {
		dispatch(updateTimeSleepThunk())
	}

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
			isOpen={!!isOpen}
			onClose={onCloseHandle}
			onSubmit={onSubmitHandle}

		>
			<div className={cls.TimeSleepSettings}
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
					{dayActivator}
					<div
					// className={cls.content}
					>
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
											<div className={cls.inner} ref={dialogRef} >
												<DayByDayHoursMinutesComponent dialogRef={dialogRef} />
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
						{/* {dayActivator} */}

					</div>
				</motion.div>
				<ModalButtons
					onClose={onCloseHandle}
					onSubmit={onSubmitHandle}
				/>
				{/* <HStack justify='between' max>
					<Button onClick={onCloseHandle}>{t('cancel')}</Button>
					<Button variant='filled'>{t('save')}</Button>
				</HStack> */}
			</div>
		</HDialogHeadless>

	)
}



{/* {errors.length > 0 && (
					<div className={cls.errorMessages}>
						{errors.map((error, index) => (
							<div key={index} className={cls.errorMessage}>
								{error}
							</div>
						))}
					</div>
				)} */}