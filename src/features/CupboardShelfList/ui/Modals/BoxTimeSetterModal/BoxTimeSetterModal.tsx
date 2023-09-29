import { useTranslation } from 'react-i18next';
import cls from './BoxTimeSetterModal.module.scss';
import { HDialog } from '@/shared/ui/HDialog';
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
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { idCupboardShelfList, idTimeSetterHidden } from '@/shared/const/idsAndDataAttributes';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { updateBoxTimeThunk } from '../../../model/services/updateBoxTimeThunk';
import { useHeaderCupboardTimeSetterSizes } from './useF';
const useDocumentReadyState = () => {
	const [readyState, setReadyState] = useState(document.readyState);

	useEffect(() => {
		const handleDOMContentLoaded = () => {
			console.log('------------------------')
			setReadyState('interactive');
		};

		const handleLoad = () => {
			console.log('++++++++++++++++++++++++++++++++++')
			setReadyState('complete');
		};

		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
		} else if (document.readyState === 'interactive') {
			window.addEventListener('load', handleLoad);
		}

		return () => {
			document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
			window.removeEventListener('load', handleLoad);
		};
	}, []);

	let uniqueValue;
	switch (readyState) {
		case 'loading':
			uniqueValue = 'Загрузка...';
			break;
		case 'interactive':
			uniqueValue = 'Документ интерактивен';
			break;
		case 'complete':
			uniqueValue = 'Документ полностью загружен';
			break;
		default:
			uniqueValue = 'Неизвестное состояние';
	}

	return uniqueValue;
};


export const BoxTimeSetterModal = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const isOpen = useSelector(getTimingSetterModalIsOpen)
	const coordinates = useSelector(getBoxCoordinates)
	const timingData = useSelector(getBoxTimingData)
	const boxId = useSelector(getTimingSetterBoxId)
	const shelfId = useSelector(getTimingSetterShelfId)
	// const checked = useRef(false)
	// const currentMissedTrainingValueOfBox = useSelector((state: StateSchema) => getMissedTrainingBoxValue(state, shelfId, boxId))
	// const headerHeight = useRef(0)
	// const cupboardShelfListRects = useRef({ x: 0, y: 0, width: 0 })
	// const timeSetterSizes = useRef({ height: 0, width: 0 })
	const [coordinatesChecked, setCoordinatesChecked] = useState({ x: 0, y: 0 })
	const [checked, setChecked] = useState(false)
	const sizes = useHeaderCupboardTimeSetterSizes()

	// const {
	// 	headerHeight,
	// 	cupboardShelfListRects,
	// 	timeSetterSizes,
	// 	isLoaded,
	// } = useHeaderCupboardTimeSetterSizes()
	// const coordinatesChecked = useRef({ x: 0, y: 0 })


	useEffect(() => {
		if (sizes) {
			const {
				headerHeight,
				cupboardShelfListRects,
				timeSetterSizes
			} = sizes
			console.log(sizes)
			// console.log(timeSetterSizes.current)
			if (timeSetterSizes.height === 0) return
			const coordinatesHeightCorrection = timeSetterSizes.height / 2
			const coordinatesWidthCorrection = timeSetterSizes.width / 2
			const viewPortHeight = window.innerHeight
			let actualX = coordinates.x - coordinatesWidthCorrection
			const containerEdge = cupboardShelfListRects.x + cupboardShelfListRects.width
			if (actualX + timeSetterSizes.width > containerEdge) {
				actualX = (containerEdge - timeSetterSizes.width)
			} else if (actualX < cupboardShelfListRects.x) {
				actualX = cupboardShelfListRects.x
			}
			let actualY = coordinates.y - coordinatesHeightCorrection
			if (actualY < headerHeight) {
				actualY = headerHeight
			} else if (actualY + timeSetterSizes.height > viewPortHeight) {
				actualY = viewPortHeight - timeSetterSizes.height
			}
			setCoordinatesChecked({ y: actualY, x: actualX })
		}
	}, [coordinates, sizes])
	// }, [coordinates, isLoaded, cupboardShelfListRects, headerHeight, timeSetterSizes])

	// useEffect(() => {
	// 	console.log('TIMESETTER   ', boxId)
	// }, [boxId])

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

	// const onCloseHandle = () => {
	// 	dispatch(cupboardShelfListActions.setTimingSetterModalIsOpen(false))
	// 	setChecked(false)
	// 	// dispatch(cupboardShelfListActions.dropMissedTrainingShelfAndBoxId())
	// }

	// const onSaveTime = () => {
	// 	dispatch(cupboardShelfListActions.setTimingSetterModalIsOpen(false))
	// 	setChecked(false)
	// 	// if (!boxId) {
	// 	// 	// console.log(value.value)
	// 	// 	updateShelfMutation({ id: shelfId, missedTrainingAction: value.value as MissedTrainingValues })
	// 	// 	onCloseHandle()
	// 	// }
	// }

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

