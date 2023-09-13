import cls from './CardListViewWidget.module.scss';
import {
	getViewPageIsMounted,
	getViewPageMoveCardsModalIsOpen,
	getViewPageMultiSelectIsActive,
	viewPageActions
} from '@/features/ViewPageInitializer'
import { useSelector } from 'react-redux';
import { CardSchemaExtended, useUpdateCardsMutation } from '@/entities/Card';
import { useCallback, useEffect, useMemo, } from 'react';
import { CardsListSkeleton } from './CardsListSkeleton';
import { getViewPageIsLoading } from '@/features/ViewPageInitializer';
import { CardListItem } from './CardListItem/CardListItem';
import { getViewPageCardsSorted } from '@/features/ViewPageInitializer'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { MultiSelectScreen } from './MultiSelectScreen/MultiSelectScreen';
import { useHotkeys } from 'react-hotkeys-hook';
import { CardEditModal } from './CardEditModal/CardEditModal';
import { MoveCardsModal } from './MoveCardsModal/MoveCardsModal';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';

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
	const isMultiSelectActive = useSelector(getViewPageMultiSelectIsActive)
	const isMoveCardsModalOpen = useSelector(getViewPageMoveCardsModalIsOpen)
	const [updateCardsMutation] = useUpdateCardsMutation()

	const onSelectCard = useCallback((cardId: string) => {
		dispatch(viewPageActions.addOrRemoveCardFromSelectedCardIds(cardId))
	}, [dispatch])
	// const onSelectCard = useCallback((cardId: string) => {
	// 	dispatch(viewPageActions.addOrRemoveCardFromSelectedCardId(cardId))
	// 	// if (!isMultiSelectActive) dispatch(viewPageActions.setMultiSelect(true))
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
	// }, [selectedCardIds, dispatch, isMultiSelectActive])

	const onOpenEditCardModal = useCallback((card: CardSchemaExtended) => {
		dispatch(viewPageActions.setCardDataOriginal(card))
		dispatch(viewPageActions.setCurrentCardId(card._id))
		dispatch(viewPageActions.setIsCardEditModalOpen(true))
		dispatch(viewPageActions.setCardDataEdited(card))
	}, [dispatch])

	const onSelectAllCards = () => {
		dispatch(viewPageActions.selectAllCards([...cards.map(card => card._id)]))
	}

	const onCancelMultiSelect = useCallback(() => {
		dispatch(viewPageActions.cancelMultiSelect())
	}, [dispatch])

	const onRemoveCards = useCallback(() => {
		dispatch(viewPageActions.removeSelectedCards())
		// updateCardsMutation({ cardIds: })
	}, [dispatch])


	const onMoveCardsClick = useCallback(() => {
		dispatch(viewPageActions.setMoveCardsModalIsOpen(true))
	}, [dispatch])

	useHotkeys('esc', onCancelMultiSelect, { enabled: isMultiSelectActive && !isMoveCardsModalOpen })
	useHotkeys('a', onSelectAllCards, { enabled: isMultiSelectActive })
	useHotkeys('r', onRemoveCards, { enabled: isMultiSelectActive })
	useHotkeys('m', onMoveCardsClick, { enabled: isMultiSelectActive })

	useEffect(() => {
		onCancelMultiSelect()
	}, [cards, onCancelMultiSelect])

	const content = useMemo(() => {
		if (!viewPageIsMounted || viewPageIsLoading) return
		return cards?.map(item => (
			<CardListItem
				// selectedCardIds={selectedCardIds}
				onSelectCard={onSelectCard}
				onOpenEditCardModal={onOpenEditCardModal}
				card={item}
				key={item._id}
			/>)
		)
	}, [cards, viewPageIsLoading, onSelectCard, onOpenEditCardModal, viewPageIsMounted])

	const contentRendered = (
		<AnimateSkeletonLoader
			isLoading={(!viewPageIsMounted || viewPageIsLoading)}
			skeletonComponent={<CardsListSkeleton />}
			componentAfterLoading={content}
			noDelay={cards.length > 0}
			// commonWrapper={false}
			classNameAbsoluteParts={cls.maxWidth}
		// classNameForCommonWrapper={cls.cardsWrapper}
		// borderTest
		/>
	)

	return (
		<>
			<div className={cls.cardsWrapper}>
				{contentRendered}
				{
					!(!viewPageIsMounted || viewPageIsLoading)
					&& !content?.length
					&& <p>Кажется, тут нет карточек</p>
				}

			</div>
			<MultiSelectScreen
				onCancelMultiSelect={onCancelMultiSelect}
				onSelectAllCards={onSelectAllCards}
				onMoveCardsClick={onMoveCardsClick}
				onRemoveCards={onRemoveCards}
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