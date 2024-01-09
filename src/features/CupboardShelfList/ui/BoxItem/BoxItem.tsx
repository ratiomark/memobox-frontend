import { useSelector } from 'react-redux';
import { Shelf } from '@/entities/Shelf';
import { ShelfDeleting } from '../ShelfDeleting/ShelfDeleting';
import { ShelfProps } from '@/entities/Shelf';
import { getBoxIsDeleting, getShelfIsDeleting } from '../../model/selectors/getDeletionProcess';
import { BoxDeleting } from '../BoxDeleting/BoxDeleting';
import { Box, BoxPropsBase } from '@/entities/Box';

// тут будет переключаться состояние полки в зависимости от того лежит она в стейте или нет. Вместо полки будет отрисован объект удаления с кнопкой "отменить удаление"
export const BoxItem = (props: BoxPropsBase) => {
	const {
		boxItem: {
			id: boxId,
			index,
		},
		shelfId
	} = props
	const isBoxDeleting = useSelector(getBoxIsDeleting(shelfId, boxId))

	if (isBoxDeleting) {
		return <BoxDeleting isBoxDeleting={isBoxDeleting} index={index} boxId={boxId} />
	}

	return <Box {...props} />
}
// export const BoxItem = (props: { index: number, id: string }) => {
// 	const {
// 		id,
// 		index,
// 	} = props
// 	const isShelfDeleting = useSelector(getShelfIsDeleting(shelfId))

// 	if (isShelfDeleting) {
// 		return <ShelfDeleting isShelfDeleting={isShelfDeleting} title={title} shelfId={shelfId} />
// 	}

// 	return <Shelf {...props} />
// }