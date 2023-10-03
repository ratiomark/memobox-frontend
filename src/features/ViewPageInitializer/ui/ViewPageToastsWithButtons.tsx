import clsx from 'clsx'
import cls from './ViewPageToastsWithButtons.module.scss'
import { useSelector } from 'react-redux';
import { MyToastWithButton } from '@/shared/ui/Toast/ui/MyToastRTK';
import { getMultiSelectDeleteCardIds } from '../model/selectors/getViewPageMultiSelect';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { viewPageActions } from '..';
import { deleteMultipleCardsThunk } from '../model/services/deleteMultipleCardsThunk';
import { memo, useEffect } from 'react';
import { DURATION_MULTIPLE_CARDS_DELETION_MILLISEC } from '@/shared/const/animation';


export const ViewPageToastsWithButtons = memo(() => {

	const dispatch = useAppDispatch()
	const multiSelectDeleteCardIdList = useSelector(getMultiSelectDeleteCardIds)
	// useEffect(() => {
	// 	console.log(multiSelectDeleteCardIdList)
	// }, [multiSelectDeleteCardIdList])

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
})