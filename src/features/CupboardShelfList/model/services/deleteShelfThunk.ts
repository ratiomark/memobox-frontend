import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { getShelfTitleByShelfId } from '../selectors/getCupboardShelfList'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'
import { removeShelfByIdMutation } from '@/entities/Shelf'

export const deleteShelfThunk = createAsyncThunk<string, string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/deleteShelfThunk',
	async (shelfId, thunkAPI) => {

		const { dispatch, getState } = thunkAPI
		const shelfTitle = getShelfTitleByShelfId(shelfId)(getState())
		const id = 'shelfDeletion' + shelfId
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
		try {
			// VAR: Тут нужно проверять response и если ответ на свервера успешный, то возвращать shelfId
			// const response = await dispatch(removeShelfByIdMutation(shelfId)).unwrap()
			await sleep()
			// const response = Math.random() > 0.5
			const response = Math.random() > 50
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))

				throw new Error()
			}

			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return shelfId

		} catch (err) {
			return thunkAPI.rejectWithValue(shelfId)
		}
	}
)