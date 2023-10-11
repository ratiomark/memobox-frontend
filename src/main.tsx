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
							<App />
							<MyToastsRTK />
						</LazyMotion>
					</ThemeProvider>
				</ToastProvider>
			</ErrorBoundary>
		</StoreProvider>
	</BrowserRouter >
)