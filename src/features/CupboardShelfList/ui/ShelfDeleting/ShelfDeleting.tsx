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
import { getShelfIsDeleting } from '../../model/selectors/getCupboardShelfList';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { useLocation } from 'react-router-dom';

interface ShelfDeletingProps {
	id: string
	title: string
}

export const ShelfDeleting = (props: ShelfDeletingProps) => {
	const {
		id,
		title
	} = props

	const dispatch = useAppDispatch()
	const [removeShelfMutation] = useRemoveShelfMutation()
	const [timer, setTimer] = useState<TimeoutId | null>(null);
	// const isShelfDeleting = useSelector((state: StateSchema) => getShelfIsDeleting(state, id))
	const isShelfDeleting = useSelector(getShelfIsDeleting(id))
	const location = useLocation();

	useEffect(() => {
		return () => {
			if (isShelfDeleting) {
				// удаляет полку, если перейти на новый роут и если полка находится в режими ожидания удаления
				// dispatch(cupboardShelfListActions.deleteShelf(id))
				// removeShelfMutation(id)
			}
		}
	}, [location, isShelfDeleting, id, dispatch, removeShelfMutation]);

	// const isShelfDeleting = useSelector((state: StateSchema) => getShelfIsDeleting(state, id))
	// timerId = setTimeout(() => {
	// 	if (isShelfDeleting) {
	// 		dispatch(cupboardShelfListActions.deleteShelf(shelfId))
	// 		removeShelfMutation(shelfId)
	// 	}
	// 	clearTimeout(timerId)
	// }, DURATION_SHELF_DELETION_MILLISEC)
	useEffect(() => {
		// console.log('Я в АААААААААААААА')
		if (isShelfDeleting) {
			const timer = setTimeout(() => {
				// console.log('ТАЙМАУТА')
				if (isShelfDeleting) {
					// console.log('Я в ГЛВАВВЕЕЕА')
					dispatch(cupboardShelfListActions.deleteShelf(id))
					removeShelfMutation(id)
				}
				// clearTimeout(timerId)
			}, DURATION_SHELF_DELETION_MILLISEC)
			setTimer(timer)
		}
		// return () => clearTimeout(timerId)
	}, [id, dispatch, isShelfDeleting, removeShelfMutation])

	useEffect(() => {
		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [timer])

	const onCancelDeletion = () => {
		if (timer) clearTimeout(timer);
		dispatch(cupboardShelfListActions.updateShelf({ id, changes: { isDeleting: false } }))
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
			<div className={cls.countdown}>
				<svg className={cls.svg} viewBox="-50 -50 100 100" strokeWidth="7">
					<circle className={cls.first} r="45"></circle>
					<circle className={cls.first} r="45" pathLength="1"></circle>
				</svg>
			</div>
		</div>
	)
}