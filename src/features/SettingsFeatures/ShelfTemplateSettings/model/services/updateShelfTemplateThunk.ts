import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { rtkApiUpdateShelfTemplate, userActions } from '@/entities/User'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSettingsCurrentShelfTemplate } from '../selectors/settingsShelfTemplate'


// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const updateShelfTemplateThunk = createAsyncThunk<void, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'settingsShelfTemplate/updateShelfTemplateThunk',
	async (_, thunkAPI) => {

		const { dispatch, getState, } = thunkAPI
		const currentShelfTemplate = getSettingsCurrentShelfTemplate(getState())

		if (!currentShelfTemplate) return thunkAPI.rejectWithValue('Нет userData')

		try {
			const response = await dispatch(rtkApiUpdateShelfTemplate(currentShelfTemplate)).unwrap() 
			const shelfTemplateFromResponse = response.shelfTemplate

			if (!shelfTemplateFromResponse) return thunkAPI.rejectWithValue('Нет userData')
			dispatch(userActions.setSettingsShelfTemplate(shelfTemplateFromResponse))
			// dispatch(shelfBoxesTemplateSettingsActions.setInitialTemplate(shelfTemplateFromResponse))
			// return shelfTemplateFromResponse

		} catch (err) {
			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)
