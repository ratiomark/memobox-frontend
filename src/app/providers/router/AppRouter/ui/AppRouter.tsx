import { Suspense, useCallback, useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AppRouteProps, routeConfig } from '../../config/routeConfig/routeConfig'
import { LoaderWidget } from '@/widgets/LoaderWidget'
import { ProtectedRoute } from './ProtectedRoute'
import { AnimatePresence } from 'framer-motion'
import { Header } from '@/widgets/Sidebar'

export const AppRouter = () => {
	// const location = useLocation()
	const renderWithWrapper = useCallback((route: AppRouteProps) => {
		const { path, authOnly, element, wrapper: Wrapper, roles, suspense: suspenseSkeleton } = route

		const finalElement = (
			<Suspense fallback={suspenseSkeleton ? suspenseSkeleton : <LoaderWidget />}>
				{/* <Suspense fallback={<LoaderWidget />}> */}
				{Wrapper
					? <Wrapper>{element}</Wrapper>
					: element
				}
			</Suspense>
		)
		return (
			<Route
				key={path}
				path={path}
				element={authOnly
					? <ProtectedRoute roles={roles}>{finalElement}</ProtectedRoute>
					: finalElement
				}
			/>)
	}, [])

	const routes = Object.values(routeConfig).map(renderWithWrapper)
	// console.log(location)
	return (
		// <Suspense fallback={<h1>sdiofjweiofjweofi!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>}>
		<Suspense fallback={<LoaderWidget />}>
			{/* {location.pathname.split('/')[1] !== 'training' ? <Header /> : null} */}
			{/* <AnimatePresence> */}
				<Routes >
					{/* <Routes location={location} key={location.key}> */}
					{routes}
				</Routes>
			{/* </AnimatePresence> */}
		</Suspense>
	)
}
