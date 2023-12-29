import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkExtraArg } from '@/app/providers/StoreProvider'
import { rtkApiSendTrainingAnswers } from '@/entities/Card'
import { TAG_CUPBOARD_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const sendTrainingAnswersThunk = createAsyncThunk<void, any, { rejectValue: string, extra: ThunkExtraArg }>(
	'slice/sendTrainingAnswersThunk',
	async (arg, thunkAPI) => {

		const { dispatch, extra, getState } = thunkAPI

		try {
			// const newArg = [...Object.entries(arg).map(([cardId, value]) => ({
			// 	...arg[cardId].card,
			// 	answer: arg[cardId].answer,
			// }))]
			// console.log(newArg)
			const response = dispatch(rtkApiSendTrainingAnswers(arg)).unwrap()
			dispatch(rtkApi.util.invalidateTags([TAG_CUPBOARD_PAGE]))
			console.log(response)



		} catch (err) {
			return thunkAPI.rejectWithValue('Some Error in sendTrainingAnswersThunk')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения