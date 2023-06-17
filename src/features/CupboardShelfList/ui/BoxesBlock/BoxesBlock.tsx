import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxesBlock.module.scss';
import { ShelfSchema } from '@/entities/Shelf';
import { useCallback, useMemo } from 'react';
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { obtainRouteView } from '@/app/providers/router/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { Box } from '@/entities/Box';

interface BoxesBlockProps {
	className?: string
	shelf: ShelfSchema
}

export const BoxesBlock = (props: BoxesBlockProps) => {
	const {
		className,
		shelf,
	} = props
	// если идет загрузка, то нужно вернуть скелетон на уровне полки, то есть если полка !collapsed, то отрисовать скелетоны коробок
	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const onViewClick = useCallback((shelfId: string, boxIndex: number) => {
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
			// const onAddNewCard = () => onAddNewCardClick(shelf.id, boxItem.index)
			// const onBoxViewClick = () => onViewClick(boxItem.index)
			return (
				<Box
					boxItem={boxItem}
					// timing={boxItem.timing}
					shelfId={shelf.id}
					onAddNewCard={onAddNewCardClick}
					onBoxViewClick={onViewClick}
					// onTimerClick={() => {}}
					// data={boxItem.data}
					// index={boxItem.index}
					// specialType={boxItem.specialType}
					key={boxItem._id}
				/>
			)
		})
	}, [shelf.boxesData, onAddNewCardClick, onViewClick, shelf.id])

	return (
		<div className={clsx(
			cls.BoxesBlock,
			className)}
		>
			{boxList}
			{/* {boxesData} */}
		</div>
	)
}