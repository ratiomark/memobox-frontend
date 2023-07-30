import { StateSchema } from '@/app/providers/StoreProvider';

export const getTrashPageIsMultiSelectActive = (state: StateSchema) => state.trashPage?.isMultiSelectActive
export const getTrashPageSelectedCardIds = (state: StateSchema) => state.trashPage?.selectedCardIds