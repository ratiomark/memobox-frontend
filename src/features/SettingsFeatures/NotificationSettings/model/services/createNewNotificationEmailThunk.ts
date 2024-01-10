// import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
// import { createAsyncThunk } from '@reduxjs/toolkit'

// import { toastsActions } from '@/shared/ui/Toast'
// import { t } from 'i18next'

// // createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
// const toastId = 'update-notification-add-email'
// export const createNewNotificationEmailThunk = createAsyncThunk<NotificationSettings, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
// 	'user/createNewNotificationEmailThunk',
// 	async (notificationSettings, thunkAPI) => {
// 		const { dispatch, getState } = thunkAPI
// 		// getState()
// 		// dispatch(userActions.setSettingsAwaitingResponse({ settings: 'notifications', isLoading: true }))
// 		// dispatch(toastsActions.addToast({
// 		// 	id: toastId,
// 		// 	toast: {
// 		// 		status: 'pending',
// 		// 		messageLoading: t('toast:messageLoading'),
// 		// 		messageError: t('toast:messageError'),
// 		// 		messageSuccess: t('toast:update_settings.messageSuccess'),
// 		// 	}
// 		// }))
// 		try {
// 			const response = await dispatch(rtkApiAddNotificationEmail(notificationSettings)).unwrap()

// 			dispatch(toastsActions.updateToastById({
// 				id: toastId,
// 				toast: { status: 'success' }
// 			}))
// 			dispatch(userActions.setSettingsAwaitingResponse({ settings: 'notifications', isLoading: false }))
// 			return response

// 		} catch (err) {
// 			thunkAPI.dispatch(toastsActions.updateToastById({
// 				id: toastId,
// 				toast: { status: 'error' }
// 			}))
// 			dispatch(userActions.setSettingsAwaitingResponse({ settings: 'notifications', isLoading: false }))
// 			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
// 		}
// 	}
// )

// // createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения