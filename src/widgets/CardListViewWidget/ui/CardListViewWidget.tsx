import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardListViewWidget.module.scss';
import { getViewPage, getViewPageIsMounted, getViewPageSavedShelf, getViewPageShelfId } from '@/features/ViewPageInitializer'
import { useSelector } from 'react-redux';
import { Skeleton } from '@/shared/ui/Skeleton';
import { CardSchema } from '@/entities/Card';
import { useMemo } from 'react';
import { CardsListSkeleton } from './CardsListSkeleton';
import { getViewPageCardsFiltered, getViewPageIsLoading } from '@/features/ViewPageInitializer';

interface CardListViewWidgetProps {
	className?: string
}

export const CardListViewWidget = (props: CardListViewWidgetProps) => {
	const {
		className
	} = props
	const viewPageIsMounted = useSelector(getViewPageIsMounted)
	const viewPageIsLoading = useSelector(getViewPageIsLoading)
	const cards = useSelector(getViewPageCardsFiltered)
	// const boxId = useSelector(getViewPageSavedShelf(shelfId ?? '1'))?.lastBoxId
	const { t } = useTranslation()

	const content = useMemo(() => {
		if (viewPageIsLoading) return []
		return cards?.map(item => <p key={item._id}>{'Полка  ' + item.shelf + '  Коробка   ' + item.box}</p>)
		// const data = shelfDataSaved!.data
		// if (boxId === 'all') {
		// 	const allCards: CardSchema[] = []
		// 	for (const key in data) {
		// 		allCards.push(...data[key])
		// 	}
		// 	return allCards.map(item => <p key={item._id}>{'Полка  ' + item.shelf + '  Коробка   ' + item.box}</p>)
		// } else if (boxId === 'new') {
		// 	return <p>Нет новых карточек</p>
		// } else if (boxId === 'learnt') {
		// 	return <p>Нет изученных карточек</p>
		// } else {
		// 	return data[boxId!].map(item => <p key={item._id}>{'Полка  ' + item.shelf + '  Коробка   ' + item.box}</p>)
		// }
	}, [cards, viewPageIsLoading])


	if (!viewPageIsMounted || viewPageIsLoading || !content) {
		return <CardsListSkeleton />
	}


	return (
		<div className={clsx(
			cls.cardListViewWidget,
			className)}
		>
			{/* <p>Полка {shelfId}</p> */}
			{/* <p>Коробка {boxId}</p> */}
			{content}
		</div>
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