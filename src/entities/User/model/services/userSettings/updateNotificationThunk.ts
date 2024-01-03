import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { NotificationSettings } from '../../types/userSettings'
import { rtkApiUpdateNotifications } from '../../api/userApi'
import { userActions } from '../../slice/userSlice'
import { t } from 'i18next'

const toastId = 'update-notification'
export const updateNotificationSettingsThunk = createAsyncThunk<NotificationSettings, NotificationSettings, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'user/updateNotificationSettingsThunk',
	async (notificationSettings, thunkAPI) => {
		const { dispatch, } = thunkAPI
		dispatch(userActions.setSettingsAwaitingResponse({ settings: 'notifications', isLoading: true }))
		dispatch(toastsActions.addToast({
			id: toastId,
			toast: {
				status: 'pending',
				messageLoading: t('toast:messageLoading'),
				messageError: t('toast:messageError'),
				messageSuccess: t('toast:update_settings.messageSuccess'),
			}
		}))
		try {
			const response = await dispatch(rtkApiUpdateNotifications(notificationSettings)).unwrap()

			dispatch(toastsActions.updateToastById({
				id: toastId,
				toast: { status: 'success' }
			}))
			dispatch(userActions.setSettingsAwaitingResponse({ settings: 'notifications', isLoading: false }))
			return response

		} catch (err) {
			thunkAPI.dispatch(toastsActions.updateToastById({
				id: toastId,
				toast: { status: 'error' }
			}))
			dispatch(userActions.setSettingsAwaitingResponse({ settings: 'notifications', isLoading: false }))
			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)