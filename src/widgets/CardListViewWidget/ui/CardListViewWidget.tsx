import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardListViewWidget.module.scss';
import { getViewPage, getViewPageIsMounted, getViewPageSavedShelf, getViewPageShelfId, viewPageActions } from '@/features/ViewPageInitializer'
import { useSelector } from 'react-redux';
import { Skeleton } from '@/shared/ui/Skeleton';
import { CardSchema } from '@/entities/Card';
import { useCallback, useMemo, useState } from 'react';
import { CardsListSkeleton } from './CardsListSkeleton';
import { getViewPageCardsFiltered, getViewPageIsLoading } from '@/features/ViewPageInitializer';
import { CardListItem } from './CardListItem/CardListItem';
import { getViewPageCardsSorted } from '@/features/ViewPageInitializer'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { MultiSelectScreen } from './MultiSelectScreen/MultiSelectScreen';

interface CardListViewWidgetProps {
	className?: string
}

export const CardListViewWidget = (props: CardListViewWidgetProps) => {
	const {
		className
	} = props
	const viewPageIsMounted = useSelector(getViewPageIsMounted)
	const viewPageIsLoading = useSelector(getViewPageIsLoading)
	const dispatch = useAppDispatch()
	const cards = useSelector(getViewPageCardsSorted)
	const { t } = useTranslation()
	// const [cardsSelected, setSelectedCardIds] = useState <{[key: string]: true}>({})
	// const [cardsSelected, setCardsSelected] = useState<CardSchema[]>([])
	const [selectedCardIds, setSelectedCardIds] = useState<string[]>([])

	const onSelectCard = useCallback((cardId: string) => {
		dispatch(viewPageActions.setMultiSelect(true))
		if (selectedCardIds.includes(cardId)) {
			const idsFiltered = selectedCardIds.filter(id => id !== cardId)
			setSelectedCardIds(idsFiltered)
			return
		}
		setSelectedCardIds(prev => [...prev, cardId])
	}, [selectedCardIds, dispatch])

	const onSelectAllCards = () => {
		dispatch(viewPageActions.setMultiSelect(true))
		setSelectedCardIds([...cards.map(card => card._id)])
	}

	// console.log(selectedCardIds)

	const content = useMemo(() => {
		if (viewPageIsLoading) return []
		return cards?.map(item => (
			<CardListItem
				selectedCardIds={selectedCardIds}
				onSelectCard={onSelectCard}
				card={item}
				key={item._id}
			/>)
		)
	}, [cards, viewPageIsLoading, onSelectCard, selectedCardIds])


	if (!viewPageIsMounted || viewPageIsLoading || !content) {
		return <CardsListSkeleton />
	}


	return (
		<ul className={clsx(
			cls.cardListViewWidget,
			className)}
		>
			{content}
			<MultiSelectScreen onSelectAllCards={onSelectAllCards} />
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