import { StateSchema } from '@/app/providers/StoreProvider';

export const getJsonSavedData = (state: StateSchema) => state.user.authData?.jsonSavedData
export const getUserShelfNamesList = (state: StateSchema) => state.user.authData?.jsonSavedData?.shelfNamesList
export const getUserSavedDataCommonShelfCollapsed = (state: StateSchema) => state.user.authData?.jsonSavedData?.commonShelfCollapsed
export const getUserSavedDataViewPageColumns = (state: StateSchema) => state.user.authData?.jsonSavedData?.viewPageColumns
// export const getUserSavedDataViewPageSort = (state: StateSchema) => state.user.authData?.jsonSavedData?.viewPageColumns
