import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { rtkApiUnsubscribeDevicePushNotification, userActions } from '@/entities/User'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastsActions } from '@/shared/ui/Toast'
import { getDevicePushSubscription } from '@/shared/lib/helpers/SW/getDevicePushSubscription'
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId'
import { t } from 'i18next'


// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const unsubscribeFromPushThunk = createAsyncThunk<void, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'user/subscribeToPush',
	async (_, thunkAPI) => {
		const id = genRandomId()
		const { dispatch } = thunkAPI

		try {
			const subscription = await getDevicePushSubscription()
			if (!subscription) {
				return
			}
			dispatch(toastsActions.addToast({
				id,
				toast: {
					status: 'pending',
					messageLoading: t('toast:messageLoading'),
					messageError: t('toast:messageError'),
					messageSuccess: t('settings:device_push.disable'),
				}
			}))
			await dispatch(rtkApiUnsubscribeDevicePushNotification({ subscription }))
			dispatch(userActions.setPushNotificationIsSubscribed(false))

			dispatch(toastsActions.updateToastById({
				id,
				toast: { status: 'success' }
			}))
		} catch (err) {
			thunkAPI.dispatch(toastsActions.updateToastById({
				id,
				toast: { status: 'error' }
			}))
			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)