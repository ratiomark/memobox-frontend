import { StateSchema } from '@/app/providers/StoreProvider'
import { localDataService } from '@/shared/lib/helpers/common/localDataService'

export const getViewPageSort = (state: StateSchema) => state.viewPage?.sort ?? localDataService.getSortValueViewPage()

export const getViewPageSortOrder = (state: StateSchema) => state.viewPage?.sortOrder ?? localDataService.getSortOrderViewPage()

export const getViewPageColumnSettingsIsOpen = (state: StateSchema) => state.viewPage?.isTableSettingsModalOpen ?? false
