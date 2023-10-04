import { useEffect } from 'react';
import { localDataService } from '../common/localDataService';
import { getAppRoot } from '../DOM/getAppRoot';
import { CSS_VARIABLE_VIEW_ROWS } from '@/shared/const/cssVariables';

export const useInitialCssValuesFromLocalService = () => {

	useEffect(() => {
		const root = getAppRoot()
		root.style.setProperty(CSS_VARIABLE_VIEW_ROWS, localDataService.getViewRows() ?? '2')
	}, [])

}