/* eslint-disable prefer-const */
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxTimeSetterModal.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { TimeSetter } from '@/shared/ui/TimeSetter';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Overlay } from '@/shared/ui/Overlay/Overlay';
import {
	DURATION_DELAY_SWITCH_MODE_SHELF_TEMPLATE_SETTINGS,
	DURATION_SEC,
} from '@/shared/const/animation';
import { ExtendedTimingBlock, TimingBlock } from '@/shared/types/DataBlock';
import { getBoxesTemplateModalMode } from '../../../model/selectors/getShelfBoxesTemplateModal';
import { shelfBoxesTemplateSettingsActions } from '../../../model/slice/shelfBoxesTemplateSlice';
import {
	getTimingSetterModalIsOpen,
	getBoxCoordinates,
	getBoxTimingData,
	getTimingSetterModalBoxData,
} from '../../../model/selectors/getShelfBoxesTemplateModalTimeSetterModal';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';


export const BoxTimeSetterShelfBoxesTemplateModal = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getTimingSetterModalIsOpen)
	const boxData = useSelector(getTimingSetterModalBoxData) as ExtendedTimingBlock
	const coordinates = useSelector(getBoxCoordinates)
	const timingData = useSelector(getBoxTimingData)
	const mode = useSelector(getBoxesTemplateModalMode)
	const wrapperRef = useRef<HTMLDivElement>(null)
	const [timeSetterSizeData, setTimeSetterSizeData] = useState({ height: 0, width: 0 })
	const [coordinatesChecked, setCoordinatesChecked] = useState({ x: 0, y: 0 })
	const timer = useRef<TimeoutId>()
	const timer2 = useRef<TimeoutId>()

	useEffect(() => {
		if (coordinates) {
			setCoordinatesChecked({ x: coordinates.x, y: coordinates.y })
		}
	}, [coordinates])

	useEffect(() => {
		if (isOpen && wrapperRef.current) {
			const sizes = wrapperRef.current.getBoundingClientRect()
			setTimeSetterSizeData({ width: sizes.width, height: sizes.height })
		}
	}, [isOpen])

	useEffect(() => {
		const coordinatesHeightCorrection = timeSetterSizeData.height / 2
		const coordinatesWidthCorrection = timeSetterSizeData.width / 2
		let actualX = coordinates.x - coordinatesWidthCorrection
		let actualY = coordinates.y - coordinatesHeightCorrection
		setCoordinatesChecked({ y: actualY, x: actualX })
	}, [coordinates, timeSetterSizeData.height, timeSetterSizeData.width])


	const onCloseHandle = () => {
		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterModalIsOpen(false))
		if (!boxData || (boxData && boxData.isSaved)) return
		// переключить флаг, после того как исчезнет timeSetter
		timer.current = setTimeout(() => {
			dispatch(shelfBoxesTemplateSettingsActions.switchAddedBoxToRemovedState())
			clearTimeout(timer.current)
		}, (DURATION_SEC - 0.2) * 1000)
		// полностью удалить коробку, после того как исчезнет timeSetter + отработает анимания удаления коробки
		timer2.current = setTimeout(() => {
			dispatch(shelfBoxesTemplateSettingsActions.removeAddedBox())
			clearTimeout(timer2.current)
		}, (DURATION_SEC + DURATION_SEC - 0.1) * 1000)
	}

	const onSaveTime = useCallback((timingBlock: TimingBlock) => {
		if (boxData && boxData.id) {
			dispatch(shelfBoxesTemplateSettingsActions.setTimeToBoxById({ boxId: boxData.id, timeObject: timingBlock }))
		}
		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterModalIsOpen(false))
	}, [boxData, dispatch])

	// useEffect(() => {
	// 	console.log('MODE :  ', mode)
	// 	if (mode === 'choosingBoxPlace' || mode === 'settingTimeToNewBox') {
	// 		console.log('DELAY :   ', 1)
	// 		return
	// 	}
	// 	console.log('DELAY :  ', 0)
	// }, [mode])

	const timeSetterJSX = (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { delay: 0, duration: 0.4 } }}
			transition={{
				delay:
					(mode === 'choosingBoxPlace' || mode === 'settingTimeToNewBox')
						? DURATION_DELAY_SWITCH_MODE_SHELF_TEMPLATE_SETTINGS
						: 0,
				duration: DURATION_SEC
			}}

		>
			<TimeSetter
				title={boxData && `${t('box text')} ${boxData.index + 1}`}
				timingData={timingData}
				onClose={onCloseHandle}
				onSaveTime={onSaveTime}
			/>
		</motion.div>)

	return (
		<div
			className={cls.BoxTimeSetter}
			ref={wrapperRef}
			style={{ left: coordinatesChecked.x, top: coordinatesChecked.y }}
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

