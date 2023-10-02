import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { MissedTrainingValue } from '@/shared/types/DataBlock'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId'
import { updateShelfWithTag } from '@/entities/Shelf'
import { updateBoxWithTag } from '@/entities/Box'
import { getShelfTitleByShelfId } from '../selectors/getCupboardShelfList'

export interface UpdateMissedTrainingThunkArg {
	missedTrainingValue: MissedTrainingValue
	boxId?: string
	shelfId: string
}
export const updateMissedTrainingThunk = createAsyncThunk<UpdateMissedTrainingThunkArg, UpdateMissedTrainingThunkArg, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/updateMissedTrainingThunk',
	async (arg, thunkAPI) => {
		const { boxId, shelfId, missedTrainingValue } = arg
		const id = shelfId + genRandomId()
		const { dispatch, getState } = thunkAPI
		const shelfTitle = getShelfTitleByShelfId(shelfId)(getState())
		dispatch(toastsActions.addToast({
			id,
			toast: {
				status: 'pending',
				messageLoading: t('toast:messageLoading'),
				messageError: t('toast:messageError'),
				messageSuccess: t('toast:update_missed_training.messageSuccess'),
				contentCommon: `${t('toast:update_missed_training.additional')} ${shelfTitle}`,
				// duration: 1000000,
			}
		}))
		try {
			await sleep(4)
			const response = boxId
				? dispatch(updateBoxWithTag({ shelfId, box: { missedTrainingValue, id: boxId } })).unwrap()
				: dispatch(updateShelfWithTag({ id: shelfId, missedTrainingValue })).unwrap()

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