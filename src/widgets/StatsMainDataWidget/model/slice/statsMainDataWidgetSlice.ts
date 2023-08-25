import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatsMainDataWidgetSchema } from '../types/StatsMainDataWidgetSchema'

const initialState: StatsMainDataWidgetSchema = {

}

const statsMainDataWidgetSlice = createSlice({
	name: 'statsMainDataWidget',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: statsMainDataWidgetActions } = statsMainDataWidgetSlice
export const { reducer: statsMainDataWidgetReducer } = statsMainDataWidgetSlice