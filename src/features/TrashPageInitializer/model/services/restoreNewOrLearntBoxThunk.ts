import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'
import { TAG_VIEW_PAGE, TAG_TRASH_PAGE, TAG_CUPBOARD_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'
import { rtkRestoreShelfById } from '@/entities/Shelf'
import { getAbortedThunkIds } from '../selectors/getTrashPage'
import { rtkApiMoveAllCardsFromBoxToBox } from '@/entities/Box'

export const restoreNewOrLearntBoxThunk = createAsyncThunk<string, { boxIdToRestore: string, activeBoxId: string, toShelfId: string }, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'trashPage/restoreNewOrLearntBoxThunk',
	async ({ boxIdToRestore, activeBoxId , toShelfId}, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		// const abortedThunkIds = getAbortedThunkIds(getState())
		const id = 'restoreShelfById' + boxIdToRestore
		try {

			dispatch(toastsActions.addToast({
				id,
				toast: {
					status: 'pending',
					messageLoading: t('toast:messageLoading'),
					messageError: t('toast:messageError'),
					// messageSuccess: t('toast:restore_shelf.messageSuccess'),
					// contentCommon: t('toast:restore_shelf.additional') + ` "${boxIdToRestore}"`,
				}
			}))
			const response = await dispatch(rtkApiMoveAllCardsFromBoxToBox({ fromBoxId: boxIdToRestore, toBoxId: activeBoxId , toShelfId})).unwrap()

			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error('Request failed')
			}

			dispatch(rtkApi.util.invalidateTags([TAG_VIEW_PAGE, TAG_CUPBOARD_PAGE, TAG_TRASH_PAGE]))
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return 'sfl'

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