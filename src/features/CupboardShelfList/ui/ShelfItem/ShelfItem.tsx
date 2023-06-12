import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfItem.module.scss';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { getShelfIsDeleting } from '../../model/slice/cupboardShelfListSlice';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Shelf } from '@/entities/Shelf';
import { ShelfDeleting } from '../ShelfDeleting/ShelfDeleting';

interface ShelfItemProps {
	id: string
	title: string
	completeSmallDataLabelsBlock: ReactNode
	shelfButtonsBlock: ReactNode
	index: number
	className?: string
}


// тут будет переключаться состояние полки в зависимости от того лежит она в стейте или нет. Вместо полки будет отрисован объект удаления с кнопкой "отменить удаление"
// создать отдельное поле для каждой полки "inDeletionProcess"
export const ShelfItem = (props: ShelfItemProps) => {
	const {
		id,
	} = props

	const isShelfDeleting = useSelector((state: StateSchema) => getShelfIsDeleting(state, id))
	
	const { t } = useTranslation()
	
	if (isShelfDeleting) {
		return <ShelfDeleting title={props.title} id={id} />
	}
	return (
		<Shelf {...props} />
	)
}