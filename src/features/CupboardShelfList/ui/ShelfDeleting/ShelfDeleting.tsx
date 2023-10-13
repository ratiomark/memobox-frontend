import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfDeleting.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../..';
import { Heading, MyText } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import { DURATION_SHELF_DELETION_MILLISEC } from '@/shared/const/animation';
import { useRemoveShelfMutation } from '@/entities/Shelf';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { deleteShelfThunk } from '../../model/services/deleteShelfThunk';
import { CircularCountDownWithProgress } from '@/shared/ui/CircularCountDownWithProgress';
import { useDeleteWithCountdown } from '@/shared/lib/helpers/hooks/useDeleteWithCountdown';
import { toastsActions } from '@/shared/ui/Toast';
import { unstable_batchedUpdates } from 'react-dom';
import { idPrefixShelfDeletion } from '@/shared/const/idsAndDataAttributes';

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
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const deleteShelf = useCallback(() => {
		dispatch(deleteShelfThunk(shelfId))
	}, [shelfId, dispatch,])

	const { timer } = useDeleteWithCountdown({
		startCondition: isShelfDeleting,
		deletionFn: deleteShelf,
		duration: DURATION_SHELF_DELETION_MILLISEC,
	})

	const onCancelDeletion = async () => {
		if (timer) clearTimeout(timer)
		dispatch(toastsActions.setAbortedThunkId(idPrefixShelfDeletion + shelfId))
		// dispatch(cupboardShelfListActions.setAbortedThunkId(idPrefixShelfDeletion + shelfId))
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isDeleting: false, deletingRequestStatus: 'idle' } }))
	}


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


// useEffect(() => {
// 	if (!condition) {
// 		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isDeleting: false, deletingRequestStatus: 'idle' } }));
// 		dispatch(toastsActions.removeToastById('shelfDeletion' + shelfId));
// 	}
// }, [condition, dispatch, shelfId]);

// useEffect(() => {
// 	return () => {
// 		if (condition) {
// 			console.log('SSSSSSSSSSSSSSSSSSS')
// 			dispatch(deleteShelfThunk(shelfId))
// 		}

// 	}
// }, [dispatch, shelfId, condition])