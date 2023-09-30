import { LazyLoader } from '@/shared/ui/LazyLoader/LazyLoader';
import { lazy } from 'react';

export const ViewPage2 = lazy(() => import('./ViewPage2'))

export const ViewPage2Lazy = () => {
	return <LazyLoader
		isOpen={true}
		render={() => <ViewPage2 />}
		fallback={null}
	/>
}