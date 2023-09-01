import { StateSchema } from '@/app/providers/StoreProvider';
import { jsonSavedDataColumnsMock, jsonSavedDataViewPageRowsCountMock } from '../mockData/jsonSavedDataMock';

export const getJsonSavedData = (state: StateSchema) => state.user.jsonSavedData
export const getUserShelfNamesList = (state: StateSchema) => state.user.jsonSavedData?.shelfNamesList
export const getUserSavedDataCommonShelfCollapsed = (state: StateSchema) => state.user.jsonSavedData?.commonShelfCollapsed ?? true
// export const getJsonSavedData = (state: StateSchema) => state.user.authData?.jsonSavedData
// export const getUserShelfNamesList = (state: StateSchema) => state.user.authData?.jsonSavedData?.shelfNamesList
// export const getUserSavedDataCommonShelfCollapsed = (state: StateSchema) => state.user.authData?.jsonSavedData?.commonShelfCollapsed
export const getUserSavedDataViewPageColumns = (state: StateSchema) => state.user.jsonSavedData?.viewPageColumns
	?? jsonSavedDataColumnsMock

export const getUserSavedDataViewPageRowsCount = (state: StateSchema) => state.user.jsonSavedData?.viewPageCardRowsCount ?? jsonSavedDataViewPageRowsCountMock
// export const getUserSavedDataViewPageColumns = (state: StateSchema) => state.user.authData?.jsonSavedData?.viewPageColumns
// export const getUserSavedDataViewPageSort = (state: StateSchema) => state.user.authData?.jsonSavedData?.viewPageColumns
