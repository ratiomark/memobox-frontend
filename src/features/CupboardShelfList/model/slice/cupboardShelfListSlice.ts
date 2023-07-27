import { StateSchema } from '@/app/providers/StoreProvider'
import { BoxCoordinates } from '@/entities/Box'
import { CupboardSchema } from '@/entities/Cupboard'
import { ShelfSchema } from '@/entities/Shelf'
import { timingDataDefault } from '@/shared/const/timingBlock'
import { localDataService } from '@/shared/lib/helpers/common/localDataService'
import { TimingBlock } from '@/shared/types/DataBlock'
import { createEntityAdapter, createSlice, EntityId, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { fetchCupboardData } from '../services/fetchCupboardData'
import { CupboardPageSchema } from '../types/CupboardPageSchema'

const initialState: CupboardPageSchema = {
	isDataAlreadyInStore: false,
	isNeedRefetch: false,
	isNeedStop: true,
	isFirstRender: true,
	isLoading: true,
	error: '',
	entities: {},
	ids: [],
	// commonShelfCollapsed: false,
	boxesSettingsShelfId: '',
	isBoxesSettingsModalOpen: false,
	missedTrainingModal: {
		shelfId: '',
		boxId: '',
		isOpen: false,
	},
	notificationShelfModal: {
		shelfId: '',
		isOpen: false,
	},
	boxTimeSetterModal: {
		isOpen: false,
		boxTimingData: timingDataDefault,
		boxId: '',
		boxCoordinates: {
			x: 0,
			y: 0,
		},
	},
	newCardModal: {
		shelfId: '',
		boxIndex: 0,
		questionText: '',
		answerText: '',
		isOpen: false,
	},
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
		setCardModalIsOpen: (state, action: PayloadAction<boolean>) => {
			state.newCardModal.isOpen = action.payload
		},
		setQuestionText: (state, action: PayloadAction<string>) => {
			state.newCardModal.questionText = action.payload
		},
		setCommonShelfCollapsed: (state, action: PayloadAction<boolean>) => {
			state.commonShelf!.isCollapsed = action.payload
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
		// boxes settings
		setBoxesSettingsShelfId: (state, action: PayloadAction<string>) => {
			state.boxesSettingsShelfId = action.payload
			// state.isBoxesSettingsModalOpen = true
		},
		// TimeSetterModal

		setTimingSetterModalIsOpen: (state, action: PayloadAction<boolean>) => {
			state.boxTimeSetterModal.isOpen = action.payload
		},
		setTimingSetterModalBoxId: (state, action: PayloadAction<string>) => {
			state.boxTimeSetterModal.boxId = action.payload
		},
		setTimingSetterBoxTimingData: (state, action: PayloadAction<TimingBlock>) => {
			state.boxTimeSetterModal.boxTimingData = action.payload
		},
		setTimingSetterBoxCoordinates: (state, action: PayloadAction<BoxCoordinates>) => {
			state.boxTimeSetterModal.boxCoordinates = {
				x: action.payload.x,
				y: action.payload.y
			}
		},

		// 
		setBoxesSettingsModalIsOpen: (state, action: PayloadAction<boolean>) => {
			state.isBoxesSettingsModalOpen = action.payload
		},
		closeBoxesSettingsModal: (state) => {
			state.isBoxesSettingsModalOpen = false
		},
		// missed training
		setMissedTrainingShelfId: (state, action: PayloadAction<string>) => {
			state.missedTrainingModal.shelfId = action.payload
		},
		setMissedTrainingBoxId: (state, action: PayloadAction<string>) => {
			state.missedTrainingModal.boxId = action.payload
		},
		setMissedTrainingModalIsOpen: (state, action: PayloadAction<boolean>) => {
			state.missedTrainingModal.isOpen = action.payload
		},
		dropMissedTrainingShelfAndBoxId: (state) => {
			state.missedTrainingModal.shelfId = ''
			state.missedTrainingModal.boxId = ''
		},
		// shelf notification
		setNotificationModalShelfId: (state, action: PayloadAction<string>) => {
			state.notificationShelfModal.shelfId = action.payload
		},
		setNotificationModalIsOpen: (state, action: PayloadAction<boolean>) => {
			state.notificationShelfModal.isOpen = action.payload
		},
		setFetchedCupboardDataIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
		setIsDataAlreadyInStore: (state, action: PayloadAction<boolean>) => {
			state.isDataAlreadyInStore = action.payload
		},
		setIsFirstRender: (state, action: PayloadAction<boolean>) => {
			state.isFirstRender = action.payload
		},
		setIsNeedRefetch: (state, action: PayloadAction<boolean>) => {
			state.isNeedRefetch = action.payload
		},
		setIsNeedStop: (state, action: PayloadAction<boolean>) => {
			state.isNeedStop = action.payload
		},
		setFetchedCupboardDataError: (state, action: PayloadAction<FetchBaseQueryError | SerializedError>) => {
			if ('status' in action.payload) {
				state.error = JSON.stringify(action.payload.data)
			} else {
				state.error = JSON.stringify(action.payload.message)
			}
		},
		setFetchedCupboardData: (state, action: PayloadAction<CupboardSchema>) => {
			const cupboard = action.payload
			const commonShelf = cupboard.commonShelf
			state.isLoading = false
			state.commonShelf = commonShelf
			state.newCardModal.shelfId = cupboard.shelves[0].id
			if (state.isDataAlreadyInStore) {
				state.isFirstRender = false
				// const shelves = cupboard.shelves.map(shelf => ({ ...shelf, isLoading: false }))
				// shelvesAdapter.setAll(state, cupboard.shelves)
			}
			// const shelves = cupboard.shelves.map(shelf => ({ ...shelf, isLoading: true }))
			// shelvesAdapter.setAll(state, shelves)
			shelvesAdapter.setAll(state, cupboard.shelves)
			state.isDataAlreadyInStore = true
			state.isNeedRefetch = true
			state.cupboardData = {
				all: commonShelf.data.all,
				train: commonShelf.data.train,
				wait: commonShelf.data.wait,
			}
		},
		setFetchedCupboardDataWhenAlreadyInStore: (state, action: PayloadAction<CupboardSchema>) => {
			const cupboard = action.payload
			const commonShelf = cupboard.commonShelf
			state.isLoading = false
			state.commonShelf = commonShelf
			state.newCardModal.shelfId = cupboard.shelves[0].id
			shelvesAdapter.setAll(state, cupboard.shelves)
			state.cupboardData = {
				all: commonShelf.data.all,
				train: commonShelf.data.train,
				wait: commonShelf.data.wait,
			}
		},
		updateIndexes: (state, action: PayloadAction<Array<{ id: EntityId, changes: { index: number } }>>) => {
			shelvesAdapter.updateMany(state, action.payload)
			// const a = shelvesAdapter.updateMany(state, action.payload)
			// const e = a.entities
			// const shelves = Object.entries(e)
			// const sss = shelves.so
			// localDataService.setShelves(a.entities)
			// const currentShelf = shelvesAdapter.selectAll
		},
		reorderShelves: (state, action: PayloadAction<ShelfSchema[]>) => {
			const updates = action.payload.map((shelf, index) => ({
				id: shelf.id,
				changes: { index }
			}))
			shelvesAdapter.updateMany(state, updates)
			// shelvesAdapter.updateMany(state, action.payload)
			// const currentShelf = shelvesAdapter.selectAll
		},
		// shelf control
		deleteShelf: (state, action: PayloadAction<EntityId>) => {
			shelvesAdapter.removeOne(state, action.payload)
		},
		updateShelf: shelvesAdapter.updateOne,
		// updateShelvesInLocalData: (state) => {
		// 	// const shelvesEnteties = shelvesAdapter.

		// },

	},

	extraReducers: (builder) => {
		builder
			.addCase(
				fetchCupboardData.fulfilled,
				(state, action: PayloadAction<CupboardSchema>) => {
					const cupboard = action.payload
					const commonShelf = cupboard.commonShelf
					// state.isDataAlreadyInStore = true
					state.isLoading = false
					state.commonShelf = commonShelf
					state.newCardModal.shelfId = cupboard.shelves[0].id
					shelvesAdapter.setAll(state, cupboard.shelves)
					state.cupboardData = {
						all: commonShelf.data.all,
						train: commonShelf.data.train,
						wait: commonShelf.data.wait,
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