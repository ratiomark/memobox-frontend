import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { rtkApiSubscribeDevicePushNotification, rtkApiUpdateShelfTemplate, userActions } from '@/entities/User'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'
import { urlBase64ToUint8Array } from '@/shared/lib/helpers/SW/urlBase64ToUint8Array'
import { getBrowserAndOs } from '@/shared/lib/helpers/SW/getBrowserAndOs'
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId'
import { error } from 'console'

export const subscribeToPushThunk = createAsyncThunk<void, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'user/subscribeToPush',
	async (_, thunkAPI) => {

		const id = genRandomId()
		const { dispatch } = thunkAPI

		dispatch(toastsActions.addToast({
			id,
			toast: {
				status: 'pending',
				messageLoading: t('toast:messageLoading'),
				messageError: t('toast:messageError'),
				messageSuccess: t('settings:device_push.enable'),
			}
		}))

		try {
			const subscribeUserToPush = async () => {
				const browserOsData = getBrowserAndOs()
				const swRegistration = await navigator.serviceWorker.ready; // Убедитесь, что SW зарегистрирован
				// const permissionState = await swRegistration.pushManager.permissionState({ userVisibleOnly: true })
				const currentSubscription = await swRegistration.pushManager.getSubscription();
				// console.log('currentSubscription  ', currentSubscription)
				if (!currentSubscription) {
					const VAPID_PUBLIC_KEY = __VAPID_PUBLIC_KEY__
					const subscription = await swRegistration.pushManager.subscribe({
						userVisibleOnly: true,
						applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
					});
					await dispatch(rtkApiSubscribeDevicePushNotification({ subscription, ...browserOsData }))
					dispatch(userActions.setPushNotificationIsSubscribed(true))
					return
				}
				await dispatch(rtkApiSubscribeDevicePushNotification({ subscription: currentSubscription, ...browserOsData }))
				dispatch(userActions.setPushNotificationIsSubscribed(true))
			}

			const permission = await Notification.requestPermission()
			dispatch(userActions.setPushNotificationPermission(permission))

			if (permission === 'granted') {
				await subscribeUserToPush();
			} else if (permission === 'denied') {
				throw new Error(permission);
			}

			dispatch(toastsActions.updateToastById({
				id,
				toast: { status: 'success' }
			}))
		} catch (err) {
			if (isErrorPermissionDenied(err)) {
				console.log(err);
				thunkAPI.dispatch(toastsActions.updateToastById({
					id,
					toast: {
						status: 'error',
						messageError: 'Permission denied.'
					}
				}))
			}
			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)

function isErrorPermissionDenied(error: any): boolean {
	return (
		error !== null &&
		error instanceof Error &&
		error.message.includes('denied')
	);
}
// function isErrorPermissionDenied(error: any): boolean {
// 	return (
// 		error !== null &&
// 		typeof error === 'string' &&
// 		error.includes('denied')
// 	);
// }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const sub = () => {
// 		Notification.requestPermission().then((permission) => {
// 			if (permission === 'granted') {
// 				subscribeUserToPush();
// 			} else {
// 				console.log('Permission denied.');
// 			}
// 		});
// 	}

// 	async function unsubscribeFromPush() {
// 		const registration = await navigator.serviceWorker.ready;
// 		const subscription = await registration.pushManager.getSubscription();
// 		const api = import.meta.env.DEV
// 			? __API__
// 			: __API__BACK
// 		// Теперь отправьте объект подписки на ваш сервер
// 		if (!subscription) return
// 		await fetch(api + '/notifications/push/unsubscribe', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ subscription }),
// 		});
// 	}


// 	async function subscribeUserToPush() {
// 		const swRegistration = await navigator.serviceWorker.ready; // Убедитесь, что SW зарегистрирован
// 		const VAPID_PUBLIC_KEY = 'BN1AMPF6naRQmxIfr367bePCH_EM7o3q7bf61-CrYKWJJfqfpbUi5n30mFZCiGwggqI65Z4U96dDC7o61Zubric'
// 		const subscription = await swRegistration.pushManager.subscribe({
// 			userVisibleOnly: true,
// 			applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
// 		});
// 		const api = import.meta.env.DEV
// 			? __API__
// 			: __API__BACK
// 		// Теперь отправьте объект подписки на ваш сервер
// 		const userAgent = navigator.userAgent;
// 		let browserName = 'unknown';
// 		let osName = 'unknown';

// 		if (userAgent.match(/chrome|chromium|crios/i)) {
// 			browserName = 'chrome';
// 		} else if (userAgent.match(/firefox|fxios/i)) {
// 			browserName = 'firefox';
// 		} // Добавьте другие браузеры по необходимости
// 		console.log(userAgent)
// 		if (userAgent.match(/android/i)) {
// 			osName = 'android';
// 		} else if (userAgent.match(/iphone|ipad|ipod/i)) {
// 			osName = 'ios';
// 		} // Добавьте другие ОС по необходимости

// 		await fetch(api + '/notifications/push/subscribe', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ subscription, browserName, osName }),
// 		});
// 	}

// 	// Вспомогательная функция для преобразования VAPID ключа из URL-safe base64 в Uint8Array
// 	function urlBase64ToUint8Array(base64String: string) {
// 		const padding = '='.repeat((4 - base64String.length % 4) % 4);
// 		const base64 = (base64String + padding)
// 			.replace(/\-/g, '+')
// 			.replace(/_/g, '/');

// 		const rawData = window.atob(base64);
// 		const outputArray = new Uint8Array(rawData.length);

// 		for (let i = 0; i < rawData.length; ++i) {
// 			outputArray[i] = rawData.charCodeAt(i);
// 		}
// 		return outputArray;
// 	}