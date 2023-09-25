import { Suspense, useEffect } from 'react'
import { AppRouter } from './providers/router/AppRouter'
// import { NavBar } from '@/widgets/NavBar'
// import { Sidebar } from '@/widgets/Sidebar'
import { LoaderWidget } from '@/widgets/LoaderWidget'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { getUserAuthData, getUserMounted, initAuthData } from '@/entities/User'
import * as Toast from '@radix-ui/react-toast';
// import { MainLayout } from '@/shared/layouts'
import { useTheme } from '@/shared/context/useTheme'
import clsx from 'clsx'
import { Header, HeaderSkeleton } from '@/widgets/Header'
import './styles/regularStyles.css'


export const App = () => {
	const userMounted = useSelector(getUserMounted)
	const dispatch = useAppDispatch()
	const { theme } = useTheme()

	useEffect(() => {
		dispatch(initAuthData())
	}, [dispatch, userMounted])

	if (!userMounted) return <LoaderWidget />

	return (
		<div className={clsx('app', theme)}>
			{/* <Toast.Provider> */}

			<Suspense fallback={<HeaderSkeleton />}>
				<Header />
			</Suspense>
			{/* <Suspense fallback={<LoaderWidget />}> */}
			<AppRouter />
			{/* </Suspense> */}
			{/* <img src="https://i.pinimg.com/originals/e5/e8/30/e5e830f89f89f0259e1d705e14a5de93.gif" alt="Your GIF" id="my-gif" /> */}
			{/* <Toast.Viewport /> */}
			{/* </Toast.Provider> */}
			{/* <Toast.Viewport className='viewport' /> */}
		</div>
	)
}








//  <MainLayout
// 				header={<NavBar />}
// 				content={<AppRouter />}
// 				sidebar={<Sidebar />}
// 				toolbar={<div>toolBar here</div>}
// />