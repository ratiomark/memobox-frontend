import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { getShelfIdAndIndexesList, getShelfIdAndIndexesListInitial } from '../selectors/getCupboardShelfList'
import { cupboardShelfListActions, isShelvesDndRepresentationEqual } from '../slice/cupboardShelfListSlice'
import { rtkToggleShelfNotification, rtkUpdateShelfListOrder } from '@/entities/Shelf'
import { TAG_VIEW_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'
import { getNotificationModalShelfId, getShelfNotificationSetting } from '../selectors/getNotificationShelfModal'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const updateShelfNotificationThunk = createAsyncThunk<void, void, { rejectValue: string; extra: ThunkExtraArg; state: StateSchema }>(
	'cupboardPage/updateShelfListOrderThunk',
	async (_, thunkAPI) => {
		const { dispatch, extra, getState } = thunkAPI
		const shelfId = getNotificationModalShelfId(getState())
		const notificationEnabled = getShelfNotificationSetting(getState())
		try {
			await dispatch(rtkToggleShelfNotification({ shelfId, notificationEnabled: !notificationEnabled })).unwrap()
			dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { notificationEnabled: !notificationEnabled } }))
			// dispatch(rtkApi.util.invalidateTags([TAG_VIEW_PAGE]))
			// console.log('!!!!!!!!!!!!', response)
			// console.log('!!!!!!!!!!!!!!!!!!')
		} catch (err) {
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения
