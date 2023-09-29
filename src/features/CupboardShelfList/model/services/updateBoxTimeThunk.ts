import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { TimingBlock } from '@/shared/types/DataBlock'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId'

export interface UpdateBoxTimeThunkArg {
	timeObject: TimingBlock
	boxId: string
	shelfId: string
}
export const updateBoxTimeThunk = createAsyncThunk<UpdateBoxTimeThunkArg, UpdateBoxTimeThunkArg, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/updateBoxTimeThunk',
	async (arg, thunkAPI) => {
		const boxId = arg.boxId
		const id = boxId + genRandomId()
		const { dispatch } = thunkAPI
		// const shelfTitle = getShelfTitleByShelfId(arg.shelfId)(getState())
		// console.log(shelfTitle)
		dispatch(toastsActions.addToast({
			id,
			toast: {
				status: 'pending',
				messageLoading: t('toast:messageLoading'),
				messageError: t('toast:messageError'),
				messageSuccess: t('toast:update_box_time.messageSuccess'),
				contentCommon: t('toast:update_box_time.additional'),
				// contentLoading: `${t('toast:update_box_time.additional')}`,
				// contentSuccess: `${t('toast:update_box_time.additional')} `,
				// contentError: `${t('toast:update_box_time.additional')}`,
				// duration: 1000000,
			}
		}))
		try {
			// await sleep()
			const response = Math.random() > 0
			// const response = Math.random() > 50
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error()
			}

			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return arg
		} catch (err) {
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения