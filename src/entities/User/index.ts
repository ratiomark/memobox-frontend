export { loginUserByEmail as loginUserByUserName } from './model/services/loginUserByUserName';
export { registerUserByEmail as registerUserByUserName } from './model/services/registerUserByUserName';

export {
	rtkApiLoginUser as loginUser,
	rtkApiRegisterUser as registerUser
} from './model/api/userApi';

export type {
	AuthByEmailProps as LoginByUserNameProps
} from './model/api/userApi';

export { updateJsonSavedData } from './model/services/updateJsonSavedData';

export {
	getUserEmail,
	getUserEmailVerified,
	getUserName,
	getUserSubscriptionType,
	getUserSubscriptionExpiresAt,
} from './model/selectors/getUserProfileData';

export type { TimeSleepSettings, DaysOfWeek, TimeSleepDataObject, } from './model/types/user';
// export { DaysOfWeek, TimeSleepDataObject } from '@/features/SettingsFeatures/TimeSleepSettings/TimeSleepSettings';
export type { SortColumnObject, SortColumnValue } from './model/types/JsonSavedData';
export {
	getUserSettings,
	getUserMissedTrainingSettings,
	getUserNotificationSettings,
	getUserShelfTemplateSettings,
	getUserTimeSleepSettings,
} from './model/selectors/getUserSettings';

export {
	getJsonSavedData,
	getUserShelfNamesList,
	getUserSavedDataCommonShelfCollapsed,
	getUserSavedDataViewPageColumns,
	getUserSavedDataViewPageRowsCount,
} from './model/selectors/getJsonSavedData';
export { initAuthData } from './model/services/initAuthData';

export { saveJsonSettings } from './model/services/saveJsonSettings';
export { useJsonSettings } from './model/selectors/getJsonSettings';
export { getUserMounted } from './model/selectors/getUserMounted';
export { getUserAuthData } from './model/selectors/getUserAuthData';
export { userReducer, userActions } from './model/slice/userSlice';
export {
	getUserRoles,
	isUserAdmin,
	isUserManager,
} from './model/selectors/rolesSelector'
export type { UserSchema, User, UserRole } from './model/types/user';


