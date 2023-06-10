import { StateSchema } from '@/app/providers/StoreProvider';

export const getJsonSavedData = (state: StateSchema) => state.user?.authData?.jsonSavedData
