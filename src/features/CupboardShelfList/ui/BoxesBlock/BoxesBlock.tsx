import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ShelfSchema } from '@/entities/Shelf';
import { MouseEvent, MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { Box, BoxCoordinates } from '@/entities/Box';
import cls from './BoxesBlock.module.scss';
import { TimingBlock } from '@/shared/types/DataBlock';
import { idBoxesBlockCommonWrapper } from '@/shared/const/idsAndDataAttributes';

// `#${idBoxesBlockCommonWrapper}`
export const BoxesBlock = ({ shelf }: {shelf: ShelfSchema}) => {

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const boxesBlockRef = useRef<HTMLUListElement>(null)
	const boxesBlockWrapperRef = useRef<HTMLDivElement>(null)
	const commonWrapperRef = useRef() as MutableRefObject<HTMLDivElement>
	const [shouldBeScrollable, setShouldBeScrollable] = useState(false)
	const [leftSide, setLeftSide] = useState(false)
	const [rightSide, setRightSide] = useState(false)
	const [left, setLeft] = useState(0)
	
	const onViewClick = useCallback((shelfId: string, boxIndex: number | string) => {
		navigate(obtainRouteView(shelfId, boxIndex.toString()))
	}, [navigate])

	const onAddNewCardClick = useCallback((shelfId: string, boxIndex: number) => {
		dispatch(cupboardShelfListActions.setShelfIdCardModal(shelfId))
		dispatch(cupboardShelfListActions.setBoxIndexAndBoxIdCardModal(boxIndex))
		dispatch(cupboardShelfListActions.setIsCreateNewCardModalOpen(true))
	}, [dispatch])

	const onOpenTimeSetter = useCallback((coordinates: BoxCoordinates, timingData: TimingBlock, boxId: string, shelfId: string) => {
		dispatch(cupboardShelfListActions.setTimingSetterBoxCoordinates(coordinates))
		dispatch(cupboardShelfListActions.setTimingSetterModalIsOpen(true))
		dispatch(cupboardShelfListActions.setTimingSetterModalBoxId(boxId))
		dispatch(cupboardShelfListActions.setTimingSetterModalShelfId(shelfId))
		dispatch(cupboardShelfListActions.setTimingSetterBoxTimingData(timingData))
	}, [dispatch])

	const onOpenBoxSettings = useCallback((coordinates: BoxCoordinates, boxId: string, shelfId: string) => {
		dispatch(cupboardShelfListActions.setBoxSettingsBoxCoordinates(coordinates))
		dispatch(cupboardShelfListActions.setBoxSettingsModalIsOpen(true))
		dispatch(cupboardShelfListActions.setBoxSettingsModalBoxId(boxId))
		dispatch(cupboardShelfListActions.setMissedTrainingShelfId(shelfId))
		dispatch(cupboardShelfListActions.setMissedTrainingBoxId(boxId))
	}, [dispatch])

	const boxList = useMemo(() => {
		const boxesData = [...shelf.boxesData].sort((a, b) => a.index - b.index)
		return boxesData.map(boxItem => {
			return (
				<Box
					key={boxItem._id}
					boxItem={boxItem}
					shelfId={shelf.id}
					onOpenTimeSetter={onOpenTimeSetter}
					onOpenBoxSettings={onOpenBoxSettings}
					onAddNewCard={onAddNewCardClick}
					onBoxViewClick={onViewClick}
				/>
			)
		})
	}, [shelf.boxesData, onOpenTimeSetter, onOpenBoxSettings, onAddNewCardClick, onViewClick, shelf.id])
	
	

	// useEffect(() => {
	// 	// const commonWrapper = document.querySelector(`#${idBoxesBlockCommonWrapper}`)
	// 	// console.log(commonWrapper)
	// 	// console.log(shelf.title, boxesBlockRef.current)
	// 	// console.log(shelf.title, boxesBlockRef.current?.scrollWidth)
	// 	// console.log(shelf.title, boxesBlockRef.current?.clientWidth)
	// 	// console.log(shelf.title, boxesBlockWrapperRef.current?.scrollWidth)
	// 	// console.log(shelf.title, boxesBlockWrapperRef.current?.clientWidth)
	// 	if (boxList && boxesBlockRef.current && commonWrapperRef.current) {
	// 		if (boxesBlockRef.current.scrollWidth > commonWrapperRef.current.clientWidth) {
	// 			setShouldBeScrollable(true)
	// 			setRightSide(true)
	// 		} else {
	// 			setShouldBeScrollable(false)
	// 			setRightSide(false)
	// 		}
	// 	}
	// }, [boxList])

	// // const handleScroll = (e: globalThis.WheelEvent) => {
	// // 	console.log('CRHJKKkkkkkkkkkkkkkkkkkkk')
	// // 	// const commonWrapper = document.querySelector(`#${idBoxesBlockCommonWrapper}`)
	// // 	if (commonWrapperRef.current && boxesBlockRef.current) {
	// // 		const container = boxesBlockRef.current
	// // 		const scrollLeft = container.scrollLeft
	// // 		const scrollWidth = container.scrollWidth
	// // 		const clientWidth = commonWrapperRef.current.clientWidth
	// // 		const percentScrolledLeft = Math.ceil(scrollLeft / (scrollWidth - clientWidth) * 100)
	// // 		const percentScrolledRight = Math.ceil(100 - percentScrolledLeft)
	// // 		// console.log(percentScrolledLeft)
	// // 		// console.log(percentScrolledRight)
	// // 		// console.log(scrollLeft)
	// // 		if (percentScrolledLeft > 0) {
	// // 			setLeftSide(true)
	// // 		} else {
	// // 			setLeftSide(false)
	// // 		}
	// // 		if (percentScrolledRight <= 0) {
	// // 			setRightSide(false)
	// // 		} else {
	// // 			setRightSide(true)
	// // 		}
	// // 	}
	// // }

	// useEffect(() => {
	// 	const commonWrapper = document.querySelector(`#${idBoxesBlockCommonWrapper}-${shelf.id}`) as HTMLDivElement 
	// 	if(!commonWrapper) return 
	// 	const handleScroll = (e: globalThis.WheelEvent) => {
	// 		console.log('CRHJKKkkkkkkkkkkkkkkkkkkk')
	// 		if (commonWrapper && boxesBlockRef.current) {
	// 			const container = commonWrapper
	// 			const scrollLeft = Math.ceil(container.scrollLeft)
	// 			console.log(scrollLeft)
	// 			setLeft(scrollLeft)
	// 			// console.log(commonWrapper.scrollLeft)
	// 			const scrollWidth = container.scrollWidth
	// 			const clientWidth = container.clientWidth
	// 			const percentScrolledLeft = Math.ceil(scrollLeft / (scrollWidth - clientWidth) * 100)
	// 			const percentScrolledRight = Math.ceil(100 - percentScrolledLeft)
	// 			console.log(percentScrolledLeft)
	// 			console.log(percentScrolledRight)
	// 			// console.log(scrollLeft)
	// 			if (percentScrolledLeft > 0) {
	// 				setLeftSide(true)
	// 			} else {
	// 				setLeftSide(false)
	// 			}
	// 			if (percentScrolledRight <= 0) {
	// 				setRightSide(false)
	// 			} else {
	// 				setRightSide(true)
	// 			}
	// 		}
	// 	}
	// 	commonWrapper.addEventListener('wheel', handleScroll) 
	// 	commonWrapperRef.current = commonWrapper
	// 	return () => {
	// 		commonWrapper.removeEventListener('wheel', handleScroll)
	// 	}
	// }, [shelf.id])


	// VAR: сделать градиенты по бокам
	return (
		<ul
			className={cls.BoxesBlock} 
			ref={boxesBlockRef}
		>
			{boxList}
		</ul>
	)
}
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import { ShelfSchema } from '@/entities/Shelf';
// import { useCallback, useMemo } from 'react';
// import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
// import { useNavigate } from 'react-router-dom';
// import { Box, BoxCoordinates } from '@/entities/Box';
// import cls from './BoxesBlock.module.scss';
// import { TimingBlock } from '@/shared/types/DataBlock';

// interface BoxesBlockProps {
// 	className?: string
// 	shelf: ShelfSchema
// }

// export const BoxesBlock = (props: BoxesBlockProps) => {
// 	const {
// 		className,
// 		shelf,
// 	} = props

// 	const dispatch = useAppDispatch()
// 	const navigate = useNavigate()

// 	const onViewClick = useCallback((shelfId: string, boxIndex: number | string) => {
// 		navigate(obtainRouteView(shelfId, boxIndex.toString()))
// 	}, [navigate])

// 	const onAddNewCardClick = useCallback((shelfId: string, boxIndex: number) => {
// 		dispatch(cupboardShelfListActions.setShelfIdCardModal(shelfId))
// 		dispatch(cupboardShelfListActions.setBoxIndexCardModal(boxIndex))
// 		dispatch(cupboardShelfListActions.setIsCreateNewCardModalOpen(true))
// 	}, [dispatch])

// 	const onOpenTimeSetter = useCallback((coordinates: BoxCoordinates, timingData: TimingBlock, boxId: string) => {
// 		dispatch(cupboardShelfListActions.setTimingSetterBoxCoordinates(coordinates))
// 		dispatch(cupboardShelfListActions.setTimingSetterModalIsOpen(true))
// 		dispatch(cupboardShelfListActions.setTimingSetterModalBoxId(boxId))
// 		dispatch(cupboardShelfListActions.setTimingSetterBoxTimingData(timingData))
// 	}, [dispatch])

// 	const onOpenBoxSettings = useCallback((coordinates: BoxCoordinates, shelfId: string, boxId: string,) => {
// 		dispatch(cupboardShelfListActions.setBoxSettingsBoxCoordinates(coordinates))
// 		dispatch(cupboardShelfListActions.setBoxSettingsModalIsOpen(true))
// 		dispatch(cupboardShelfListActions.setBoxSettingsModalBoxId(boxId))
// 		dispatch(cupboardShelfListActions.setMissedTrainingShelfId(shelfId))
// 		dispatch(cupboardShelfListActions.setMissedTrainingBoxId(boxId))
// 	}, [dispatch])

// 	const { t } = useTranslation()

// 	const boxList = useMemo(() => {
// 		const boxesData = [...shelf.boxesData].sort((a, b) => a.index - b.index)
// 		return boxesData.map(boxItem => {
// 			return (
// 				<Box
// 					key={boxItem._id}
// 					boxItem={boxItem}
// 					shelfId={shelf.id}
// 					onOpenTimeSetter={onOpenTimeSetter}
// 					onOpenBoxSettings={onOpenBoxSettings}
// 					onAddNewCard={onAddNewCardClick}
// 					onBoxViewClick={onViewClick}
// 				/>
// 			)
// 		})
// 	}, [shelf.boxesData, onOpenTimeSetter, onOpenBoxSettings, onAddNewCardClick, onViewClick, shelf.id])
	
// 	// VAR: сделать градиенты по бокам
	
// 	return (
// 		<ul className={clsx(
// 			cls.BoxesBlock,
// 			// 'target',
// 			className)}
// 		>
// 			{boxList}
// 		</ul>
// 	)
// }