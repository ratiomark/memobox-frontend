import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'
import { rtkApi } from '@/shared/api/rtkApi'
import { rtkRemoveShelfFinal, rtkRestoreShelfById } from '@/entities/Shelf'
import { TAG_TRASH_PAGE } from '@/shared/api/const/tags'

export const deleteShelfFromTrashByIdThunk = createAsyncThunk<string, { shelfId: string; title: string }, { rejectValue: string; extra: ThunkExtraArg; state: StateSchema }>(
	'trashPage/deleteShelfFromTrashByIdThunk',
	async ({ shelfId, title }, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		// const abortedThunkIds = getAbortedThunkIds(getState())
		const id = 'deleteShelfFromTrashByIdThunk' + shelfId
		try {
			// if (abortedThunkIds.includes(id)) {
			// dispatch(toastsActions.updateToastById({ id, toast: { status: 'idle' } }))
			// throw new Error('Aborted')
			// }rtkRemoveShelfFinal
			// dispatch(viewPageActions.setAbortedThunkId(id))
			// dispatch(viewPageActions.setCardIsDeleted(cardId))
			dispatch(
				toastsActions.addToast({
					id,
					toast: {
						status: 'pending',
						messageLoading: t('toast:messageLoading'),
						messageError: t('toast:messageError'),
						messageSuccess: t('toast:delete_shelf.messageSuccess'),
						contentCommon: t('toast:delete_shelf.additional') + ` "${title}"`,
					},
				})
			)
			const response = await dispatch(rtkRemoveShelfFinal({ shelfId })).unwrap()
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error('Request failed')
			}
			console.log('response after final deletion', response)
			dispatch(rtkApi.util.invalidateTags([TAG_TRASH_PAGE]))
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return shelfId
		} catch (err) {
			return thunkAPI.rejectWithValue('Something went wrong')
		}
	}
)
