import { useTranslation } from 'react-i18next';
import cls from './CupboardShelfList.module.scss';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { fetchCupboardData } from '../model/services/fetchCupboardData';
import { useSelector } from 'react-redux';
import {
	getCupboardData,
	getCupboardIsLoading,
	getCupboardError,
	getCupboardShelves,
	getCupboardCommonShelfCollapsed,
	getCupboardIsDataAlreadyInStore,
	getCupboardIsFirstRender,
	// getShelvesFromStorOrLocalSaver,
} from '../model/selectors/getCupboardShelfList';
import { cupboardShelfListActions, getCupboardState } from '../model/slice/cupboardShelfListSlice';
import { ShelfItem } from './ShelfItem/ShelfItem';
import { ShelfButtons } from './ShelfButtons/ShelfButtons';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { ShelfSchema } from '@/entities/Shelf';
import { CommonShelf } from './CommonShelf/CommonShelf';
import { BoxesBlockWrapper } from './BoxesBlock/BoxesBlockWrapper';
import { MissedTrainingSettingsModal } from './Modals/MissedTrainingSettingsModal/MissedTrainingSettings';
import { NotificationSettingsModal } from './Modals/NotificationSettingsModal/NotificationSettingsModal';
import { BoxTimeSetterModal } from './Modals/BoxTimeSetterModal/BoxTimeSetterModal';
import { CreateNewCardModal } from './Modals/CreateNewCardModal/CreateNewCardModal';
// import { useUpdateShelvesOrderMutation } from '@/entities/Cupboard';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
// import { storage } from '@/shared/lib/helpers/common/localStorage';
import { ShelfButtonsSkeleton } from './ShelfButtons/ShelfButtonsSkeleton';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';
import { BoxSettingsDropdownModal } from './Modals/BoxSettingsDropdownModal/BoxSettingsDropdownModal';
import { HiddenTemplates } from './HiddenTemplates/HiddenTemplates';
import { idCupboardShelfList } from '@/shared/const/ids';
import { CupboardInfoModal } from './Modals/CupboardInfoModal/CupboardInfoModal';
import { Reorder } from 'framer-motion';
import { ShelfBoxesTemplateModal } from './BoxesSettingsModal/ShelfTemplateSettings';
import { useDebounce } from '@/shared/lib/helpers/hooks/useDebounce';
import { useShelvesDndHandler } from '../model/hooks/useShelvesDndHandler';
import { useShelvesLocalSaver } from '../model/hooks/useShelvesLocalSaver';
import { setLocalShelvesToStore } from '../model/services/setLocalShelvesToStore';
// import { ContentLooker } from './Modals/CreateNewCardModal copy/ContentLooker';
// import { EditorV2 } from '@/shared/ui/lexical-playground/src/Editor';

