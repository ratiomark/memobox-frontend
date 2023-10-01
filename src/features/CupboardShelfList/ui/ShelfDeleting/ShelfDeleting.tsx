import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfDeleting.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../..';
import { Heading, MyText } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { DURATION_SHELF_DELETION_MILLISEC } from '@/shared/const/animation';
import { useRemoveShelfMutation } from '@/entities/Shelf';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { useLocation } from 'react-router-dom';
import { deleteShelfThunk } from '../../model/services/deleteShelfThunk';
import { getShelfIsDeleting } from '../../model/selectors/getShelfDeletionProcess';
import { CircularCountDownWithProgress } from '@/shared/ui/CircularCountDownWithProgress';

interface ShelfDeletingProps {
	shelfId: string
	title: string
}

export const ShelfDeleting = (props: ShelfDeletingProps) => {
	const {
		shelfId,
		title
	} = props

	const dispatch = useAppDispatch()
	const [removeShelfMutation] = useRemoveShelfMutation()
	const [timer, setTimer] = useState<TimeoutId | null>(null);
	// const openToast = useToast()
	// const isShelfDeleting = useSelector((state: StateSchema) => getShelfIsDeleting(state, shelfId))
	const isShelfDeleting = useSelector(getShelfIsDeleting(shelfId))
	// const isShelfDeleted = useSelector(getShelfIsDeleted(shelfId))
	// const shelfDeletionRequestStatus = useSelector(getShelfDeletionRequestStatus(shelfId))
	const location = useLocation();

	// useEffect(() => {
	// 	console.log(`${title}   ----   ${shelfDeletionRequestStatus}`)
	// }, [title, shelfDeletionRequestStatus])

	useEffect(() => {
		return () => {
			if (isShelfDeleting) {
				// удаляет полку, если перейти на новый роут и если полка находится в режими ожидания удаления
				// dispatch(cupboardShelfListActions.deleteShelf(shelfId))
				// removeShelfMutation(shelfId)
			}
		}
	}, [location, isShelfDeleting, shelfId, dispatch, removeShelfMutation]);

	// const isShelfDeleting = useSelector((state: StateSchema) => getShelfIsDeleting(state, shelfId))
	// timerId = setTimeout(() => {
	// 	if (isShelfDeleting) {
	// 		dispatch(cupboardShelfListActions.deleteShelf(shelfId))
	// 		removeShelfMutation(shelfId)
	// 	}
	// 	clearTimeout(timerId)


	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(deleteShelfThunk(shelfId))
		}, DURATION_SHELF_DELETION_MILLISEC)
		setTimer(timer)
		// return () => clearTimeout(timerId)
	}, [dispatch, shelfId])
	// useEffect(() => {
	// 	// console.log('Я в АААААААААААААА')
	// 	const timer = setTimeout(() => {
	// 		// console.log('ТАЙМАУТА')
	// 		// dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { deletingRequestStatus: 'pending' } }))
	// 		dispatch(deleteShelfThunk(shelfId))
	// 		// clearTimeout(timerId)
	// 	}, DURATION_SHELF_DELETION_MILLISEC)
	// 	setTimer(timer)
	// 	// }
	// 	// return () => clearTimeout(timerId)
	// }, [dispatch, shelfId])
	// useEffect(() => {
	// 	openToast({
	// 		onTimeEnd: onTimeEnd,
	// 		status: shelfDeletionRequestStatus,
	// 		messageSuccess: 'Полка удалена',
	// 		messageLoading: 'ХОП. Ждем ответа от сервера',
	// 		messageError: 'Ошибка!!!'
	// 		// contentLoading={<MyText text={'Ожидание ответа от сервера'} />}
	// 		// contentSuccess={<MyText text={'Все супер класс!'} />}
	// 		// messageLoading='Загрузка'
	// 	})
	// 	// }
	// 	// return () => clearTimeout(timerId)
	// }, [onTimeEnd, shelfDeletionRequestStatus, openToast])
	// }, [shelfId, dispatch, removeShelfMutation])
	// }, [shelfId, dispatch, isShelfDeleting, removeShelfMutation])

	useEffect(() => {
		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [timer])

	useEffect(() => {
		return () => {
			// if (isShelfDeleting) {
			dispatch(deleteShelfThunk(shelfId))
			// dispatch(cupboardShelfListActions.deleteShelf(shelfId))
			// removeShelfMutation(shelfId)
		}
		// if (isShelfDeleting) console.log('РОУТ РОУТ РОУТ ') }
	}, [dispatch, shelfId])
	// }, [dispatch, isShelfDeleting, shelfId])


	// useEffect(() => {
	// 	const deleteShelf = () => {
	// 		if (isShelfDeleting) {
	// 			dispatch(deleteShelfThunk(shelfId))
	// 		}
	// 	}

	// 	window.addEventListener('beforeunload', deleteShelf)

	// 	return () => {
	// 		window.removeEventListener('beforeunload', deleteShelf)
	// 	}
	// }, [dispatch, isShelfDeleting, shelfId])

	const onCancelDeletion = () => {
		if (timer) clearTimeout(timer);
		// dispatch(cupboardShelfListActions.setIsAnyShelfInDeletionProcess(false))
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isDeleting: false, deletingRequestStatus: 'idle' } }))
	}

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.ShelfDeleting,
		)}
		>
			<VStack align='start' gap='gap_8'>
				<Heading as='h3' size='s' title={title} className={cls.title} />
				<MyText className={cls.description} text={t('shelf in deletion proccess')} />
			</VStack>
			<Button className={cls.button} fontWeight='300' onClick={onCancelDeletion}>
				{t('cancel shelf deletion')}
			</Button>
			<CircularCountDownWithProgress duration={DURATION_SHELF_DELETION_MILLISEC / 1000} />
			{/* <div className={cls.countdown}>
				<svg className={cls.svg} viewBox="-50 -50 100 100" strokeWidth="7">
					<circle className={cls.first} r="45"></circle>
					<circle className={cls.first} r="45" pathLength="1"></circle>
				</svg>
			</div> */}
		</div>

	)
}