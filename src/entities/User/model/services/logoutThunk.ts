import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkExtraArg } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { rtkApiLogout, } from '../api/userApi'
import { userActions } from '../slice/userSlice'
import { isRefreshResponse } from '@/shared/api/helpers/checkResponse'
import { localDataService } from '@/shared/lib/helpers/common/localDataService'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'


const id = 'logoutThunk'
export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string, extra: ThunkExtraArg }>(
	'user/logoutThunk',
	async (_, thunkAPI) => {

		try {
			const { dispatch } = thunkAPI
			dispatch(
				toastsActions.addToast({
					id,
					toast: {
						status: 'pending',
						messageLoading: t('toast:logout.messageLoading'),
						messageError: t('toast:messageError'),
						messageSuccess: t('toast:logout.messageSuccess'),
						contentError: t('toast:logout.contentError'),
					},
				})
			)

			const res = await dispatch(rtkApiLogout()).unwrap()

			if (!('count' in res)) {
				throw new Error('logout error')
			}

			localDataService.logout()
			dispatch(userActions.logout())
			dispatch(
				toastsActions.updateToastById({
					id,
					toast: { status: 'success' }
				}))

		} catch (err) {
			thunkAPI.dispatch(
				toastsActions.updateToastById({
					id,
					toast: { status: 'error' }
				}))
			return thunkAPI.rejectWithValue(i18n.t('error on logout'))
		}
	}
)