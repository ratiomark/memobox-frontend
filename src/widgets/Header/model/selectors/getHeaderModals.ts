import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsWriteToUsOpen = (state: StateSchema) => state.header.isWriteToUsModalOpen
export const getIsHelpModalOpen = (state: StateSchema) => state.header.isHelpModalOpen