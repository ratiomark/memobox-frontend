import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxesSettingsList.module.scss';
import { BoxSchema } from '@/entities/Box';
import { MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '@/shared/ui/Icon';
import PlusIcon from '@/shared/assets/icons/plusIcon2.svg'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { AddBoxIcon } from '../AddBoxIcon/AddBoxIcon';
import { ExtendedTimingBlock } from '@/shared/types/DataBlock';
import { BoxSettingsItem } from '../BoxSettingsItem/BoxSettingsItem';
import { BoxSettingsSpecialBox } from '../BoxSettingsItem/BoxSettingsItemNewCardsBox';
import { DURATION_DELAY_SWITCH_MODE_SHELF_TEMPLATE_SETTINGS } from '@/shared/const/animation';
import { getBoxesTemplateModalMode, getBoxesTemplateModalCurrentShelfTemplate } from '../../../model/selectors/getShelfBoxesTemplateModal';
import { shelfBoxesTemplateSettingsActions } from '../../../model/slice/shelfBoxesTemplateSlice';
import { timingDataDefault } from '@/shared/const/timingBlock';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

const createBox = (index: number): ExtendedTimingBlock => {
	return {
		minutes: 0,
		hours: 0,
		days: 0,
		weeks: 0,
		months: 0,
		index,
		keyId: 'unsaved',
		isSaved: false,
		isRemoved: false,
		id: (Math.random() * Math.random()).toString(),
		isOpen: true,
	}
}

const animation = {
	initial: { width: 0, marginRight: 0, opacity: 0 },
	animate: { width: 'auto', marginRight: 20, opacity: 1 },
	exit: {
		width: 0, opacity: 0, marginRight: 0,
		transition: {
			// opacity: { duration: 0.1 }
		}
	}

}


export const BoxesSettingsList = () => {
	const dispatch = useAppDispatch()
	const mode = useSelector(getBoxesTemplateModalMode)
	const currentShelfTemplate = useSelector(getBoxesTemplateModalCurrentShelfTemplate)
	const containerRef = useRef<HTMLDivElement>(null)
	const timer = useRef<TimeoutId>()
	const timer2 = useRef<TimeoutId>()

	const onRemoveBox = useCallback((boxIndex: number) => {
		dispatch(shelfBoxesTemplateSettingsActions.removeBoxFromCurrentShelfTemplateByIndex(boxIndex))
	}, [dispatch])

	const onAddBoxClick = useCallback((index: number) => {
		console.log(' INDEX   INDEX   ', index)
		if (!currentShelfTemplate?.length) return
		const newBox = createBox(index)
		// console.log(newBox)
		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterModalBoxId(newBox.id))
		const updatedBoxesList: ExtendedTimingBlock[] = [];
		const boxListRelevant = currentShelfTemplate.slice(0, currentShelfTemplate.length)

		// console.log(' INDEX   INDEX   ', index)
		if (index === 0) {
			// updatedBoxesList.push({ ...newBox, index })
			updatedBoxesList.push(newBox)
			console.log(updatedBoxesList)
			boxListRelevant.forEach(boxItem => {
				updatedBoxesList.push({ ...boxItem, index: boxItem.index! + 1 })
			})
			// console.log(updatedBoxesList)
			// console.log('КОНЕЦЦЦЦЦЦЦ')
		} else if (index === boxListRelevant.length) {
			// console.log('LAST LAST LAST LAST LAST LAST LAST LAST')
			boxListRelevant.forEach(boxItem => updatedBoxesList.push(boxItem))
			updatedBoxesList.push(newBox)
		} else {
			boxListRelevant.slice(0, index).forEach(boxItem => {
				updatedBoxesList.push(boxItem)
			})
			// console.log(updatedBoxesList)
			updatedBoxesList.push(newBox)
			// console.log(updatedBoxesList)
			currentShelfTemplate.slice(index,).forEach(boxItem => {
				updatedBoxesList.push({ ...boxItem, index: boxItem.index! + 1 })
			})
		}
		// setTimeout(() => {
		// 	dispatch(shelfBoxesTemplateSettingsActions.setCurrentTemplate(updatedBoxesList))
		// }, 700)
		// dispatch(shelfBoxesTemplateSettingsActions.setChanged(true))
		dispatch(shelfBoxesTemplateSettingsActions.setMode('settingTimeToNewBox'))
		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterModalBoxData(newBox))
		timer.current = setTimeout(() => {
			dispatch(shelfBoxesTemplateSettingsActions.setMode('waitingForSaving'))
			clearTimeout(timer.current)
		}, DURATION_DELAY_SWITCH_MODE_SHELF_TEMPLATE_SETTINGS)
		// вот тут нужно изменить isOpen у только что добавленнной коробки, через таймаут
		timer2.current = setTimeout(() => {
			dispatch(shelfBoxesTemplateSettingsActions.setCurrentTemplate(updatedBoxesList))
			clearTimeout(timer2.current)
		}, 500)
	}, [currentShelfTemplate, dispatch])

	useEffect(() => {
		if (containerRef.current) {
			if (containerRef.current.scrollWidth > containerRef.current.clientWidth) {
				dispatch(shelfBoxesTemplateSettingsActions.setIsRightSideActive(true))
			}
		}
	}, [dispatch])

	useEffect(() => {
		if (containerRef.current) {
			const container = containerRef.current
			const scrollLeft = container.scrollLeft
			const scrollWidth = container.scrollWidth
			const clientWidth = container.clientWidth
			const percentScrolledLeft = Math.ceil((scrollLeft / (scrollWidth - clientWidth)) * 100)
			const percentScrolledRight = Math.ceil(100 - percentScrolledLeft)
			if (percentScrolledLeft > 0) {
				dispatch(shelfBoxesTemplateSettingsActions.setIsLeftSideActive(true))
			} else {
				dispatch(shelfBoxesTemplateSettingsActions.setIsLeftSideActive(false))
			}
			if (percentScrolledRight <= 0) {
				dispatch(shelfBoxesTemplateSettingsActions.setIsRightSideActive(false))
			} else {
				dispatch(shelfBoxesTemplateSettingsActions.setIsRightSideActive(true))
			}
		}
	}, [dispatch])

	const handleScroll = () => {
		if (containerRef.current) {
			const container = containerRef.current
			const scrollLeft = container.scrollLeft
			const scrollWidth = container.scrollWidth
			const clientWidth = container.clientWidth
			const percentScrolledLeft = Math.ceil((scrollLeft / (scrollWidth - clientWidth)) * 100)
			const percentScrolledRight = Math.ceil(100 - percentScrolledLeft)
			if (percentScrolledLeft > 0) {
				dispatch(shelfBoxesTemplateSettingsActions.setIsLeftSideActive(true))
			} else {
				dispatch(shelfBoxesTemplateSettingsActions.setIsLeftSideActive(false))
			}
			if (percentScrolledRight <= 0) {
				dispatch(shelfBoxesTemplateSettingsActions.setIsRightSideActive(false))
			} else {
				dispatch(shelfBoxesTemplateSettingsActions.setIsRightSideActive(true))
			}
			// console.log(`Scrolled Left: ${percentScrolledLeft}%`)
			// console.log(`Scrolled Right: ${percentScrolledRight}%`)
		}
	};

	const boxesRendered = useMemo(() => {
		// console.log('currentShelfTemplate:  ', currentShelfTemplate)
		const boxesCount = currentShelfTemplate?.length
		if (!boxesCount) return []

		return currentShelfTemplate.map((boxItem, index) => {
			// const onOpenTimeSetter = (e: MouseEvent) => {

			// dispatch(shelfBoxesTemplateSettingsActions.openTimeSetter(boxItem.id))
			// }
			// console.log('REG  :  ', boxItem.index, boxItem.isSaved, boxItem.keyId)
			return (
				<BoxSettingsItem
					onRemoveBox={onRemoveBox}
					onAddBoxClick={onAddBoxClick}
					boxItem={boxItem}
					key={boxItem.id}
					isLastBox={index === boxesCount - 1}
				/>)
		})
		// const learntCardBox = <BoxSettingsItem onRemoveBox={onRemoveBox} onAddBoxClick={onAddBoxClick} boxItem={boxItem}
	}, [onRemoveBox, currentShelfTemplate, onAddBoxClick])

	const onAddNewBoxClickFirstIconHandle = (e: MouseEvent<HTMLDivElement>) => {
		onAddBoxClick(0)
		// onAddBoxClick(boxIndex! + 1)
		const { x, y, width, height } = e.currentTarget.getBoundingClientRect()
		// console.log(x, y)
		const coordinates = {
			x: x + width / 2,
			y: y + height / 2
		}
		// console.log('coordinates:  ', coordinates)
		// console.log('Add ICON ', coordinates)
		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterBoxCoordinates(coordinates))
		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterModalIsOpen(true))
		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterBoxTimingData(timingDataDefault))
	}
	const firstIcon = (
		<AnimatePresence>
			{mode === 'choosingBoxPlace' &&
				<AddBoxIcon onClick={onAddNewBoxClickFirstIconHandle} />
			}
		</AnimatePresence>
	)

	return (
		<motion.div
			style={{ width: 1200 }}
			layout
		// layoutScroll
		>
			<motion.div
				layout
				onScroll={handleScroll}
				ref={containerRef}
				className={cls.BoxesSettingsList}
			>
				<BoxSettingsSpecialBox type={'new'} />
				{firstIcon}
				{boxesRendered}
				{/* <div		style={{ width: 300, height: 100, flexShrink: 0 }}/> */}
			</motion.div>
		</motion.div>
	)
}
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './BoxesSettingsList.module.scss';
// import { BoxSchema } from '@/entities/Box';
// import { useCallback, useEffect, useMemo, useRef } from 'react';
// import { AnimatePresence, motion } from 'framer-motion'
// import { Icon } from '@/shared/ui/Icon';
// import PlusIcon from '@/shared/assets/icons/plusIcon2.svg'
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { useSelector } from 'react-redux';
// import { AddBoxIcon } from '../AddBoxIcon/AddBoxIcon';
// import { ExtendedTimingBlock } from '@/shared/types/DataBlock';
// import { BoxSettingsItem } from '../BoxSettingsItem/BoxSettingsItem';
// import { BoxSettingsSpecialBox } from '../BoxSettingsItem/BoxSettingsItemNewCardsBox';
// import { DURATION_DELAY_SWITCH_MODE_SHELF_TEMPLATE_SETTINGS } from '@/shared/const/animation';
// import { getBoxesTemplateModalMode, getBoxesTemplateModalCurrentShelfTemplate } from '../../../model/selectors/getShelfBoxesTemplateModal';
// import { shelfBoxesTemplateSettingsActions } from '../../../model/slice/shelfBoxesTemplateSlice';

