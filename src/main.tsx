import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './app/providers/ErrorBoundary'
import { StoreProvider } from './app/providers/StoreProvider'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { App } from './app/App'
import { domAnimation, LazyMotion } from 'framer-motion';
import '@/shared/config/i18n/i18n'
import './app/styles/index.scss'
// import './app/styles/regularStyles.css'
const container = document.getElementById('root')

if (!container) throw new Error('Root container is not Found! Check main.tsx file')

const root = ReactDOM.createRoot(container)
root.render(
	<BrowserRouter>
		<StoreProvider>
			<ErrorBoundary>
				<ThemeProvider>
					<LazyMotion features={domAnimation}>
						<App />
					</LazyMotion>
				</ThemeProvider>
			</ErrorBoundary>
		</StoreProvider>
	</BrowserRouter>
)

