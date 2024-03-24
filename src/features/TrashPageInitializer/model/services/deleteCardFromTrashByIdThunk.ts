import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'
import { rtkApi } from '@/shared/api/rtkApi'
import { rtkApiDeleteBoxFromTrash } from '@/entities/Box'
import { TAG_TRASH_PAGE } from '@/shared/api/const/tags'
import { rtkApiDeleteCardFinal } from '@/entities/Card'

export const deleteCardFromTrashByIdThunk = createAsyncThunk<null, string, { rejectValue: string; extra: ThunkExtraArg; state: StateSchema }>(
	'trashPage/deleteCardFromTrashByIdThunk',
	async (cardId, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		// const abortedThunkIds = getAbortedThunkIds(getState())
		const id = 'deleteCardFromTrashByIdThunk' + cardId
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
						messageSuccess: t('toast:delete_card_from_trash.messageSuccess'),
						// contentCommon: t('toast:delete_box.additional') + ` "${cardId}"`,
					},
				})
			)
			const response = await dispatch(rtkApiDeleteCardFinal(cardId)).unwrap()
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error('Request failed')
			}
			console.log('response after final deletion', response)

			// rtkApiDeleteBoxFromTrash
			dispatch(rtkApi.util.invalidateTags([TAG_TRASH_PAGE]))
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return null
		} catch (err) {
			return thunkAPI.rejectWithValue('Something went wrong')
		}
	}
)