// const createBox = (index: number): ExtendedTimingBlock => {
// 	return {
// 		minutes: 0,
// 		hours: 0,
// 		days: 0,
// 		weeks: 0,
// 		months: 0,
// 		index,
// 		keyId: 'unsaved',
// 		isSaved: false,
// 		id: (Math.random() * Math.random()).toString(),
// 		isOpen: true,
// 	}
// }

// const animation = {
// 	initial: { width: 0, marginRight: 0, opacity: 0 },
// 	animate: { width: 'auto', marginRight: 20, opacity: 1 },
// 	exit: {
// 		width: 0, opacity: 0, marginRight: 0,
// 		transition: {
// 			// opacity: { duration: 0.1 }
// 		}
// 	}

// }


// export const BoxesSettingsList = () => {
// 	const dispatch = useAppDispatch()
// 	const mode = useSelector(getBoxesTemplateModalMode)
// 	const currentShelfTemplate = useSelector(getBoxesTemplateModalCurrentShelfTemplate)
// 	const containerRef = useRef<HTMLDivElement>(null)

// 	const onRemoveBox = useCallback((boxIndex: number) => {
// 		// if (!currentShelfTemplate) return
// 		// const start = currentShelfTemplate.slice(0, boxIndex)
// 		// const end = currentShelfTemplate.slice(boxIndex,)
// 		// console.log('start', start)
// 		// console.log('end', end)
// 		// console.log(boxesList)
// 		dispatch(shelfBoxesTemplateSettingsActions.removeBoxFromCurrentShelfTemplateByIndex(boxIndex))
// 		// dispatch(shelfBoxesTemplateSettingsActions.setCurrentTemplate([...start, ...end]))
// 	}, [dispatch])

