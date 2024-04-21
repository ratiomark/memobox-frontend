import { LazyLoaderQuick } from '@/shared/ui/LazyLoader';
import { StatsAndActionsCupboardWidgetSkeleton } from '@/widgets/CardListViewWidget';
import { lazy } from 'react';

export const ForgotPasswordPageLaze = lazy(() => import('./ForgotPasswordPage'))
// const MainPage = lazy(() => import('./MainPage'))
// export const MainPageLazy = () => {
// 	return <LazyLoaderQuick
// 		render={() => <MainPage />}
// 		fallback={<StatsAndActionsCupboardWidgetSkeleton />}
// 	/>
// }