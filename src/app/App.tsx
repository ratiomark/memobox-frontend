import { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { AppRouter } from './providers/router/AppRouter'
import { LoaderWidget } from '@/widgets/LoaderWidget'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { getUserMounted, initAuthData } from '@/entities/User'
import { NavBar, NavBarSkeleton, NavBarSkeletonNew } from '@/widgets/NavBarNew'
import { Header, HeaderSkeleton, HeaderSkeletonNew } from '@/widgets/Header copy'
import { useTheme } from '@/shared/context/useTheme'
import { ToastViewport } from '@radix-ui/react-toast'
import { useInitialCssValuesFromLocalService } from '@/shared/lib/helpers/hooks/useInitialCssValuesFromLocalService'
import { useIsMobileObserver } from '@/shared/lib/helpers/hooks/useIsMobileObserver'
import './styles/regularStyles.css'
import { AppLayout } from './ui/AppLayout'


export const App = () => {
	const userMounted = useSelector(getUserMounted)
	const dispatch = useAppDispatch()
	// const { theme } = useTheme()
	useIsMobileObserver()
	useInitialCssValuesFromLocalService()

	useEffect(() => {
		dispatch(initAuthData())
	}, [dispatch])


	// if (true) {
	if (!userMounted) {
		return (
			<AppLayout
				header={<NavBarSkeletonNew />}
				navBar={<HeaderSkeletonNew />}
				
				// navBar={<NavBar />}	
				// router={<LoaderWidget />}
				router={<AppRouter />}
			/>
			// <div className={`app ${theme}`}>
			// 	<NavBarSkeleton />
			// 	<HeaderSkeleton />
			// 	<LoaderWidget />
			//  </div>
		)
	}


	return (
		<AppLayout
			header={<Header />}
			navBar={<NavBar />}
			router={<AppRouter />}
		/>
		// <div className='app'>
		// <div className={`app ${theme}`}>
		// 	<Suspense fallback={<HeaderSkeleton />}>
		// 		<Header />
		// 	</Suspense>
		// 	<Suspense fallback={<NavBarSkeleton />}>
		// 		<NavBar />
		// 	</Suspense>
		// 	<AppRouter />
		// 	<ToastViewport className='toastViewport' />
		// 	{/* <img src="https://i.pinimg.com/originals/e5/e8/30/e5e830f89f89f0259e1d705e14a5de93.gif" alt="Your GIF" id="my-gif" /> */}
		// 	{/* <Toast.Viewport className='viewport' /> */}
		// </div>
	)
}