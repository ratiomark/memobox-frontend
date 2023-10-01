import { lazy } from 'react'
import { LazyLoaderQuick } from '../../LazyLoader/LazyLoader'

const MyToastsRTKLazy = lazy(() => import('./MyToastRTK'))

export const MyToastsRTK = () => {
	return <LazyLoaderQuick
		render={() => <MyToastsRTKLazy />}
	/>
}
