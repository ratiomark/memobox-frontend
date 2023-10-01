import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { ShelfSchema } from '@/entities/Shelf'
import { localDataService } from '@/shared/lib/helpers/common/localDataService'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const setLocalShelvesToStore = createAsyncThunk<ShelfSchema[], void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/setLocalShelvesToStore',
	async (_, thunkAPI) => {

		try {
			return localDataService.getShelves()
		} catch (err) {
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения