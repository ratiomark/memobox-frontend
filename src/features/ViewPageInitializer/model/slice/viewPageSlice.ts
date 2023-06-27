import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchBoxesDataByShelfId, FetchBoxesThunkResponse } from '../services/fetchBoxesDataByShelfId'
import { ViewPageInitializerSchema } from '../types/ViewPageInitializerSchema'
import { CardSchema } from '@/entities/Card'
import { fetchCards } from '../services/fetchCards'
import { SortColumnValue } from '@/entities/User'
import { SortOrderType } from '@/shared/types/SortOrderType'

const initialState: ViewPageInitializerSchema = {
	_viewPageMounted: false,
	columnSettingsIsOpen: false,
	isLoading: true,
	sort: 'createdAt',
	sortOrder: 'asc',
	error: '',
	cards: [],
	shelfId: 'all',
	boxId: 'new',
	shelvesDataSaved: {}
}

export interface InitiateShelfPayload {
	shelfId: string
	boxId: string
}

const viewPageSlice = createSlice({
	name: 'viewPage',
	initialState,
	reducers: {
		setActiveShelfId: (state, action: PayloadAction<string>) => {
			state.shelfId = action.payload
		},
		setActiveSort: (state, action: PayloadAction<SortColumnValue>) => {
			state.sort = action.payload
		},
		setSortOrder: (state, action: PayloadAction<SortOrderType>) => {
			state.sortOrder = action.payload
		},
		setColumnSettingsIsOpen: (state, action: PayloadAction<boolean>) => {
			state.columnSettingsIsOpen = action.payload
		},
		setActiveBoxId: (state, action: PayloadAction<string | number>) => {
			state.boxId = action.payload
		},
		setViewPageIsMounted: (state) => {
			state._viewPageMounted = true
		},

		initiateShelf: (state, action: PayloadAction<InitiateShelfPayload>) => {
			// if (action.payload.shelfId in state.shelvesDataSaved) {
			// 	null
			// } else
			state.shelvesDataSaved[action.payload.shelfId] = {
				data: {},
				isLoading: true,
				error: '',
				lastBoxId: action.payload.boxId
			}
		},
		setLastBoxId: (state, action: PayloadAction<{ shelfId: string, boxId: string }>) => {
			state.shelvesDataSaved[action.payload.shelfId]['lastBoxId'] = action.payload.boxId
		}
	},

	extraReducers: (builder) => {
		builder
			.addCase(
				fetchBoxesDataByShelfId.fulfilled,
				(state, action: PayloadAction<FetchBoxesThunkResponse>) => {
					const shelfId = Object.keys(action.payload)[0]
					state.shelvesDataSaved[shelfId]['isLoading'] = false
					state.shelvesDataSaved[shelfId]['data'] = action.payload[shelfId]
					state.shelvesDataSaved[shelfId]['error'] = undefined
				})
			.addCase(
				fetchBoxesDataByShelfId.rejected,
				(state, action) => {
					if (action.payload) {
						state.shelvesDataSaved[action.payload]['error'] = `some error when fetching cards shelfId = ${action.payload}`
						state.shelvesDataSaved[action.payload]['isLoading'] = false
					}
				})
			.addCase(
				fetchCards.fulfilled,
				(state, action: PayloadAction<CardSchema[]>) => {
					state.isLoading = false
					state.cards = action.payload
					state.error = ''
				})
			.addCase(
				fetchCards.rejected,
				(state, action) => {
					if (action.payload) {
						state.isLoading = false
						state.error = action.payload
					}
				})
			.addCase(
				fetchCards.pending,
				(state) => {
					state.isLoading = true
					state.error = ''
				})
	}
})

export const { actions: viewPageActions } = viewPageSlice
export const { reducer: viewPageReducer } = viewPageSlice