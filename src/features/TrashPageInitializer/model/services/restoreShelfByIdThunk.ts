import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'
import { TAG_VIEW_PAGE, TAG_TRASH_PAGE, TAG_CUPBOARD_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'
import { rtkRestoreShelfById } from '@/entities/Shelf'
import { getAbortedThunkIds } from '../selectors/getTrashPage'

export const restoreShelfByIdThunk = createAsyncThunk<string, { shelfId: string, title: string }, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'trashPage/restoreShelfByIdThunk',
	async ({ shelfId, title }, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		// const abortedThunkIds = getAbortedThunkIds(getState())
		const id = 'restoreShelfById' + shelfId
		try {
			// if (abortedThunkIds.includes(id)) {
			// dispatch(toastsActions.updateToastById({ id, toast: { status: 'idle' } }))
			// throw new Error('Aborted')
			// }
			// dispatch(viewPageActions.setAbortedThunkId(id))
			// dispatch(viewPageActions.setCardIsDeleted(cardId))
			dispatch(toastsActions.addToast({
				id,
				toast: {
					status: 'pending',
					messageLoading: t('toast:messageLoading'),
					messageError: t('toast:messageError'),
					messageSuccess: t('toast:restore_shelf.messageSuccess'),
					contentCommon: t('toast:restore_shelf.additional') + ` "${title}"`,
				}
			}))
			const response = await dispatch(rtkRestoreShelfById(shelfId)).unwrap()
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error('Request failed')
			}

			dispatch(rtkApi.util.invalidateTags([TAG_VIEW_PAGE, TAG_CUPBOARD_PAGE]))
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return shelfId

		} catch (err) {
			// const error = err as Error;
			// dispatch(viewPageActions.removeAbortedThunkId(id))
			// dispatch(viewPageActions.setCardIsNotDeleted(cardId))
			// if (error.message === 'Aborted') {
			// 	return thunkAPI.rejectWithValue(id, { aborted: true });
			// }
			// dispatch(viewPageActions.setCardIsNotDeleting(cardId))
			// return thunkAPI.rejectWithValue(cardId, { aborted: false });
			return thunkAPI.rejectWithValue('Something went wrong');
		}
	}
)