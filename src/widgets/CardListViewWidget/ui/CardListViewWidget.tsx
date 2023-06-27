import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardListViewWidget.module.scss';
import { getViewPage, getViewPageIsMounted, getViewPageMultiSelectIsActive, getViewPageSavedShelf, getViewPageShelfId, viewPageActions } from '@/features/ViewPageInitializer'
import { useSelector } from 'react-redux';
import { Skeleton } from '@/shared/ui/Skeleton';
import { CardSchema } from '@/entities/Card';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CardsListSkeleton } from './CardsListSkeleton';
import { getViewPageCardsFiltered, getViewPageIsLoading } from '@/features/ViewPageInitializer';
import { CardListItem } from './CardListItem/CardListItem';
import { getViewPageCardsSorted } from '@/features/ViewPageInitializer'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { MultiSelectScreen } from './MultiSelectScreen/MultiSelectScreen';
import { CardEditModal } from './CardEditModal';

interface CardListViewWidgetProps {
	className?: string
}

export const CardListViewWidget = (props: CardListViewWidgetProps) => {
	const {
		className
	} = props
	const viewPageIsMounted = useSelector(getViewPageIsMounted)
	const viewPageIsLoading = useSelector(getViewPageIsLoading)
	const multiSelectIsActive = useSelector(getViewPageMultiSelectIsActive)
	const dispatch = useAppDispatch()
	const cards = useSelector(getViewPageCardsSorted)
	const { t } = useTranslation()

	const [selectedCardIds, setSelectedCardIds] = useState<string[]>([])

	const onSelectCard = useCallback((cardId: string) => {
		if (!multiSelectIsActive) dispatch(viewPageActions.setMultiSelect(true))
		// else if (selectedCardIds.length === 0) {
		// 	dispatch(viewPageActions.setMultiSelect(false))
		// }
		if (selectedCardIds.includes(cardId)) {
			const idsFiltered = selectedCardIds.filter(id => id !== cardId)
			setSelectedCardIds(idsFiltered)
			return
		}
		setSelectedCardIds(prev => [...prev, cardId])
		// if (selectedCardIds.length === 0) {
		// 	dispatch(viewPageActions.setMultiSelect(false))
		// }
	}, [selectedCardIds, dispatch, multiSelectIsActive])

	const onOpenEditCardModal = useCallback((card: CardSchema) => {
		dispatch(viewPageActions.setCurrentCardData(card))
		dispatch(viewPageActions.setCurrentCardId(card._id))
		dispatch(viewPageActions.setCardEditModalIsOpen(true))
		dispatch(viewPageActions.setEditCardData(card))
	}, [dispatch])
	// setCardEditModalIsOpen
	// setCurrentCardData
	// setCurrentCardId
	// setCardQuestion
	// setCardAnswer
	// setCardShelfId
	// setCardBoxId

	const onSelectAllCards = () => {
		dispatch(viewPageActions.setMultiSelect(true))
		setSelectedCardIds([...cards.map(card => card._id)])
	}

	const onCancelMultiSelect = useCallback(() => {
		dispatch(viewPageActions.setMultiSelect(false))
		setSelectedCardIds([])
	}, [setSelectedCardIds, dispatch])

	useEffect(() => {
		//отменю мульти селект, если изменяются карточки, а они меняются когда меняется полка\коробка
		onCancelMultiSelect()
	}, [cards, onCancelMultiSelect])

	// console.log(selectedCardIds)

	const content = useMemo(() => {
		if (viewPageIsLoading) return []
		return cards?.map(item => (
			<CardListItem
				selectedCardIds={selectedCardIds}
				onSelectCard={onSelectCard}
				onOpenEditCardModal={onOpenEditCardModal}
				card={item}
				key={item._id}
			/>)
		)
	}, [cards, viewPageIsLoading, onSelectCard, selectedCardIds, onOpenEditCardModal])


	if (!viewPageIsMounted || viewPageIsLoading || !content) {
		return <CardsListSkeleton />
	}


	return (
		<ul className={clsx(
			cls.cardListViewWidget,
			className)}
		>
			{content}
			<MultiSelectScreen
				onCancelMultiSelect={onCancelMultiSelect}
				onSelectAllCards={onSelectAllCards}
			/>
			<CardEditModal />
		</ul>
	)
}
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './CardListViewWidget.module.scss';
// import { getViewPage, getViewPageIsMounted, getViewPageSavedShelf, getViewPageShelfId } from '@/features/ViewPageInitializer'
// import { useSelector } from 'react-redux';
// import { Skeleton } from '@/shared/ui/Skeleton';
// import { CardSchema } from '@/entities/Card';
// import { useMemo } from 'react';
// import { CardsListSkeleton } from './CardsListSkeleton';

// interface CardListViewWidgetProps {
// 	className?: string
// }

// export const CardListViewWidget = (props: CardListViewWidgetProps) => {
// 	const {
// 		className
// 	} = props
// 	const shelfId = useSelector(getViewPageShelfId) ?? '1'
// 	const viewPageIsMounted = useSelector(getViewPageIsMounted)
// 	const shelfDataSaved = useSelector(getViewPageSavedShelf(shelfId ?? '1'))
// 	const boxId = useSelector(getViewPageSavedShelf(shelfId ?? '1'))?.lastBoxId
// 	const { t } = useTranslation()

// 	const content = useMemo(() => {
// 		const isLoading = shelfDataSaved?.isLoading ?? true
// 		if (isLoading) return
// 		const data = shelfDataSaved!.data
// 		if (boxId === 'all') {
// 			const allCards: CardSchema[] = []
// 			for (const key in data) {
// 				allCards.push(...data[key])
// 			}
// 			return allCards.map(item => <p key={item._id}>{'Полка  ' + item.shelf + '  Коробка   ' + item.box}</p>)
// 		} else if (boxId === 'new') {
// 			return <p>Нет новых карточек</p>
// 		} else if (boxId === 'learnt') {
// 			return <p>Нет изученных карточек</p>
// 		} else {
// 			return data[boxId!].map(item => <p key={item._id}>{'Полка  ' + item.shelf + '  Коробка   ' + item.box}</p>)
// 		}
// 	}, [boxId, shelfDataSaved])


// 	if (!viewPageIsMounted || !content) {
// 		return <CardsListSkeleton />
// 	}


// 	return (
// 		<div className={clsx(
// 			cls.cardListViewWidget,
// 			className)}
// 		>
// 			<p>Полка {shelfId}</p>
// 			<p>Коробка {boxId}</p>
// 			{content}
// 		</div>
// 	)
// }