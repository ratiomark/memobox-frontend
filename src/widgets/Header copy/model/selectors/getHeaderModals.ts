import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsWriteToUsOpen = (state: StateSchema) => state.navBar.isWriteToUsModalOpen
export const getIsHelpModalOpen = (state: StateSchema) => state.navBar.isHelpModalOpen