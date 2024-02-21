import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginError = (state: StateSchema) => state?.loginForm?.error
export const getLoginIsLoginProcess = (state: StateSchema) => state?.loginForm?.isLoginProcess || false
export const getLoginIsLoading = (state: StateSchema) => state?.loginForm?.isLoading || false
export const getLoginPassword = (state: StateSchema) => state?.loginForm?.password || ''
export const getLoginEmail = (state: StateSchema) => state?.loginForm?.email || ''
export const getLoginUserName = (state: StateSchema) => state?.loginForm?.name || ''

export const getIsForgotModalOpen = (state: StateSchema) => state?.loginForm?.isForgotModalOpen ?? false