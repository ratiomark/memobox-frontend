import { Suspense, useEffect } from 'react'
import { AppRouter } from './providers/router/AppRouter'
import { LoaderWidget } from '@/widgets/LoaderWidget'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { getUserMounted, initAuthData } from '@/entities/User'
import { Header, HeaderSkeleton } from '@/widgets/Header'
import './styles/regularStyles.css'


export const App = () => {
	const userMounted = useSelector(getUserMounted)
	const dispatch = useAppDispatch()

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
			{/* <img src="https://i.pinimg.com/originals/e5/e8/30/e5e830f89f89f0259e1d705e14a5de93.gif" alt="Your GIF" id="my-gif" /> */}
			{/* <Toast.Viewport className='viewport' /> */}
		</div>
	)
}