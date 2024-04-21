import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
// import { clientsClaim } from 'workbox-core';
// import { NavigationRoute, registerRoute } from 'workbox-routing';
import image from '@/shared/assets/images/emailConfirmed.png';
declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('message', (event) => {
	console.log('Service Worker: Message...', event);
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

self.addEventListener('install', (event) => {
	console.log('Service Worker: Installing...', event);
	event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
	console.log('Service Worker: Activating...', event);
	event.waitUntil(self.clients.claim());
	event.waitUntil(self.clients.matchAll().then((clients) => {
		clients.forEach((client) => {
			client.postMessage({ type: 'SW_UPDATED' });
		});
	}));
});
// self.addEventListener('activate', function (event) {
// 	console.log('Service Worker: Activating...', event);
// 	// Дополнительная логика для стадии activation
// });

self.addEventListener('fetch', function (event) {
	// console.log('Service Worker: Fetching...', event.request);
	// console.log('Service Worker: Fetching...', event.request.url);
	// Дополнительная логика для стадии fetch
});


type PushNotificationTag = 'trainingNotification' | 'subscriptionNotification';

interface PushNotificationBasePayload {
	tag: PushNotificationTag;
	title: string;
	body: string;
	icon?: string;
	image?: string;
	badge?: string;
	data?: {
		firstName?: string;
		url?: string;
	};
}

export interface PushTrainingNotificationPayload
	extends PushNotificationBasePayload {
	data: {
		url: '/training/all/all';
	};
}


// использовать image, icon, badge по умолчанию
self.addEventListener('push', event => {

	try {

		console.log('Service Worker: Push event...', event);
		const payload = event?.data?.json() as PushNotificationBasePayload
		console.log('Service Worker: Push payload', payload);
		const {
			title = 'Test title',
			body = 'Test body',
			icon,
			data,
			tag,
		} = payload;
		// console.log(data)
		// console.log(icon)
		const options: NotificationOptions = {
			body,
			tag,
			icon,
			data,
			renotify: true,
			// image: icon,
			// badge,
			// icon: image,
			// actions: [
			// 	{ action: 'view', title: 'Просмотреть' },
			// 	{ action: 'dismiss', title: 'Отложить на 4 часа' }
			// ],
			// data: {
			// 	// notificationId: '123',

			// 	url: '/training/all/all'
			// }
			// icon: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg'
		};

		// event.waitUntil(self.registration.showNotification(title, options));
		// const options = {
		// 	body,
		// 	icon: `path/to/${icon}`, // Укажите правильный путь к иконке
		// };

		event.waitUntil(self.registration.showNotification(title, options));
	} catch (error) {
		console.error('Service Worker: Error in push event handler', error);
	}
});

function handleTrainingNotification(notification: PushTrainingNotificationPayload) {
	return self.clients.matchAll({ type: 'window' }).then(_ => {
		const relativeUrl = notification.data.url;
		return self.clients.openWindow(relativeUrl);
	});
}
// function handleTrainingNotification(notification: PushTrainingNotificationPayload) {
// 	return self.clients.matchAll({ type: 'window' }).then(windowClients => {
// 		const relativeUrl = notification.data.url;
// 		for (const client of windowClients) {
// 			const clientUrl = new URL(client.url);
// 			const expectedUrl = new URL(relativeUrl, clientUrl.origin); // Используем origin от текущего клиента
// 			// console.log(clientUrl)
// 			// console.log(expectedUrl)
// 			// console.log(clientUrl.pathname)
// 			// console.log(expectedUrl.pathname)
// 			if (clientUrl.pathname === expectedUrl.pathname && 'focus' in client) {
// 				return client.focus(); // Фокусировка, если пути совпадают и есть метод focus
// 			}
// 		}
// 		return self.clients.openWindow(relativeUrl);
// 	});
// }

self.addEventListener('notificationclick', event => {
	const notification = event.notification as PushNotificationBasePayload;
	const tag = notification.tag;

	switch (tag) {
		case 'trainingNotification':
			event.waitUntil(handleTrainingNotification(notification as PushTrainingNotificationPayload));
			break;
		case 'subscriptionNotification':
			console.log('Обработка уведомления подписки');
			break;
		default:
			console.log('Неизвестный тип уведомления');
	}
});

// self.addEventListener('notificationclick', event => {
// 	const notification = event.notification as PushNotificationBasePayload;
// 	const tag = notification.tag;
// 	// console.log('Service Worker: event   ', event);
// 	// console.log('Service Worker: event.notification   ', event.notification);
// 	switch (tag) {
// 		case 'trainingNotification': {
// 			const trainingPayload = notification as PushTrainingNotificationPayload;
// 			event.waitUntil(
// 				self.clients.matchAll({ type: 'window' }).then(windowClients => {
// 					const url = trainingPayload.data.url; // Теперь url доступен, так как мы утвердили тип
// 					for (const client of windowClients) {
// 						if (client.url === url && 'focus' in client) {
// 							return client.focus();
// 						}
// 					}
// 					return self.clients.openWindow(url);
// 				})
// 			);
// 			break;
// 		}
// 		case 'subscriptionNotification':
// 			// Здесь вы можете обработать другие типы уведомлений
// 			console.log('Обработка уведомления подписки');
// 			break;

// 		default:
// 			console.log('Неизвестный тип уведомления');
// 	}
// 	// if (tag === 'trainingNotification') {
// 	// 	event.waitUntil(
// 	// 		self.clients.matchAll({ type: 'window' }).then(windowClients => {
// 	// 			const url = notification.data?.url
// 	// 			for (let i = 0; i < windowClients.length; i++) {
// 	// 				const client = windowClients[i];
// 	// 				if (client.url === url && 'focus' in client) {
// 	// 					return client.focus();
// 	// 				}
// 	// 			}
// 	// 			if (self.clients.openWindow) {
// 	// 				return self.clients.openWindow(url);
// 	// 			}
// 	// 		})
// 	// 	);
// 	// }

// });
// self.addEventListener('notificationclick', event => {
// 	const notification = event.notification as PushNotificationBasePayload;
// 	// notification.onshow = function () {
// 	// 	console.log('Notification shown');

// 	// }
// 	const action = event.action;
// 	const tag = notification.tag;
// 	console.log('Service Worker: event   ', event);
// 	console.log('Service Worker: event.notification   ', event.notification);
// 	if (tag === 'trainingNotification') {
// 		event.waitUntil(
// 			self.clients.matchAll({ type: 'window' }).then(windowClients => {
// 				const url = notification.data?.url
// 				for (let i = 0; i < windowClients.length; i++) {
// 					const client = windowClients[i];
// 					if (client.url === url && 'focus' in client) {
// 						return client.focus();
// 					}
// 				}
// 				if (self.clients.openWindow) {
// 					return self.clients.openWindow(url);
// 				}
// 			})
// 		);
// 	}
// 	// if (action === 'view') {
// 	// 	// Открыть URL-адрес, связанный с уведомлением
// 	// 	self.clients.openWindow(notification.data.url);
// 	// } else if (action === 'dismiss') {
// 	// 	// Закрыть уведомление
// 	// 	notification.close();
// 	// }
// 	// event.notification.close();
// 	// console.log('Service Worker: Notification click...', event);
// 	// console.log('Service Worker: Notification click...', event.notification);
// 	// console.log('Service Worker: Notification click...', event.notification.data);
// 	// const url = event.notification.data.url;
// 	// event.waitUntil(
// 	// 	self.clients.matchAll({ type: 'window' }).then(windowClients => {
// 	// 		for (let i = 0; i < windowClients.length; i++) {
// 	// 			const client = windowClients[i];
// 	// 			if (client.url === url && 'focus' in client) {
// 	// 				return client.focus();
// 	// 			}
// 	// 		}
// 	// 		if (self.clients.openWindow) {
// 	// 			return self.clients.openWindow(url);
// 	// 		}
// 	// 	})
// 	// );
// });
// self.addEventListener('push', event => {

// 	try {

// 		console.log('Service Worker: Push...', event);
// 		console.log('Service Worker: Push...', event.data);
// 		const data = event?.data?.json();
// 		console.log('Service Worker: Push...', data);
// 		const { title = 'Training time 📖', body = 'Let\'s ', icon } = data;
// 		console.log(data)
// 		console.log(icon)
// 		const options: NotificationOptions = {
// 			body,
// 			icon,
// 			// image: icon,
// 			// badge,
// 			// icon: image,
// 			actions: [
// 				{ action: 'view', title: 'Просмотреть' },
// 				{ action: 'dismiss', title: 'Отложить на 4 часа' }
// 			],
// 			data: {
// 				notificationId: '123',
// 				url: '/training/all/all'
// 			}
// 			// icon: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/Types_of_Artificial_Intelligence.jpg'
// 		};

// 		// event.waitUntil(self.registration.showNotification(title, options));
// 		// const options = {
// 		// 	body,
// 		// 	icon: `path/to/${icon}`, // Укажите правильный путь к иконке
// 		// };

// 		event.waitUntil(self.registration.showNotification(title, options));
// 	} catch (error) {
// 		console.error('Service Worker: Error in push event handler', error);
// 	}
// });

// self.addEventListener('notificationclick', event => {
// 	const notification = event.notification;
// 	notification.onshow = function () {
// 		console.log('Notification shown');

// 	}
// 	const action = event.action;

// 	if (action === 'view') {
// 		// Открыть URL-адрес, связанный с уведомлением
// 		self.clients.openWindow(notification.data.url);
// 	} else if (action === 'dismiss') {
// 		// Закрыть уведомление
// 		notification.close();
// 	}
// 	event.notification.close();
// 	console.log('Service Worker: Notification click...', event);
// 	console.log('Service Worker: Notification click...', event.notification);
// 	console.log('Service Worker: Notification click...', event.notification.data);
// 	const url = event.notification.data.url;
// 	event.waitUntil(
// 		self.clients.matchAll({ type: 'window' }).then(windowClients => {
// 			for (let i = 0; i < windowClients.length; i++) {
// 				const client = windowClients[i];
// 				if (client.url === url && 'focus' in client) {
// 					return client.focus();
// 				}
// 			}
// 			if (self.clients.openWindow) {
// 				return self.clients.openWindow(url);
// 			}
// 		})
// 	);
// });
// // Прекэширование ресурсов
// precacheAndRoute(self.__WB_MANIFEST);

// // Очистка устаревших кэшей
// cleanupOutdatedCaches();

// // Обработка оффлайн-работы приложения
// registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')));

// // Перехват управления страницей сразу после активации сервис-воркера
// self.addEventListener('activate', (event) => {
// 	event.waitUntil(clientsClaim());
// });

// // Немедленная активация нового сервис-воркера
// self.addEventListener('install', (event) => {
// 	event.waitUntil(self.skipWaiting());
// });