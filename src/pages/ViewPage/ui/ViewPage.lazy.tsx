import { LazyLoader } from '@/shared/ui/LazyLoader/LazyLoader';
import { lazy } from 'react';
import { ViewPageSkeleton } from './ViewPageSkeleton/ViewPageSkeleton';

export const ViewPage = lazy(() => import('./ViewPage'))

export const ViewPageLazy = () => {
	return <LazyLoader
		isOpen={true}
		render={() => <ViewPage />}
		fallback={<ViewPageSkeleton />}
	/>
}