import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SubscriptionWidgetSchema } from '../types/SubscriptionWidgetSchema'

const initialState: SubscriptionWidgetSchema = {

}

const subscriptionWidgetSlice = createSlice({
	name: 'subscriptionWidget',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: subscriptionWidgetActions } = subscriptionWidgetSlice
export const { reducer: subscriptionWidgetReducer } = subscriptionWidgetSlice