import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import { mapCardsObjectToCardAfterTraining } from '@/shared/lib/helpers/mappers/mapCardsObjectToCardAfterTraining'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAnswersObject } from '../selectors/getTraining'
import { postMessageToSW } from '@/shared/lib/helpers/SW/post-message-to-sw'

interface useSendAnswersWhenWindowCloseProps {
	isTrainingComplete: boolean
}

export const useSendAnswersWhenWindowClose = ({ isTrainingComplete }: useSendAnswersWhenWindowCloseProps) => {
	const answersObject = useSelector(getAnswersObject)
	const dispatch = useAppDispatch()
	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (!isTrainingComplete && answersObject) {
				postMessageToSW({
					type: 'SEND_TRAINING_DATA',
					payload: mapCardsObjectToCardAfterTraining(answersObject)
				})
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [answersObject, dispatch, isTrainingComplete]);

	return null
}