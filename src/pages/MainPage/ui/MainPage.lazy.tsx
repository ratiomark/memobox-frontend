import { LazyLoader } from '@/shared/ui/LazyLoader/LazyLoader';
import { StatsAndActionsCupboardWidgetSkeleton } from '@/widgets/CardListViewWidget';
import { lazy } from 'react';

export const MainPageLazy = lazy(() => import('./MainPage'))
// const MainPage = lazy(() => import('./MainPage'))
// export const MainPageLazy = () => {
// 	return <LazyLoader
// 		isOpen={true}
// 		render={() => <MainPage />}
// 		fallback={<StatsAndActionsCupboardWidgetSkeleton />}
// 	/>
// }