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


self.addEventListener('push', event => {

	try {

		console.log('Service Worker: Push...', event);
		console.log('Service Worker: Push...', event.data);
		const data = event?.data?.json();
		console.log('Service Worker: Push...', data);
		const { title = 'Training time 📖', body = 'Let\'s ', icon } = data;

		const options = {
			body,
			icon: image,
			data: {
				notificationId: '123',
				url: '/training/all/all'
			}
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

self.addEventListener('notificationclick', event => {
	event.notification.close();
	console.log('Service Worker: Notification click...', event);
	console.log('Service Worker: Notification click...', event.notification);
	console.log('Service Worker: Notification click...', event.notification.data);
	const url = event.notification.data.url;
	event.waitUntil(
		self.clients.matchAll({ type: 'window' }).then(windowClients => {
			for (let i = 0; i < windowClients.length; i++) {
				const client = windowClients[i];
				if (client.url === url && 'focus' in client) {
					return client.focus();
				}
			}
			if (self.clients.openWindow) {
				return self.clients.openWindow(url);
			}
		})
	);
});
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