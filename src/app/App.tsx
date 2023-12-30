import { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { AppRouter } from './providers/router/AppRouter'
import { LoaderWidget } from '@/widgets/LoaderWidget'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { getUserMounted, initAuthData } from '@/entities/User'


import { Header, HeaderSkeleton } from '@/widgets/Header'
import './styles/regularStyles.css'
import { useTheme } from '@/shared/context/useTheme'
import { ToastViewport } from '@radix-ui/react-toast'
import { useInitialCssValuesFromLocalService } from '@/shared/lib/helpers/hooks/useInitialCssValuesFromLocalService'
import { AppRouterMobile } from './providers/router/AppRouter/ui/AppRouterMobile'

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const userAgent = navigator.userAgent.toLowerCase();
		setIsMobile(/mobile/i.test(userAgent));
	}, []);

	return isMobile;
};

export const App = () => {
	const userMounted = useSelector(getUserMounted)
	const dispatch = useAppDispatch()
	const { theme } = useTheme()
	const isMobile = useIsMobile()
	useInitialCssValuesFromLocalService()

	useEffect(() => {
		dispatch(initAuthData())
	}, [dispatch])


	if (!userMounted) {
		return (
			<div className={`app ${theme}`}>
				{!isMobile && <HeaderSkeleton />}
				<LoaderWidget />
			</div>
		)

	}


	return (
		// <div className='app'>
		<div className={`app ${theme}`}>
			{
				!isMobile && (
					<Suspense fallback={<HeaderSkeleton />}>
						<Header />
					</Suspense>
				)
			}
			{
				isMobile
					? <AppRouterMobile />
					: <AppRouter />
			}
			<ToastViewport className='toastViewport' />
			{/* <img src="https://i.pinimg.com/originals/e5/e8/30/e5e830f89f89f0259e1d705e14a5de93.gif" alt="Your GIF" id="my-gif" /> */}
			{/* <Toast.Viewport className='viewport' /> */}
		</div>
	)
}