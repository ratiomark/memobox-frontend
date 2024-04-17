import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { rtkApiSetDefaultShelfTemplate, userActions } from '@/entities/User'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { settingsShelfTemplateActions } from '../slice/shelfTemplateSlice'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'

const id = 'set-default-shelf-template'
export const setDefaultShelfTemplateThunk = createAsyncThunk<void, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'settingsShelfTemplate/setDefaultShelfTemplateThunk',
	async (_, thunkAPI) => {

		const { dispatch } = thunkAPI
		dispatch(toastsActions.addToast({
			id,
			toast: {
				status: 'pending',
				messageLoading: t('toast:messageLoading'),
				messageError: t('toast:messageError'),
				messageSuccess: t('toast:update_settings.returnShelfTemplateDefault'),
			}
		}))
		try {

			// удаляет пользовательский шаблон из БД, тем самым оставляя только дефолтный
			const response = await dispatch(rtkApiSetDefaultShelfTemplate()).unwrap()

			const shelfTemplateFromResponse = response.shelfTemplate

			if (!shelfTemplateFromResponse) return thunkAPI.rejectWithValue('No shelfTemplate')

			// полностью заменяет данные на дефотный шаблон
			dispatch(userActions.setSettingsShelfTemplate(shelfTemplateFromResponse))
			dispatch(settingsShelfTemplateActions.setInitialTemplate(shelfTemplateFromResponse))
			dispatch(settingsShelfTemplateActions.reset())
			dispatch(toastsActions.updateToastById({
				id,
				toast: { status: 'success' }
			}))

		} catch (err) {
			dispatch(toastsActions.updateToastById({
				id,
				toast: { status: 'success' }
			}))
			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)