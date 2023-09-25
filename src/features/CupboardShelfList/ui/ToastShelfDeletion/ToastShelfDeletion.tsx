import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice'
import { MyToast } from '@/shared/ui/Toast'
import { getShelfDeletionRequestStatus } from '../../model/selectors/getShelfDeletionProcess'

export const ToastShelfDeletion = () => {
	const shelfDeletionRequestStatus = useSelector(getShelfDeletionRequestStatus)
	const dispatch = useAppDispatch()

	const onTimeEnd = () => {
		dispatch(cupboardShelfListActions.setShelfDeletionRequestStatus('idle'))
	}

	return (
		<MyToast
			onTimeEnd={onTimeEnd}
			status={shelfDeletionRequestStatus}
			messageSuccess='Полка удалена'
			// messageLoading='Загрузка'
			messageLoading='Ждем ответа от сервера'
			// contentLoading={<MyText text={'Ожидание ответа от сервера'} />}
			// contentSuccess={<MyText text={'Все супер класс!'} />}
			messageError='Ошибка!!!'

		/>
	)
}