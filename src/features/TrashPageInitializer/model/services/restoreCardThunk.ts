import { createAsyncThunk } from '@reduxjs/toolkit'
import { t } from 'i18next'

import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { rtkApiRestoreCardById } from '@/entities/Card'
import { rtkRestoreShelfById } from '@/entities/Shelf'
import { TAG_CUPBOARD_PAGE,TAG_TRASH_PAGE, TAG_VIEW_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { ShelfBoxCardIdObject } from '@/shared/types/ApiTypesCommon'
import { toastsActions } from '@/shared/ui/Toast'

import { getAbortedThunkIds } from '../selectors/getTrashPage'

export const restoreCardThunk = createAsyncThunk<string, ShelfBoxCardIdObject, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'trashPage/restoreShelfByIdThunk',
	async ({ shelfId, boxId, cardId }, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		// const abortedThunkIds = getAbortedThunkIds(getState())
		const id = 'restoreCardById' + cardId
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
					// messageSuccess: t('toast:restore_shelf.messageSuccess'),
					// contentCommon: t('toast:restore_shelf.additional') + ` "${title}"`,
				}
			}))
			const response = await dispatch(rtkApiRestoreCardById({ shelfId, cardId, boxId })).unwrap()
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error('Request failed')
			}
			// dispatch(rtkApi.util.invalidateTags([TAG_TRASH_PAGE]))
			dispatch(rtkApi.util.invalidateTags([TAG_VIEW_PAGE, TAG_CUPBOARD_PAGE, TAG_TRASH_PAGE]))
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