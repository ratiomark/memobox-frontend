import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching';
// import { clientsClaim } from 'workbox-core';
// import { NavigationRoute, registerRoute } from 'workbox-routing';

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
	const data = event?.data?.json();
	const { title, body, icon } = data;

	const options = {
		body,
		icon, // Укажите путь к иконке
	};

	event.waitUntil(self.registration.showNotification(title, options));
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