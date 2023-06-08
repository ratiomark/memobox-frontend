import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatsAndActionsCupboardWidgetSchema } from '../types/StatsAndActionsCupboardWidgetSchema'

const initialState: StatsAndActionsCupboardWidgetSchema = {

}

const statsAndActionsCupboardWidgetSlice = createSlice({
	name: 'statsAndActionsCupboardWidget',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: statsAndActionsCupboardWidgetActions } = statsAndActionsCupboardWidgetSlice
export const { reducer: statsAndActionsCupboardWidgetReducer } = statsAndActionsCupboardWidgetSlice