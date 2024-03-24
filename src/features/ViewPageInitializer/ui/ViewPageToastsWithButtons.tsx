import clsx from 'clsx'
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import cls from './ViewPageToastsWithButtons.module.scss'

import { DURATION_MULTIPLE_CARDS_DELETION_MILLISEC } from '@/shared/const/animation';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { toastsActions } from '@/shared/ui/Toast';
import { MyToastWithButton } from '@/shared/ui/Toast/ui/MyToastRTK';

import { moveMultipleCardsThunk, viewPageActions } from '..';
import { getMultiSelectDeleteCardIds, getMultiSelectMoveCardIds } from '../model/selectors/getViewPageMultiSelect';
import { deleteMultipleCardsThunk } from '../model/services/deleteMultipleCardsThunk';


const MoveCardsToasts = () => {
	const dispatch = useAppDispatch()
	const multiSelectMoveCardIdList = useSelector(getMultiSelectMoveCardIds)
	return (<>
		{multiSelectMoveCardIdList.map(randomId => (
			<MyToastWithButton
				key={randomId}
				message='Карточки будут перемещены'
				buttonText='Отмена'
				onButtonClick={() => {
					dispatch(toastsActions.setAbortedThunkId(randomId))
					dispatch(viewPageActions.setAbortedThunkId(randomId))
					dispatch(viewPageActions.removeMultiSelectMoveIds(randomId))
				}}
				// onButtonClick={() => alert('CCCCCCCCC')}
				onTimeEnd={() => {
					dispatch(moveMultipleCardsThunk(randomId))
					// dispatch(viewPageActions.removeMultiSelectDeleteIds(id))
				}}
				// onTimeEnd={() => alert('Закрывашка')}
				duration={DURATION_MULTIPLE_CARDS_DELETION_MILLISEC}
			/>
		))}
	</>
	)
}
const DeleteCardsToasts = () => {
	const dispatch = useAppDispatch()
	const multiSelectDeleteCardIdList = useSelector(getMultiSelectDeleteCardIds)
	return (<>
		{multiSelectDeleteCardIdList.map(randomId => (
			<MyToastWithButton
				key={randomId}
				message='Карточки будут удалены'
				buttonText='Отмена'
				onButtonClick={() => {
					dispatch(toastsActions.setAbortedThunkId(randomId))
					dispatch(viewPageActions.setAbortedThunkId(randomId))
					dispatch(viewPageActions.removeMultiSelectDeleteIds(randomId))
				}}
				// onButtonClick={() => alert('CCCCCCCCC')}
				onTimeEnd={() => {
					console.log('Отработал конец')
					dispatch(deleteMultipleCardsThunk(randomId))
					// dispatch(viewPageActions.removeMultiSelectDeleteIds(id))
				}}
				// onTimeEnd={() => alert('Закрывашка')}
				duration={DURATION_MULTIPLE_CARDS_DELETION_MILLISEC}
			/>
		))}
	</>
	)
}

export const ViewPageToastsWithButtons = memo(() => {
	return (<>
		<MoveCardsToasts />
		<DeleteCardsToasts />
	</>
	)
})