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
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { deleteShelfThunk } from '../../model/services/deleteShelfThunk';
import { CircularCountDownWithProgress } from '@/shared/ui/CircularCountDownWithProgress';

interface ShelfDeletingProps {
	shelfId: string
	title: string
	isShelfDeleting: boolean
}

export const ShelfDeleting = (props: ShelfDeletingProps) => {
	const {
		shelfId,
		title,
		isShelfDeleting,
	} = props

	const dispatch = useAppDispatch()
	const [removeShelfMutation] = useRemoveShelfMutation()
	const [timer, setTimer] = useState<TimeoutId | null>(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(deleteShelfThunk(shelfId))
		}, DURATION_SHELF_DELETION_MILLISEC)
		setTimer(timer)
	}, [dispatch, shelfId])

	useEffect(() => {
		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [timer])

	// удаляет, если уходит на другой роут
	useEffect(() => {
		return () => {
			dispatch(deleteShelfThunk(shelfId))
		}
	}, [dispatch, shelfId])
	// }, [dispatch, isShelfDeleting, shelfId])

	// удаляет полку сразу, если перезагружает или закрывает вкладку
	useEffect(() => {
		const deleteShelf = () => {
			if (isShelfDeleting) {
				dispatch(deleteShelfThunk(shelfId))
			}
		}

		window.addEventListener('beforeunload', deleteShelf)
		return () => {
			window.removeEventListener('beforeunload', deleteShelf)
		}
	}, [dispatch, isShelfDeleting, shelfId])



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