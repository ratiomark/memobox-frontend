import { StateSchema } from '@/app/providers/StoreProvider';


export const getTrashPageIsCardEditModalOpen = (state: StateSchema) => state.trashPage?.isCardEditModalOpen
export const getTrashPageIsMoveCardsModalOpen = (state: StateSchema) => state.trashPage?.isMoveCardsModalOpen