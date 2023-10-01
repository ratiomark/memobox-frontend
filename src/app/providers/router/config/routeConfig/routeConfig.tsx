import { RouteProps } from 'react-router-dom';
import { UserRole } from '@/entities/User';
import { AboutPage } from '@/pages/AboutPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { MainPage } from '@/pages/MainPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { ViewPage } from '@/pages/ViewPage';
import { TrainingPage } from '@/pages/TrainingPage';
import { TrashPage } from '@/pages/TrashPage';
import { SettingsPageWidgetSkeleton } from '@/widgets/SettingsPageWidget';
import { StatsAndActionsCupboardWidgetSkeleton } from '@/widgets/StatsAndActionsCupboardWidget';
import { SubscriptionPage } from '@/pages/SubscriptionPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { StatsPageSkeleton, StatsPage } from '@/pages/StatsPage';
import { ViewPageSkeleton } from '@/pages/ViewPage';

export type AppRouteProps = RouteProps & {
	authOnly?: boolean
	wrapper?: React.ElementType
	roles?: UserRole[]
	suspense?: JSX.Element
}

export const AppRoutes = {
	main: 'main',
	view: 'view',
	viewEmpty: 'viewEmpty',
	settings: 'settings',
	stats: 'stats',
	trash: 'trash',
	training: 'training',
	subscription: 'subscription',
	profile: 'profile',
	ABOUT: 'about',
	forbidden_page: 'forbidden_page',
	PAGE_NOT_FOUND: 'PAGE_NOT_FOUND',
} as const;

// const Susp = () => {
// 	return (<Page>
// 		<div className={cls.settingsPageWidget} >
// 			<Skeleton width={'100%'} height={56} />
// 			<Skeleton width={'100%'} height={56} />
// 			<Skeleton width={'100%'} height={56} />
// 			<Skeleton width={'100%'} height={56} />
// 		</div>
// 	</Page>)
// }

export type AppRoutes = keyof typeof AppRoutes;

export const obtainRouteMain = () => '/'

export const obtainRouteView = (shelfId?: string, boxId?: string | number) => {
	if (!shelfId) return '/view/all/all'
	if (!boxId) return `/view/${shelfId}/all`
	return `/view/${shelfId}/${boxId}`
}
export const obtainRouteViewEmpty = () => '/view'

export const obtainRouteTraining = (shelfId?: string, boxId?: string) => {
	return `/training/${shelfId}/${boxId}`
}

export const obtainRouteStats = () => '/stats'
export const obtainRouteSettings = () => '/settings'
export const obtainRouteTrash = () => '/trash'

export const obtainRouteSubscription = () => '/subscription'

export const obtainRouteAbout = () => '/about'
export const obtainRouteProfile = () => '/profile'
// export const obtainRouteProfile = (id: string | number) => `/profile/${id}`
export const obtainRouteArticles = () => '/articles'
export const obtainRouteArticlesDetails = (id: string | number) => `/articles/${id}`
export const obtainRouteAdminPanel = () => '/admin'
export const obtainForbiddenPage = () => '/forbidden'


export const routeConfig: Record<AppRoutes, AppRouteProps> = {
	main: {
		path: obtainRouteMain(),
		element: <MainPage />,
		suspense: <StatsAndActionsCupboardWidgetSkeleton />
	},
	view: {
		path: obtainRouteView(':shelfId', ':boxId'),
		element: <ViewPage />,
		suspense: <ViewPageSkeleton />
	},
	viewEmpty: {
		path: '/view',
		element: <ViewPage />,
		suspense: <ViewPageSkeleton />
	},
	settings: {
		path: obtainRouteSettings(),
		element: <SettingsPage />,
		suspense: <SettingsPageWidgetSkeleton />
	},
	stats: {
		path: obtainRouteStats(),
		// element: <StatsPageSkeleton />,
		element: <StatsPage />,
		suspense: <StatsPageSkeleton />
	},
	trash: {
		path: obtainRouteTrash(),
		element: <TrashPage />
	},
	training: {
		path: obtainRouteTraining(':shelfId', ':boxId'),
		element: <TrainingPage />,
		// suspense: <Susp/>
	},
	subscription: {
		path: obtainRouteSubscription(),
		element: <SubscriptionPage />,
		// suspense: <Susp/>
	},
	profile: {
		path: obtainRouteProfile(),
		element: <ProfilePage />,
		// suspense: <Susp/>
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
