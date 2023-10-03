import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'
import { idPrefixCardDeletion } from '@/shared/const/idsAndDataAttributes'
import { getViewPageAbortedThunkIds } from '../selectors/getViewPageInitializer'
import { viewPageActions } from '../..'

export const deleteCardThunk = createAsyncThunk<string, string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema, rejectedMeta: { aborted: boolean } }>(
	'viewPage/deleteCardThunk',
	async (cardId, thunkAPI) => {

		const { dispatch, getState } = thunkAPI
		const id = idPrefixCardDeletion + cardId
		const abortedThunkIds = getViewPageAbortedThunkIds(getState())
		try {
			if (abortedThunkIds.includes(id)) {
				throw new Error('Aborted')
			}
			dispatch(viewPageActions.setCardIsDeleted(cardId))
			dispatch(toastsActions.addToast({
				id,
				toast: {
					status: 'pending',
					messageLoading: t('toast:messageLoading'),
					messageError: t('toast:messageError'),
					messageSuccess: t('toast:delete_card.messageSuccess'),
					contentCommon: t('toast:delete_card.additional'),
					// contentLoading: `${t('toast:delete_shelf.additional')} ${shelfTitle}`,
					// contentSuccess: `${t('toast:delete_shelf.additional')} ${shelfTitle}`,
					// contentError: `${t('toast:delete_shelf.additional')} ${shelfTitle}`,
				}
			}))
			// dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { deletingRequestStatus: 'pending' } }))
			// dispatch(cupboardShelfListActions.setShelfDeletionRequestStatus('pending'))
			// VAR: Тут нужно проверять response и если ответ на свервера успешный, то возвращать shelfId
			// const response = await dispatch(removeShelfByIdMutation(shelfId)).unwrap()
			// await sleep()
			const response = Math.random() > 0.5
			// const response = Math.random() > 50
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))

				throw new Error('Request failed')
			}

			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return cardId

		} catch (err) {
			const error = err as Error;
			dispatch(viewPageActions.removeAbortedThunkId(id))
			dispatch(viewPageActions.setCardIsNotDeleted(cardId))
			if (error.message === 'Aborted') {
				return thunkAPI.rejectWithValue(id, { aborted: true });
			}
			dispatch(viewPageActions.setCardIsNotDeleting(cardId))
			return thunkAPI.rejectWithValue(cardId, { aborted: false });
		}
	}
)