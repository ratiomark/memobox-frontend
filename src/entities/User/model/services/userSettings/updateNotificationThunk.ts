import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { NotificationSettings } from '../../types/userSettings'
import { rtkApiUpdateNotifications } from '../../api/userApi'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'
import { userActions } from '../../slice/userSlice'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const updateNotificationSettingsThunk = createAsyncThunk<NotificationSettings, NotificationSettings, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'user/updateNotificationSettingsThunk',
	async (notificationSettings, thunkAPI) => {
		const { dispatch, } = thunkAPI
		dispatch(userActions.setSettingsAwaitingResponse({ settings: 'notifications', isLoading: true }))
		dispatch(toastsActions.addToast({
			id: 'update-notification',
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
				id: 'update-notification',
				toast: { status: 'success' }
			}))
			dispatch(userActions.setSettingsAwaitingResponse({ settings: 'notifications', isLoading: false }))
			return response

		} catch (err) {
			thunkAPI.dispatch(toastsActions.updateToastById({
				id: 'update-notification',
				toast: { status: 'error' }
			}))
			dispatch(userActions.setSettingsAwaitingResponse({ settings: 'notifications', isLoading: false }))
			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения