import { ReactNode, Suspense } from 'react';

interface LazyLoaderProps {
	isOpen: boolean
	render: () => ReactNode
	fallback: ReactNode
}
interface LazyLoaderQuickProps {
	render: () => ReactNode
	fallback?: ReactNode
}

export const LazyLoader = ({ isOpen, render, fallback }: LazyLoaderProps) => {
	return (
		<>
			{isOpen &&
				<Suspense fallback={fallback}>
					{render()}
				</Suspense>
			}
		</>
	)
}

export const LazyLoaderQuick = ({ render, fallback = null }: LazyLoaderQuickProps) => {
	return (
		<Suspense fallback={fallback}>
			{render()}
		</Suspense>
	)
}