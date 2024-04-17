import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { rtkApiUpdateShelfTemplate, userActions } from '@/entities/User'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getSettingsCurrentShelfTemplate } from '../selectors/settingsShelfTemplate'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'
import { settingsShelfTemplateActions } from '../slice/shelfTemplateSlice'


// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
const id = 'update-shelf-template-settings'
export const updateShelfTemplateThunk = createAsyncThunk<void, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'settingsShelfTemplate/updateShelfTemplateThunk',
	async (_, thunkAPI) => {

		const { dispatch, getState, } = thunkAPI
		dispatch(userActions.setSettingsAwaitingResponse({ settings: 'shelfTemplate', isLoading: true }))
		dispatch(toastsActions.addToast({
			id,
			toast: {
				status: 'pending',
				messageLoading: t('toast:messageLoading'),
				messageError: t('toast:messageError'),
				messageSuccess: t('toast:update_settings.messageSuccess'),
			}
		}))

		const currentShelfTemplate = getSettingsCurrentShelfTemplate(getState())
		if (!currentShelfTemplate) return thunkAPI.rejectWithValue('Нет userData')

		try {
			const response = await dispatch(rtkApiUpdateShelfTemplate(currentShelfTemplate)).unwrap()
			const shelfTemplateFromResponse = response.shelfTemplate

			if (!shelfTemplateFromResponse) return thunkAPI.rejectWithValue('Нет userData')

			dispatch(toastsActions.updateToastById({
				id,
				toast: { status: 'success' }
			}))
			dispatch(userActions.setSettingsAwaitingResponse({ settings: 'shelfTemplate', isLoading: false }))
			dispatch(userActions.setSettingsShelfTemplate(shelfTemplateFromResponse))
			dispatch(settingsShelfTemplateActions.setInitialTemplate(shelfTemplateFromResponse))
			dispatch(settingsShelfTemplateActions.reset())
			// dispatch(shelfBoxesTemplateSettingsActions.setInitialTemplate(shelfTemplateFromResponse))
			// return shelfTemplateFromResponse

		} catch (err) {
			thunkAPI.dispatch(toastsActions.updateToastById({
				id,
				toast: { status: 'error' }
			}))
			dispatch(userActions.setSettingsAwaitingResponse({ settings: 'shelfTemplate', isLoading: false }))
			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)