// import { useTranslation } from 'react-i18next';
// import cls from './BoxTimeSetterModal.module.scss';
// import { HDialog } from '@/shared/ui/HDialog';
// import { useSelector } from 'react-redux';
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { cupboardShelfListActions } from '../../../model/slice/cupboardShelfListSlice';
// import { TimingBlock } from '@/shared/types/DataBlock';
// import {
// 	getTimingSetterModalIsOpen,
// 	getBoxCoordinates,
// 	getBoxTimingData,
// 	getTimingSetterBoxId,
// 	getTimingSetterShelfId
// } from '../../../model/selectors/getBoxTimingSetterModal';
// import { TimeSetter } from '@/shared/ui/TimeSetter';
// import { useEffect, useRef, useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { idCupboardShelfList, idTimeSetterHidden } from '@/shared/const/ids';
// import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
// import { updateBoxTimeThunk } from '../../../model/services/updateBoxTimeThunk';


// export const BoxTimeSetterModal = () => {
// 	const { t } = useTranslation()
// 	const dispatch = useAppDispatch()
// 	const isOpen = useSelector(getTimingSetterModalIsOpen)
// 	const coordinates = useSelector(getBoxCoordinates)
// 	const timingData = useSelector(getBoxTimingData)
// 	const boxId = useSelector(getTimingSetterBoxId)
// 	const shelfId = useSelector(getTimingSetterShelfId)
// 	// const checked = useRef(false)
// 	// const currentMissedTrainingValueOfBox = useSelector((state: StateSchema) => getMissedTrainingBoxValue(state, shelfId, boxId))
// 	const headerHeight = useRef(0)
// 	const cupboardShelfListRects = useRef({ x: 0, y: 0, width: 0 })
// 	const timeSetterSizes = useRef({ height: 0, width: 0 })
// 	const [coordinatesChecked, setCoordinatesChecked] = useState({ x: 0, y: 0 })
// 	const [checked, setChecked] = useState(false)
// 	// const coordinatesChecked = useRef({ x: 0, y: 0 })
// 	// VAR: Тут нужно рефакторить в кастомные хуки
// 	useEffect(() => {
// 		// setTimeout(() => {
// 		const header = document.querySelector('header') as HTMLDivElement
// 		headerHeight.current = header.clientHeight
// 		const timeSetter = document.querySelector(`#${idTimeSetterHidden}`) as HTMLDivElement
// 		const timeSetterRect = timeSetter.getBoundingClientRect()
// 		timeSetterSizes.current.height = timeSetterRect.height
// 		timeSetterSizes.current.width = timeSetterRect.width
// 		console.log(timeSetterSizes.current)
// 		const cupboardShelfList = document.querySelector(`#${idCupboardShelfList}`) as HTMLDivElement
// 		const cupboardShelfListSizes = cupboardShelfList.getBoundingClientRect()
// 		cupboardShelfListRects.current.x = cupboardShelfListSizes.x
// 		cupboardShelfListRects.current.y = cupboardShelfListSizes.y
// 		cupboardShelfListRects.current.width = cupboardShelfListSizes.width
// 		// checked.current = true
// 		// }, 0)
// 	}, [])

