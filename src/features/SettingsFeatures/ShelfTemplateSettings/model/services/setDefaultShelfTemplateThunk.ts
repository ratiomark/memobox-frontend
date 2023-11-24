import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { rtkApiSetDefaultShelfTemplate, userActions } from '@/entities/User'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { settingsShelfTemplateActions } from '../slice/shelfTemplateSlice'

export const setDefaultShelfTemplateThunk = createAsyncThunk<void, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'settingsShelfTemplate/setDefaultShelfTemplateThunk',
	async (_, thunkAPI) => {

		const { dispatch } = thunkAPI

		try {

			// удаляет пользовательский шаблон из БД, тем самым оставляя только дефолтный
			const response = await dispatch(rtkApiSetDefaultShelfTemplate()).unwrap()

			const shelfTemplateFromResponse = response.shelfTemplate

			if (!shelfTemplateFromResponse) return thunkAPI.rejectWithValue('No shelfTemplate')

			// полностью заменяет данные на дефотный шаблон
			dispatch(userActions.setSettingsShelfTemplate(shelfTemplateFromResponse))
			dispatch(settingsShelfTemplateActions.setInitialTemplate(shelfTemplateFromResponse))
			dispatch(settingsShelfTemplateActions.reset())


		} catch (err) {
			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)