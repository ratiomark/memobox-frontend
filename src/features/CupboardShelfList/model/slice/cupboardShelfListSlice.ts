import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CupboardPageSchema } from '../types/CupboardPageSchema'
import { User } from '@/entities/User'
import { setFeatureFlag } from '@/shared/lib/features'
import { fetchCupboardData } from '../services/fetchCupboardData'
import { CupboardSchema } from '@/entities/Cupboard'
import { ShelfSchema } from '@/entities/Shelf'
import { StateSchema } from '@/app/providers/StoreProvider'

const initialState: CupboardPageSchema = {
	isLoading: true,
	error: '',
	// shelves: [],
	entities: {},
	ids: [],
	cupboardData: {
		train: 0,
		all: 0,
		wait: 0
	}
}

const shelvesAdapter = createEntityAdapter<ShelfSchema>({
	selectId: (shelf) => shelf.id,
	// Сортирую по индексу
	sortComparer: (a, b) => a.index - b.index,
})

export const getCupboardState = shelvesAdapter.getSelectors<StateSchema>(
	(state) => state.cupboard
)
export const getShelfIsDeleting = createSelector(
	[
		(state: StateSchema, shelfId: string) => getCupboardState.selectById(state, shelfId)
	],
	(shelf) => shelf?.isDeleting
)

const cupboardShelfList = createSlice({
	name: 'cupboardShelfList',
	initialState,
	reducers: {
		deleteShelf: (state, action: PayloadAction<string>) => {
			shelvesAdapter.removeOne(state, action.payload)
		},
		// setShelfIsDeleting: (state, action: PayloadAction<string>) => {
		// 	shelvesAdapter.
		// 	// shelvesAdapter.updateOne({ 'id': action.payload, changes: {isDeleting: true}})
		// },
		updateShelf: shelvesAdapter.updateOne,

	},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchCupboardData.fulfilled,
				(state, action: PayloadAction<CupboardSchema>) => {
					const cupboard = action.payload
					state.isLoading = false
					shelvesAdapter.setAll(state, cupboard.shelves)
					state.cupboardData = {
						all: cupboard.data.all,
						train: cupboard.data.train,
						wait: cupboard.data.wait,
					}
				})
			.addCase(
				fetchCupboardData.rejected,
				(state) => {
					state.isLoading = false
				})
			.addCase(
				fetchCupboardData.pending,
				(state) => {
					state.isLoading = true
				}
			)
	}
})

export const { actions: cupboardShelfListActions } = cupboardShelfList
export const { reducer: cupboardShelfListReducer } = cupboardShelfList