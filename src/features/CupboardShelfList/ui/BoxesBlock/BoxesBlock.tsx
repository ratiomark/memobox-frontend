import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ShelfSchema } from '@/entities/Shelf';
import { useCallback, useMemo } from 'react';
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { Box } from '@/entities/Box';
import cls from './BoxesBlock.module.scss';

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


	const { t } = useTranslation()

	const boxList = useMemo(() => {
		const boxesData = [...shelf.boxesData].sort((a, b) => a.index - b.index)
		return boxesData.map(boxItem => {
			return (
				<Box
					boxItem={boxItem}
					shelfId={shelf.id}
					onAddNewCard={onAddNewCardClick}
					onBoxViewClick={onViewClick}
					key={boxItem._id}
				/>
			)
		})
	}, [shelf.boxesData, onAddNewCardClick, onViewClick, shelf.id])

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