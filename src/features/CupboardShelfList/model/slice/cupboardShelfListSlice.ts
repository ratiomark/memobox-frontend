import { createEntityAdapter, createSelector, createSlice, EntityId, IdSelector, PayloadAction } from '@reduxjs/toolkit'
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
	newCardModal: {
		shelfId: '',
		boxIndex: 0,
		// boxId:'',
		questionText: '',
		answerText: '',
		isOpen: false,
	},
	entities: {},
	ids: [],
	boxesSettingsShelfId: '',
	isBoxesSettingsModalOpen: false,
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

const cupboardShelfList = createSlice({
	name: 'cupboardShelfList',
	initialState,
	reducers: {
		deleteShelf: (state, action: PayloadAction<EntityId>) => {
			shelvesAdapter.removeOne(state, action.payload)
		},
		setCardModalIsOpen: (state, action: PayloadAction<boolean>) => {
			state.newCardModal.isOpen = action.payload
		},
		setQuestionText: (state, action: PayloadAction<string>) => {
			state.newCardModal.questionText = action.payload
		},
		setAnswerText: (state, action: PayloadAction<string>) => {
			state.newCardModal.answerText = action.payload
		},
		setShelfIdCardModal: (state, action: PayloadAction<string>) => {
			state.newCardModal.shelfId = action.payload
			// если индекс прошлой коробки превышает максимальный индекс текущей полки, то ставлю коробку с новыми карточками.
			const currentShelfBoxes = state.entities[action.payload]?.boxesData
			if (currentShelfBoxes && currentShelfBoxes.length <= state.newCardModal.boxIndex) {
				state.newCardModal.boxIndex = 0
			}
		},
		setBoxIndexCardModal: (state, action: PayloadAction<number>) => {
			state.newCardModal.boxIndex = action.payload
		},
		setBoxesSettingsShelfId: (state, action: PayloadAction<string>) => {
			state.boxesSettingsShelfId = action.payload
			state.isBoxesSettingsModalOpen = true
		},
		closeBoxesSettingsModal: (state) => {
			state.isBoxesSettingsModalOpen = false
		},
		// setBoxIdCardModal: (state, action: PayloadAction<string>) => {
		// 	state.newCardModal.shelfId = action.payload
		// },
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
					state.newCardModal.shelfId = cupboard.shelves[0].id
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