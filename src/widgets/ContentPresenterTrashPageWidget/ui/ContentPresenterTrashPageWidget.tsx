import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ContentPresenterTrashPageWidget.module.scss';
import { getTrashPageActiveEntity } from '@/features/TrashPageInitializer';
import { useSelector } from 'react-redux';
import { ShelvesPresenter } from './ShelvesPresenter/ShelvesPresenter';
import { CardsPresenter } from './CardsPresenter/CardsPresenter';
import { BoxesPresenter } from './BoxesPresenter/BoxesPresenter';



export const ContentPresenterTrashPageWidget = () => {
	const activeEntityValue = useSelector(getTrashPageActiveEntity)
	switch (activeEntityValue) {
		case 'shelves':
			return <ShelvesPresenter />
		case 'boxes':
			return <BoxesPresenter />
		default:
			return <CardsPresenter />
	}
	// return (
	// 	// <div className={clsx(
	// 	// 	cls.contentPresenterTrashPageWidget,
	// 	// 	className)}
	// 	// >
	// 	<>
	// 		{activeEntityValue === 'shelves' && <ShelvesPresenter />}
	// 		{activeEntityValue === 'boxes' && <BoxesPresenter />}
	// 		{activeEntityValue === 'cards' && <CardsPresenter />}
	// 	</>
	// 	//</div> 
	// )
}