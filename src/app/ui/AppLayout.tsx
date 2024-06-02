import { useTheme } from '@/shared/context/useTheme';
import { Loader } from '@/shared/ui/Loader/Loader';
import { HeaderSkeleton } from '@/widgets/Header copy';
import { NavBarSkeleton } from '@/widgets/NavBarNew';
import { ToastViewport } from '@radix-ui/react-toast';
import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
	router: React.ReactNode;
	navBar: React.ReactNode;
	header: React.ReactNode;
}

const useAppClass = () => {
	const pathname = useLocation().pathname
	const currentLocation = pathname.split('/')[1]
	if (currentLocation === 'training' || currentLocation === 'login') {
		return 'app_training'
	} else {
		return 'app'
	}
}
// styles are in src/app/styles/index.scss. Initially imported into main.tsx
export const AppLayout = (props: AppLayoutProps) => {
	const {
		router,
		navBar,
		header,
	} = props
	const { theme } = useTheme()
	const appClass = useAppClass()

	return (
		<div className={`${appClass} ${theme}`}>
			<Suspense fallback={<HeaderSkeleton />}>
				{header}
			</Suspense>
			<Suspense fallback={<NavBarSkeleton />}>
				{navBar}
			</Suspense>
			<Suspense fallback={<Loader />}>
				{router}
			</Suspense>
			<ToastViewport className='toastViewport' />
		</div>
	)
}

