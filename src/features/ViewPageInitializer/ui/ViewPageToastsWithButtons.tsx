import clsx from 'clsx'
import cls from './ViewPageToastsWithButtons.module.scss'
import { useSelector } from 'react-redux';
import { MyToastWithButton } from '@/shared/ui/Toast/ui/MyToastRTK';
import { getMultiSelectDeleteCardIds, getMultiSelectMoveCardIds } from '../model/selectors/getViewPageMultiSelect';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { moveMultipleCardsThunk, viewPageActions } from '..';
import { deleteMultipleCardsThunk } from '../model/services/deleteMultipleCardsThunk';
import { memo, useEffect } from 'react';
import { DURATION_MULTIPLE_CARDS_DELETION_MILLISEC } from '@/shared/const/animation';


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
			// duration={DURATION_MULTIPLE_CARDS_DELETION_MILLISEC}
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
			// duration={DURATION_MULTIPLE_CARDS_DELETION_MILLISEC}
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