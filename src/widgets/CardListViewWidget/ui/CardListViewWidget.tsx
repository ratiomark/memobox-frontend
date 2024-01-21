import cls from './CardListViewWidget.module.scss';
import {
	getViewPageIsMounted,
	getViewPageMoveCardsModalIsOpen,
	getViewPageMultiSelectIsActive,
	viewPageActions
} from '@/features/ViewPageInitializer'
import { useSelector } from 'react-redux';
import { CardSchemaExtended, } from '@/entities/Card';
import { Suspense, useCallback, useMemo, } from 'react';
import { getViewPageIsLoading } from '@/features/ViewPageInitializer';
import { CardListItem } from './CardListItem/CardListItem';
import { getViewPageCardsSorted } from '@/features/ViewPageInitializer'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { MultiSelectScreen } from './MultiSelectScreen/MultiSelectScreen';
import { useHotkeys } from 'react-hotkeys-hook';
import { CardEditModal } from './CardEditModal/CardEditModal';
import { MoveCardsModal } from './MoveCardsModal/MoveCardsModal';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { CardModalSkeleton, CardsListSkeleton } from '@/shared/ui/Skeleton';
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId';
import { MultiSelectWrapper } from './MultiSelectScreen/MultiSelectWrapper';
import { getViewPageCardsFactor, getViewPageCardsSortedFactor } from '@/features/ViewPageInitializer';
import { StateSchema } from '@/app/providers/StoreProvider';

export const CardListViewWidget = () => {
	const viewPageIsMounted = useSelector(getViewPageIsMounted)
	const viewPageIsLoading = useSelector(getViewPageIsLoading)
	const dispatch = useAppDispatch()
	const cards = useSelector(getViewPageCardsSorted)
	// const cards = useSelector(getViewPageCardsSortedFactor)
	// console.log(cards)

	const onSelectCard = useCallback((cardId: string) => {
		dispatch(viewPageActions.addOrRemoveCardFromSelectedCardIds(cardId))
	}, [dispatch])

	const onOpenEditCardModal = useCallback((card: CardSchemaExtended) => {
		dispatch(viewPageActions.setCardDataOriginal(card))
		dispatch(viewPageActions.setCurrentCardId(card.id))
		dispatch(viewPageActions.setIsCardEditModalOpen(true))
		dispatch(viewPageActions.setCardDataEdited(card))
	}, [dispatch])

	const content = useMemo(() => {
		if (!viewPageIsMounted || viewPageIsLoading) return []
		return cards?.map(item => (
			// return cards?.map(item => (
			<CardListItem
				onSelectCard={onSelectCard}
				onOpenEditCardModal={onOpenEditCardModal}
				card={item}
				key={item.id}
			/>)
		)
	}, [cards, viewPageIsLoading, onSelectCard, onOpenEditCardModal, viewPageIsMounted])
	// }, [cards, viewPageIsLoading, onSelectCard, onOpenEditCardModal, viewPageIsMounted])

	const contentRendered = (

		<AnimateSkeletonLoader
			isLoading={(!viewPageIsMounted || viewPageIsLoading)}
			skeletonComponent={<CardsListSkeleton />}
			componentAfterLoading={content}
			noDelay={!viewPageIsLoading}
			// noDelay={cards && cards.length > 0}
			// noDelay={cards.length > 0}
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
					&& (content && !content.length)
					// eslint-disable-next-line i18next/no-literal-string
					&& <p>Кажется, тут нет карточек</p>
				}

			</div>
			<MultiSelectWrapper />
			<CardEditModal />
			<MoveCardsModal />
		</>
	)
}