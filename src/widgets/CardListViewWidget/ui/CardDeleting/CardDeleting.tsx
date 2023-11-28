import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardDeleting.module.scss';
import { CardSchemaExtended, getCardMainData } from '@/entities/Card';
import { Button } from '@/shared/ui/Button';
import { DURATION_SHELF_DELETION_MILLISEC } from '@/shared/const/animation';
import { CircularCountDownWithProgress } from '@/shared/ui/CircularCountDownWithProgress';
import { MyText } from '@/shared/ui/Typography';
import { deleteCardThunk } from '@/features/ViewPageInitializer';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { useState, useEffect, useCallback } from 'react';
import { viewPageActions } from '@/features/ViewPageInitializer';
import { useDeleteWithCountdown } from '@/shared/lib/helpers/hooks/useDeleteWithCountdown';
import { idPrefixCardDeletion } from '@/shared/const/idsAndDataAttributes';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';
import { size } from 'lodash';
import { toastsActions } from '@/shared/ui/Toast';


interface CardDeletingProps {
	// className?: string
	card: CardSchemaExtended
	cardId: string
	isCardDeleting: boolean
	// onCancelDeletion: () => void
	// onSelectCard: (cardId: string) => void
	// selectedCardIds: string[]
	// onOpenEditCardModal: (card: CardSchemaExtended) => void
}
export const CardDeleting = (props: CardDeletingProps) => {
	const {
		// onCancelDeletion,
		card,
		cardId,
		isCardDeleting
	} = props
	const { t } = useTranslation('viewPage')
	const dispatch = useAppDispatch()
	const circularCountSizes = getSizesForCircularCountDown()

	const deleteCard = useCallback(() => {
		dispatch(deleteCardThunk(cardId))
	}, [dispatch, cardId])

	const { timer } = useDeleteWithCountdown({
		startCondition: isCardDeleting,
		deletionFn: deleteCard,
		duration: DURATION_SHELF_DELETION_MILLISEC,
	})

	const onCancelDeletion = () => {
		if (timer) clearTimeout(timer)
		// dispatch(viewPageActions.setCardIsNotDeleting(getCardMainData(card)))
		dispatch(viewPageActions.setCardIsNotDeleting(cardId))
		dispatch(viewPageActions.setAbortedThunkId(idPrefixCardDeletion + cardId))
		// dispatch(toastsActions.setAbortedThunkId(idPrefixCardDeletion + cardId))
		
	}

	return (
		<div className={cls.item}>
			<div className={cls.CardListItem}>
				<div className={cls.mainContentWrapper} >
					<MyText className={cls.description} text={t('card will be deleted')} />
					<div className={cls.buttonAndProgressBar} >

						<Button
							className={cls.button}
							fontWeight='300'
							onClick={onCancelDeletion}
						>
							{t('cancel card deletion')}
						</Button>
						<CircularCountDownWithProgress
							{...circularCountSizes}
							duration={DURATION_SHELF_DELETION_MILLISEC / 1000} />
					</div>

				</div>
			</div>

		</div>
	)
}
const getSizesForCircularCountDown = () => {
	const viewRows = localDataService.getViewRows()
	if (viewRows === 2) {
		return { size: 48, strokeWidth: 4 }
	}
	if (viewRows === 1) {
		return { size: 32, strokeWidth: 4 }
	}
	return {}
}

// useEffect(() => {
// 	const timer = setTimeout(() => {
// 		dispatch(deleteCardThunk(cardId))
// 	}, DURATION_SHELF_DELETION_MILLISEC)
// 	setTimer(timer)
// }, [dispatch, cardId])

// useEffect(() => {
// 	return () => {
// 		if (timer) clearTimeout(timer)
// 	}
// }, [timer])


// useEffect(() => {
// 	return () => {
// 		dispatch(deleteCardThunk(cardId))
// 	}
// }, [dispatch, cardId])

// // удаляет полку сразу, если перезагружает или закрывает вкладку
// useEffect(() => {
// 	const deleteCard = () => {
// 		if (isCardDeleting) {
// 			dispatch(deleteCardThunk(cardId))
// 		}
// 	}

// 	window.addEventListener('beforeunload', deleteCard)
// 	return () => {
// 		window.removeEventListener('beforeunload', deleteCard)
// 	}
// }, [dispatch, isCardDeleting, cardId])
