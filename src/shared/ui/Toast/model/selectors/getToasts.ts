import { StateSchema } from '@/app/providers/StoreProvider';
import { MyToastProps } from '../types/ToastsSchema';
import { createSelector } from '@reduxjs/toolkit';
// const list: [string, MyToastProps][] = []
// const obj = {}
export const getToastsListIds = (state: StateSchema) => state.toasts?.toastsIds ?? []
export const getToastsObject = (state: StateSchema) => state.toasts?.toasts ?? {}
export const getToastByToastId = (id: string) => createSelector(
	[
		getToastsObject
	],
	(toastsObj) => {
		return toastsObj[id] as MyToastProps
	}
)
export const getAbortedThunkIds = (state: StateSchema) => state.toasts?.abortedThunkIds ?? []
// export const getToastsObject = (state: StateSchema) => state.toasts?.toasts ?? {}