import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsUserDeviceSubscribedToPush = (state: StateSchema) => state.user.pushNotification.isDeviceSubscribed
export const getUserPushNotificationPermission = (state: StateSchema) => state.user.pushNotification.permission
