import { Suspense, useCallback, useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AppRouteProps, routeConfig } from '../../config/routeConfig/routeConfig'
import { LoaderWidget } from '@/widgets/LoaderWidget'
import { ProtectedRoute } from './ProtectedRoute'
import { AnimatePresence } from 'framer-motion'
import { routeConfigMobile } from '../../config/routeConfig/routeConfigMobile'
// import { Header } from '@/widgets/Sidebar'
{/* <Suspense fallback={<LoaderWidget />}> */ }

export const AppRouterMobile = () => {
	const renderWithWrapper = useCallback((route: AppRouteProps) => {
		const {
			path,
			authOnly,
			element,
			roles,
			wrapper: Wrapper,
			suspense: suspenseSkeleton
		} = route

		const finalElement = (
			<Suspense fallback={suspenseSkeleton ? suspenseSkeleton : <LoaderWidget />}>
				{
					Wrapper
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

	const routes = Object.values(routeConfigMobile).map(renderWithWrapper)
	// console.log('РОУТЕР')
	return (
		<Suspense fallback={<LoaderWidget />}>
			<Routes >
				{routes}
			</Routes>
		</Suspense>
	)
}
