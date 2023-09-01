import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxTimeSetterModal.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
import { useSelector } from 'react-redux';
import { MyRadioGroup } from '@/shared/ui/MyRadioGroup';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../../..';
import { MissedTrainingValues } from '@/shared/types/DataBlock';
import {
	getTimingSetterModalIsOpen,
	getBoxCoordinates,
	getBoxTimingData,
	getTimingSetterBoxId
} from '../../../model/selectors/getBoxTimingSetterModal';
import { TimeSetter } from '@/shared/ui/TimeSetter';
import { useEffect, useRef, useState } from 'react';
import { Modal } from '@/shared/ui/Modal/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import { idCupboardShelfList, idTimeSetterHidden } from '@/shared/const/ids';

interface MissedTrainingSettingsProps {
	className?: string
}


export const BoxTimeSetterModal = (props: MissedTrainingSettingsProps) => {
	const {
		className,
	} = props

	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getTimingSetterModalIsOpen)
	const coordinates = useSelector(getBoxCoordinates)
	const timingData = useSelector(getBoxTimingData)
	const boxId = useSelector(getTimingSetterBoxId)
	// const checked = useRef(false)
	// const currentMissedTrainingValueOfBox = useSelector((state: StateSchema) => getMissedTrainingBoxValue(state, shelfId, boxId))
	const headerHeight = useRef(0)
	const cupboardShelfListRects = useRef({ x: 0, y: 0, width: 0 })
	const timeSetterSizes = useRef({ height: 0, width: 0 })
	const [coordinatesChecked, setCoordinatesChecked] = useState({ x: 0, y: 0 })
	const [checked, setChecked] = useState(false)
	// const coordinatesChecked = useRef({ x: 0, y: 0 })

	// VAR: Тут нужно рефакторить в кастомные хуки
	useEffect(() => {
		setTimeout(() => {
			const header = document.querySelector('header') as HTMLDivElement
			headerHeight.current = header.clientHeight
			const timeSetter = document.querySelector(`#${idTimeSetterHidden}`) as HTMLDivElement
			const timeSetterRect = timeSetter.getBoundingClientRect()
			timeSetterSizes.current.height = timeSetterRect.height
			timeSetterSizes.current.width = timeSetterRect.width
			// console.log(timeSetterSizes)
			const cupboardShelfList = document.querySelector(`#${idCupboardShelfList}`) as HTMLDivElement
			const cupboardShelfListSizes = cupboardShelfList.getBoundingClientRect()
			cupboardShelfListRects.current.x = cupboardShelfListSizes.x
			cupboardShelfListRects.current.y = cupboardShelfListSizes.y
			cupboardShelfListRects.current.width = cupboardShelfListSizes.width
			// checked.current = true
		}, 200)
	}, [])

	useEffect(() => {
		const coordinatesHeightCorrection = timeSetterSizes.current.height / 2
		const coordinatesWidthCorrection = timeSetterSizes.current.width / 2
		const viewPortHeight = window.innerHeight
		let actualX = coordinates.x - coordinatesWidthCorrection
		const containerEdge = cupboardShelfListRects.current.x + cupboardShelfListRects.current.width
		if (actualX + timeSetterSizes.current.width > containerEdge) {
			actualX = (containerEdge - timeSetterSizes.current.width)
		} else if (actualX < cupboardShelfListRects.current.x) {
			actualX = cupboardShelfListRects.current.x
		}

		let actualY = coordinates.y - coordinatesHeightCorrection
		if (actualY < headerHeight.current) {
			actualY = headerHeight.current
		} else if (actualY + timeSetterSizes.current.height > viewPortHeight) {
			actualY = viewPortHeight - timeSetterSizes.current.height
		}
		setCoordinatesChecked({ y: actualY, x: actualX })
		setTimeout(() => {
			setChecked(true)
		}, 10)
	}, [coordinates])


	const onCloseHandle = () => {
		dispatch(cupboardShelfListActions.setTimingSetterModalIsOpen(false))
		setChecked(false)
		// dispatch(cupboardShelfListActions.dropMissedTrainingShelfAndBoxId())
	}

	const onSaveTime = () => {
		dispatch(cupboardShelfListActions.setTimingSetterModalIsOpen(false))
		setChecked(false)
		// if (!boxId) {
		// 	// console.log(value.value)
		// 	updateShelfMutation({ id: shelfId, missedTrainingAction: value.value as MissedTrainingValues })
		// 	onCloseHandle()
		// }
	}

	return (
		<HDialog
			isOpen={(isOpen && checked)}
			onSubmit={() => alert('Сохраняю настройки для коробки')}
			onClose={onCloseHandle}
			panelAbsolute
			panelWithMainPadding={false}
			styles={{ left: coordinatesChecked.x, top: coordinatesChecked.y }}
		>
			<TimeSetter
				timingData={timingData}
				onClose={onCloseHandle}
				onSaveTime={onSaveTime}
			/>
		</HDialog >
	)
}

