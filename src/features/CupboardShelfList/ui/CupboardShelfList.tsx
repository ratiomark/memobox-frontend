import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CupboardShelfList.module.scss';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useCallback, useEffect, useMemo } from 'react';
import { fetchCupboardData } from '../model/services/fetchCupboardData';
import { useSelector } from 'react-redux';
import {
	getCupboardData,
	getCupboardIsLoading,
	getCupboardError,
	getCupboardShelves
} from '../model/selectors/getCupboardShelfList';
import { cupboardShelfListActions, getCupboardState } from '../model/slice/cupboardShelfListSlice';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ShelfItem } from './ShelfItem/ShelfItem';
import { ShelfButtons } from './ShelfButtons/ShelfButtons';
import { CompleteBigDataLabels } from '@/shared/ui/DataLabels/CompleteBigDataLabels/CompleteBigDataLabels';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { ShelfSkeleton } from '@/entities/Shelf';
import { getJsonSavedData } from '@/entities/User';
import { getUserShelfNamesList } from '@/entities/User';
import { CommonShelf } from './CommonShelf/CommonShelf';
import { BoxesBlock } from './BoxesBlock/BoxesBlock';
import { BoxesSettingsModal } from './BoxesSettingsModal/BoxesSettingsModal/BoxesSettingsModal';

interface CupboardShelfListProps {
	className?: string
}

// Этот компонент будет работать с полками. 
export const CupboardShelfList = (props: CupboardShelfListProps) => {
	const {
		className
	} = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const shelfNamesList = useSelector(getUserShelfNamesList)
	const cupboardData = useSelector(getCupboardData)
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const cupboardError = useSelector(getCupboardError)
	const cupboardShelves = useSelector(getCupboardState.selectAll)

	useEffect(() => {
		dispatch(fetchCupboardData())
	}, [dispatch])

	useEffect(() => {
		if (!cupboardIsLoading) {
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
		}
	}, [cupboardIsLoading])

	const onAddNewCardClick = useCallback((shelfId: string) => {
		dispatch(cupboardShelfListActions.setShelfIdCardModal(shelfId))
		dispatch(cupboardShelfListActions.setCardModalIsOpen(true))
	}, [dispatch])

	const onCollapseClick = useCallback((shelfId: string, collapsed: boolean) => {
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { collapsed } }))
	}, [dispatch])

	const shelvesList = useMemo(() => {
		if (cupboardIsLoading) return []
		return cupboardShelves.map(shelf => {
			// const onAddNewCard = () => onAddNewCardClick(shelf.id)
			// не создаю логику для списка коробок, если полка свернута
			const boxesBlock = <BoxesBlock shelf={shelf} />
			// const boxesBlock = shelf.collapsed ? null : <BoxesBlock shelf={shelf} />
			const buttons =
				<ShelfButtons
					shelf={shelf}
					onAddNewCardClick={onAddNewCardClick}
					onCollapseClick={onCollapseClick}
				/>
			// const buttons =
			// 	<ShelfButtons
			// 		shelfId={shelf.id}
			// 		shelfIndex={shelf.index}
			// 		onAddNewCardClick={onAddNewCard}
			// 		collapsed={shelf.collapsed}
			// 		onCollapseClick={onCollapseClick}
			// 		// onViewShelfClick={() => { }}
			// 		key={shelf.id}
			// 	/>
			const completeSmallDataLabels =
				<CompleteSmallDataLabels
					data={shelf.data}
					isLoading={cupboardIsLoading}
				/>
			return (
				<ShelfItem
					shelf={shelf}
					// collapsed={shelf.collapsed}
					boxesBlock={boxesBlock}
					// collapsed={shelf.collapsed}
					key={shelf.id}
					// id={shelf.id}
					// title={shelf.title}
					completeSmallDataLabelsBlock={
						completeSmallDataLabels
					}
					shelfButtonsBlock={buttons}
				// index={shelf.index}
				/>
			)
		})

	}, [cupboardIsLoading, cupboardShelves, onAddNewCardClick, onCollapseClick])

	if (cupboardIsLoading) {
		return <>
			<CommonShelf data={cupboardData} isLoading={cupboardIsLoading} />
			{shelfNamesList!.map(title => <ShelfSkeleton key={title} title={title} />)}
		</>
	}

	return (
		<div className={clsx(
			cls.cupboardShelfList,
			className)}
		>
			<CommonShelf data={cupboardData} isLoading={cupboardIsLoading} />
			{shelvesList}
			<BoxesSettingsModal/>
		</div>
	)
}