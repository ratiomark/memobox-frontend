import { StateSchema } from '@/app/providers/StoreProvider';
// import { notificationsMock, shelfTemplateMock, timeSleepMock } from '../mockData/userSettingsData';

export const getUserSettings = (state: StateSchema) => state.user.userSettings

export const getUserMissedTrainingSettings = (state: StateSchema) => state.user?.userSettings?.missedTraining

export const getUserNotificationSettings = (state: StateSchema) => state.user?.userSettings?.notifications
export const getUserNotificationEmailList = (state: StateSchema) => state.user?.userSettings?.notifications.notificationEmails

export const getUserShelfTemplateSettings = (state: StateSchema) => state.user?.userSettings?.shelfTemplate

export const getUserTimeSleepSettings = (state: StateSchema) => state.user.userSettings?.timeSleep
export const getUserSettingsIsLoading = (state: StateSchema) => state.user.userSettingsIsLoading

export const getUserSettingsAwaitingResponse = (state: StateSchema) => state.user.userSettingsAwaitingResponseObject


// export const getIsDevicePushEnable = async () => {
// 	const registration = await navigator.serviceWorker.ready;
// 	const subscription = await registration.pushManager.getSubscription();
// 	const api = import.meta.env.DEV
// 		? __API__
// 		: __API__BACK
// 	// Теперь отправьте объект подписки на ваш сервер

// 	await fetch(api + '/notifications/push/unsubscribe', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify({ subscription }),
// 	});
// }

// export const getDeviceSubscriptionEndpoint = async (): Promise<string | null > => {
// 	const registration = await navigator.serviceWorker.ready;
// 	const subscription = await registration.pushManager.getSubscription();
// 	return subscription?.endpoint ?? null
// }



// export const getUserMissedTrainingSettings = (state: StateSchema) => state.user.userSettings?.missedTrainingValue ?? 'none'
// export const getUserNotificationSettings = (state: StateSchema) => state.user.userSettings?.notifications ?? notificationsMock
// export const getUserShelfTemplateSettings = (state: StateSchema) => state.user.userSettings?.shelfTemplate ?? shelfTemplateMock
// export const getUserTimeSleepSettings = (state: StateSchema) => state.user.userSettings?.timeSleep ?? timeSleepMock

// export const getUserShelfTemplateSettings = (state: StateSchema) => state.user.authData?.userSetting.shelfTemplate
// export const getUserMissedTrainingSettings = (state: StateSchema) => state.user.authData?.userSetting.missedTrainingValue
// import { StateSchema } from '@/app/providers/StoreProvider';
// export const getUserSettings = (state: StateSchema) => state.user.authData?.userSettings
// export const getUserMissedTrainingSettings = (state: StateSchema) => state.user.authData?.userSettings.missedTrainingValue ?? 'none'
// export const getUserNotificationSettings = (state: StateSchema) => state.user.authData?.userSettings.notifications
// export const getUserShelfTemplateSettings = (state: StateSchema) => state.user.authData?.userSettings.shelfTemplate
// export const getUserTimeSleepSettings = (state: StateSchema) => state.user.authData?.userSettings.timeSleep
// // export const getUserShelfTemplateSettings = (state: StateSchema) => state.user.authData?.userSetting.shelfTemplate
// // export const getUserMissedTrainingSettings = (state: StateSchema) => state.user.authData?.userSetting.missedTrainingValue