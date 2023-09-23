import { StateSchema, store } from '@/app/providers/StoreProvider'
import { BoxCoordinates } from '@/entities/Box'
import { CupboardSchema } from '@/entities/Cupboard'
import { ShelfDndRepresentation, ShelfSchema } from '@/entities/Shelf'
import { timingDataDefault } from '@/shared/const/timingBlock'
import { TimingBlock } from '@/shared/types/DataBlock'
import { createEntityAdapter, createSlice, EntityId, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { fetchCupboardData } from '../services/fetchCupboardData'
import { CupboardPageSchema } from '../types/CupboardPageSchema'
import { lexicalEmptyEditorState } from '@/shared/const/lexical'
import { updateShelfListOrderThunk } from '../services/updateShelfListOrderThunk'
import { setLocalShelvesToStore } from '../services/setLocalShelvesToStore'
import { createNewShelfThunk } from '../services/createNewShelfThunk'
// import { store } from '@/app/providers/StoreProvider/ui/StoreProvider'

const initialState: CupboardPageSchema = {
	isDataAlreadyInStore: false,
	isNeedRefetch: false,
	isNeedStop: true,
	isFirstRender: true,
	isLoading: true,
	error: '',
	entities: {},
	ids: [],
	shelvesTitles: [],
	shelvesIdsAndIndexes: [],
	shelvesIdsAndIndexesInitial: [],
	shelfBoxesTemplateModal: {
		isOpen: false,
		shelfId: ''
	},
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
	boxSettingsDropdownModal: {
		isOpen: false,
		boxId: '',
		boxCoordinates: {
			x: 0,
			y: 0,
		},
	},
	createNewCardModal: {
		shelfId: '',
		boxId: '',
		boxIndex: 0,
		questionText: localStorage.getItem('questionData') ?? lexicalEmptyEditorState,
		// questionText: lexicalEmptyEditorState,
		answerText: lexicalEmptyEditorState,
		// answerText: '',
		isOpen: false,
	},
	createNewShelfModal: {
		shelfTitle: '',
		isOpen: false,
	},
	cupboardData: {
		train: 0,
		all: 0,
		wait: 0
	},
	isCupboardInfoModalOpen: false
}

const shelvesAdapter = createEntityAdapter<ShelfSchema>({
	selectId: (shelf) => shelf.id,
	// Сортирую по индексу
	sortComparer: (a, b) => a.index - b.index,
})

export const getCupboardState = shelvesAdapter.getSelectors<StateSchema>(
	(state) => state.cupboard
)
export const getAllShelvesIds = (state: StateSchema) => getCupboardState.selectIds(state)
export const getAllShelves = (state: StateSchema) => getCupboardState.selectAll(state)
export const getAllShelvesEntities = (state: StateSchema) => getCupboardState.selectEntities(state)
// export const getOneShelfById = (id: string) => getCupboardState.selectById(store.getState(), id)
// const booksSelectors = booksAdapter.getSelectors<RootState>(
// 	(state) => state.books
// )
export const isShelvesDndRepresentationEqual = (initialShelves: ShelfDndRepresentation[], currentShelves: ShelfDndRepresentation[]) => {
	// console.log(initialShelves)
	// console.log(currentShelves)
	for (let index = 0; index < initialShelves.length; index++) {
		if (initialShelves[index].id !== currentShelves[index].id) {
			return false
		}
	}
	return true
}
// And then use the selectors to retrieve values
// const allBooks = getCupboardState.selectAll(store.getState())
// export const { selectEntities: getAllShelves, selectIds: getAllShelvesIds } = shelvesAdapter.getSelectors()
// export const getCupboardEntities = shelvesAdapter.getSelectors<StateSchema>(
// 	(state) => state.cupboard.entities
// )

const cupboardShelfList = createSlice({
	name: 'cupboardShelfList',
	initialState,
	reducers: {
		setCommonShelfCollapsed: (state, action: PayloadAction<boolean>) => {
			state.commonShelf!.isCollapsed = action.payload
		},
		// create new shelf
		setIsCreateNewShelfModalOpen: (state, action: PayloadAction<boolean>) => {
			state.createNewShelfModal.isOpen = action.payload
		},
		setCreateNewShelfModalTitle: (state, action: PayloadAction<string>) => {
			state.createNewShelfModal.shelfTitle = action.payload
		},
		// create new card
		setIsCreateNewCardModalOpen: (state, action: PayloadAction<boolean>) => {
			state.createNewCardModal.isOpen = action.payload
		},
		setQuestionText: (state, action: PayloadAction<string>) => {
			state.createNewCardModal.questionText = action.payload
			localStorage.setItem('questionData', action.payload)
		},
		setAnswerText: (state, action: PayloadAction<string>) => {
			state.createNewCardModal.answerText = action.payload
		},
		setShelfIdCardModal: (state, action: PayloadAction<string>) => {
			state.createNewCardModal.shelfId = action.payload
			// если индекс прошлой коробки превышает максимальный индекс текущей полки, то ставлю коробку с новыми карточками.
			const currentShelfBoxes = state.entities[action.payload]?.boxesData
			if (currentShelfBoxes && currentShelfBoxes.length <= state.createNewCardModal.boxIndex) {
				state.createNewCardModal.boxIndex = 0
			}
		},
		setBoxIndexCardModal: (state, action: PayloadAction<number>) => {
			state.createNewCardModal.boxIndex = action.payload
		},
		setBoxIndexAndBoxIdCardModal: (state, action: PayloadAction<number>) => {
			state.createNewCardModal.boxIndex = action.payload
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			state.createNewCardModal.boxId = state.entities[state.createNewCardModal.shelfId]!.boxesData[action.payload]._id
		},

		// boxes settings
		// setBoxesSettingsShelfId: (state, action: PayloadAction<string>) => {
		// 	state.boxesSettingsShelfId = action.payload
		// 	// state.isBoxesSettingsModalOpen = true
		// },
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
		// box Settings DropDown modal
		setBoxSettingsModalIsOpen: (state, action: PayloadAction<boolean>) => {
			state.boxSettingsDropdownModal.isOpen = action.payload
		},
		setBoxSettingsModalBoxId: (state, action: PayloadAction<string>) => {
			state.boxSettingsDropdownModal.boxId = action.payload
		},
		setBoxSettingsBoxCoordinates: (state, action: PayloadAction<BoxCoordinates>) => {
			state.boxSettingsDropdownModal.boxCoordinates = {
				x: action.payload.x,
				y: action.payload.y
			}
		},

		// boxes settings modal 
		setShelfBoxesTemplateModalIsOpen: (state, action: PayloadAction<boolean>) => {
			state.shelfBoxesTemplateModal.isOpen = action.payload
		},
		setShelfBoxesTemplateModalShelfId: (state, action: PayloadAction<string>) => {
			state.shelfBoxesTemplateModal.shelfId = action.payload
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
		// cupboard info modal
		setIsCupboardInfoModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isCupboardInfoModalOpen = action.payload
		},
		// 
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
			const commonShelf = action.payload.commonShelf
			const allShelves = action.payload.shelves
			state.isLoading = false
			state.commonShelf = commonShelf
			state.createNewCardModal.shelfId = allShelves[0].id
			if (state.isDataAlreadyInStore) {
				state.isFirstRender = false
				// const shelves = allShelves.map(shelf => ({ ...shelf, isLoading: false }))
				// shelvesAdapter.setAll(state, allShelves)
			}
			// const shelves = allShelves.map(shelf => ({ ...shelf, isLoading: true }))
			// shelvesAdapter.setAll(state, shelves)
			shelvesAdapter.setAll(state, allShelves)
			const shelvesDndRepresentation = allShelves.map((shelf, index) => ({ id: shelf.id, index }))
			state.shelvesIdsAndIndexesInitial = shelvesDndRepresentation
			state.shelvesIdsAndIndexes = shelvesDndRepresentation
			state.shelvesTitles = allShelves.map(shelf => shelf.title)
			state.isDataAlreadyInStore = true
			state.isNeedRefetch = true
			state.cupboardData = {
				all: commonShelf.data.all,
				train: commonShelf.data.train,
				wait: commonShelf.data.wait,
			}
		},
		setFetchedCupboardDataWhenAlreadyInStore: (state, action: PayloadAction<CupboardSchema>) => {
			const commonShelf = action.payload.commonShelf
			const allShelves = action.payload.shelves
			state.isLoading = false
			state.commonShelf = commonShelf
			state.createNewCardModal.shelfId = allShelves[0].id
			shelvesAdapter.setAll(state, allShelves)
			const shelvesDndRepresentation = allShelves.map((shelf, index) => ({ id: shelf.id, index }))
			state.shelvesIdsAndIndexesInitial = shelvesDndRepresentation
			state.shelvesIdsAndIndexes = shelvesDndRepresentation
			state.shelvesTitles = allShelves.map(shelf => shelf.title)
			state.cupboardData = {
				all: commonShelf.data.all,
				train: commonShelf.data.train,
				wait: commonShelf.data.wait,
			}
		},
		// updateIndexes: (state, action: PayloadAction<Array<{ id: EntityId, changes: { index: number } }>>) => {
		// shelvesAdapter.updateMany(state, action.payload)
		// const a = shelvesAdapter.updateMany(state, action.payload)
		// const e = a.entities
		// const shelves = Object.entries(e)
		// const sss = shelves.so
		// localDataService.setShelves(a.entities)
		// const currentShelf = shelvesAdapter.selectAll
		// },
		reorderShelves: (state, action: PayloadAction<ShelfSchema[]>) => {
			const updates = action.payload.map((shelf, index) => ({
				id: shelf.id,
				changes: { index }
			}))
			state.shelvesIdsAndIndexes = updates.map((item, index) => ({ id: item.id, index }))
			shelvesAdapter.updateMany(state, updates)
			// shelvesAdapter.setAll(state, action.payload)
		},
		// shelf control
		deleteShelf: (state, action: PayloadAction<EntityId>) => {
			shelvesAdapter.removeOne(state, action.payload)
		},
		updateShelf: shelvesAdapter.updateOne,
	},

	extraReducers: (builder) => {
		builder
			.addCase(
				fetchCupboardData.fulfilled,
				(state, action: PayloadAction<CupboardSchema>) => {
					// const cupboard = action.payload
					const commonShelf = action.payload.commonShelf
					const allShelves = action.payload.shelves
					// state.isDataAlreadyInStore = true
					state.isLoading = false
					state.commonShelf = commonShelf
					state.createNewCardModal.shelfId = allShelves[0].id
					shelvesAdapter.setAll(state, allShelves)
					const shelvesDndRepresentation = allShelves.map((shelf, index) => ({ id: shelf.id, index }))
					state.shelvesIdsAndIndexesInitial = shelvesDndRepresentation
					state.shelvesIdsAndIndexes = shelvesDndRepresentation
					state.shelvesTitles = allShelves.map(shelf => shelf.title)
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
			.addCase(
				updateShelfListOrderThunk.fulfilled,
				(state, action: PayloadAction<boolean>) => {
					if (action.payload) {
						state.shelvesIdsAndIndexesInitial = state.shelvesIdsAndIndexes
					}
				})
			.addCase(
				setLocalShelvesToStore.fulfilled,
				(state, action: PayloadAction<ShelfSchema[]>) => {
					if (action.payload.length > 0) {
						shelvesAdapter.setAll(state, action.payload)
						const shelvesDndRepresentation = action.payload.map((shelf, index) => ({ id: shelf.id, index }))
						state.shelvesIdsAndIndexesInitial = shelvesDndRepresentation
						state.shelvesIdsAndIndexes = shelvesDndRepresentation
					}
				})
			.addCase(
				createNewShelfThunk.fulfilled,
				(state, action: PayloadAction<ShelfSchema[]>) => {
					shelvesAdapter.setAll(state, action.payload)
					const shelvesDndRepresentation = action.payload.map((shelf, index) => ({ id: shelf.id, index }))
					state.shelvesIdsAndIndexesInitial = shelvesDndRepresentation
					state.shelvesIdsAndIndexes = shelvesDndRepresentation
					state.shelvesTitles.push(action.payload[0].title)
					state.createNewShelfModal.shelfTitle = ''
				})
		// .addCase(
		// 	sendShelvesOrder.rejected,
		// 	(state) => {
		// 		// VAR: тут должна быть логика, для обработки ситуации, если сервер не ответил и не обновил порядок полок
		// 		// state.isLoading = false
		// 	})
	}
})

export const { actions: cupboardShelfListActions } = cupboardShelfList
export const { reducer: cupboardShelfListReducer } = cupboardShelfList