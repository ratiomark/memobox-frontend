import { useSelector } from 'react-redux';
import { Shelf } from '@/entities/Shelf';
import { ShelfDeleting } from '../ShelfDeleting/ShelfDeleting';
import { ShelfProps } from '@/entities/Shelf';
import { getShelfIsDeleting } from '../../model/selectors/getDeletionProcess';

// тут будет переключаться состояние полки в зависимости от того лежит она в стейте или нет. Вместо полки будет отрисован объект удаления с кнопкой "отменить удаление"
export const ShelfItem = (props: ShelfProps) => {
	const {
		shelf: {
			title,
			id: shelfId
		}
	} = props
	const isShelfDeleting = useSelector(getShelfIsDeleting(shelfId))

	if (isShelfDeleting) {
		return <ShelfDeleting isShelfDeleting={isShelfDeleting} title={title} shelfId={shelfId} />
	}

	return <Shelf {...props} />
}