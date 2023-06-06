import { RouteProps } from 'react-router-dom';
import { UserRole } from '@/entities/User';
import { Page } from '@/widgets/Page';
import { AboutPage } from '@/pages/AboutPage';
import { MainPage } from '@/pages/MainPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';

export type AppRouteProps = RouteProps & {
	authOnly?: boolean
	wrapper?: React.ElementType
	roles?: UserRole[]
}

export const AppRoutes = {
	MAIN: 'main',
	ABOUT: 'about',
	forbidden_page: 'forbidden_page',
	PAGE_NOT_FOUND: 'PAGE_NOT_FOUND',
} as const;


export type AppRoutes = keyof typeof AppRoutes;

export const obtainRouteMain = () => '/'
export const obtainRouteAbout = () => '/about'
export const obtainRouteProfile = (id: string | number) => `/profile/${id}`
export const obtainRouteArticles = () => '/articles'
export const obtainRouteArticlesDetails = (id: string | number) => `/articles/${id}`
export const obtainRouteAdminPanel = () => '/admin'
export const obtainForbiddenPage = () => '/forbidden'
export const obtainSettingsPage = () => '/settings'


export const routeConfig: Record<AppRoutes, AppRouteProps> = {
	MAIN: {
		path: obtainRouteMain(),
		element: <MainPage />,
		// wrapper: Page
	},
	ABOUT: {
		path: obtainRouteAbout(),
		element: <AboutPage />,
		// wrapper: Page
	},
	forbidden_page: {
		path: obtainForbiddenPage(),
		element: <ForbiddenPage />
	},

	PAGE_NOT_FOUND: {
		path: '*',
		element: <span data-testid='PageNotFound'>No Page Here!</span>
	}
}