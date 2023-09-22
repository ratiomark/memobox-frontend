import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfItem.module.scss';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Shelf } from '@/entities/Shelf';
import { ShelfDeleting } from '../ShelfDeleting/ShelfDeleting';
import { ShelfProps } from '@/entities/Shelf';
import { getShelfIsDeleting } from '../../model/selectors/getCupboardShelfList';

// interface ShelfItemProps {
// 	id: string
// 	title: string
// 	completeSmallDataLabelsBlock: ReactNode
// 	shelfButtonsBlock: ReactNode
// 	index: number
// 	className?: string
// 	collapsed: boolean
// }


// тут будет переключаться состояние полки в зависимости от того лежит она в стейте или нет. Вместо полки будет отрисован объект удаления с кнопкой "отменить удаление"
// создать отдельное поле для каждой полки "inDeletionProcess"
export const ShelfItem = (props: ShelfProps) => {
	const {
		shelf: {
			title,
			id
		}
	} = props
	const isShelfDeleting = useSelector(getShelfIsDeleting(id))
	// const isShelfDeleting = useSelector((state: StateSchema) => getShelfIsDeleting(state, id))
	
	if (isShelfDeleting) {
		return <ShelfDeleting title={title} id={id} />
	}
	
	return (
		<Shelf {...props} />
	)
}