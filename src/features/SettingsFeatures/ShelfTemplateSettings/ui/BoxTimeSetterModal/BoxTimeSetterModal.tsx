/* eslint-disable prefer-const */
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxTimeSetterModal.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';

import { TimeSetter } from '@/shared/ui/TimeSetter';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { settingsShelfTemplateActions } from '../../model/slice/shelfTemplateSlice';
import { getTimingSetterModalIsOpen, getBoxCoordinates, getBoxTimingData, getTimingSetterBoxId } from '../../model/selectors/timeSetterModal';
import { Overlay } from '@/shared/ui/Overlay/Overlay';
import { DURATION_SEC } from '@/shared/const/animation';
import { getSettingsShelfTemplateMode } from '../../model/selectors/settingsShelfTemplate';
import { TimingBlock } from '@/shared/types/DataBlock';

interface MissedTrainingSettingsProps {
	className?: string
}


export const BoxTimeSetterSettingsPageModal = (props: MissedTrainingSettingsProps) => {
	const {
		className,
		// onClose,
		// missedTrainingSetting,
	} = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getTimingSetterModalIsOpen)
	const coordinates = useSelector(getBoxCoordinates)
	const timingData = useSelector(getBoxTimingData)
	const boxId = useSelector(getTimingSetterBoxId)
	const mode = useSelector(getSettingsShelfTemplateMode)

	const wrapperRef = useRef<HTMLDivElement>(null)

	const cupboardShelfListRects = useRef({ x: 0, y: 0, width: 0 })
	const timeSetterSizes = useRef({ height: 0, width: 0 })
	const [timeSetterSizeData, setTimeSetterSizeData] = useState({ height: 0, width: 0 })
	const [coordinatesChecked, setCoordinatesChecked] = useState({ x: 0, y: 0 })
	const [checked, setChecked] = useState(false)

	useEffect(() => {
		if (coordinates) {
			setCoordinatesChecked({ x: coordinates.x, y: coordinates.y })
		}
	}, [coordinates])

	// useEffect(() => {

	// 	console.log(timeSetterSizeData)
	// }, [timeSetterSizeData])
	useEffect(() => {
		if (isOpen && wrapperRef.current) {
			const sizes = wrapperRef.current.getBoundingClientRect()
			console.log({ width: sizes.width, height: sizes.height })
			// console.log(sizes)
			setTimeSetterSizeData({ width: sizes.width, height: sizes.height })
		}
	}, [isOpen])
	// VAR: Тут нужно рефакторить в кастомные хуки
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		const header = document.querySelector('header') as HTMLDivElement
	// 		headerHeight.current = header.clientHeight
	// 		const timeSetter = document.querySelector('#timeSetter') as HTMLDivElement
	// 		const timeSetterRect = timeSetter.getBoundingClientRect()
	// 		timeSetterSizes.current.height = timeSetterRect.height
	// 		timeSetterSizes.current.width = timeSetterRect.width
	// 		// console.log(timeSetterSizes)
	// 		const cupboardShelfList = document.querySelector('#cupboardShelfList') as HTMLDivElement
	// 		const cupboardShelfListSizes = cupboardShelfList.getBoundingClientRect()
	// 		cupboardShelfListRects.current.x = cupboardShelfListSizes.x
	// 		cupboardShelfListRects.current.y = cupboardShelfListSizes.y
	// 		cupboardShelfListRects.current.width = cupboardShelfListSizes.width
	// 		// checked.current = true
	// 	}, 200)
	// }, [])

	useEffect(() => {
		const coordinatesHeightCorrection = timeSetterSizeData.height / 2
		const coordinatesWidthCorrection = timeSetterSizeData.width / 2
		const viewPortHeight = window.innerHeight
		let actualX = coordinates.x - coordinatesWidthCorrection
		// const containerEdge = cupboardShelfListRects.current.x + cupboardShelfListRects.current.width
		// if (actualX + timeSetterSizes.current.width > containerEdge) {
		// 	actualX = (containerEdge - timeSetterSizes.current.width)
		// } else if (actualX < cupboardShelfListRects.current.x) {
		// 	actualX = cupboardShelfListRects.current.x
		// }

		let actualY = coordinates.y - coordinatesHeightCorrection
		// if (actualY < headerHeight.current) {
		// 	actualY = headerHeight.current
		// } else if (actualY + timeSetterSizes.current.height > viewPortHeight) {
		// 	actualY = viewPortHeight - timeSetterSizes.current.height
		// }
		setCoordinatesChecked({ y: actualY, x: actualX })
	}, [coordinates, timeSetterSizeData.height, timeSetterSizeData.width])


	const onCloseHandle = () => {
		dispatch(settingsShelfTemplateActions.setTimingSetterModalIsOpen(false))
		dispatch(settingsShelfTemplateActions.removeAddedBox())
	}

	const onSaveTime = useCallback((timingBlock: TimingBlock) => {
		if (boxId) {
			dispatch(settingsShelfTemplateActions.setTimeToBoxById({ boxId, timeObject: timingBlock }))
		}
		dispatch(settingsShelfTemplateActions.setTimingSetterModalIsOpen(false))
	}, [boxId, dispatch])

	const timeSetterJSX = (<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0, transition: { delay: 0, duration: 0.4 } }}
		transition={{ delay: mode === 'settingTimeToNewBox' ? 1 : 0, duration: DURATION_SEC }}
	>
		<TimeSetter
			timingData={timingData}
			onClose={onCloseHandle}
			onSaveTime={onSaveTime}
		/>

	</motion.div>)

	return (
		<div
			ref={wrapperRef}
			style={{ position: 'fixed', left: coordinatesChecked.x, top: coordinatesChecked.y }}
		>
			<AnimatePresence>
				{isOpen &&
					timeSetterJSX
				}
			</AnimatePresence>
			{isOpen &&
				<Overlay onClick={onCloseHandle} transparent />}
		</div >
	)
}

