// eslint-disable-next-line custom-fsd-checker-plugin/public-api-imports
import cls from '@/entities/Box/ui/Box.module.scss';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice';
import { Heading, } from '@/shared/ui/Typography';
import { Button } from '@/shared/ui/Button';
import { DURATION_SHELF_DELETION_MILLISEC } from '@/shared/const/animation';
import { CircularCountDownWithProgress } from '@/shared/ui/CircularCountDownWithProgress';
import { useDeleteWithCountdown } from '@/shared/lib/helpers/hooks/useDeleteWithCountdown';
import { idPrefixBoxDeletion } from '@/shared/const/idsAndDataAttributes';
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
		dispatch(setIsBoxDeletingThunk({ boxId, isDeleting: false}))
		dispatch(cupboardShelfListActions.setAbortedThunkId(idPrefixBoxDeletion + boxId))
	}

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
}