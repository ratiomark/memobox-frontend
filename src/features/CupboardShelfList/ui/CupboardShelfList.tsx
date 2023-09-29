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
import { idCupboardShelfList } from '@/shared/const/idsAndDataAttributes';
import { CupboardInfoModal } from './Modals/CupboardInfoModal/CupboardInfoModal';
import { Reorder } from 'framer-motion';
import { ShelfBoxesTemplateModal } from './BoxesSettingsModal/ShelfTemplateSettings';
import { useShelvesDndHandler } from '../model/hooks/useShelvesDndHandler';
import { useShelvesLocalSaver } from '../model/hooks/useShelvesLocalSaver';
import useCupboardButtonsSizes from '../model/hooks/useCupboardButtonsSizes';
import { setLocalShelvesToStore } from '../model/services/setLocalShelvesToStore';

export const CupboardShelfList = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const cupboardData = useSelector(getCupboardData)
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const cupboardError = useSelector(getCupboardError)
	const cupboardShelves = useSelector(getCupboardState.selectAll)
	const isFirstRender = useSelector(getCupboardIsFirstRender)
	useShelvesDndHandler()
	useShelvesLocalSaver({ cupboardShelves })
	useCupboardButtonsSizes(cupboardIsLoading)

	useEffect(() => {
		dispatch(setLocalShelvesToStore())
	}, [dispatch])

	const onAddNewCardClick = useCallback((shelfId: string) => {
		dispatch(cupboardShelfListActions.setShelfIdCardModal(shelfId))
		dispatch(cupboardShelfListActions.setIsCreateNewCardModalOpen(true))
	}, [dispatch])

	const onCollapseClick = useCallback((shelfId: string, isCollapsed: boolean) => {
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isCollapsed } }))
	}, [dispatch])

	const reorderShelves = useCallback((shelves: ShelfSchema[]) => {
		// console.log('reorder ', shelves)
		dispatch(cupboardShelfListActions.reorderShelves(shelves))
		// VAR: нужно показать плашку "новый порядок полок будет сохранен через 5 секунд". По прошествии 5-ти секунд отправить запрос на сервер
	}, [dispatch])


	const shelvesList = useMemo(() => {

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
					// принимает массив с элементами в текущем порядке
					onReorder={reorderShelves}
				>
					{shelvesList}
				</Reorder.Group>
				<ShelfBoxesTemplateModal />
				<MissedTrainingSettingsModal />
				<NotificationSettingsModal />
				<BoxSettingsDropdownModal />
				<CupboardInfoModal />
				{/* Важно HiddenTemplates должен стоять выше BoxTimeSetterModal там происходят определенные вычисления*/}
				<HiddenTemplates />
				<BoxTimeSetterModal />
			</div>
			<CreateNewCardModal />
			{/* <ShelvesDeletionToasts/> */}
			{/* <ToastShelfDeletion /> */}
		</>
	)
}