// 	useEffect(() => {
// 		// console.log(timeSetterSizes.current)
// 		if (timeSetterSizes.current.height === 0) return
// 		const coordinatesHeightCorrection = timeSetterSizes.current.height / 2
// 		const coordinatesWidthCorrection = timeSetterSizes.current.width / 2
// 		const viewPortHeight = window.innerHeight
// 		let actualX = coordinates.x - coordinatesWidthCorrection
// 		const containerEdge = cupboardShelfListRects.current.x + cupboardShelfListRects.current.width
// 		if (actualX + timeSetterSizes.current.width > containerEdge) {
// 			actualX = (containerEdge - timeSetterSizes.current.width)
// 		} else if (actualX < cupboardShelfListRects.current.x) {
// 			actualX = cupboardShelfListRects.current.x
// 		}
// 		let actualY = coordinates.y - coordinatesHeightCorrection
// 		if (actualY < headerHeight.current) {
// 			actualY = headerHeight.current
// 		} else if (actualY + timeSetterSizes.current.height > viewPortHeight) {
// 			actualY = viewPortHeight - timeSetterSizes.current.height
// 		}
// 		setCoordinatesChecked({ y: actualY, x: actualX })
// 	}, [coordinates])

// 	// useEffect(() => {
// 	// 	console.log('TIMESETTER   ', boxId)
// 	// }, [boxId])

// 	const onCloseHandle = () => {
// 		dispatch(cupboardShelfListActions.setTimingSetterModalIsOpen(false))
// 		// dispatch(cupboardShelfListActions.dropMissedTrainingShelfAndBoxId())
// 	}

// 	const onSaveTime = (timeObject: TimingBlock) => {
// 		dispatch(updateBoxTimeThunk({ timeObject, boxId, shelfId }))
// 		dispatch(cupboardShelfListActions.setTimingSetterModalIsOpen(false))
// 		// if (!boxId) {
// 		// 	// console.log(value.value)
// 		// 	updateShelfMutation({ id: shelfId, missedTrainingAction: value.value as MissedTrainingValues })
// 		// 	onCloseHandle()
// 		// }
// 	}

// 	// const onCloseHandle = () => {
// 	// 	dispatch(cupboardShelfListActions.setTimingSetterModalIsOpen(false))
// 	// 	setChecked(false)
// 	// 	// dispatch(cupboardShelfListActions.dropMissedTrainingShelfAndBoxId())
// 	// }

// 	// const onSaveTime = () => {
// 	// 	dispatch(cupboardShelfListActions.setTimingSetterModalIsOpen(false))
// 	// 	setChecked(false)
// 	// 	// if (!boxId) {
// 	// 	// 	// console.log(value.value)
// 	// 	// 	updateShelfMutation({ id: shelfId, missedTrainingAction: value.value as MissedTrainingValues })
// 	// 	// 	onCloseHandle()
// 	// 	// }
// 	// }

// 	return (
// 		<HDialogHeadless
// 			isOpen={(isOpen)}
// 			onSubmit={() => alert('Сохраняю настройки для коробки')}
// 			onClose={onCloseHandle}
// 			transparent
// 			panelAbsolute
// 			panelWithMainPadding={false}
// 			panelWithBackground={false}
// 			styles={{ left: coordinatesChecked.x, top: coordinatesChecked.y }}
// 		>
// 			<motion.div
// 				initial={{ opacity: 0 }}
// 				animate={{ opacity: 1 }}
// 				transition={{ delay: 0.05 }}
// 			>
// 				<TimeSetter
// 					timingData={timingData}
// 					onClose={onCloseHandle}
// 					onSaveTime={onSaveTime}
// 				/>
// 			</motion.div>
// 		</HDialogHeadless >
// 	)
// }

