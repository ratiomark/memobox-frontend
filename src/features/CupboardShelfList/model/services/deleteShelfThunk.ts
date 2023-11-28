import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { getAbortedThunkIds, getShelfById, getShelfTitleByShelfId } from '../selectors/getCupboardShelfList'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'
import { ShelfSchema, removeShelfByIdMutation } from '@/entities/Shelf'
import { idPrefixShelfDeletion } from '@/shared/const/idsAndDataAttributes'
import { TAG_TRASH_PAGE, TAG_VIEW_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'

type DeleShelfThunkArg = {
	id: string
	title: string
}

const AbortedError = 'Aborted'

export const deleteShelfThunk = createAsyncThunk<DeleShelfThunkArg, string, { rejectValue: string; extra: ThunkExtraArg; state: StateSchema; rejectedMeta: { aborted: boolean } }>(
	'cupboardPage/deleteShelfThunk',
	async (shelfId, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		const id = idPrefixShelfDeletion + shelfId
		const abortedThunkIds = getAbortedThunkIds(getState())
		try {
			if (abortedThunkIds.includes(id)) {
				throw new Error(AbortedError)
			}

			const shelf = getShelfById(shelfId)(getState()) as ShelfSchema

			dispatch(
				toastsActions.addToast({
					id,
					toast: {
						status: 'pending',
						messageLoading: t('toast:messageLoading'),
						messageError: t('toast:messageError'),
						messageSuccess: t('toast:delete_shelf.messageSuccess'),
						contentCommon: `${t('toast:delete_shelf.additional')} "${shelf.title}"`,
					},
				})
			)

			// VAR: Тут нужно проверять response и если ответ на свервера успешный, то возвращать shelfId

			const response = await dispatch(removeShelfByIdMutation({ shelfId, index: shelf.index })).unwrap()

			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error('Request failed')
			}
			dispatch(rtkApi.util.invalidateTags([TAG_VIEW_PAGE, TAG_TRASH_PAGE]))
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return { id: shelfId, title: shelf.title }

		} catch (err) {
			const error = err as Error
			if (error.message === AbortedError) {
				return thunkAPI.rejectWithValue(id, { aborted: true })
			} else if (error.message === 'Request failed') {
				return thunkAPI.rejectWithValue(shelfId, { aborted: false })
			} else {
				// Обработка всех других ошибок
				return thunkAPI.rejectWithValue(shelfId, { aborted: false })
			}
		}
	})
