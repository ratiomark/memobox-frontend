import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatsKnowledgeLevelsWidgetSchema } from '../types/StatsKnowledgeLevelsWidgetSchema'

const initialState: StatsKnowledgeLevelsWidgetSchema = {

}

const statsKnowledgeLevelsWidgetSlice = createSlice({
	name: 'statsKnowledgeLevelsWidget',
	initialState,
	reducers: {
		method: (state, action: PayloadAction<null>) => {

		},
	},
})

export const { actions: statsKnowledgeLevelsWidgetActions } = statsKnowledgeLevelsWidgetSlice
export const { reducer: statsKnowledgeLevelsWidgetReducer } = statsKnowledgeLevelsWidgetSlice