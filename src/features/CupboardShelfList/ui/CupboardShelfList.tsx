import { useTranslation } from 'react-i18next';
import cls from './CupboardShelfList.module.scss';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
	getCupboardData,
	getIsCupboardLoading,
	getCupboardError,
	getCupboardShelves,
	getCupboardCommonShelfCollapsed,
	getIsCupboardDataAlreadyInStore,
	getIsCupboardFirstRender,
	getIsCupboardRefetching,
	// getShelvesFromStorOrLocalSaver,
} from '../model/selectors/getCupboardShelfList';
import { cupboardShelfListActions, getCupboardState } from '../model/slice/cupboardShelfListSlice';
import { ShelfItem } from './ShelfItem/ShelfItem';
import { ShelfButtons } from './ShelfButtons/ShelfButtons';
import { ShelfSchema } from '@/entities/Shelf';
import { CommonShelf } from './CommonShelf/CommonShelf';
import { BoxesBlockWrapper } from './BoxesBlock/BoxesBlockWrapper';
import { MissedTrainingSettingsModal } from './Modals/MissedTrainingSettingsModal/MissedTrainingSettings';
import { NotificationSettingsModal } from './Modals/NotificationSettingsModal/NotificationSettingsModal';
import { BoxTimeSetterModal } from './Modals/BoxTimeSetterModal/BoxTimeSetterModal';
import { CreateNewCardModal } from './Modals/CreateNewCardModal/CreateNewCardModalLazy';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { ShelfButtonsSkeleton } from './ShelfButtons/ShelfButtonsSkeleton';
import { BoxSettingsDropdownModal } from './Modals/BoxSettingsDropdownModal/BoxSettingsDropdownModal';
import { HiddenTemplates } from './HiddenTemplates/HiddenTemplates';
import { idCupboardShelfList } from '@/shared/const/idsAndDataAttributes';
import { CupboardInfoModal } from './Modals/CupboardInfoModal/CupboardInfoModal';
import { Reorder } from 'framer-motion';
import { ShelfBoxesTemplateModal } from './BoxesSettingsModal/ShelfTemplateSettingsLazy';
import useShelvesDndHandler from '../model/hooks/useShelvesDndHandler';
import useShelvesLocalSaver from '../model/hooks/useShelvesLocalSaver';
import useCupboardButtonsSizes from '../model/hooks/useCupboardButtonsSizes';
import { setLocalShelvesToStore } from '../model/services/setLocalShelvesToStore';
import { RenameShelfModal } from './Modals/RenameShelfModal/RenameShelfModal';
import { TAG_CUPBOARD_PAGE } from '@/shared/api/const/tags';
import { rtkApi } from '@/shared/api/rtkApi';

export const CupboardShelfList = () => {
	const dispatch = useAppDispatch()
	const cupboardError = useSelector(getCupboardError)
	useCupboardButtonsSizes()

	// useEffect(() => {
	// 	return () => {
	// 		dispatch(rtkApi.util.invalidateTags([TAG_CUPBOARD_PAGE]))
	// 	}
	// }, [dispatch])


	return (
		<>
			<div
				className={cls.cupboardShelfList}
				id={idCupboardShelfList}
			>
				<CommonShelf />
				<ShelvesRendered />
				<div style={{ width: '100%', height: 20, background: 'transparent' }}></div>
				{/* <CommonShelf data={cupboardData} isLoading={cupboardIsLoading && isFirstRender} /> */}
				{/* <Reorder.Group
					// layoutScroll
					// layout
					// layoutRoot
					values={cupboardShelves}
					// принимает массив с элементами в текущем порядке
					onReorder={reorderShelves}
				>
					{shelvesList}
				</Reorder.Group> */}
				<ShelfBoxesTemplateModal />
				<MissedTrainingSettingsModal />
				<NotificationSettingsModal />
				<BoxSettingsDropdownModal />
				<CupboardInfoModal />
				{/* Важно HiddenTemplates должен стоять выше BoxTimeSetterModal там происходят определенные вычисления*/}
				<HiddenTemplates />
				<BoxTimeSetterModal />
			</div>
			<RenameShelfModal />
			<CreateNewCardModal />
			{/* <ShelvesDeletionToasts/> */}
			{/* <ToastShelfDeletion /> */}
		</>
	)
}


export const ShelvesRendered = () => {
	const dispatch = useAppDispatch()
	const cupboardIsLoading = useSelector(getIsCupboardLoading)
	const cupboardShelves = useSelector(getCupboardState.selectAll)
	const isFirstRender = useSelector(getIsCupboardFirstRender)
	useShelvesDndHandler()
	useShelvesLocalSaver()

	useEffect(() => {
		dispatch(setLocalShelvesToStore())
	}, [dispatch])

	useEffect(() => {
		return () => {
			dispatch(rtkApi.util.invalidateTags([TAG_CUPBOARD_PAGE]))
		}
	}, [dispatch])

	const onAddNewCardClick = useCallback((shelfId: string) => {
		dispatch(cupboardShelfListActions.setShelfIdCardModal(shelfId))
		dispatch(cupboardShelfListActions.setIsCreateNewCardModalOpen(true))
	}, [dispatch])

	const onCollapseClick = useCallback((shelfId: string, isCollapsed: boolean) => {
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isCollapsed } }))
	}, [dispatch])

	const reorderShelves = useCallback((shelves: ShelfSchema[]) => {
		dispatch(cupboardShelfListActions.reorderShelves(shelves))
	}, [dispatch])


	const shelvesList = useMemo(() => {
		return cupboardShelves.map(shelf => {
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
					isLoading={cupboardIsLoading && isFirstRender}
				/>
			)

			const boxesBlock = <BoxesBlockWrapper
				isLoading={cupboardIsLoading && isFirstRender}
				shelf={shelf}
			/>

			return (
				<ShelfItem
					key={shelf.id}
					shelf={shelf}
					boxesBlock={boxesBlock}
					shelfButtonsBlock={buttons}
					isFirstRender={isFirstRender}
					isRefetchingSelectorFn={getIsCupboardRefetching}
				/>
			)
		})

	}, [cupboardIsLoading, isFirstRender, cupboardShelves, onAddNewCardClick, onCollapseClick])

	return (
		<Reorder.Group
			values={cupboardShelves}
			onReorder={reorderShelves}
		>
			{shelvesList}
		</Reorder.Group>
	)
}