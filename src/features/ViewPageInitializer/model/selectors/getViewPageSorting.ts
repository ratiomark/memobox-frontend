import { StateSchema } from '@/app/providers/StoreProvider'

export const getViewPageSort = (state: StateSchema) => state.viewPage?.sort ?? 'createdAt'
export const getViewPageSortOrder = (state: StateSchema) => state.viewPage?.sortOrder ?? 'asc'
export const getViewPageColumnSettingsIsOpen = (state: StateSchema) => state.viewPage?.isTableSettingsModalOpen ?? false
