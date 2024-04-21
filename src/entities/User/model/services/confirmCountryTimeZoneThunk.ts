import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkExtraArg } from '@/app/providers/StoreProvider'
import i18n from '@/shared/config/i18n/i18n'
import { RegisterByEmailProps, UserWithToken, rtkApiConfirmCountryTimeZone, rtkApiRegisterUser, userApi, } from '../api/userApi'
import { userActions } from '../slice/userSlice'
import { loginUserByEmailThunk } from './loginByEmailAndPassThunk'
import { localDataService } from '@/shared/lib/helpers/common/localDataService'
import { updateJsonSettingsThunk } from './updateJsonSettingsThunk'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const confirmCountryTimeZoneThunk = createAsyncThunk<null, { country: string, timezone: string }, { rejectValue: string, extra: ThunkExtraArg }>(
	'user/confirmCountryTimeZoneThunk',
	async ({ country, timezone }, thunkAPI) => {
		try {
			const { dispatch } = thunkAPI;

			const response = await dispatch(
				rtkApiConfirmCountryTimeZone({ country, timezone, userId: localDataService.getUserId() })
			).unwrap()

			console.log(response)

			return null;
	
		} catch (error) {
			// Обработка ошибок
			// Если ошибка содержит структуру, определённую RTK Query (например, error.status), можно использовать её
			if (isErrorWithStatus(error)) {
				console.log('Ошибка при обновлении страны и часового пояса: ', error.status, error.data);
				// можно использовать error.data для получения тела ответа сервера, если сервер отправляет полезные данные об ошибке
			}
			else {
				console.log('Неизвестная ошибка при регистрации', error);
			}
			return thunkAPI.rejectWithValue('error on login');
		}
	}
);

interface CustomError {
	status?: number;
	data?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorWithStatus(error: any): error is CustomError {
	return 'status' in error;
}

