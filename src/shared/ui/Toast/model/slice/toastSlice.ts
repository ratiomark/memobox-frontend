import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MyToastProps, ToastsSchema } from '../types/ToastsSchema'

const initialState: ToastsSchema = {
	toasts: {},
	toastsIds: []
}

const toastsSlice = createSlice({
	name: 'toastsSlice',
	initialState,
	reducers: {
		addToast: (state, action: PayloadAction<{ id: string, toast: MyToastProps }>) => {
			state.toasts[action.payload.id] = action.payload.toast
			// state.toastsIds.push(action.payload.id)
		},
		removeToastById: (state, action: PayloadAction<string>) => {
			if (state.toasts[action.payload]) {
				delete state.toasts[action.payload]
			}
			// state.toastsIds = state.toastsIds.filter(id => id !== action.payload)
		},
		updateToastById: (state, action: PayloadAction<{ id: string, toast: MyToastProps }>) => {
			const toast = state.toasts[action.payload.id]
			if (toast) {
				state.toasts[action.payload.id] = { ...toast, ...action.payload.toast }
			}
		},
	},

})

export const { actions: toastsActions } = toastsSlice
export const { reducer: toastsReducer } = toastsSlice