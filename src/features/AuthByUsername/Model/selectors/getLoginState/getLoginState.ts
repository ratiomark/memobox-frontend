import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginMounted = (state: StateSchema) => state?.loginForm?._mounted ?? false
export const getLoginError = (state: StateSchema) => state?.loginForm?.error
export const getLoginIsLoginProcess = (state: StateSchema) => state?.loginForm?.isLoginProcess || false
export const getLoginIsLoadingRegister = (state: StateSchema) => state?.loginForm?.isLoadingRegister || false
export const getLoginIsLoadingLogin = (state: StateSchema) => state?.loginForm?.isLoadingLogin || false
export const getLoginPassword = (state: StateSchema) => state?.loginForm?.password || ''
export const getLoginEmail = (state: StateSchema) => state?.loginForm?.email || ''
export const getLoginUserName = (state: StateSchema) => state?.loginForm?.name || ''

export const getIsForgotModalOpen = (state: StateSchema) => state?.loginForm?.isForgotModalOpen ?? false