import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './app/providers/ErrorBoundary'
import { StoreProvider } from './app/providers/StoreProvider'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { App } from './app/App'
import { domAnimation, LazyMotion } from 'framer-motion';
import { ToastProvider } from '@radix-ui/react-toast'
import '@/shared/config/i18n/i18n'
import './app/styles/index.scss'
import { MyToastsRTK } from './shared/ui/Toast/ui/MyToastRTKLazy'
import { CustomTooltipProvider } from './shared/ui/Tooltip/TooltipProvider'
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
	onNeedRefresh() {
		// Показать сообщение о доступном обновлении
		updateSW(true);
		// alert('нужен рефреш')
	},
	onOfflineReady() {
		// Показать сообщение о готовности работать офлайн
	},
	onRegisteredSW(swScriptUrl, ServiceWorkerRegistration) {
		console.log('Service Worker зарегистрирован:', swScriptUrl);
		if (ServiceWorkerRegistration) {
			setInterval(() => {
				ServiceWorkerRegistration.update();
			}, 20000 /* интервал проверки обновлений, например, 20 секунд */);

			navigator.serviceWorker.addEventListener('message', (event) => {
				if (event.data && event.data.type === 'SW_UPDATED') {
					// if (confirm('Доступно обновление. Перезагрузить страницу?')) {
					window.location.reload();
					// }
				}
			});
		}
	},
	onRegisterError(error) {
		console.error('Ошибка регистрации Service Worker:', error);
	},
});
// const updateSW = registerSW({
// 	onNeedRefresh() {
// 		updateSW(true);
// 		// Показать сообщение о доступном обновлении
// 		// и предложить пользователю обновить страницу
// 	},
// 	onOfflineReady() {
// 		// Показать сообщение о готовности работать офлайн
// 	},
// 	onRegisteredSW(swScriptUrl, registration) {
// 		console.log('Service Worker зарегистрирован:', swScriptUrl);
// 		registration && setInterval(() => {
// 			registration.update();
// 		}, 20000 /* интервал проверки обновлений, например, 20 секунд */);
// 	},
// 	// onRegistered(swScriptUrl, ServiceWorkerRegistration ) {
// 	// 	console.log('Service Worker зарегистрирован:', swScriptUrl);
// 	// 	ServiceWorkerRegistration  && setInterval(() => {
// 	// 		ServiceWorkerRegistration .update();
// 	// 	}, 20000 /* интервал проверки обновлений, например, 20 секунд */);
// 	// },
// 	onRegisterError(error) {
// 		console.error('Ошибка регистрации Service Worker:', error);
// 	},
// });

// let refreshing = false;

// navigator.serviceWorker.addEventListener('controllerchange', () => {
// 	if (!refreshing) {
// 		window.location.reload();
// 		refreshing = true;
// 	}
// });
// import posthog from 'posthog-js'
// posthog.init('phc_n1lURzDBW3hd64MQIjv1eFphRgcpOK5rsNwpJ6Kg3ou', { api_host: 'https://us.posthog.com' })

const container = document.getElementById('root')
if (!container) throw new Error('Root container is not Found! Check main.tsx file')
// let check = 0

// const clearTimeoutOriginal = window.clearTimeout;
// window.clearTimeout = function (timerId: number | undefined, customText: string) {
// 	console.log('clearTimeout:   ', check, customText ? customText : '');
// 	return clearTimeoutOriginal(timerId)
// };
// const originalSetTimeout = window.setTimeout;
// window.setTimeout = function (fn, delay) {
// 	check += 1
// 	console.log('setTimeout:  ', check);
// 	return originalSetTimeout(fn, delay);
// };

const root = ReactDOM.createRoot(container)
root.render(
	<BrowserRouter>
		<StoreProvider>
			<ErrorBoundary>
				<ToastProvider duration={5000} >
					<ThemeProvider>
						<LazyMotion features={domAnimation}>
							<CustomTooltipProvider>
								<App />
								<MyToastsRTK />
							</CustomTooltipProvider>
						</LazyMotion>
					</ThemeProvider>
				</ToastProvider>
			</ErrorBoundary>
		</StoreProvider>
	</BrowserRouter >
)