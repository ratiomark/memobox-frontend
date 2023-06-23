import { RouteProps } from 'react-router-dom';
import { UserRole } from '@/entities/User';
import { Page } from '@/widgets/Page';
import { AboutPage } from '@/pages/AboutPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { MainPage } from '@/pages/MainPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { ViewPage } from '@/pages/ViewPage';
import { TrainingPage } from '@/pages/TrainingPage';

export type AppRouteProps = RouteProps & {
	authOnly?: boolean
	wrapper?: React.ElementType
	roles?: UserRole[]
}

export const AppRoutes = {
	main: 'main',
	view: 'view',
	viewEmpty: 'viewEmpty',
	settings: 'settings',
	stats: 'stats',
	trash: 'trash',
	training: 'training',
	ABOUT: 'about',
	forbidden_page: 'forbidden_page',
	PAGE_NOT_FOUND: 'PAGE_NOT_FOUND',
} as const;


export type AppRoutes = keyof typeof AppRoutes;

export const obtainRouteMain = () => '/'
export const obtainRouteView = (shelfId?: string, boxId?: string|number) => {
	return boxId
		? `/view/${shelfId}/${boxId}`
		: `/view/${shelfId}/all`
}

export const obtainRouteTraining = (shelfId?: string, boxId?: string) => {
	return `/training/${shelfId}/${boxId}`
}
export const obtainRouteStats = () => '/stats'
export const obtainRouteSettings = () => '/settings'
export const obtainRouteTrash = () => '/trash'
export const obtainRouteAbout = () => '/about'
export const obtainRouteProfile = (id: string | number) => `/profile/${id}`
export const obtainRouteArticles = () => '/articles'
export const obtainRouteArticlesDetails = (id: string | number) => `/articles/${id}`
export const obtainRouteAdminPanel = () => '/admin'
export const obtainForbiddenPage = () => '/forbidden'


export const routeConfig: Record<AppRoutes, AppRouteProps> = {
	main: {
		path: obtainRouteMain(),
		element: <MainPage />,
		// wrapper: Page
	},
	view: {
		path: obtainRouteView(':shelfId', ':boxId'),
		element: <ViewPage />
	},
	viewEmpty: {
		path: '/view',
		element: <ViewPage />
	},
	settings: {
		path: obtainRouteSettings(),
		element: <SettingsPage />
	},
	stats: {
		path: obtainRouteStats(),
		element: <MainPage />
	},
	trash: {
		path: obtainRouteTrash(),
		element: <MainPage />
	},
	training: {
		path: obtainRouteTraining(':shelfId', ':boxId'),
		element: <TrainingPage/>
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