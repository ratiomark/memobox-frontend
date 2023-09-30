import { useSelector } from 'react-redux'
import { lazy } from 'react'
import { LazyLoader } from '@/shared/ui/LazyLoader/LazyLoader'
import { getIsOpenCardModal } from '../../../model/selectors/getCreateNewCardModal'

const CreateNewCardModalLazy = lazy(() => import('./CreateNewCardModal'))

export const CreateNewCardModal = () => {
	const isOpen = useSelector(getIsOpenCardModal)
	return <LazyLoader
		isOpen={isOpen}
		render={() => <CreateNewCardModalLazy />}
		fallback={<div>Loading...</div>}
	/>
}