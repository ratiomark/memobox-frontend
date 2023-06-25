import { StateSchema } from '@/app/providers/StoreProvider';
import { SortColumnObject } from '../types/SortControllerViewPageWidgetSchema';

export const getColumns = (): SortColumnObject[] => {
	return [
		{ value: 'shelf', content: 'shelf', enabled: true, index: 0 },
		{ value: 'createdAt', content: 'creation', enabled: true, index: 1 },
		{ value: 'lastTraining', content: 'last training', enabled: true, index: 2 },
	]
}
// export const getSortControllerViewPageWidget = (state: StateSchema) => state.sortControllerViewPageWidget