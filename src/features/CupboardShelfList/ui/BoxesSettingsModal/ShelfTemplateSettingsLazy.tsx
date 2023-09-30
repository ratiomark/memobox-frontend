import { useSelector } from 'react-redux'
import { getBoxesTemplateModalIsOpen } from '../../model/selectors/getShelfBoxesTemplateModal'
import { lazy } from 'react'
import { LazyLoader } from '@/shared/ui/LazyLoader/LazyLoader'

const ShelfBoxesTemplateModalLazy = lazy(() => import('./ShelfTemplateSettings'))

export const ShelfBoxesTemplateModal = () => {
	const isOpen = useSelector(getBoxesTemplateModalIsOpen)
	return <LazyLoader
		isOpen={isOpen}
		render={() => <ShelfBoxesTemplateModalLazy />}
		fallback={<div>Loading...</div>}
	/>
}