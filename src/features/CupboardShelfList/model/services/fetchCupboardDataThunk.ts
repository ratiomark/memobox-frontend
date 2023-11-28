import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { CupboardSchema, rtkApiGetCupboard } from '@/entities/Cupboard'
import { getUserSavedDataCommonShelfCollapsed } from '@/entities/User'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const fetchCupboardDataThunk = createAsyncThunk<CupboardSchema, CupboardSchema, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/fetchCupboardDataThunk',
	async (cupboardData, thunkAPI) => {

		const { dispatch, getState } = thunkAPI

		try {
			// const response = await dispatch(rtkApiGetCupboard()).unwrap()


			const isCommonShelfCollapsed = getUserSavedDataCommonShelfCollapsed(getState())

			const commonShelf = { ...cupboardData.commonShelf }
			commonShelf.isCollapsed = isCommonShelfCollapsed

			return { ...cupboardData, commonShelf }

		} catch (err) {
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения
// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
// import { CupboardSchema, rtkApiGetCupboard } from '@/entities/Cupboard'
// import { getUserSavedDataCommonShelfCollapsed } from '@/entities/User'

// // createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
// export const fetchCupboardDataThunk = createAsyncThunk<CupboardSchema, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
// 	'cupboardPage/fetchCupboardDataThunk',
// 	async (_, thunkAPI) => {

// 		const { dispatch, getState } = thunkAPI

// 		try {
// 			const response = await dispatch(rtkApiGetCupboard()).unwrap()

// 			if (!response) {
// 				throw new Error()
// 			}

// 			const isCommonShelfCollapsed = getUserSavedDataCommonShelfCollapsed(getState())

// 			const commonShelf = { ...response.commonShelf }
// 			commonShelf.isCollapsed = isCommonShelfCollapsed

// 			return { ...response, commonShelf }

// 		} catch (err) {
// 			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
// 		}
// 	}
// )

// // createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения