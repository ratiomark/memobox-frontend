import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { idPrefixCardDeletion } from '@/shared/const/idsAndDataAttributes'
import { getViewPageAbortedThunkIds } from '../selectors/getViewPageInitializer'
import { viewPageActions } from '../slice/viewPageSlice'
import { t } from 'i18next'
import { TAG_VIEW_PAGE, TAG_TRASH_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'
import { rtkApiDeleteCardSoft } from '@/entities/Card'
let test = 0
export const deleteCardThunk = createAsyncThunk<string, string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema, rejectedMeta: { aborted: boolean } }>(
	'viewPage/deleteCardThunk',
	async (cardId, thunkAPI) => {
		console.log(test, '             ---------')
		test = test + 1
		const { dispatch, getState } = thunkAPI
		const id = idPrefixCardDeletion + cardId
		const abortedThunkIds = getViewPageAbortedThunkIds(getState())
		// console.log('=================================================')
		try {
			if (abortedThunkIds.includes(id)) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'idle' } }))
				throw new Error('Aborted')
			}
			dispatch(viewPageActions.setAbortedThunkId(id))
			dispatch(viewPageActions.setCardIsDeleted(cardId))
			dispatch(toastsActions.addToast({
				id,
				toast: {
					status: 'pending',
					messageLoading: t('toast:messageLoading'),
					messageError: t('toast:messageError'),
					messageSuccess: t('toast:delete_card.messageSuccess'),
					contentCommon: t('toast:delete_card.additional'),
				}
			}))
			const response = await dispatch(rtkApiDeleteCardSoft(cardId)).unwrap()
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error('Request failed')
			}
			
			dispatch(rtkApi.util.invalidateTags([TAG_VIEW_PAGE, TAG_TRASH_PAGE]))
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