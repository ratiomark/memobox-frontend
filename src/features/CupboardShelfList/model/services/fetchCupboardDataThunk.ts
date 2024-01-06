import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { CupboardSchema, rtkApiGetCupboard } from '@/entities/Cupboard'
import { getUserSavedDataCommonShelfCollapsed } from '@/entities/User'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { cupboardShelfListActions } from '../slice/cupboardShelfListSlice'
import { getIsCupboardFirstRender } from '../selectors/getCupboardShelfList'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const fetchCupboardDataThunk = createAsyncThunk<CupboardSchema,  CupboardSchema, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/fetchCupboardDataThunk',
	async (cupboardData, thunkAPI) => {
		// const { cupboard: cupboardData, requestId } = arg
		const { dispatch, getState } = thunkAPI
		const isFirstRender = getIsCupboardFirstRender(getState())
		try {
			// console.log(requestId === getState().cupboard?.lastRequestId)
			// console.log(requestId)
			// console.log(getState().cupboard?.lastRequestId)

			const isCommonShelfCollapsed = getUserSavedDataCommonShelfCollapsed(getState())
			// console.log('cupboardData', cupboardData)
			const commonShelf = { ...cupboardData.commonShelf }
			commonShelf.isCollapsed = isCommonShelfCollapsed
			// dispatch(cupboardShelfListActions.setCommonShelf(commonShelf))

			const arrayOfIds = cupboardData.shelves.map((shelf) => shelf.id)
			const entities = getState().cupboard?.entities
			console.log(entities)
			const allIdsMatch = arrayOfIds.every(id => id in entities);
			if (!isFirstRender && allIdsMatch) {
				dispatch(cupboardShelfListActions.setCommonShelf(commonShelf))
				throw new Error('Aborted - shelves data is already in store')
			}
			// dispatch(cupboardShelfListActions.setLastRequestId(requestId))
			// const response = await dispatch(rtkApiGetCupboard()).unwrap()
			// dispatch(cupboardShelfListActions.setIsCupboardRefetching(true))
			// await sleep(1)
			// const isCommonShelfCollapsed = getUserSavedDataCommonShelfCollapsed(getState())
			// // console.log('cupboardData', cupboardData)
			// const commonShelf = { ...cupboardData.commonShelf }
			// commonShelf.isCollapsed = isCommonShelfCollapsed
			// dispatch(cupboardShelfListActions.setCommonShelf(commonShelf))

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