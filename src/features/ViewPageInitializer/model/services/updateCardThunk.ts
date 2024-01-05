import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { idPrefixCardUpdating } from '@/shared/const/idsAndDataAttributes'
import { getViewPageAbortedThunkIds } from '../selectors/getViewPageInitializer'
import { t } from 'i18next'
import { rtkApiUpdateCard } from '@/entities/Card'
import { viewPageActions } from '../..'

interface UpdateCardThunkArg {
	cardId: string
	question: string | null
	answer: string | null
	shelfId: string
	boxId: string
	previousBoxId: string
}

export const updateCardThunk = createAsyncThunk<string, UpdateCardThunkArg, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	// export const updateCardThunk = createAsyncThunk<string, UpdateCardThunkArg, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema, rejectedMeta: { aborted: boolean } }>(
	'viewPage/updateCardThunk',
	async (card, thunkAPI) => {

		const { dispatch, getState } = thunkAPI
		const { cardId, ...restCardData } = card
		const id = idPrefixCardUpdating + cardId
		const abortedThunkIds = getViewPageAbortedThunkIds(getState())
		try {
			if (abortedThunkIds.includes(id)) {
				throw new Error('Aborted')
			}
			// dispatch(viewPageActions.setCardIsDeleted(cardId))
			dispatch(toastsActions.addToast({
				id,
				toast: {
					status: 'pending',
					messageLoading: t('toast:messageLoading'),
					messageError: t('toast:messageError'),
					messageSuccess: t('toast:update_card.messageSuccess'),
					contentCommon: t('toast:update_card.additional'),
				}
			}))
			const cardUpdated = await dispatch(rtkApiUpdateCard({ id: cardId, ...restCardData })).unwrap()

			if (!cardUpdated) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error('Request failed')
			}

			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))

			dispatch(viewPageActions.setNewCardData(cardUpdated))

			const cardOriginal = getState().viewPage!.cardsDataOriginal[cardId]!
			const originalShelfId = cardOriginal.shelfId!
			const originalBoxId = cardOriginal.boxId!

			if (originalShelfId !== cardUpdated.shelfId || originalBoxId !== cardUpdated.boxId) {
				dispatch(viewPageActions.removeCardFromShelfIdBoxIdObj({
					shelfId: originalShelfId,
					boxId: originalBoxId,
					cardId: cardId
				}))
				dispatch(viewPageActions.addCardToShelfIdBoxIdObj({
					boxId: cardUpdated.boxId,
					shelfId: cardUpdated.shelfId,
					card: cardUpdated
				}))
			} else {
				dispatch(viewPageActions.updateCardDataInShelfIdBoxIdObj({
					boxId: cardUpdated.boxId,
					shelfId: cardUpdated.shelfId,
					card: cardUpdated
				}))
			}
			dispatch(viewPageActions.removeCardDataEditedByCardId(cardId))
			dispatch(viewPageActions.updateCardDataOriginal(cardUpdated))
			// if (cardOriginal?.boxId !== cardUpdated.boxId) {
			// 	console.log('Поменялась коробка')
			// }
			// console.log(cardOriginal)
			// console.log(cardUpdated)
			// FIXME: тут я должен возвращать данные в таком виде, чтобы дропнуть у карточки состояние updating + edited. Убедиться, что карточка перестилась в другое место(если было перемещение) и что подсчет карточек работает корректно.
			return cardId

		} catch (err) {
			return thunkAPI.rejectWithValue('fail')
			// const error = err as Error;
			// dispatch(viewPageActions.removeAbortedThunkId(id))
			// dispatch(viewPageActions.setCardIsNotupdated(cardId))
			// if (error.message === 'Aborted') {
			// 	return thunkAPI.rejectWithValue(id, { aborted: true });
			// }
			// dispatch(viewPageActions.setCardIsNotDeleting(cardId))
			// return thunkAPI.rejectWithValue(cardId, { aborted: false });
		}
	}
)