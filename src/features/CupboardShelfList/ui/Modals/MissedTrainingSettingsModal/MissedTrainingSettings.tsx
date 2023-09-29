import { useTranslation } from 'react-i18next';
import cls from './MissedTrainingSettings.module.scss';
import { useSelector } from 'react-redux';
import { MyRadioGroup } from '@/shared/ui/MyRadioGroup';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import {
	getMissedTrainingModalIsOpen,
	getMissedTrainingModalShelfId,
	getMissedTrainingModalBoxId,
	getMissedTrainingBoxValue,
	getMissedTrainingShelfValue
} from '../../../model/selectors/getMissedTrainingModal';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../../../model/slice/cupboardShelfListSlice';
import { useUpdateShelfWithTagMutation } from '@/entities/Shelf';
import { MissedTrainingValue } from '@/shared/types/DataBlock';
import { useUpdateBoxWithTagMutation } from '@/entities/Box';
import { Heading } from '@/shared/ui/Typography';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { updateMissedTrainingThunk } from '../../../model/services/updateMissedTrainingThunk';

export const MissedTrainingSettingsModal = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getMissedTrainingModalIsOpen)
	const shelfId = useSelector(getMissedTrainingModalShelfId)
	const boxId = useSelector(getMissedTrainingModalBoxId)
	const currentMissedTrainingValue = useSelector(getMissedTrainingShelfValue)
	const currentMissedTrainingValueOfBox = useSelector(getMissedTrainingBoxValue)
	// console.log(currentMissedTrainingValueOfBox)
	const [updateShelfMutation,] = useUpdateShelfWithTagMutation()
	const [updateBoxMutation,] = useUpdateBoxWithTagMutation()

	const items = useMemo<{ value: MissedTrainingValue, content: ReactNode }[]>(() => ([
		{ value: 'none', content: t('missedTrainingSettings.none') },
		{ value: 'additional', content: t('missedTrainingSettings.additional') },
		{ value: 'backwards', content: t('missedTrainingSettings.backwards') }
	]), [t])

	const [value, setValue] = useState(
		items.find(item => item.value === currentMissedTrainingValue) ?? items[0]
	)

	const [boxValue, setBoxValue] = useState(
		items.find(item => item.value === currentMissedTrainingValueOfBox) ?? items[0]
	)

	useEffect(() => {
		setValue(items.find(item => item.value === currentMissedTrainingValue) ?? items[0])
	}, [currentMissedTrainingValue, items])

	useEffect(() => {
		// console.log('currentMissedTrainingValueOfBox  ', currentMissedTrainingValueOfBox)
		setBoxValue(items.find(item => item.value === currentMissedTrainingValueOfBox) ?? items[0])
	}, [currentMissedTrainingValueOfBox, items])

	let finalValue;
	let onChangeHandle;
	if (boxId) {
		finalValue = boxValue
		onChangeHandle = setBoxValue
	} else {
		finalValue = value
		onChangeHandle = setValue
	}
	// console.log('final Value   ', finalValue, boxId, 'currentMissedTrainingValueOfBox  ', currentMissedTrainingValueOfBox)
	// const onSubmit = () => {
	// 	if (boxId === '') {
	// 		console.log('Сохраняю занчение для полки ', currentMissedTrainingValue)
	// 	} else {
	// 		console.log('Сохраняю занчение для коробки ', currentMissedTrainingValueOfBox)
	// 	}
	// }
	// const onClose = () => {
	// 	dispatch(cupboardShelfListActions.setMissedTrainingModalIsOpen(false))
	// 	dispatch(cupboardShelfListActions.dropMissedTrainingShelfAndBoxId())
	// }

	const onCloseHandle = () => {
		setValue(items.find(item => item.value === currentMissedTrainingValue) ?? items[0])
		dispatch(cupboardShelfListActions.setMissedTrainingModalIsOpen(false))
		dispatch(cupboardShelfListActions.dropMissedTrainingShelfAndBoxId())
	}

	const onSaveMissedTraining = () => {
		dispatch(updateMissedTrainingThunk({ boxId, shelfId, missedTrainingValue: boxValue.value }))
		onCloseHandle()
		// if (boxId) {
		// 	// updateBoxMutation({
		// 	// 	shelfId,
		// 	// 	box: {
		// 	// 		missedTrainingValue: boxValue.value as MissedTrainingValue,
		// 	// 		_id: boxId,
		// 	// 	}
		// 	// })
		// 	// onCloseHandle()
		// }
		// if (!boxId) {
		// 	dispatch(updateMissedTrainingThunk({ shelfId, missedTrainingValue: boxValue.value }))
		// 	// console.log(value.value)
		// 	updateShelfMutation({ id: shelfId, missedTrainingValue: value.value })
		// }
	}

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={() => alert('Сохраняю пропущенные тренировки')}
		>
			<div className={cls.MissedTrainingSettings}>
				{/* <p>{shelfId} - {currentMissedTrainingValue}</p>
				<p>{boxId} - {currentMissedTrainingValueOfBox}</p> */}
				<Heading
					align='center'
					size='s'
					title={t('missedTrainingSettings.title')}
				/>
				<MyRadioGroup
					// ref={radioGroupRef}
					items={items}
					onChange={onChangeHandle}
					value={finalValue}
					className={cls.radioGroup}
				/>
				<ModalButtons
					onSubmit={onSaveMissedTraining}
					onClose={onCloseHandle}
				/>
			</div>
		</HDialogHeadless>
	)
}