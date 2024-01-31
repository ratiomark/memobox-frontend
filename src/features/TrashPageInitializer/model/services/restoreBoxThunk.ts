import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'
import { TAG_VIEW_PAGE, TAG_TRASH_PAGE, TAG_CUPBOARD_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'
import { rtkRestoreShelfById } from '@/entities/Shelf'
import { getAbortedThunkIds } from '../selectors/getTrashPage'
import { rtkApiRestoreBoxFromTrash } from '@/entities/Box'

export const restoreBoxThunk = createAsyncThunk<string, { shelfId: string, index: number, boxId: string, shelfTitle: string }, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'trashPage/restoreBoxThunk',
	async ({ shelfId, shelfTitle, boxId, index }, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		// const abortedThunkIds = getAbortedThunkIds(getState())
		const id = 'restoreShelfById' + boxId
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
					messageSuccess: t('toast:restore_box.messageSuccess'),
					contentCommon: t('toast:restore_box.additional') + ` => "${shelfTitle}"`,
				}
			}))
			const response = await dispatch(rtkApiRestoreBoxFromTrash({ shelfId, boxId, index })).unwrap()
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error('Request failed')
			}
			console.log('response after restore box', response)
			console.log('response after restore box', response)
			dispatch(rtkApi.util.invalidateTags([TAG_VIEW_PAGE, TAG_CUPBOARD_PAGE, TAG_TRASH_PAGE]))
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))

			// do nothing
			return boxId

		} catch (err) {
			return thunkAPI.rejectWithValue('Something went wrong');
		}
	}
)