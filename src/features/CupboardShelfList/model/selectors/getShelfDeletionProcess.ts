import { StateSchema } from '@/app/providers/StoreProvider';

export const getShelfDeletionRequestStatus = (state: StateSchema) => state.cupboard.shelfDeletionProcess.requestStatus
export const getShelfDeletionShelfId = (state: StateSchema) => state.cupboard.shelfDeletionProcess.shelfId
