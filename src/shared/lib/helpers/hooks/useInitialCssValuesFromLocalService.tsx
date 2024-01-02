import { useEffect } from 'react';
import { localDataService } from '../common/localDataService';
import { getAppRoot } from '../DOM/getAppRoot';
import { CSS_VAR_view_rows } from '@/shared/const/cssVariables';

export const useInitialCssValuesFromLocalService = () => {
	useEffect(() => {
		const root = getAppRoot()
		root.style.setProperty(CSS_VAR_view_rows, localDataService.getViewRows().toString() ?? '2')
	}, [])
}