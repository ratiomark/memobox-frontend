import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ContentPresenterTrashPageWidget.module.scss';
import { getTrashPageActiveEntity } from '@/features/TrashPageInitializer';
import { useSelector } from 'react-redux';
import { ShelvesPresenter } from './ShelvesPresenter/ShelvesPresenter';
import { CardsPresenter } from './CardsPresenter/CardsPresenter';
import { BoxesPresenter } from './BoxesPresenter/BoxesPresenter';

interface ContentPresenterTrashPageWidgetProps {
	className?: string
	
}

export const ContentPresenterTrashPageWidget = (props: ContentPresenterTrashPageWidgetProps) => {
	const {
		className
	} = props
	const activeEntityValue = useSelector(getTrashPageActiveEntity)
	const { t } = useTranslation()

	return (
		// <div className={clsx(
		// 	cls.contentPresenterTrashPageWidget,
		// 	className)}
		// >
		<>
			{activeEntityValue === 'shelves' && <ShelvesPresenter />}
			{activeEntityValue === 'boxes' && <BoxesPresenter />}
			{activeEntityValue === 'cards' && <CardsPresenter />}
		</>
		//</div> 
	)
}