import { StateSchema } from '@/app/providers/StoreProvider';

export const getJsonSavedData = (state: StateSchema) => state.user.authData?.jsonSavedData
export const getUserShelfNamesList = (state: StateSchema) => state.user.authData?.jsonSavedData?.shelfNamesList
