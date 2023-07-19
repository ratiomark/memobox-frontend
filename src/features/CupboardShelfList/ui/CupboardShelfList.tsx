import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CupboardShelfList.module.scss';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useCallback, useEffect, useMemo } from 'react';
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { fetchCupboardData } from '../model/services/fetchCupboardData';
import { useSelector } from 'react-redux';
import {
	getCupboardData,
	getCupboardIsLoading,
	getCupboardError,
	getCupboardShelves,
	getCupboardCommonShelfCollapsed
} from '../model/selectors/getCupboardShelfList';
import { cupboardShelfListActions, getCupboardState } from '../model/slice/cupboardShelfListSlice';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ShelfItem } from './ShelfItem/ShelfItem';
import { ShelfButtons } from './ShelfButtons/ShelfButtons';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { ShelfSchema, ShelfSkeleton } from '@/entities/Shelf';
import { getUserShelfNamesList } from '@/entities/User';
import { CommonShelf } from './CommonShelf/CommonShelf';
import { BoxesSettingsModal } from './BoxesSettingsModal/BoxesSettingsModal/BoxesSettingsModal';
import { BoxesBlockWrapper } from './BoxesBlock/BoxesBlockWrapper';
import { MissedTrainingSettingsModal } from './Modals/MissedTrainingSettingsModal/MissedTrainingSettings';
import { NotificationSettingsModal } from './Modals/NotificationSettingsModal/NotificationSettingsModal';
import { DndShelfListWrapper } from './DndShelfListWrapper';
import { AnimatePresence, Reorder } from 'framer-motion';
import { BoxTimeSetterModal } from './Modals/BoxTimeSetterModal/BoxTimeSetterModal';
import { CardModalNewCard } from './Modals/CardModalNewCard/CardModalNewCard';
import { TimeSetter } from '@/shared/ui/TimeSetter';
import { useUpdateShelvesOrderMutation } from '@/entities/Cupboard/model/api/cupboardApi';

interface CupboardShelfListProps {
	className?: string
}
let timerId: number;

