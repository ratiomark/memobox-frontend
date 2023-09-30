import { LazyLoader } from '@/shared/ui/LazyLoader/LazyLoader'
import { getIsWriteToUsOpen } from '../../../model/selectors/getHeaderModals'
import { lazy } from 'react'
import { useSelector } from 'react-redux'

const WriteToUsLazy = lazy(() => import('./WriteToUsModal'))
// TODO: Нужен skeleton
export const WriteToUsModal = () => {
	const isOpen = useSelector(getIsWriteToUsOpen)
	return <LazyLoader
		isOpen={isOpen}
		render={() => <WriteToUsLazy />}
		fallback={<div>Loading...</div>}
	/>
}