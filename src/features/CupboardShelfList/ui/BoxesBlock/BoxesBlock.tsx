import { ShelfSchema } from '@/entities/Shelf';
import { useCallback, useMemo, useRef } from 'react';
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { BoxCoordinates } from '@/entities/Box';
import { TimingBlock } from '@/shared/types/DataBlock';
import { getIsCupboardRefetching } from '../../model/selectors/getCupboardShelfList';
import { BoxItem } from '../BoxItem/BoxItem';
import cls from './BoxesBlock.module.scss';

export const BoxesBlock = ({ shelf }: { shelf: ShelfSchema }) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const boxesBlockRef = useRef<HTMLUListElement>(null)

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
		dispatch(cupboardShelfListActions.setBoxSettingsModalShelfId(shelfId))
		dispatch(cupboardShelfListActions.setMissedTrainingShelfId(shelfId))
		dispatch(cupboardShelfListActions.setMissedTrainingBoxId(boxId))
	}, [dispatch])

	const boxList = useMemo(() => {
		const boxesData = [...shelf.boxesData].sort((a, b) => a.index - b.index)
		return boxesData.map(boxItem => {
			return (
				<BoxItem
					key={boxItem.id}
					boxItem={boxItem}
					shelfId={shelf.id}
					onOpenTimeSetter={onOpenTimeSetter}
					onOpenBoxSettings={onOpenBoxSettings}
					onAddNewCard={onAddNewCardClick}
					onBoxViewClick={onViewClick}
					isRefetchingSelectorFn={getIsCupboardRefetching}
				/>
			)
		})
	}, [shelf.boxesData, onOpenTimeSetter, onOpenBoxSettings, onAddNewCardClick, onViewClick, shelf.id])

	return (
		<ul
			className={cls.BoxesBlock}
			ref={boxesBlockRef}
		>
			{boxList}
		</ul>
	)
}
