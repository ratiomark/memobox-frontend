import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { cupboardShelfListActions, getCupboardState } from '../slice/cupboardShelfListSlice'
import { createNewShelf } from '@/entities/Cupboard'
import { ShelfSchema } from '@/entities/Shelf'
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId'
import { toastsActions } from '@/shared/ui/Toast'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'

export const createNewShelfThunk = createAsyncThunk<ShelfSchema[], string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/createNewShelfThunk',
	async (shelfName, thunkAPI) => {
		const id = shelfName + genRandomId()
		const { dispatch, getState } = thunkAPI
		dispatch(toastsActions.addToast({
			id,
			toast: {
				status: 'pending',
				messageLoading: t('toast:messageLoading'),
				messageError: t('toast:messageError'),
				messageSuccess: t('toast:create_new_shelf.messageSuccess'),
				contentCommon: t('toast:create_new_shelf.additional'),
				// contentCommon: `${t('toast:create_new_shelf.additional')} `,
				// contentCommon: `${t('toast:create_new_shelf.additional')} `,
				// contentCommon: `${t('toast:create_new_shelf.additional')} `,
				// duration: 1000000,
			}
		}))
		dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('pending'))
		try {
			await sleep(5)
			// dispatch(cupboardShelfListActions.setIsCreateNewShelfModalAwaitingResponse(true))
			// console.log('shelfName   ', shelfName)
			const response = await dispatch(createNewShelf(shelfName)).unwrap()
			if (!response) {
				dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('error'))
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error()
			}
			// console.log('НОВАЯ ПОЛКА', response)
			const shelves = getCupboardState.selectAll(getState()).map(shelf => ({
				...shelf,
				index: shelf.index + 1
			}))
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))

			// if (shelves) {
			// 	throw new Error()
			// }
			// console.log(shelves)
			// dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('error'))
			// dispatch(cupboardShelfListActions.setIsCreateNewShelfModalSuccessfulResponse(true))
			return [response, ...shelves]

		} catch (err) {
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)