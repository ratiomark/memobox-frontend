import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ShelfSchema } from '@/entities/Shelf';
import { useCallback, useMemo } from 'react';
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { Box, BoxCoordinates } from '@/entities/Box';
import cls from './BoxesBlock.module.scss';
import { TimingBlock } from '@/shared/types/DataBlock';

interface BoxesBlockProps {
	className?: string
	shelf: ShelfSchema
}

export const BoxesBlock = (props: BoxesBlockProps) => {
	const {
		className,
		shelf,
	} = props

	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const onViewClick = useCallback((shelfId: string, boxIndex: number | string) => {
		navigate(obtainRouteView(shelfId, boxIndex.toString()))
	}, [navigate])

	const onAddNewCardClick = useCallback((shelfId: string, boxIndex: number) => {
		dispatch(cupboardShelfListActions.setShelfIdCardModal(shelfId))
		dispatch(cupboardShelfListActions.setBoxIndexCardModal(boxIndex))
		dispatch(cupboardShelfListActions.setCardModalIsOpen(true))
	}, [dispatch])

	const onOpenTimeSetter = useCallback((coordinates: BoxCoordinates, timingData: TimingBlock, boxId: string) => {
		dispatch(cupboardShelfListActions.setTimingSetterBoxCoordinates(coordinates))
		dispatch(cupboardShelfListActions.setTimingSetterModalIsOpen(true))
		dispatch(cupboardShelfListActions.setTimingSetterModalBoxId(boxId))
		dispatch(cupboardShelfListActions.setTimingSetterBoxTimingData(timingData))
	}, [dispatch])

	const { t } = useTranslation()

	const boxList = useMemo(() => {
		const boxesData = [...shelf.boxesData].sort((a, b) => a.index - b.index)
		return boxesData.map(boxItem => {
			return (
				<Box
					onOpenTimeSetter={onOpenTimeSetter}
					boxItem={boxItem}
					shelfId={shelf.id}
					onAddNewCard={onAddNewCardClick}
					onBoxViewClick={onViewClick}
					key={boxItem._id}
				/>
			)
		})
	}, [shelf.boxesData, onOpenTimeSetter, onAddNewCardClick, onViewClick, shelf.id])

	return (
		<ul className={clsx(
			cls.BoxesBlock,
			// 'target',
			className)}
		>
			{boxList}
		</ul>
	)
}