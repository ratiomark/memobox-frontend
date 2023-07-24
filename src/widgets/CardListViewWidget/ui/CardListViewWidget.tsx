import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardListViewWidget.module.scss';
import { getViewPage, getViewPageIsMounted, getViewPageMoveCardsModalIsOpen, getViewPageMultiSelectIsActive, getViewPageSavedShelf, getViewPageShelfId, viewPageActions } from '@/features/ViewPageInitializer'
import { useSelector } from 'react-redux';
import { Skeleton } from '@/shared/ui/Skeleton';
import { CardSchema, CardSchemaExtended } from '@/entities/Card';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CardsListSkeleton } from './CardsListSkeleton';
import { getViewPageCardsFiltered, getViewPageIsLoading } from '@/features/ViewPageInitializer';
import { CardListItem } from './CardListItem/CardListItem';
import { getViewPageCardsSorted } from '@/features/ViewPageInitializer'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { MultiSelectScreen } from './MultiSelectScreen/MultiSelectScreen';
import { AnimatePresence, motion } from 'framer-motion'
import { isHotkeyPressed, useHotkeys } from 'react-hotkeys-hook';
import { CardEditModal } from './CardEditModal/CardEditModal';
import { MoveCardsModal } from './MoveCardsModal/MoveCardsModal';

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
	const moveCardsModalIsOpen = useSelector(getViewPageMoveCardsModalIsOpen)
	// const cardListRef = useRef(null)
	// const { t } = useTranslation()

	const onSelectCard = useCallback((cardId: string) => {
		dispatch(viewPageActions.addOrRemoveCardFromSelectedCardId(cardId))
	}, [dispatch])
	// const onSelectCard = useCallback((cardId: string) => {
	// 	dispatch(viewPageActions.addOrRemoveCardFromSelectedCardId(cardId))
	// 	// if (!multiSelectIsActive) dispatch(viewPageActions.setMultiSelect(true))
	// 	// else if (selectedCardIds.length === 0) {
	// 	// 	dispatch(viewPageActions.setMultiSelect(false))
	// 	// }
	// 	if (selectedCardIds.includes(cardId)) {
	// 		const idsFiltered = selectedCardIds.filter(id => id !== cardId)
	// 		setSelectedCardIds(idsFiltered)
	// 		return
	// 	}
	// 	setSelectedCardIds(prev => [...prev, cardId])
	// 	// if (selectedCardIds.length === 0) {
	// 	// 	dispatch(viewPageActions.setMultiSelect(false))
	// 	// }
	// }, [selectedCardIds, dispatch, multiSelectIsActive])

	const onOpenEditCardModal = useCallback((card: CardSchemaExtended) => {
		dispatch(viewPageActions.setCurrentCardData(card))
		dispatch(viewPageActions.setCurrentCardId(card._id))
		dispatch(viewPageActions.setCardEditModalIsOpen(true))
		dispatch(viewPageActions.setEditCardData(card))
	}, [dispatch])

	const onSelectAllCards = () => {
		dispatch(viewPageActions.selectAllCards([...cards.map(card => card._id)]))
	}

	const onCancelMultiSelect = useCallback(() => {
		dispatch(viewPageActions.cancelMultiSelect())
	}, [dispatch])

	const onRemoveCards = useCallback(() => {
		dispatch(viewPageActions.removeSelectedCards())
	}, [dispatch])


	const onMoveCardsClick = useCallback(() => {
		dispatch(viewPageActions.setMoveCardsModalIsOpen(true))
	}, [dispatch])

	useHotkeys('esc', onCancelMultiSelect, { enabled: multiSelectIsActive && !moveCardsModalIsOpen })
	useHotkeys('a', onSelectAllCards, { enabled: multiSelectIsActive })
	useHotkeys('r', onRemoveCards, { enabled: multiSelectIsActive })
	useHotkeys('m', onMoveCardsClick, { enabled: multiSelectIsActive })

	useEffect(() => {
		//отменю мульти селект, если изменяются карточки, а они меняются когда меняется полка\коробка
		onCancelMultiSelect()
	}, [cards, onCancelMultiSelect])





	const content = useMemo(() => {
		if (viewPageIsLoading) return []
		return cards?.map(item => (
			<CardListItem
				// selectedCardIds={selectedCardIds}
				onSelectCard={onSelectCard}
				onOpenEditCardModal={onOpenEditCardModal}
				card={item}
				key={item._id}
			/>)
		)
	}, [cards, viewPageIsLoading, onSelectCard, onOpenEditCardModal])


	// if (!viewPageIsMounted || viewPageIsLoading || !content) {
	// 	return <CardsListSkeleton />
	// }

	const contentLoading = (
		<AnimatePresence>
			{(!viewPageIsMounted || viewPageIsLoading || !content) &&
				<motion.div
					exit={{
						opacity: 0,
						// backgroundColor: '#fbfbfb',
						transition: {
							opacity: {
								duration: 0.3
								// duration: 0.3
							}
						}
					}}
					// exit={{ opacity: 0, transition: { opacity: { duration: 0.3} } }}
					style={{ position: 'absolute', inset: 0 }}
				>
					<CardsListSkeleton />

				</motion.div>
			}
		</AnimatePresence >
	)

	const contentReady = (
		<AnimatePresence >
			{content.length &&
				<motion.ul
					// ref={cardListRef}
					// ref={ref}
					// tabIndex={1}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					// viewport={{ once: true }}
					transition={{ duration: 0.4, delay: 0.3 }}
					// transition={{ type: 'spring', duration: 2, delay: 0.33 }}
					className={clsx(
						cls.cardListViewWidget,
						className)}
				>
					{content}
					{/* <MultiSelectScreen
						onCancelMultiSelect={onCancelMultiSelect}
						onSelectAllCards={onSelectAllCards}
					/>
					<CardEditModal /> */}
				</motion.ul>
			}
		</AnimatePresence>
	)

	return (
		<>
			<div style={{ position: 'relative' }}>
				{contentLoading}
				{contentReady}

			</div>
			<MultiSelectScreen
				onCancelMultiSelect={onCancelMultiSelect}
				onSelectAllCards={onSelectAllCards}
				onMoveCardsClick={onMoveCardsClick}
			/>
			<CardEditModal />
			<MoveCardsModal />
		</>
	)
}
{/* <motion.ul
	// ref={cardListRef}
	// ref={ref}
	// tabIndex={1}
	initial={{ x: -120, opacity: 0 }}
	animate={{ x: 0, opacity: 1 }}
	// viewport={{ once: true }}
	transition={{ type: 'spring', duration: 0.5 }}
	className={clsx(
		cls.cardListViewWidget,
		className)}
>
	{content}
	<MultiSelectScreen
		onCancelMultiSelect={onCancelMultiSelect}
		onSelectAllCards={onSelectAllCards}
	/>
	<CardEditModal />
</motion.ul> */}
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