let timerId: number;
let shelvesData;
export const CupboardShelfList = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const cupboardData = useSelector(getCupboardData)
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const cupboardError = useSelector(getCupboardError)
	const cupboardShelves = useSelector(getCupboardState.selectAll)
	// const cupboardShelves = useSelector(getShelvesFromStorOrLocalSaver)
	// const [updateShelvesMutation] = useUpdateShelvesOrderMutation()
	const isFirstRender = useSelector(getCupboardIsFirstRender)
	useShelvesDndHandler()
	useShelvesLocalSaver({ cupboardShelves })
	// const cupboardShelves = useSelector(getCupboardState.selectAll).sort((a, b) => a.index - b.index)
	// useEffect(() => {
	// 	// if (cupboardShelves.length) {
	// 	localDataService.setShelves(cupboardShelves)
	// 	// }
	// }, [cupboardShelves])
	useLayoutEffect(() => {
		dispatch(setLocalShelvesToStore())
	}, [dispatch])


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

	const reorderShelves = useCallback((shelves: ShelfSchema[]) => {
		console.log('reorder ', shelves)
		dispatch(cupboardShelfListActions.reorderShelves(shelves))
		// VAR: нужно показать плашку "новый порядок полок будет сохранен через 5 секунд". По прошествии 5-ти секунд отправить запрос на сервер
	}, [dispatch])


	const shelvesList = useMemo(() => {
		// let shelvesData;
		// if (cupboardIsLoading) {
		// 	// shelvesData = localDataService.getShelves()
		// 	// shelvesData = localDataService.getShelves()
		// 	// const shelvesFromLocalData = undefined
		// 	const shelvesFromLocalData = localDataService.getShelves()
		// 	if (!shelvesFromLocalData) {
		// 		return []
		// 	} else {
		// 		shelvesData = shelvesFromLocalData
		// 	}
		// } else {
		// 	shelvesData = cupboardShelves
		// }
		// console.log('cupboardShelvesLIST  :  ', cupboardShelves)
		// const shelvesData = cupboardShelves
		// return shelvesData.map(shelf => {
		return cupboardShelves.map(shelf => {
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
					// moveShelf={moveShelf}
					completeSmallDataLabelsBlock={
						completeSmallDataLabels
					}
					shelfButtonsBlock={buttons}
				/>
			)
		})

	}, [cupboardIsLoading, isFirstRender, cupboardShelves, onAddNewCardClick, onCollapseClick])
	// }, [cupboardIsLoading, isFirstRender, cupboardShelves, onAddNewCardClick, onCollapseClick, moveShelf])

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
		<>
			<div
				className={cls.cupboardShelfList}
				id={idCupboardShelfList}
			>
				<CommonShelf data={cupboardData} isLoading={cupboardIsLoading} />
				<Reorder.Group
					// layoutScroll
					// layout
					// layoutRoot
					values={cupboardShelves}
					onReorder={reorderShelves}
				>
					{shelvesList}
				</Reorder.Group>
				{/* {cupboardIsLoading

					? <Reorder.Group values={cupboardIsLoading ? localDataService.getShelves() : cupboardShelves} onReorder={(values) => { }}> {shelvesList}</Reorder.Group>
					: (<Reorder.Group
						// layoutScroll
						// layout
						// layoutRoot
						// values={cupboardShelves}
						values={cupboardShelves}
						// values={cupboardIsLoading ? localDataService.getShelves() : cupboardShelves}
						// onDragEnd={() => {
						// 	console.log('DRAG END')
						// 	debouncedUpdateServer()
						// }}
						// onDragEnd={(event, info) => {
						// 	console.log(info.point.x, info.point.y)
						// 	console.log(event)
						// 	console.log(info)
						// }}
						onReorder={reorderShelves}
					>
						{shelvesList}
					</Reorder.Group>)
				} */}
				<ShelfBoxesTemplateModal />
				<MissedTrainingSettingsModal />
				<NotificationSettingsModal />
				<BoxTimeSetterModal />
				<BoxSettingsDropdownModal />
				<CupboardInfoModal />
				<HiddenTemplates />
			</div>
			<CreateNewCardModal />
		</>
	)
}



// const moveShelf = useCallback((dropAtIndex: number, shelfIndexDragged: number) => {
// 	// console.log('функция ', 'ставлю на: ', dropAtIndex, '  индекс: ', shelfIndexDragged)
// 	if (dropAtIndex === shelfIndexDragged) return
// 	const updates = []
// 	const currentShelf = { ...cupboardShelves.find(shelf => shelf.index === shelfIndexDragged) } as ShelfSchema
// 	updates.push({ id: currentShelf.id, changes: { index: dropAtIndex } })
// 	if (dropAtIndex > shelfIndexDragged) {
// 		cupboardShelves.forEach(shelf => {
// 			if (shelf.index <= dropAtIndex && shelf.index > shelfIndexDragged) {
// 				updates.push({ id: shelf.id, changes: { index: shelf.index - 1 } })
// 			}
// 		})
// 	} else {
// 		cupboardShelves.forEach(shelf => {
// 			if (shelf.index >= dropAtIndex && shelf.index < shelfIndexDragged) {
// 				updates.push({ id: shelf.id, changes: { index: shelf.index + 1 } })
// 			}
// 		})
// 	}
// 	dispatch(cupboardShelfListActions.updateIndexes(updates))
// }, [cupboardShelves, dispatch])