export const CupboardShelfList = (props: CupboardShelfListProps) => {
	const {
		className
	} = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const cupboardData = useSelector(getCupboardData)
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const cupboardError = useSelector(getCupboardError)
	const cupboardShelves = useSelector(getCupboardState.selectAll)
	const [updateShelvesMutation] = useUpdateShelvesOrderMutation()
	// const cupboardShelves = useSelector(getCupboardState.selectAll).sort((a, b) => a.index - b.index)

	// useEffect(() => {
		// updateShelvesOrder

	// }, [cupboardShelves])

	console.log(cupboardShelves)
	useEffect(() => {
		if (!cupboardIsLoading) {
			timerId = setTimeout(() => {
				const trainButtons = document.querySelectorAll('[data-button-type="shelf-train"]') as NodeListOf<HTMLButtonElement>
				const addCardButtons = document.querySelectorAll('[data-button-type="shelf-add-card"]') as NodeListOf<HTMLButtonElement>
				const buttonsWidthList: number[] = []
				const addCardsButtonsWidthList: number[] = []
				trainButtons.forEach(button => buttonsWidthList.push(button.clientWidth))
				addCardButtons.forEach(button => addCardsButtonsWidthList.push(button.clientWidth))
				const maxButtonWidth = Math.ceil(Math.max(...buttonsWidthList))
				const addCardMaxButtonWidth = Math.ceil(Math.max(...addCardsButtonsWidthList))
				trainButtons.forEach(button => button.style.minWidth = `${maxButtonWidth + 2}px`)
				addCardButtons.forEach(button => button.style.minWidth = `${addCardMaxButtonWidth + 2}px`)
				clearTimeout(timerId)
			}, 10)
		}
	}, [cupboardIsLoading])

	const onAddNewCardClick = useCallback((shelfId: string) => {
		dispatch(cupboardShelfListActions.setShelfIdCardModal(shelfId))
		dispatch(cupboardShelfListActions.setCardModalIsOpen(true))
	}, [dispatch])

	const onCollapseClick = useCallback((shelfId: string, isCollapsed: boolean) => {
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isCollapsed } }))
	}, [dispatch])

	const moveShelf = useCallback((dropAtIndex: number, shelfIndexDragged: number) => {
		// console.log('функция ', 'ставлю на: ', dropAtIndex, '  индекс: ', shelfIndexDragged)
		if (dropAtIndex === shelfIndexDragged) return
		const updates = []
		const currentShelf = { ...cupboardShelves.find(shelf => shelf.index === shelfIndexDragged) } as ShelfSchema
		updates.push({ id: currentShelf.id, changes: { index: dropAtIndex } })
		if (dropAtIndex > shelfIndexDragged) {
			cupboardShelves.forEach(shelf => {
				if (shelf.index <= dropAtIndex && shelf.index > shelfIndexDragged) {
					updates.push({ id: shelf.id, changes: { index: shelf.index - 1 } })
				}
			})
		} else {
			cupboardShelves.forEach(shelf => {
				if (shelf.index >= dropAtIndex && shelf.index < shelfIndexDragged) {
					updates.push({ id: shelf.id, changes: { index: shelf.index + 1 } })
				}
			})
		}
		dispatch(cupboardShelfListActions.updateIndexes(updates))
	}, [cupboardShelves, dispatch])

	const reorderShelves = useCallback((shelves: ShelfSchema[]) => {
		dispatch(cupboardShelfListActions.reorderShelves(shelves))
	}, [dispatch])

	const shelvesList = useMemo(() => {
		if (cupboardIsLoading) return []
		return cupboardShelves.map(shelf => {
			const completeSmallDataLabels =
				<CompleteSmallDataLabels
					data={shelf.data}
					isLoading={cupboardIsLoading}
				/>
			const buttons =
				<ShelfButtons
					shelf={shelf}
					onAddNewCardClick={onAddNewCardClick}
					onCollapseClick={onCollapseClick}
				/>
			const boxesBlock = <BoxesBlockWrapper shelf={shelf} />
			return (
				<ShelfItem
					key={shelf.id}
					shelf={shelf}
					boxesBlock={boxesBlock}
					moveShelf={moveShelf}
					completeSmallDataLabelsBlock={
						completeSmallDataLabels
					}
					shelfButtonsBlock={buttons}
				/>
			)
		})

	}, [cupboardIsLoading, cupboardShelves, onAddNewCardClick, onCollapseClick, moveShelf])

	// if (cupboardIsLoading) {
	// 	return <>
	// 		<CommonShelf data={cupboardData} isLoading={cupboardIsLoading} />
	// 		{shelfNamesList!.map(title => <ShelfSkeleton key={title} title={title} />)}
	// 	</>
	// }

	return (
		<div
			className={cls.cupboardShelfList}
			id='cupboardShelfList'
		>
			<CommonShelf data={cupboardData} isLoading={cupboardIsLoading} />
			{/* <AnimatePresence> */}

			{/* <DndProvider backend={HTML5Backend}> */}
			{/* <DndShelfListWrapper> */}
			<Reorder.Group
				values={cupboardShelves}
				onReorder={reorderShelves}
			// style={{ overflow: 'hidden' }}
			>
				{shelvesList}
			</Reorder.Group>
			{/* </DndShelfListWrapper> */}
			{/* </DndProvider> */}
			{/* </AnimatePresence> */}
			<BoxesSettingsModal />
			<MissedTrainingSettingsModal />
			<NotificationSettingsModal />
			<CardModalNewCard />
			<BoxTimeSetterModal />
			<div className={cls.timeSetterTemplateHidden} >
				<TimeSetter
					onClose={() => { }}
					onSaveTime={() => { }}
				/>
			</div>
		</div>
	)
}