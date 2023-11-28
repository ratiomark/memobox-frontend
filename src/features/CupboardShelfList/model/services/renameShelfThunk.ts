import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId'
import { updateShelfWithTag } from '@/entities/Shelf'
import { updateBoxWithTag } from '@/entities/Box'
import { getShelfTitleByShelfId } from '../selectors/getCupboardShelfList'
import { cupboardShelfListActions } from '../slice/cupboardShelfListSlice'
import { TAG_VIEW_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'

export interface RenameShelfThunkArg {
	// missedTrainingValue: MissedTrainingValue
	title: string
	shelfId: string
	currentShelfTitle: string
}
export const renameShelfThunk = createAsyncThunk<RenameShelfThunkArg, RenameShelfThunkArg, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/renameShelfThunk',
	async (arg, thunkAPI) => {
		const { shelfId, title, currentShelfTitle } = arg
		// console.log('updateMissedTrainingThunk', arg)
		const id = shelfId + genRandomId()
		const { dispatch, getState } = thunkAPI
		// const shelfTitle = getShelfTitleByShelfId(shelfId)(getState())
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { title } }))
		dispatch(cupboardShelfListActions.addShelfTitle(title))
		dispatch(toastsActions.addToast({
			id,
			toast: {
				status: 'pending',
				messageLoading: t('toast:messageLoading'),
				messageError: t('toast:messageError'),
				messageSuccess: t('toast:rename_shelf.messageSuccess'),
				contentCommon: `${t('toast:rename_shelf.additional')} "${currentShelfTitle}"`,
				// duration: 1000000,
			}
		}))
		try {
			// await sleep(4)
			const response = dispatch(updateShelfWithTag({ id: shelfId, title })).unwrap()

			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error()
			}
			dispatch(rtkApi.util.invalidateTags([TAG_VIEW_PAGE]))
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			dispatch(cupboardShelfListActions.removeShelfTitle(currentShelfTitle))
			return arg
		} catch (err) {
			dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { title: currentShelfTitle } }))
			dispatch(cupboardShelfListActions.removeShelfTitle(title))
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения