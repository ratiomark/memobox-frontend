import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { rtkApiUpdateShelfTemplate, userActions } from '@/entities/User'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'


// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const subscribeToPushThunk = createAsyncThunk<void, void, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'user/subscribeToPush',
	async (_, thunkAPI) => {

		const { dispatch, getState, } = thunkAPI
		// dispatch(userActions.setSettingsAwaitingResponse({ settings: 'shelfTemplate', isLoading: true }))
		// dispatch(toastsActions.addToast({
		// 	id: 'update-shelfTemplate',
		// 	toast: {
		// 		status: 'pending',
		// 		messageLoading: t('toast:messageLoading'),
		// 		messageError: t('toast:messageError'),
		// 		messageSuccess: t('toast:update_settings.messageSuccess'),
		// 	}
		// }))

		try {
			Notification.requestPermission().then((permission) => {
				if (permission === 'granted') {
					subscribeUserToPush();
				} else if (permission === 'denied') {
					console.log('Permission denied!!!');
				}
			});

			const subscribeUserToPush = async () => {
				const swRegistration = await navigator.serviceWorker.ready; // Убедитесь, что SW зарегистрирован
				const VAPID_PUBLIC_KEY = __VAPID_PUBLIC_KEY__
				const subscription = await swRegistration.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
				});
				const api = import.meta.env.DEV
					? __API__
					: __API__BACK
				// Теперь отправьте объект подписки на ваш сервер
				const userAgent = navigator.userAgent;
				let browserName = 'unknown';
				let osName = 'unknown';

				if (userAgent.match(/chrome|chromium|crios/i)) {
					browserName = 'chrome';
				} else if (userAgent.match(/firefox|fxios/i)) {
					browserName = 'firefox';
				} // Добавьте другие браузеры по необходимости
				console.log(userAgent)
				if (userAgent.match(/android/i)) {
					osName = 'android';
				} else if (userAgent.match(/iphone|ipad|ipod/i)) {
					osName = 'ios';
				} // Добавьте другие ОС по необходимости

				await fetch(api + '/notifications/push/subscribe', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ subscription, browserName, osName }),
				});
			}

			// Вспомогательная функция для преобразования VAPID ключа из URL-safe base64 в Uint8Array
			const urlBase64ToUint8Array = (base64String: string) => {
				const padding = '='.repeat((4 - base64String.length % 4) % 4);
				const base64 = (base64String + padding)
					.replace(/\-/g, '+')
					.replace(/_/g, '/');

				const rawData = window.atob(base64);
				const outputArray = new Uint8Array(rawData.length);

				for (let i = 0; i < rawData.length; ++i) {
					outputArray[i] = rawData.charCodeAt(i);
				}
				return outputArray;
			}
			// const currentShelfTemplate = getSettingsCurrentShelfTemplate(getState())
			// if (!currentShelfTemplate) return thunkAPI.rejectWithValue('Нет userData')

			// try {
			// 	const response = await dispatch(rtkApiUpdateShelfTemplate(currentShelfTemplate)).unwrap()
			// 	const shelfTemplateFromResponse = response.shelfTemplate

			// 	if (!shelfTemplateFromResponse) return thunkAPI.rejectWithValue('Нет userData')

			// 	dispatch(toastsActions.updateToastById({
			// 		id: 'update-shelfTemplate',
			// 		toast: { status: 'success' }
			// 	}))
			// 	dispatch(userActions.setSettingsAwaitingResponse({ settings: 'shelfTemplate', isLoading: false }))
			// 	dispatch(userActions.setSettingsShelfTemplate(shelfTemplateFromResponse))

			// dispatch(shelfBoxesTemplateSettingsActions.setInitialTemplate(shelfTemplateFromResponse))
			// return shelfTemplateFromResponse

		} catch (err) {
			// thunkAPI.dispatch(toastsActions.updateToastById({
			// 	id: 'update-shelfTemplate',
			// 	toast: { status: 'error' }
			// }))
			// dispatch(userActions.setSettingsAwaitingResponse({ settings: 'shelfTemplate', isLoading: false }))
			return thunkAPI.rejectWithValue('Some Error in saveJsonSettings')
		}
	}
)


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