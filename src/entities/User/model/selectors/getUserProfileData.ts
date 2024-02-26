import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserEmail = (state: StateSchema) => state.user.userProfileData?.email
export const getUserEmailVerified = (state: StateSchema) => state.user.userProfileData?.emailVerified
export const getUserName = (state: StateSchema) => state.user.userProfileData?.firstName

//
export const getUserSubscriptionType = (state: StateSchema) => state.user.userProfileData?.subscriptionType ?? 'trial'
export const getUserSubscriptionExpiresAt = (state: StateSchema) => state.user.userProfileData?.subscriptionExpiresAt ?? '16/11/2024'