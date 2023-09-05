import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CupboardShelfList.module.scss';
import { $generateHtmlFromNodes } from '@lexical/html';
// import './Modals/BoxSettingsDropdownModal/BoxSettingsDropdownModal.css'
// import clsBoxSettings from './Modals/BoxSettingsDropdownModal/BoxSettingsDropdownModal.module.scss'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { fetchCupboardData } from '../model/services/fetchCupboardData';
import { useSelector } from 'react-redux';
import {
	getCupboardData,
	getCupboardIsLoading,
	getCupboardError,
	getCupboardShelves,
	getCupboardCommonShelfCollapsed,
	getCupboardIsDataAlreadyInStore,
	getCupboardIsFirstRender
} from '../model/selectors/getCupboardShelfList';
import { cupboardShelfListActions, getCupboardState } from '../model/slice/cupboardShelfListSlice';
import { ShelfItem } from './ShelfItem/ShelfItem';
import { ShelfButtons } from './ShelfButtons/ShelfButtons';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { ShelfSchema } from '@/entities/Shelf';
import { CommonShelf } from './CommonShelf/CommonShelf';
import { BoxesSettingsModal } from './BoxesSettingsModal/BoxesSettingsModal/BoxesSettingsModal';
import { BoxesBlockWrapper } from './BoxesBlock/BoxesBlockWrapper';
import { MissedTrainingSettingsModal } from './Modals/MissedTrainingSettingsModal/MissedTrainingSettings';
import { NotificationSettingsModal } from './Modals/NotificationSettingsModal/NotificationSettingsModal';
import { DndShelfListWrapper } from './DndShelfListWrapper';
import { AnimatePresence, Reorder } from 'framer-motion';
import { BoxTimeSetterModal } from './Modals/BoxTimeSetterModal/BoxTimeSetterModal';
import { CreateNewCardModal } from './Modals/CreateNewCardModal/CreateNewCardModal';
import { useUpdateShelvesOrderMutation } from '@/entities/Cupboard';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
// import { storage } from '@/shared/lib/helpers/common/localStorage';
import { ShelfButtonsSkeleton } from './ShelfButtons/ShelfButtonsSkeleton';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';
import { BoxSettingsDropdownModal } from './Modals/BoxSettingsDropdownModal/BoxSettingsDropdownModal';
import { HiddenTemplates } from './HiddenTemplates/HiddenTemplates';
import { idCupboardShelfList } from '@/shared/const/ids';
import { CupboardInfoModal } from './Modals/CupboardInfoModal/CupboardInfoModal';
import { Editor } from '@/shared/ui/Editor/EditorSE';
import { ContentLooker } from './Modals/CreateNewCardModal copy/ContentLooker';

