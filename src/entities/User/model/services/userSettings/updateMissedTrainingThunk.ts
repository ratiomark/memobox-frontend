import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { rtkApiUpdateMissedTraining } from '../../api/userApi'
import { MissedTrainingValue } from '../../types/userSettings'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'
import { userActions } from '../../slice/userSlice'

const toastId = 'update-missedTraining'
export const updateMissedTrainingThunk = createAsyncThunk<MissedTrainingValue, { missedTraining: MissedTrainingValue }, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'user/updateMissedTrainingThunk',
	async ({ missedTraining }, thunkAPI) => {

		const { dispatch, getState, } = thunkAPI
		dispatch(userActions.setSettingsAwaitingResponse({ settings: 'missedTraining', isLoading: true }))
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
			const response = await dispatch(rtkApiUpdateMissedTraining({ missedTraining })).unwrap() //
			dispatch(userActions.setSettingsAwaitingResponse({
				settings: 'missedTraining',
				isLoading: false
			}))
			dispatch(toastsActions.updateToastById({
				id: toastId,
				toast: { status: 'success' }
			}))
			console.log(response)
			return response.missedTraining

		} catch (err) {
			dispatch(userActions.setSettingsAwaitingResponse({
				settings: 'missedTraining',
				isLoading: false
			}))
			dispatch(toastsActions.updateToastById({
				id: toastId,
				toast: { status: 'error' }
			}))
			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения