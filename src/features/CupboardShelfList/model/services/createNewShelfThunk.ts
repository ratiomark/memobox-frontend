import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { getCupboard, getShelfIdAndIndexesList, getShelfIdAndIndexesListInitial } from '../selectors/getCupboardShelfList'
import { getCupboardState, isShelvesDndRepresentationEqual } from '../slice/cupboardShelfListSlice'
import { createNewShelf, updateShelfListOrder } from '@/entities/Cupboard'
import { ShelfSchema } from '@/entities/Shelf'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const createNewShelfThunk = createAsyncThunk<ShelfSchema[], string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/createNewShelfThunk',
	async (shelfName, thunkAPI) => {

		const { dispatch, getState } = thunkAPI
		try {
			// console.log('shelfName   ', shelfName)
			const response = await dispatch(createNewShelf(shelfName)).unwrap()
			if (!response) {
				throw new Error()
			}
			// console.log('НОВАЯ ПОЛКА', response)
			const shelves = getCupboardState.selectAll(getState()).map(shelf => ({
				...shelf,
				index: shelf.index + 1
			}))
			// console.log(shelves)
			return [response, ...shelves]

		} catch (err) {
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения