import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { getShelfIdAndIndexesList, getShelfIdAndIndexesListInitial } from '../selectors/getCupboardShelfList'
import { isShelvesDndRepresentationEqual } from '../slice/cupboardShelfListSlice'
import { updateShelfListOrder } from '@/entities/Cupboard'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const updateShelfListOrderThunk = createAsyncThunk<boolean, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/updateShelfListOrderThunk',
	async (_, thunkAPI) => {

		const { dispatch, extra, getState } = thunkAPI
		const shelvesIdsAndIndexesCurrent = getShelfIdAndIndexesList(getState())
		const shelvesIdsAndIndexesInitial = getShelfIdAndIndexesListInitial(getState())
		// updateShelfListOrder
		try {
			if (!isShelvesDndRepresentationEqual(shelvesIdsAndIndexesInitial, shelvesIdsAndIndexesCurrent)) {
				// VAR: сделать запрос на обновление порядка полок, если ответ успешный, то заменить shelvesIdsAndIndexesInitial в шкафу.
				const response = await dispatch(updateShelfListOrder(shelvesIdsAndIndexesCurrent))
				console.log('!!!!!!!!!!!!', response)
				// console.log('!!!!!!!!!!!!!!!!!!')
				return true
			}
			console.log('ОНИ РАВНЫЕ@@@@@@@@@@')
			// просто выйти из функции, ничего не нужно менять порядок полок фронта === беку.
			return false
		} catch (err) {
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения