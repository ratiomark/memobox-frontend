import clsx from 'clsx'
import cls from './ShelvesDeletionToasts.module.scss'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import { MyToast } from '@/shared/ui/Toast'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { cupboardShelfListActions, getAllShelvesIds } from '../../model/slice/cupboardShelfListSlice'
import { getShelfDeletionRequestStatus } from '../../model/selectors/getShelfDeletionProcess'
import { EntityId } from '@reduxjs/toolkit'
import { getShelfTitleByShelfId } from '../../model/selectors/getCupboardShelfList'


export const ShelvesDeletionToasts = () => {

	const shelvesIds = useSelector(getAllShelvesIds)
	return (
		<>
			{shelvesIds.map(shelfId => <ShelvesDeletionToast key={shelfId} shelfId={shelfId} />)}
		</>
	)
}

const ShelvesDeletionToast = ({ shelfId }: { shelfId: EntityId }) => {
	const shelfDeletionRequestStatus = useSelector(getShelfDeletionRequestStatus(shelfId))
	const shelfTitle = useSelector(getShelfTitleByShelfId(shelfId))
	const dispatch = useAppDispatch()

	const onTimeEnd = useCallback(() => {
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isDeleting: false, deletingRequestStatus: 'idle' } }))
	}, [dispatch, shelfId])

	return <MyToast
		onTimeEnd={onTimeEnd}
		status={shelfDeletionRequestStatus}
		messageSuccess='УДАЛЕНА'
		// messageLoading='Загрузка'
		contentLoading={shelfTitle}
		messageLoading='ХАП. Ожидание ответа от сервера'
		// contentLoading={<MyText text={'Ожидание ответа от сервера'} />}
		// contentSuccess={<MyText text={'Все супер класс!'} />}
		messageError='Ошибочка(('
	/>
}