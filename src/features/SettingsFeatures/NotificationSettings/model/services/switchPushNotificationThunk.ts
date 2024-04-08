
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { NotificationSettings, rtkApiSwitchPushNotification, rtkApiUpdateShelfTemplate, userActions } from '@/entities/User'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId'


// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const switchPushNotificationThunk = createAsyncThunk<void, boolean, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'user/subscribeToPush',
	async (pushSettingState, thunkAPI) => {
		const id = genRandomId()
		const { dispatch, getState, } = thunkAPI

		dispatch(toastsActions.addToast({
			id,
			toast: {
				status: 'pending',
				messageLoading: t('toast:messageLoading'),
				messageError: t('toast:messageError'),
				messageSuccess: t('toast:update_settings.messageSuccess'),
			}
		}))

		try {

			const notificationSettings = await dispatch(rtkApiSwitchPushNotification(pushSettingState)).unwrap()
			dispatch(userActions.setNotificationSettings(notificationSettings))

			// console.log(notificationSettings)

			// const currentShelfTemplate = getSettingsCurrentShelfTemplate(getState())
			// if (!currentShelfTemplate) return thunkAPI.rejectWithValue('Нет userData')

			// try {
			// 	const response = await dispatch(rtkApiUpdateShelfTemplate(currentShelfTemplate)).unwrap()
			// 	const shelfTemplateFromResponse = response.shelfTemplate

			// 	if (!shelfTemplateFromResponse) return thunkAPI.rejectWithValue('Нет userData')

			dispatch(toastsActions.updateToastById({
				id,
				toast: { status: 'success' }
			}))
			// 	dispatch(userActions.setSettingsAwaitingResponse({ settings: 'shelfTemplate', isLoading: false }))
			// 	dispatch(userActions.setSettingsShelfTemplate(shelfTemplateFromResponse))

			// dispatch(shelfBoxesTemplateSettingsActions.setInitialTemplate(shelfTemplateFromResponse))
			// return shelfTemplateFromResponse

		} catch (err) {
			thunkAPI.dispatch(toastsActions.updateToastById({
				id,
				toast: { status: 'error' }
			}))
			// dispatch(userActions.setSettingsAwaitingResponse({ settings: 'shelfTemplate', isLoading: false }))
			return thunkAPI.rejectWithValue('Some Error in switchPushNotificationThunk')
		}
	}
)
