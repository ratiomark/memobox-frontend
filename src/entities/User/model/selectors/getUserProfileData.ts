import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserEmail = (state: StateSchema) => state.user.authData?.email
export const getUserEmailVerified = (state: StateSchema) => state.user.authData?.emailVerified
export const getUserName = (state: StateSchema) => state.user.authData?.name

//
export const getUserSubscriptionType = (state: StateSchema) => state.user.authData?.subscriptionType ?? 'paid'
export const getUserSubscriptionExpiresAt = (state: StateSchema) => state.user.authData?.subscriptionExpiresAt ?? '16/11/2024'