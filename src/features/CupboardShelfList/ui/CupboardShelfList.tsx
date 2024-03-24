import cls from './CupboardShelfList.module.scss';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
	getIsCupboardLoading,
	getIsCupboardFirstRender,
	getIsCupboardRefetching,
} from '../model/selectors/getCupboardShelfList';
import { getCupboardState } from '../model/selectors/getCupboardCommon';
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
import { cupboardShelfListActions } from '../model/slice/cupboardShelfListSlice';
import { UiColorCustomizer, UiComponentEnabler, UiVariableCustomizer } from '@/shared/ui/UiVariableCustomizer';
import { MyShelvesDelimiter } from './MyShelvesDelimiter/MyShelvesDelimiter';
import { getUserSavedDataIsDelimiterEnabled, userActions } from '@/entities/User';
import { getUserSavedDataCupboard } from '@/entities/User/model/selectors/getJsonSavedData';


const DelimiterController = () => {
	const dispatch = useAppDispatch()
	const cupboard = useSelector(getUserSavedDataCupboard)
	const isDelimiterEnabled = useSelector(getUserSavedDataIsDelimiterEnabled)
	const onToggle = () => {
		dispatch(userActions.updateJsonSavedData({ cupboard: { ...cupboard, isDelimiterEnabled: !isDelimiterEnabled } }))
	}
	return <UiComponentEnabler entityName='delimiter' isEnabled={isDelimiterEnabled} onToggleClick={onToggle} />
}


export const CupboardShelfList = () => {
	// const dispatch = useAppDispatch()
	// const cupboardError = useSelector(getCupboardError)
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
				<MyShelvesDelimiter />
				<ShelvesRendered />
				<div
					style={{
						width: '40%',
						background: 'transparent',
						display: 'flex',
						flexDirection: 'column',
						// alignItems: 'center',
						// justifyContent: 'center',
						gap: 16
					}}
				>
					<DelimiterController />
					{/* <UiVariableCustomizer
						entityName='Button border radius'
						cssProperty='--border-radius-button-main'
						useMaxValue
					/>
					<UiVariableCustomizer
						entityName='Shelf border radius'
						cssProperty='--border-radius-shelf'
						useMaxValue
					/> */}
					{/* <UiColorCustomizer
						entityName='Button color'
						cssProperty='--accent'
					/> */}
					<UiVariableCustomizer
						entityName='Shelf padding left'
						cssProperty='--padding-shelf-right'
						valueListLength={12}
						sliderMaxValue={64}
					/>
					<UiVariableCustomizer
						entityName='Collapse left padding'
						cssProperty='--padding-additional-from-collapse'
						valueListLength={12}
						sliderMaxValue={64}
					/>
					<UiVariableCustomizer
						entityName='Train button left padding'
						cssProperty='--padding-additional-from-train-button'
						valueListLength={12}
						sliderMaxValue={64}
					/>
				</div>
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
		const timer = setTimeout(() => {
			dispatch(rtkApi.util.invalidateTags([TAG_CUPBOARD_PAGE]));
		}, 200); // Задержка выполнения на 500 мс

		// Возвращаем функцию очистки, которая будет вызвана при размонтировании компонента
		return () => clearTimeout(timer);
	}, [dispatch])
	// useEffect(() => {
	// 	return () => {
	// 		dispatch(rtkApi.util.invalidateTags([TAG_CUPBOARD_PAGE]))
	// 	}
	// }, [dispatch])

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

	const onNoCardTrainingHotKeyPress = useCallback(() => {
		dispatch(cupboardShelfListActions.setSkipTrainingHotKey(true))
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
						onNoCardTrainingHotKeyPress={onNoCardTrainingHotKeyPress}
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

	}, [cupboardIsLoading, isFirstRender, cupboardShelves, onAddNewCardClick, onCollapseClick, onNoCardTrainingHotKeyPress])

	return (
		<Reorder.Group
			values={cupboardShelves}
			onReorder={reorderShelves}
		>
			{shelvesList}
		</Reorder.Group>
	)
}