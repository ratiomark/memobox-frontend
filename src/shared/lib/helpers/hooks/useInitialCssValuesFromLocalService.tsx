import { useEffect } from 'react';
import { localDataService } from '../common/localDataService';

export const useInitialCssValuesFromLocalService = () => {

	useEffect(() => {
		const root = document.querySelector('#root') as HTMLElement
		root.style.setProperty('--view-rows', localDataService.getViewRows() ?? '2')
	}, [])

}