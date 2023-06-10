import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatsAndActionsViewPageWidgetSchema } from '../types/StatsAndActionsViewPageWidgetSchema'

const initialState: StatsAndActionsViewPageWidgetSchema = {

}

const statsAndActionsViewPageWidgetSlice = createSlice({
	name: 'statsAndActionsViewPageWidget',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: statsAndActionsViewPageWidgetActions } = statsAndActionsViewPageWidgetSlice
export const { reducer: statsAndActionsViewPageWidgetReducer } = statsAndActionsViewPageWidgetSlice