import { Suspense, useEffect, useLayoutEffect } from 'react'
import { AppRouter } from './providers/router/AppRouter'
import { LoaderWidget } from '@/widgets/LoaderWidget'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { getUserAuthData, getUserMounted, initAuthData } from '@/entities/User'
// import * as Toast from '@radix-ui/react-toast';
import { useTheme } from '@/shared/context/useTheme'
import { Header, HeaderSkeleton } from '@/widgets/Header'
import './styles/regularStyles.css'
import clsx from 'clsx'
import { MyToastsRTK } from '@/shared/ui/Toast'


export const App = () => {
	const userMounted = useSelector(getUserMounted)
	const dispatch = useAppDispatch()
	// const { theme } = useTheme()


	// useEffect(() => {
	// document.body.className = theme
	// }, [theme])

	useEffect(() => {
		dispatch(initAuthData())
	}, [dispatch, userMounted])



	if (!userMounted) return <LoaderWidget />

	return (
		<div className='app'>
			{/* <div className={clsx('app', theme)}> */}
			<Suspense fallback={<HeaderSkeleton />}>
				<Header />
			</Suspense>
			<AppRouter />
			<Suspense fallback={null}>
				<MyToastsRTK />
			</Suspense>
			{/* <img src="https://i.pinimg.com/originals/e5/e8/30/e5e830f89f89f0259e1d705e14a5de93.gif" alt="Your GIF" id="my-gif" /> */}
			{/* <Toast.Viewport className='viewport' /> */}
		</div>
	)
}