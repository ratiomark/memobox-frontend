import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'
import { TAG_VIEW_PAGE, TAG_TRASH_PAGE, TAG_CUPBOARD_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'
import { rtkRemoveShelfFinal, rtkRestoreShelfById } from '@/entities/Shelf'
import { getAbortedThunkIds } from '../selectors/getTrashPage'
import { rtkApiDeleteBoxFromTrash } from '@/entities/Box'

export const deleteBoxFromTrashByIdThunk = createAsyncThunk<string, { boxId: string; index: number }, { rejectValue: string; extra: ThunkExtraArg; state: StateSchema }>(
	'trashPage/deleteBoxFromTrashByIdThunk',
	async ({ boxId, index }, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		// const abortedThunkIds = getAbortedThunkIds(getState())
		const id = 'deleteBoxFromTrashByIdThunk' + boxId
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
						messageSuccess: t('toast:delete_box.messageSuccess'),
						contentCommon: t('toast:delete_box.additional') + ` "${index}"`,
					},
				})
			)
			const response = await dispatch(rtkApiDeleteBoxFromTrash({ boxId })).unwrap()
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error('Request failed')
			}
			console.log('response after final deletion', response)

			// rtkApiDeleteBoxFromTrash
			dispatch(rtkApi.util.invalidateTags([TAG_TRASH_PAGE]))
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return boxId
		} catch (err) {
			return thunkAPI.rejectWithValue('Something went wrong')
		}
	}
)
