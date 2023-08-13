import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsChangeNameModalOpen = (state: StateSchema) => state.profilePage?.isChangeNameModalOpen ?? false
export const getIsChangeEmailModalOpen = (state: StateSchema) => state.profilePage?.isChangeEmailModalOpen ?? false
export const getIsChangePasswordModalOpen = (state: StateSchema) => state.profilePage?.isChangePasswordModalOpen ?? false