import { StateSchema } from '@/app/providers/StoreProvider';
import { MyToastProps } from '../types/ToastsSchema';
// const list: [string, MyToastProps][] = []
// const obj = {}
export const getToastsObject = (state: StateSchema) => state.toasts.toasts ?? {}
export const getToastsList = (state: StateSchema) => Object.entries(state.toasts.toasts) ?? []