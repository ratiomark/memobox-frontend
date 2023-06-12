import { StateSchema } from '@/app/providers/StoreProvider';

export const getCupboard = (state: StateSchema) => state.cupboard
export const getCupboardData = (state: StateSchema) => state.cupboard.cupboardData
export const getCupboardIsLoading = (state: StateSchema) => state.cupboard.isLoading
export const getCupboardError = (state: StateSchema) => state.cupboard.error
export const getCupboardShelves = (state: StateSchema) => state.cupboard
// export const getCupboardShelves = (state: StateSchema) => state.cupboard.shelves

// export const getDeletionIds = (state: StateSchema) => state.cupboard.shelvesDeletionIds 