import cls from './DayByDayHoursMinutesComponent.module.scss'
import { MyText } from '@/shared/ui/Typography';
import { useTranslation } from 'react-i18next';
import { daysOfWeek } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/Stack';
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
				<div

					className={cls.dayWrapper}
					// gap='gap_14'
					key={day}
				// align='center'
				>
					{/* <div className={cls.dayWrapper} >

					</div> */}
					<MyText text={t(`days.${day}`)} size='s' className={cls.dayLabel} />
					<VStack max gap='gap_16' className={cls.periodsHolder}  >
						<DayByDayItem dialogRef={dialogRef} day={day} />
					</VStack>
				</div>)
			)}
		</div>
	)
}