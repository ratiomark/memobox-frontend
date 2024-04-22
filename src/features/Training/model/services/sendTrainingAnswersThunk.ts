import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { rtkApiSendTrainingAnswers } from '@/entities/Card'
import { TAG_CUPBOARD_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'
import { getAnswersObject } from '../selectors/getTraining'
import { mapCardsObjectToCardAfterTraining } from '@/shared/lib/helpers/mappers/mapCardsObjectToCardAfterTraining'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const sendTrainingAnswersThunk = createAsyncThunk<void, void, { rejectValue: string; extra: ThunkExtraArg; state: StateSchema }>(
	'slice/sendTrainingAnswersThunk',
	async (_, thunkAPI) => {
		const { dispatch, extra, getState } = thunkAPI
		const answersObject = getAnswersObject(getState())
		try {
			
			if (!answersObject) return
			const userResponses = mapCardsObjectToCardAfterTraining(answersObject)
			const response = dispatch(rtkApiSendTrainingAnswers(userResponses)).unwrap()
			
			dispatch(rtkApi.util.invalidateTags([TAG_CUPBOARD_PAGE]))
			console.log(response)
		} catch (err) {
			return thunkAPI.rejectWithValue('Some Error in sendTrainingAnswersThunk')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения
