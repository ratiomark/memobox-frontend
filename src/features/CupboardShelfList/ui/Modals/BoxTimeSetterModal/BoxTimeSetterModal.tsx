import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../../../model/slice/cupboardShelfListSlice';
import { TimingBlock } from '@/shared/types/DataBlock';
import {
	getTimingSetterModalIsOpen,
	getBoxCoordinates,
	getBoxTimingData,
	getTimingSetterBoxId,
	getTimingSetterShelfId
} from '../../../model/selectors/getBoxTimingSetterModal';
import { TimeSetter } from '@/shared/ui/TimeSetter';
import { motion } from 'framer-motion';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { updateBoxTimeThunk } from '../../../model/services/updateBoxTimeThunk';
import useCoordinates from './useCoordinates';


export const BoxTimeSetterModal = () => {
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getTimingSetterModalIsOpen)
	const coordinates = useSelector(getBoxCoordinates)
	const timingData = useSelector(getBoxTimingData)
	const boxId = useSelector(getTimingSetterBoxId)
	const shelfId = useSelector(getTimingSetterShelfId)
	const coordinatesChecked = useCoordinates(coordinates)

	const onCloseHandle = () => {
		dispatch(cupboardShelfListActions.setTimingSetterModalIsOpen(false))
		// dispatch(cupboardShelfListActions.dropMissedTrainingShelfAndBoxId())
	}

	const onSaveTime = (timeObject: TimingBlock) => {
		dispatch(updateBoxTimeThunk({ timeObject, boxId, shelfId }))
		dispatch(cupboardShelfListActions.setTimingSetterModalIsOpen(false))
		// if (!boxId) {
		// 	// console.log(value.value)
		// 	updateShelfMutation({ id: shelfId, missedTrainingAction: value.value as MissedTrainingValues })
		// 	onCloseHandle()
		// }
	}

	return (
		<HDialogHeadless
			isOpen={(isOpen)}
			onSubmit={() => alert('Сохраняю настройки для коробки')}
			onClose={onCloseHandle}
			transparent
			panelAbsolute
			panelWithMainPadding={false}
			panelWithBackground={false}
			styles={{ left: coordinatesChecked.x, top: coordinatesChecked.y }}
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.05 }}
			>
				<TimeSetter
					timingData={timingData}
					onClose={onCloseHandle}
					onSaveTime={onSaveTime}
				/>
			</motion.div>
		</HDialogHeadless >
	)
}