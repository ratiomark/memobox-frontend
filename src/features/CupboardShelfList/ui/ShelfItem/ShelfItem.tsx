import { useSelector } from 'react-redux';
import { Shelf } from '@/entities/Shelf';
import { ShelfDeleting } from '../ShelfDeleting/ShelfDeleting';
import { ShelfProps } from '@/entities/Shelf';
import { getShelfDeletionRequestStatus, getShelfIsDeleting } from '../../model/selectors/getShelfDeletionProcess';
import { MyToast } from '@/shared/ui/Toast';
import { useCallback } from 'react';
import { cupboardShelfListActions } from '../..';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';

// тут будет переключаться состояние полки в зависимости от того лежит она в стейте или нет. Вместо полки будет отрисован объект удаления с кнопкой "отменить удаление"
export const ShelfItem = (props: ShelfProps) => {
	const {
		shelf: {
			title,
			id: shelfId
		}
	} = props
	const isShelfDeleting = useSelector(getShelfIsDeleting(shelfId))
	// const shelfDeletionRequestStatus = useSelector(getShelfDeletionRequestStatus(shelfId))
	// const dispatch = useAppDispatch()

	// const onTimeEnd = useCallback(() => {
	// 	dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isDeleting: false, deletingRequestStatus: 'idle' } }))
	// }, [dispatch, shelfId])

	// const toast = <MyToast
	// 	onTimeEnd={onTimeEnd}
	// 	status={shelfDeletionRequestStatus}
	// 	messageSuccess='УДАЛЕНА'
	// 	// messageLoading='Загрузка'
	// 	contentLoading={title}
	// 	messageLoading='ХАП. Ожидание ответа от сервера'
	// 	// contentLoading={<MyText text={'Ожидание ответа от сервера'} />}
	// 	// contentSuccess={<MyText text={'Все супер класс!'} />}
	// 	messageError='Ошибочка(('
	// />

	if (isShelfDeleting) {
		return <>
			<ShelfDeleting title={title} shelfId={shelfId} />
			{/* {toast} */}
		</>
	}

	return (<>
		<Shelf {...props} />
		{/* {toast} */}
	</>
	)
}