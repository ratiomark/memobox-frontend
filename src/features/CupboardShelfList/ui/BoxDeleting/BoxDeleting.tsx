// import cls from './BoxDeleting.module.scss';
// eslint-disable-next-line custom-fsd-checker-plugin/public-api-imports
import cls from '@/entities/Box/ui/Box.module.scss';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../..';
import { Heading, } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { DURATION_SHELF_DELETION_MILLISEC } from '@/shared/const/animation';
import { CircularCountDownWithProgress } from '@/shared/ui/CircularCountDownWithProgress';
import { useDeleteWithCountdown } from '@/shared/lib/helpers/hooks/useDeleteWithCountdown';
import { idPrefixBoxDeletion, idPrefixShelfDeletion } from '@/shared/const/idsAndDataAttributes';
import { setIsBoxDeletingThunk } from '../../model/services/setIsBoxDeletingThunk';
import { deleteBoxThunk } from '../../model/services/deleteBoxThunk';

interface BoxDeletingProps {
	boxId: string
	index: number
	isBoxDeleting: boolean
}

export const BoxDeleting = (props: BoxDeletingProps) => {
	const {
		boxId,
		index,
		isBoxDeleting,
	} = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const deleteBox = useCallback(() => {
		dispatch(deleteBoxThunk(boxId))
	}, [boxId, dispatch])

	const { timer } = useDeleteWithCountdown({
		startCondition: isBoxDeleting,
		deletionFn: deleteBox,
		duration: DURATION_SHELF_DELETION_MILLISEC,
	})

	const onCancelDeletion = async () => {
		if (timer) clearTimeout(timer)
		dispatch(setIsBoxDeletingThunk(false))
		dispatch(cupboardShelfListActions.setAbortedThunkId(idPrefixBoxDeletion + boxId))
	}

	// const title = <Heading as='h5' className={cls.title} title={index} />
	return (
		<li className={cls.Box} >
			<div className={cls.boxInnerWrapperDeletion} >
				<Heading as='h5' className={cls.title} title={`${t('box text')} ${index}`} />
				<CircularCountDownWithProgress duration={DURATION_SHELF_DELETION_MILLISEC / 1000} />
				<Button className={cls.button} fontWeight='300' onClick={onCancelDeletion}>
					{t('cancel no keys')}
				</Button>
				<div style={{ width: 130 }} />
			</div>
		</li>)

	// return (

	// <div className={clsx(
	// 	cls.ShelfDeleting,
	// )}
	// >
	// 	<VStack align='start' gap='gap_8'>
	// 		<Heading as='h3' size='s' title={index.toString()} className={cls.title} />
	// 		<MyText className={cls.description} text={t('shelf in deletion proccess')} />
	// 	</VStack>
	// 	<Button className={cls.button} fontWeight='300' onClick={onCancelDeletion}>
	// 		{t('cancel shelf deletion')}
	// 	</Button>
	// 	<CircularCountDownWithProgress duration={DURATION_SHELF_DELETION_MILLISEC / 1000} />
	// 	{/* <div className={cls.countdown}>
	// 		<svg className={cls.svg} viewBox="-50 -50 100 100" strokeWidth="7">
	// 			<circle className={cls.first} r="45"></circle>
	// 			<circle className={cls.first} r="45" pathLength="1"></circle>
	// 		</svg>
	// 	</div> */}
	// </div>

	// )
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