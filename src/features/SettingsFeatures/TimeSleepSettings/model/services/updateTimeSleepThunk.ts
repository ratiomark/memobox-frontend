import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getCurrentTimeSleepSettings } from '../selectors/settingsTimeSleep'
import { TimeSleepSettings, rtkApiUpdateTimeSleep } from '@/entities/User'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'
// import { mapHoursMinutesObjectToStartTimeString } from '@/shared/lib/helpers/mappers/mapHoursMinutesObjectToStartTimeString'
const dayByDaySleepPeriods = {
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: [],
	saturday: [],
	sunday: [],
}
// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
const id = 'update-time-sleep-settings'
export const updateTimeSleepThunk = createAsyncThunk<void, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'user/updateTimeSleepThunk',
	async (_, thunkAPI) => {

		const { dispatch, getState, } = thunkAPI
		const currentTimeSleepSettings = getCurrentTimeSleepSettings(getState())
		const timeSleepSettingsBackendRequest = { ...currentTimeSleepSettings }
		timeSleepSettingsBackendRequest.dayByDaySleepPeriods = {
			...dayByDaySleepPeriods,
			...timeSleepSettingsBackendRequest.dayByDaySleepPeriods
		}
		dispatch(toastsActions.addToast({
			id,
			toast: {
				status: 'pending',
				messageLoading: t('toast:messageLoading'),
				messageError: t('toast:messageError'),
				messageSuccess: t('toast:update_settings.messageSuccess'),
			}
		}))
		console.log(timeSleepSettingsBackendRequest)
		// const currentUserSettings = getJsonSettings(getState())

		// if (!userData) return thunkAPI.rejectWithValue('Нет userData')

		try {
			const response = await dispatch(rtkApiUpdateTimeSleep(timeSleepSettingsBackendRequest as TimeSleepSettings)).unwrap() //разворачиваю в реальный результат
			// console.log(response)
			dispatch(toastsActions.updateToastById({
				id,
				toast: { status: 'success' }
			}))

			return

		} catch (err) {
			dispatch(toastsActions.updateToastById({
				id,
				toast: { status: 'success' }
			}))
			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения