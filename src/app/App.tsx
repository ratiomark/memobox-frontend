import { Suspense, useEffect } from 'react'
import { AppRouter } from './providers/router/AppRouter'
// import { NavBar } from '@/widgets/NavBar'
// import { Sidebar } from '@/widgets/Sidebar'
import { LoaderWidget } from '@/widgets/LoaderWidget'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { getUserMounted, initAuthData } from '@/entities/User'
// import { MainLayout } from '@/shared/layouts'
import { useTheme } from '@/shared/context/useTheme'
import clsx from 'clsx'
import { Header } from '@/widgets/Sidebar'


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
			<Header />
			<Suspense fallback={<LoaderWidget />}>
				<AppRouter />
				{/* <MainLayout
				header={<NavBar />}
				content={<AppRouter />}
				sidebar={<Sidebar />}
				toolbar={<div>toolBar here</div>}
			/> */}
			</Suspense>
		</div>
	)
}
