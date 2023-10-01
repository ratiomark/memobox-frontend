import { LazyLoaderQuick } from '@/shared/ui/LazyLoader';
import { lazy } from 'react';
import { ViewPageSkeleton } from './ViewPageSkeleton/ViewPageSkeleton';

export const ViewPageLazy = lazy(() => import('./ViewPage'))
// export const ViewPage = lazy(() => import('./ViewPage'))

// export const ViewPageLazy = () => {
// 	return <LazyLoaderQuick
// 		render={() => <ViewPage />}
// 		fallback={<ViewPageSkeleton />}
// 	/>
// }