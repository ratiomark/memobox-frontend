import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { getAbortedThunkIds, toastsActions } from '@/shared/ui/Toast'
import { getViewPageAbortedThunkIds } from '../selectors/getViewPageInitializer'
import { viewPageActions } from '../slice/viewPageSlice'
import { t } from 'i18next'
import { getCardIdsSelectedForMoveByRandomId } from '../selectors/getViewPageMultiSelect'
import { rtkApiMoveCards } from '@/entities/Card'
import { getViewPageMoveCardsModalShelfId, getViewPageMoveCardsModalBoxId } from '../..'
import { TAG_CUPBOARD_PAGE, TAG_VIEW_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'
// import { restoreAllShelves } from '@/entities/Cupboard'

export const moveMultipleCardsThunk = createAsyncThunk<string[], string, { rejectValue: string[], extra: ThunkExtraArg, state: StateSchema, rejectedMeta: { aborted: boolean } }>(
	'viewPage/moveMultipleCardsThunk',
	async (randomId, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		// dispatch(viewPageActions.removeMultiSelectDeleteIds(randomId))
		// достать все id карточек которые нужно удалить
		// показать тост
		// если запрос успешный, то стереть карточки из state.card используя их id
		// если запрос failed, то сделать флаг isDeleted = false
		// в самом конце dispatch(viewPageActions.removeMultiSelectDeleteIds(randomId))
		const cardIdsSelectedForMoving = getCardIdsSelectedForMoveByRandomId(randomId)(getState())
		// полюбому будет shelfId и boxId, т.к. thunk будет вызван, только после того как откроется модалка
		const shelfId = getViewPageMoveCardsModalShelfId(getState())!
		const boxId = getViewPageMoveCardsModalBoxId(getState())!

		const abortedThunkIds = getAbortedThunkIds(getState())
		const id = randomId
		try {

			if (abortedThunkIds.includes(id) || !cardIdsSelectedForMoving.length) {
				// console.log(' АБОРТ АБОРТ АБОРТ')
				throw new Error('Aborted')
			}

			dispatch(toastsActions.addToast({
				id,
				toast: {
					status: 'pending',
					messageLoading: t('toast:messageLoading'),
					messageError: t('toast:messageError'),
					messageSuccess: t('toast:move_multiple_card.messageSuccess'),
					contentCommon: t('toast:move_multiple_card.additional'),
				}
			}))

			const response = await dispatch(rtkApiMoveCards({ shelfId, boxId, cardIds: cardIdsSelectedForMoving })).unwrap()
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error('Request failed')
			}
			dispatch(rtkApi.util.invalidateTags([TAG_CUPBOARD_PAGE, TAG_VIEW_PAGE]))
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return cardIdsSelectedForMoving

		} catch (err) {
			const error = err as Error;
			// dispatch(viewPageActions.removeAbortedThunkId(id))
			dispatch(viewPageActions.setCardsIsNotDeletedByIdList(cardIdsSelectedForMoving))
			dispatch(viewPageActions.removeMultiSelectDeleteIds(randomId))
			return thunkAPI.rejectWithValue(cardIdsSelectedForMoving, { aborted: true });
			// // dispatch(viewPageActions.setCardIsNotDeleted(cardId))
			// if (error.message === 'Aborted') {
			// 	return thunkAPI.rejectWithValue(id, { aborted: true });
			// }
			// dispatch(viewPageActions.setCardIsNotDeleting(cardId))
			// return thunkAPI.rejectWithValue(cardId, { aborted: false });
		}
	}
)