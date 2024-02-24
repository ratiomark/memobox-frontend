import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserEmail = (state: StateSchema) => state.user.authData?.email
export const getUserEmailVerified = (state: StateSchema) => state.user.authData?.emailVerified
export const getUserName = (state: StateSchema) => state.user.authData?.firstName

//
export const getUserSubscriptionType = (state: StateSchema) => state.user.authData?.subscriptionType ?? 'trial'
export const getUserSubscriptionExpiresAt = (state: StateSchema) => state.user.authData?.subscriptionExpiresAt ?? '16/11/2024'