// 	const onAddBoxClick = useCallback((index: number) => {
// 		if (!currentShelfTemplate?.length) return
// 		const newBox = createBox(index)
// 		console.log(newBox)
// 		dispatch(shelfBoxesTemplateSettingsActions.setTimingSetterModalBoxId(newBox.id.toString()))
// 		const updatedBoxesList: ExtendedTimingBlock[] = [];
// 		const boxListRelevant = currentShelfTemplate.slice(0, currentShelfTemplate.length)

// 		console.log(' INDEX   INDEX   ', index)
// 		if (index === 0) {
// 			// updatedBoxesList.push({ ...newBox, index })
// 			updatedBoxesList.push(newBox)
// 			console.log(updatedBoxesList)
// 			boxListRelevant.forEach(boxItem => {
// 				updatedBoxesList.push({ ...boxItem, index: boxItem.index! + 1 })
// 			})
// 			// console.log(updatedBoxesList)
// 			// console.log('КОНЕЦЦЦЦЦЦЦ')
// 		} else if (index === boxListRelevant.length) {
// 			// console.log('LAST LAST LAST LAST LAST LAST LAST LAST')
// 			boxListRelevant.forEach(boxItem => updatedBoxesList.push(boxItem))
// 			updatedBoxesList.push(newBox)
// 		} else {
// 			boxListRelevant.slice(0, index).forEach(boxItem => {
// 				updatedBoxesList.push(boxItem)
// 			})
// 			// console.log(updatedBoxesList)
// 			updatedBoxesList.push(newBox)
// 			// console.log(updatedBoxesList)
// 			currentShelfTemplate.slice(index,).forEach(boxItem => {
// 				updatedBoxesList.push({ ...boxItem, index: boxItem.index! + 1 })
// 			})
// 		}
// 		// setTimeout(() => {
// 		// 	dispatch(shelfBoxesTemplateSettingsActions.setCurrentTemplate(updatedBoxesList))
// 		// }, 700)
// 		// dispatch(shelfBoxesTemplateSettingsActions.setChanged(true))
// 		dispatch(shelfBoxesTemplateSettingsActions.setMode('settingTimeToNewBox'))
// 		setTimeout(() => {
// 			dispatch(shelfBoxesTemplateSettingsActions.setMode('waitingForSaving'))
// 		}, DURATION_DELAY_SWITCH_MODE_SHELF_TEMPLATE_SETTINGS)
// 		// вот тут нужно изменить isOpen у только что добавленнной коробки, через таймаут
// 		setTimeout(() => {
// 			dispatch(shelfBoxesTemplateSettingsActions.setCurrentTemplate(updatedBoxesList))
// 		}, 500)
// 	}, [currentShelfTemplate, dispatch])

