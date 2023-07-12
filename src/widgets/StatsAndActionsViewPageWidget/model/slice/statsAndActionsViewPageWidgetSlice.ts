import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatsAndActionsViewPageWidgetSchema } from '../types/StatsAndActionsViewPageWidgetSchema'
import { SortColumnObject } from '@/entities/User'

const initialState: StatsAndActionsViewPageWidgetSchema = {
	columns: []
}

const statsAndActionsViewPageWidgetSlice = createSlice({
	name: 'statsAndActionsViewPageWidget',
	initialState,
	reducers: {
		setColumns: (state, action: PayloadAction<SortColumnObject[]>) => {
			state.columns = action.payload
		},
	},
})

export const { actions: statsAndActionsViewPageWidgetActions } = statsAndActionsViewPageWidgetSlice
export const { reducer: statsAndActionsViewPageWidgetReducer } = statsAndActionsViewPageWidgetSlice