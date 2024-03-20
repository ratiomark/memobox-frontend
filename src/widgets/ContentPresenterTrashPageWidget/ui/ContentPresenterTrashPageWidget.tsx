import { getTrashPageActiveEntity } from '@/features/TrashPageInitializer';
import { useSelector } from 'react-redux';
import { ShelvesPresenter } from './ShelvesPresenter/ShelvesPresenter';
import { CardsPresenter } from './CardsPresenter/CardsPresenter';
import { BoxesPresenter } from './BoxesPresenter/BoxesPresenter';
import { RestoreCardModal } from '..';



export const ContentPresenterTrashPageWidget = () => {
	const activeEntityValue = useSelector(getTrashPageActiveEntity)
	const content = () => {
		switch (activeEntityValue) {
			case 'shelves':
				return <ShelvesPresenter />
			case 'boxes':
				return <BoxesPresenter />
			default:
				return <CardsPresenter />
		}
	}

	return <>
		{content()}
		<RestoreCardModal />
	</>

}