// 	useEffect(() => {
// 		if (containerRef.current) {
// 			if (containerRef.current.scrollWidth > containerRef.current.clientWidth) {
// 				dispatch(shelfBoxesTemplateSettingsActions.setIsRightSideActive(true))
// 			}
// 		}
// 	}, [dispatch])


// 	const handleScroll = () => {
// 		if (containerRef.current) {
// 			const container = containerRef.current
// 			const scrollLeft = container.scrollLeft
// 			const scrollWidth = container.scrollWidth
// 			const clientWidth = container.clientWidth
// 			const percentScrolledLeft = Math.ceil((scrollLeft / (scrollWidth - clientWidth)) * 100)
// 			const percentScrolledRight = Math.ceil(100 - percentScrolledLeft)
// 			if (percentScrolledLeft > 0) {
// 				dispatch(shelfBoxesTemplateSettingsActions.setIsLeftSideActive(true))
// 			} else {
// 				dispatch(shelfBoxesTemplateSettingsActions.setIsLeftSideActive(false))
// 			}
// 			if (percentScrolledRight <= 0) {
// 				dispatch(shelfBoxesTemplateSettingsActions.setIsRightSideActive(false))
// 			} else {
// 				dispatch(shelfBoxesTemplateSettingsActions.setIsRightSideActive(true))
// 			}
// 			// console.log(`Scrolled Left: ${percentScrolledLeft}%`)
// 			// console.log(`Scrolled Right: ${percentScrolledRight}%`)
// 		}
// 	};

// 	const boxesRendered = useMemo(() => {
// 		console.log('currentShelfTemplate:  ', currentShelfTemplate)
// 		const boxesCount = currentShelfTemplate?.length
// 		if (!boxesCount) return []

// 		return currentShelfTemplate.map((boxItem, index) => {
// 			// const onOpenTimeSetter = (e: MouseEvent) => {

// 			// dispatch(shelfBoxesTemplateSettingsActions.openTimeSetter(boxItem.id))
// 			// }
// 			// console.log('REG  :  ', boxItem.index, boxItem.isSaved, boxItem.keyId)
// 			return (
// 				<BoxSettingsItem
// 					onRemoveBox={onRemoveBox}
// 					onAddBoxClick={onAddBoxClick}
// 					boxItem={boxItem}
// 					key={boxItem.id}
// 					isLastBox={index === boxesCount - 1}
// 				/>)
// 		})
// 		// const learntCardBox = <BoxSettingsItem onRemoveBox={onRemoveBox} onAddBoxClick={onAddBoxClick} boxItem={boxItem}
// 	}, [onRemoveBox, currentShelfTemplate, onAddBoxClick])

// 	const firstIcon = (
// 		<AnimatePresence>
// 			{mode === 'choosingBoxPlace' &&
// 				<AddBoxIcon onClick={() => onAddBoxClick(0)} />
// 			}
// 		</AnimatePresence>
// 	)

// 	return (

// 		<div className={cls.wrapper} onScroll={handleScroll} ref={containerRef}>

// 			<motion.div
// 				layout
// 				// layoutRoot
// 				className={cls.BoxesSettingsList}
// 			>
// 				<BoxSettingsSpecialBox type={'new'} />
// 				{firstIcon}
// 				{boxesRendered}
// 				{/* <BoxSettingsSpecialBox type={'learnt'} /> */}
// 				{/* </AnimatePresence> */}
// 			</motion.div>
// 		</div>
// 	)
// }
