import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { idPrefixCardDeletion } from '@/shared/const/idsAndDataAttributes'
import { getViewPageAbortedThunkIds } from '../selectors/getViewPageInitializer'
import { viewPageActions } from '../slice/viewPageSlice'
import { t } from 'i18next'
import { getCardIdsSelectedForDeletionByRandomId } from '../selectors/getViewPageMultiSelect'
import { getAllCards } from '@/entities/Card'
import { restoreAllShelves } from '@/entities/Cupboard'

export const deleteMultipleCardsThunk = createAsyncThunk<string[], string, { rejectValue: string[], extra: ThunkExtraArg, state: StateSchema, rejectedMeta: { aborted: boolean } }>(
	'viewPage/deleteMultipleCardsThunk',
	async (randomId, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		// dispatch(viewPageActions.removeMultiSelectDeleteIds(randomId))
		// достать все id карточек которые нужно удалить
		// показать тост
		// если запрос успешный, то стереть карточки из state.card используя их id
		// если запрос failed, то сделать флаг isDeleted = false
		// в самом конце dispatch(viewPageActions.removeMultiSelectDeleteIds(randomId))
		const cardIdsSelectedForDeletion = getCardIdsSelectedForDeletionByRandomId(randomId)(getState())

		console.log(cardIdsSelectedForDeletion)
		const abortedThunkIds = getViewPageAbortedThunkIds(getState())
		const id = randomId
		try {
			// if (4 > 3) {
			if (abortedThunkIds.includes(id) || !cardIdsSelectedForDeletion.length) {
				console.log('ABORTEDTEE')
				throw new Error('Aborted')
			}
			dispatch(toastsActions.addToast({
				id,
				toast: {
					status: 'pending',
					messageLoading: t('toast:messageLoading'),
					messageError: t('toast:messageError'),
					messageSuccess: t('toast:delete_multiple_card.messageSuccess'),
					contentCommon: t('toast:delete_multiple_card.additional'),
				}
			}))
			// VAR: Тут нужно проверять response и если ответ на свервера успешный, то возвращать cardId
			// const response = await dispatch(removeShelfByIdMutation(shelfId)).unwrap()
			dispatch(restoreAllShelves())
			await sleep()
			// const response = Math.random() > 0.5
			const response = Math.random() > 50
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error('Request failed')
			}

			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return cardIdsSelectedForDeletion

		} catch (err) {
			const error = err as Error;
			// dispatch(viewPageActions.removeAbortedThunkId(id))
			dispatch(viewPageActions.setCardsIsNotDeletedByIdList(cardIdsSelectedForDeletion))
			dispatch(viewPageActions.removeMultiSelectDeleteIds(randomId))
			return thunkAPI.rejectWithValue(cardIdsSelectedForDeletion, { aborted: true });
			// // dispatch(viewPageActions.setCardIsNotDeleted(cardId))
			// if (error.message === 'Aborted') {
			// 	return thunkAPI.rejectWithValue(id, { aborted: true });
			// }
			// dispatch(viewPageActions.setCardIsNotDeleting(cardId))
			// return thunkAPI.rejectWithValue(cardId, { aborted: false });
		}
	}
)