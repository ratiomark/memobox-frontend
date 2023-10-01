import { LazyLoaderQuick } from '@/shared/ui/LazyLoader';
import { lazy } from 'react';

export const SettingsPageLazy = lazy(() => import('./SettingsPage'))

// export const SettingsPage = lazy(() => import('./SettingsPage'))
// export const SettingsPageLazy = () => {
// 	return <LazyLoaderQuick
// 		render={() => <SettingsPage />}
// 		fallback={null}
// 	/>
// }