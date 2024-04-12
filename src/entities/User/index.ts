export { getIsUserDeviceSubscribedToPush, getUserPushNotificationPermission } from './model/selectors/getUserPushNotificaion';

export { getUserSettingsAwaitingResponse } from './model/selectors/getUserSettings';

export type { NotificationSettings, TimeSleepAtomicDataObject } from './model/types/userSettings';

export { updateNotificationSettingsThunk } from './model/services/userSettings/updateNotificationThunk';
export { updateJsonSavedDataThunk } from './model/services/updateJsonSavedData';

export { updateMissedTrainingThunk } from './model/services/userSettings/updateMissedTrainingThunk';
export { logoutThunk } from './model/services/logoutThunk';

export { daysOfWeek } from './model/const/daysOfWeek';

export { loginUserByEmailThunk } from './model/services/loginByEmailAndPassThunk';
export { registerByEmailThunk } from './model/services/registerByEmailThunk';

export {
	rtkApiLoginUser,
	rtkApiRegisterUser,
	useGetUserSettingsQuery,
	useUpdateMissedTrainingMutation,
	rtkApiUpdateShelfTemplate,
	rtkApiUpdateTimeSleep,
	rtkApiSetDefaultShelfTemplate,
	rtkApiUpdateNotifications,
	rtkApiSwitchPushNotification,
	rtkApiSubscribeDevicePushNotification,
	rtkApiUnsubscribeDevicePushNotification,
	useConfirmEmailMutation,
} from './model/api/userApi';

export type {
	UserSettings,
	MissedTrainingValue,
	TimeSleepSettings,
	DaysOfWeek,
} from './model/types/userSettings';


export type {
	RegisterByEmailProps as LoginByUserNameProps
} from './model/api/userApi';


export {
	getUserEmail,
	getUserEmailVerified,
	getUserName,
	getUserSubscriptionType,
	getUserSubscriptionExpiresAt,
} from './model/selectors/getUserProfileData';

// export type { TimeSleepSettings, DaysOfWeek, TimeSleepDataObject, } from './model/types/user';
// export { DaysOfWeek, TimeSleepDataObject } from '@/features/SettingsFeatures/TimeSleepSettings/TimeSleepSettings';
export type { SortColumnObject, SortColumnValue } from './model/types/JsonSavedData';
export {
	getUserSettings,
	getUserMissedTrainingSettings,
	getUserNotificationSettings,
	getUserShelfTemplateSettings,
	getUserTimeSleepSettings,
	getUserSettingsIsLoading,
	getUserNotificationEmailList,
} from './model/selectors/getUserSettings';

export {
	getJsonSavedData,
	getUserShelfNamesList,
	getUserSavedDataCommonShelfCollapsed,
	getUserSavedDataViewPageColumns,
	getUserSavedDataViewPageRowsCount,
	getUserSavedDataIsDelimiterEnabled,
	getUserSavedDataCupboard,
	getUserSavedDataIsStartTrainingHotKeyVisible,
} from './model/selectors/getJsonSavedData';

export { initAuthData } from './model/services/initAuthDataThunk';

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


