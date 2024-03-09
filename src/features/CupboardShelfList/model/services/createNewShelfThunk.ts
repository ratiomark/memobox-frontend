import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { cupboardShelfListActions } from '../slice/cupboardShelfListSlice'
import { ShelfSchema, rtkCreateNewShelf } from '@/entities/Shelf'
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId'
import { toastsActions } from '@/shared/ui/Toast'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'
import { rtkApi } from '@/shared/api/rtkApi'
import { TAG_TRASH_PAGE, TAG_VIEW_PAGE } from '@/shared/api/const/tags'
import { getCupboardState } from '../selectors/getCupboardCommon';

export const createNewShelfThunk = createAsyncThunk<ShelfSchema[], string, { rejectValue: string; extra: ThunkExtraArg; state: StateSchema }>(
	'cupboardPage/createNewShelfThunk',
	async (shelfName, thunkAPI) => {
		const id = shelfName + genRandomId()
		const { dispatch, getState } = thunkAPI
		dispatch(
			toastsActions.addToast({
				id,
				toast: {
					status: 'pending',
					messageLoading: t('toast:messageLoading'),
					messageError: t('toast:messageError'),
					messageSuccess: t('toast:create_new_shelf.messageSuccess'),
					contentCommon: t('toast:create_new_shelf.additional'),
				},
			})
		)
		dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('pending'))
		try {
			const response = await dispatch(rtkCreateNewShelf(shelfName)).unwrap()
			// await sleep(20)
			if (!response) {
				dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('error'))
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error()
			}
			dispatch(rtkApi.util.invalidateTags([TAG_VIEW_PAGE, TAG_TRASH_PAGE]))
			const shelves = getCupboardState.selectAll(getState()).map((shelf) => ({
				...shelf,
				index: shelf.index + 1,
			}))
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return [response, ...shelves]

		} catch (err) {
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)
