import { useSelector } from 'react-redux';
import { getShelfIdAndIndexesList, getShelfIdAndIndexesListInitial } from '../selectors/getCupboardShelfList';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { updateShelfListOrderThunk } from '../services/updateShelfListOrderThunk';
import { useDebounce } from '@/shared/lib/helpers/hooks/useDebounce';
import { callbackMainDelay } from '@/shared/const/callbackDelays';
import { useCallback, useEffect } from 'react';

export const useShelvesDndHandler = () => {
	const shelvesIdsAndIndexesCurrent = useSelector(getShelfIdAndIndexesList)
	const shelvesIdsAndIndexesInitial = useSelector(getShelfIdAndIndexesListInitial)

	const dispatch = useAppDispatch()

	const sendShelvesOrderCallback = useCallback(() => {
		dispatch(updateShelfListOrderThunk())
	}, [dispatch])

	const debouncedUpdate = useDebounce(sendShelvesOrderCallback, callbackMainDelay);

	useEffect(() => {
		// if (isShelvesDndRepresentationEqual(shelvesIdsAndIndexesInitial, shelvesIdsAndIndexesCurrent)) return
		debouncedUpdate();
	}, [debouncedUpdate, shelvesIdsAndIndexesCurrent, shelvesIdsAndIndexesInitial]);


	useEffect(() => {
		return () => {
			dispatch(updateShelfListOrderThunk())
			console.log('ПРОБУЮ ОТПРАВИТЬ НОВЫЙ ПОРЯДОК - РАЗМонтирование')
		}
	}, [dispatch])


	useEffect(() => {
		window.addEventListener('beforeunload', sendShelvesOrderCallback);

		return () => {
			window.removeEventListener('beforeunload', sendShelvesOrderCallback);
		};
	}, [sendShelvesOrderCallback]);
}