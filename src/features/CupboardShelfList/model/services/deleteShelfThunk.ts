import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { getAbortedThunkIds, getShelfTitleByShelfId } from '../selectors/getCupboardShelfList'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'
import { removeShelfByIdMutation } from '@/entities/Shelf'
import { idPrefixShelfDeletion } from '@/shared/const/idsAndDataAttributes'

export const deleteShelfThunk = createAsyncThunk<string, string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema, rejectedMeta: { aborted: boolean } }>(
	'cupboardPage/deleteShelfThunk',
	async (shelfId, thunkAPI) => {

		const { dispatch, getState } = thunkAPI
		const id = idPrefixShelfDeletion + shelfId
		const abortedThunkIds = getAbortedThunkIds(getState())
		try {
			if (abortedThunkIds.includes(id)) {
				throw new Error('Aborted')
			}
			const shelfTitle = getShelfTitleByShelfId(shelfId)(getState())
			dispatch(toastsActions.addToast({
				id,
				toast: {
					status: 'pending',
					messageLoading: t('toast:messageLoading'),
					messageError: t('toast:messageError'),
					messageSuccess: t('toast:delete_shelf.messageSuccess'),
					contentCommon: `${t('toast:delete_shelf.additional')} ${shelfTitle}`,
					// contentLoading: `${t('toast:delete_shelf.additional')} ${shelfTitle}`,
					// contentSuccess: `${t('toast:delete_shelf.additional')} ${shelfTitle}`,
					// contentError: `${t('toast:delete_shelf.additional')} ${shelfTitle}`,
				}
			}))
			// dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { deletingRequestStatus: 'pending' } }))
			// dispatch(cupboardShelfListActions.setShelfDeletionRequestStatus('pending'))

			// VAR: Тут нужно проверять response и если ответ на свервера успешный, то возвращать shelfId
			// const response = await dispatch(removeShelfByIdMutation(shelfId)).unwrap()
			await sleep()
			// const response = Math.random() > 0.5
			const response = Math.random() > 50
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))

				throw new Error('Request failed')
			}

			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return shelfId

		} catch (err) {
			const error = err as Error;
			if (error.message === 'Aborted') {
				return thunkAPI.rejectWithValue(id, { aborted: true });
			} else if (error.message === 'Request failed') {
				return thunkAPI.rejectWithValue(shelfId, { aborted: false });
			} else {
				// Обработка всех других ошибок
				return thunkAPI.rejectWithValue(shelfId, { aborted: false });
			}
		}
	}
)