interface CupboardShelfListProps {
	className?: string
}
let timerId: number;
let reorderTimerId: number;

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
	const isFirstRender = useSelector(getCupboardIsFirstRender)
	// const cupboardShelves = useSelector(getCupboardState.selectAll).sort((a, b) => a.index - b.index)
	useEffect(() => {
		// if (cupboardShelves.length) {
		localDataService.setShelves(cupboardShelves)
		// }
	}, [cupboardShelves])

	useLayoutEffect(() => {
		if (!cupboardIsLoading) {
			const trainButtons = document.querySelectorAll('[data-button-type="shelf-train"]') as NodeListOf<HTMLButtonElement>
			const addCardButtons = document.querySelectorAll('[data-button-type="shelf-add-card"]') as NodeListOf<HTMLButtonElement>
			const addCardButtonGeneral = document.querySelector('[data-button-type="shelf-add-card-general"]') as HTMLButtonElement
			const buttonsWidthList: number[] = []
			const addCardsButtonsWidthList: number[] = []
			buttonsWidthList.push(addCardButtonGeneral.clientWidth)
			trainButtons.forEach(button => buttonsWidthList.push(button.clientWidth))
			addCardButtons.forEach(button => addCardsButtonsWidthList.push(button.clientWidth))
			const maxButtonWidth = Math.ceil(Math.max(...buttonsWidthList))
			const addCardMaxButtonWidth = Math.ceil(Math.max(...addCardsButtonsWidthList))
			trainButtons.forEach(button => button.style.minWidth = `${maxButtonWidth + 2}px`)
			addCardButtons.forEach(button => button.style.minWidth = `${addCardMaxButtonWidth + 2}px`)
			addCardButtonGeneral.style.minWidth = `${maxButtonWidth + 2}px`
			clearTimeout(timerId)
		}
	}, [cupboardIsLoading])

	const onAddNewCardClick = useCallback((shelfId: string) => {
		dispatch(cupboardShelfListActions.setShelfIdCardModal(shelfId))
		dispatch(cupboardShelfListActions.setIsCreateNewCardModalOpen(true))
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
		let shelvesData;
		if (cupboardIsLoading) {
			const shelvesFromLocalData = localDataService.getShelves()
			// return []
			if (!shelvesFromLocalData) {
				// тут нужно вернуть скелетон или вообще ничего не возвращать
				return []
			} else {
				shelvesData = shelvesFromLocalData
			}
		} else {
			shelvesData = cupboardShelves
		}
		return shelvesData.map(shelf => {
			const completeSmallDataLabels =
				<CompleteSmallDataLabels
					data={shelf.data}
					isLoading={cupboardIsLoading}
				/>
			const buttons = (
				<AnimateSkeletonLoader
					classNameForCommonWrapper={cls.commonWrapper}
					skeletonComponent={<ShelfButtonsSkeleton />}
					componentAfterLoading={<ShelfButtons
						shelf={shelf}
						onAddNewCardClick={onAddNewCardClick}
						onCollapseClick={onCollapseClick}
					/>}
					noDelay={!cupboardIsLoading}
					isLoading={cupboardIsLoading}
				/>
			)
			const boxesBlock = <BoxesBlockWrapper isLoading={cupboardIsLoading} shelf={shelf} />

			return (
				<ShelfItem
					isFirstRender={isFirstRender}
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

	}, [cupboardIsLoading, isFirstRender, cupboardShelves, onAddNewCardClick, onCollapseClick, moveShelf])

	// if (cupboardIsLoading) {
	// 	return <>
	// 		<CommonShelf data={cupboardData} isLoading={cupboardIsLoading} />
	// 		{shelfNamesList!.map(title => <ShelfSkeleton key={title} title={title} />)}
	// 	</>
	// }
	// const actualShelvesList = (
	// 	<AnimateSkeletonLoader
	// 		skeletonComponent={<>{shelfNamesList!.map(title => <ShelfSkeleton key={title} title={title} />)}</>}
	// 	/>
	// )


	return (
		<div
			className={cls.cupboardShelfList}
			id={idCupboardShelfList}
		>
			{/* {html} */}
			<ContentLooker />
			{/* <Editor autoFocus/> */}
			<CommonShelf data={cupboardData} isLoading={cupboardIsLoading} />
			{/* <AnimatePresence> */}

			{/* <DndProvider backend={HTML5Backend}> */}
			{/* <DndShelfListWrapper> */}
			<Reorder.Group
				values={cupboardIsLoading ? localDataService.getShelves() : cupboardShelves}
				// onDragEnd={(event, info) => {
				// 	console.log(info.point.x, info.point.y)
				// 	console.log(event)
				// 	console.log(info)
				// }
				// }
				onReorder={reorderShelves}
			>
				{shelvesList}
			</Reorder.Group>
			{/* </DndShelfListWrapper> */}
			{/* </DndProvider> */}
			{/* </AnimatePresence> */}
			<BoxesSettingsModal />
			<MissedTrainingSettingsModal />
			<NotificationSettingsModal />
			<CreateNewCardModal />
			<BoxTimeSetterModal />
			<BoxSettingsDropdownModal />
			<CupboardInfoModal />
			<HiddenTemplates />
			{/* <TimeSetterHiddenTemplate /> */}
			{/* <DropdownLocalHiddenTemplate /> */}
			{/* <div className={cls.timeSetterTemplateHidden} >
				<TimeSetter
					onClose={() => { }}
					onSaveTime={() => { }}
				/>
			</div> */}

		</div>
	)
}