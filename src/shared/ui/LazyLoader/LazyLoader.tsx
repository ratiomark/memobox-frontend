import { ReactNode, Suspense } from 'react';

interface LazyLoaderBase {
	render: () => ReactNode
}

interface LazyLoaderProps extends LazyLoaderBase {
	isOpen: boolean
	fallback: ReactNode
}

interface LazyLoaderQuickProps extends LazyLoaderBase {
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