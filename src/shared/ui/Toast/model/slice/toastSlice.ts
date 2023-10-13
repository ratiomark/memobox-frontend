import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MyToastProps, ToastsSchema } from '../types/ToastsSchema'

const initialState: ToastsSchema = {
	toasts: {},
	toastsIds: [],
	abortedThunkIds: [],
	toastWithButtonsListIds: [],
}

const toastsSlice = createSlice({
	name: 'toastsSlice',
	initialState,
	reducers: {
		addToastWithButtonId: (state, action: PayloadAction<string>) => {
			if (!state.toastWithButtonsListIds.includes(action.payload)) {
				state.toastWithButtonsListIds.push(action.payload)
			}
		},
		removeToastWithButtonId: (state, action: PayloadAction<string>) => {
			state.toastWithButtonsListIds = state.toastWithButtonsListIds.filter(id => id !== action.payload)
		},
		addToast: (state, action: PayloadAction<{ id: string, toast: MyToastProps }>) => {
			if (!state.toasts[action.payload.id]) {
				state.toasts[action.payload.id] = action.payload.toast
			}
			if (!state.toastsIds.includes(action.payload.id)) {
				state.toastsIds.push(action.payload.id)
			}
		},
		removeToastById: (state, action: PayloadAction<string>) => {
			if (state.toasts[action.payload]) {
				delete state.toasts[action.payload]
			}
			state.toastsIds = state.toastsIds.filter(id => id !== action.payload)
		},
		updateToastById: (state, action: PayloadAction<{ id: string, toast: MyToastProps }>) => {
			const toast = state.toasts[action.payload.id]
			if (toast) {
				state.toasts[action.payload.id] = { ...toast, ...action.payload.toast }
			}
		},
		setAbortedThunkId: (state, action: PayloadAction<string>) => {
			state.abortedThunkIds.push(action.payload)
		},
		removeAbortedThunkId: (state, action: PayloadAction<string>) => {
			state.abortedThunkIds = state.abortedThunkIds.filter(id => id !== action.payload)
		},
	},

})

export const { actions: toastsActions } = toastsSlice
export const { reducer: toastsReducer } = toastsSlice