import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { getViewPageAbortedThunkIds } from '../selectors/getViewPageInitializer'
import { viewPageActions } from '../slice/viewPageSlice'
import { t } from 'i18next'
import { getCardIdsSelectedForDeletionByRandomId } from '../selectors/getViewPageMultiSelect'
import { rtkApiDeleteCardsSoft } from '@/entities/Card'
import { TAG_CUPBOARD_PAGE, TAG_TRASH_PAGE, TAG_VIEW_PAGE, } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'
import { sleep } from '@/shared/lib/helpers/common/sleep'

export const deleteMultipleCardsThunk = createAsyncThunk<string[], string, { rejectValue: string[], extra: ThunkExtraArg, state: StateSchema, rejectedMeta: { aborted: boolean } }>(
	'viewPage/deleteMultipleCardsThunk',
	async (randomId, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		// dispatch(viewPageActions.removeMultiSelectDeleteIds(randomId))
		// достать все id карточек которые нужно удалить
		// показать тост
		// если запрос успешный, то стереть карточки из state.card используя их id
		// если запрос failed, то сделать флаг isDeleted = false
		// в самом конце dispatch(viewPageActions.removeMultiSelectDeleteIds(randomId))
		const cardIdsSelectedForDeletion = getCardIdsSelectedForDeletionByRandomId(randomId)(getState())
		// console.log(cardIdsSelectedForDeletion)
		const abortedThunkIds = getViewPageAbortedThunkIds(getState())
		const id = randomId
		// await sleep(2000)
		// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!')
		try {
			if (abortedThunkIds.includes(id) || !cardIdsSelectedForDeletion.length) {
				dispatch(viewPageActions.removeMultiSelectDeleteIds(randomId))
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'idle' } }))
				throw new Error('Aborted')
			}
			// await sleep(2000)
			dispatch(viewPageActions.setAbortedThunkId(id))
			dispatch(toastsActions.addToast({
				id,
				toast: {
					status: 'pending',
					messageLoading: t('toast:messageLoading'),
					messageError: t('toast:messageError'),
					messageSuccess: t('toast:delete_multiple_card.messageSuccess'),
					contentCommon: t('toast:delete_multiple_card.additional'),
				}
			}))
			// await sleep(2000)
			const response = await dispatch(rtkApiDeleteCardsSoft({ cardIds: cardIdsSelectedForDeletion })).unwrap()

			if (!response) {

				throw new Error('Request failed')
			}
			dispatch(viewPageActions.removeMultiSelectDeleteIds(randomId))
			dispatch(rtkApi.util.invalidateTags([TAG_CUPBOARD_PAGE, TAG_VIEW_PAGE, TAG_TRASH_PAGE]))
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return cardIdsSelectedForDeletion

		} catch (err) {
			console.log(err)
			const error = err as Error;
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
			// dispatch(viewPageActions.removeAbortedThunkId(id))
			dispatch(viewPageActions.removeAbortedThunkId(id))
			dispatch(viewPageActions.setCardsIsNotDeletedByIdList(cardIdsSelectedForDeletion))
			dispatch(viewPageActions.removeMultiSelectDeleteIds(randomId))
			return thunkAPI.rejectWithValue(cardIdsSelectedForDeletion, { aborted: true });
			// // dispatch(viewPageActions.setCardIsNotDeleted(cardId))
			// if (error.message === 'Aborted') {
			// 	return thunkAPI.rejectWithValue(id, { aborted: true });
			// }
			// dispatch(viewPageActions.setCardIsNotDeleting(cardId))
			// return thunkAPI.rejectWithValue(cardId, { aborted: false });
		}
	}
)