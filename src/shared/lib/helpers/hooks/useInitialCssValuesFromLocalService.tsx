import { useEffect } from 'react';
import { localDataService } from '../common/localDataService';
import { getAppRoot } from '../DOM/getAppRoot';
import { css_variable_view_rows } from '@/shared/const/cssVariables';

export const useInitialCssValuesFromLocalService = () => {
	useEffect(() => {
		const root = getAppRoot()
		root.style.setProperty(css_variable_view_rows, localDataService.getViewRows().toString() ?? '2')
	}, [])
}