import { StateSchema } from '@/app/providers/StoreProvider'
import { BoxCoordinates } from '@/entities/Box'
import { CupboardSchema } from '@/entities/Cupboard'
import { ShelfDndRepresentation, ShelfSchema } from '@/entities/Shelf'
import { BOX_TIMING_DATA_DEFAULT } from '@/shared/const/timingBlock'
import { TimingBlock } from '@/shared/types/DataBlock'
import { RequestStatusType } from '@/shared/types/GeneralTypes'
import { EntityId, PayloadAction, SerializedError, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { createNewShelfThunk } from '../services/createNewShelfThunk'
import { deleteShelfThunk } from '../services/deleteShelfThunk'
import { fetchCupboardDataThunk } from '../services/fetchCupboardDataThunk'
import { setLocalShelvesToStore } from '../services/setLocalShelvesToStore'
import { UpdateBoxTimeThunkArg, updateBoxTimeThunk } from '../services/updateBoxTimeThunk'
import { updateShelfListOrderThunk } from '../services/updateShelfListOrderThunk'
import { CupboardPageSchema } from '../types/CupboardPageSchema'
import { updateMissedTrainingThunk, UpdateMissedTrainingThunkArg } from '../services/updateMissedTrainingThunk'
import { createNewCardThunk } from '../services/createNewCardThunk'
import { NEW_CARDS_COUNTS_AS_TRAIN } from '@/shared/const/flags'
import { localDataService } from '@/shared/lib/helpers/common/localDataService'

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
	shelvesIdsAndIndexesCurrent: [],
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
		boxTimingData: BOX_TIMING_DATA_DEFAULT,
		boxId: '',
		shelfId: '',
		boxCoordinates: {
			x: 0,
			y: 0,
		},
		// requestStatus: 'idle',
	},
	boxSettingsDropdownModal: {
		isOpen: false,
		boxId: '',
		boxCoordinates: {
			x: 0,
			y: 0,
		},
		requestStatus: 'idle',
	},
	createNewCardModal: {
		shelfId: '',
		boxId: '',
		boxIndex: 0,
		questionText: null,
		// questionText: localStorage.getItem('questionData') ?? null,
		// questionText: localStorage.getItem('questionData') ?? lexicalEmptyEditorState,
		// questionText: lexicalEmptyEditorState,
		answerText: null,
		// answerText:  lexicalEmptyEditorState,
		// answerText: '',
		isOpen: false,
		requestStatus: 'idle',
	},
	createNewShelfModal: {
		shelfTitle: '',
		isOpen: false,
		isAwaitingResponse: false,
		requestStatus: 'idle',
		shelvesCreated: 0,
	},
	renameShelfModal: {
		isOpen: false,
		requestStatus: 'idle',
		shelfId: '',
		title: '',
	},
	shelfDeletionProcess: {
		shelfId: '',
		requestStatus: 'idle',
	},
	cupboardData: {
		train: 0,
		all: 0,
		wait: 0
	},
	isCupboardInfoModalOpen: false,
	abortedThunkIds: []
}

const shelvesAdapter = createEntityAdapter<ShelfSchema>({
	selectId: (shelf) => shelf.id,
	// Сортирую по индексу
	sortComparer: (a, b) => a.index - b.index,
})

export const getCupboardState = shelvesAdapter.getSelectors<StateSchema>(
	(state) => state.cupboard ? state.cupboard : initialState
)
export const getAllShelvesIds = (state: StateSchema) => getCupboardState.selectIds(state)
export const getAllShelves = (state: StateSchema) => getCupboardState.selectAll(state)
export const getAllShelvesEntities = (state: StateSchema) => getCupboardState.selectEntities(state)
// export const getOneShelfById = (id: string) => getCupboardState.selectById(store.getState(), id)
// const booksSelectors = booksAdapter.getSelectors<RootState>(
// 	(state) => state.books
// )
export const isShelvesDndRepresentationEqual = (initialShelves: ShelfDndRepresentation[], currentShelves: ShelfDndRepresentation[]) => {
	for (let index = 0; index < initialShelves.length; index++) {
		if (initialShelves[index].id !== currentShelves[index].id) {
			return false
		}
	}
	return true
}


const cupboardShelfList = createSlice({
	name: 'cupboardShelfList',
	initialState,
	reducers: {
		setAbortedThunkId: (state, action: PayloadAction<string>) => {
			state.abortedThunkIds.push(action.payload)
		},
		setCommonShelfCollapsed: (state, action: PayloadAction<boolean>) => {
			state.commonShelf!.isCollapsed = action.payload
		},
		// rename shelf
		setIsRenameShelfModalOpen: (state, action: PayloadAction<boolean>) => {
			state.renameShelfModal.isOpen = action.payload
		},
		setRenameShelfModalShelfId: (state, action: PayloadAction<string>) => {
			state.renameShelfModal.shelfId = action.payload
		},
		setRenameShelfModalTitle: (state, action: PayloadAction<string>) => {
			state.renameShelfModal.title = action.payload
		},
		// shelves titles
		addShelfTitle: (state, action: PayloadAction<string>) => {
			state.shelvesTitles.push(action.payload)
		},
		removeShelfTitle: (state, action: PayloadAction<string>) => {
			state.shelvesTitles = state.shelvesTitles.filter(title => title !== action.payload)
		},
		// create new shelf
		setIsCreateNewShelfModalOpen: (state, action: PayloadAction<boolean>) => {
			state.createNewShelfModal.isOpen = action.payload
		},
		setCreateNewShelfModalTitle: (state, action: PayloadAction<string>) => {
			state.createNewShelfModal.shelfTitle = action.payload
		},
		setIsCreateNewShelfModalAwaitingResponse: (state, action: PayloadAction<boolean>) => {
			state.createNewShelfModal.isAwaitingResponse = action.payload
		},
		setIsCreateNewShelfModalSuccessfulResponse: (state, action: PayloadAction<boolean>) => {
			state.createNewShelfModal.isResponseSuccessful = action.payload
		},
		setCreateNewShelfModalRequestStatus: (state, action: PayloadAction<RequestStatusType>) => {
			state.createNewShelfModal.requestStatus = action.payload
		},
		// setCreateShelfCounter: (state) => {
		// 	state.createNewShelfModal.shelvesCreated++
		// },
		// create new card
		setIsCreateNewCardModalOpen: (state, action: PayloadAction<boolean>) => {
			state.createNewCardModal.isOpen = action.payload
		},
		setCreateNewCardModalRequestStatus: (state, action: PayloadAction<RequestStatusType>) => {
			state.createNewCardModal.requestStatus = action.payload
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
			state.createNewCardModal.boxId = state.entities[state.createNewCardModal.shelfId]!.boxesData[action.payload].id
		},
		setBoxIdCardModal: (state, action: PayloadAction<string>) => {
			state.createNewCardModal.boxId = action.payload
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			// state.createNewCardModal.boxId = state.entities[state.createNewCardModal.shelfId]!.boxesData[action.payload].id
		},

		// TimeSetterModal
		setTimingSetterModalIsOpen: (state, action: PayloadAction<boolean>) => {
			state.boxTimeSetterModal.isOpen = action.payload
		},
		setTimingSetterModalBoxId: (state, action: PayloadAction<string>) => {
			state.boxTimeSetterModal.boxId = action.payload
		},
		setTimingSetterModalShelfId: (state, action: PayloadAction<string>) => {
			state.boxTimeSetterModal.shelfId = action.payload
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
			state.shelvesIdsAndIndexesCurrent = shelvesDndRepresentation
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
			state.shelvesIdsAndIndexesCurrent = shelvesDndRepresentation
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
			state.shelvesIdsAndIndexesCurrent = updates.map((item, index) => ({ id: item.id, index }))
			shelvesAdapter.updateMany(state, updates)
			// shelvesAdapter.setAll(state, action.payload)
		},
		// shelf control and shelf deletion 
		setShelfDeletionRequestStatus: (state, action: PayloadAction<RequestStatusType>) => {
			state.shelfDeletionProcess.requestStatus = action.payload
		},
		setShelfDeletionShelfId: (state, action: PayloadAction<string>) => {
			state.shelfDeletionProcess.shelfId = action.payload
			// state.shelfDeletionProcess.isAnyShelfInDeletionProcess = true
		},
		setIsAnyShelfInDeletionProcess: (state, action: PayloadAction<boolean>) => {
			state.shelfDeletionProcess.isAnyShelfInDeletionProcess = action.payload
		},
		deleteShelf: (state, action: PayloadAction<EntityId>) => {
			shelvesAdapter.removeOne(state, action.payload)
		},
		updateShelf: shelvesAdapter.updateOne,
	},

	extraReducers: (builder) => {
		builder
			.addCase(
				fetchCupboardDataThunk.fulfilled,
				(state, action: PayloadAction<CupboardSchema>) => {
					const commonShelf = action.payload.commonShelf
					const allShelves = action.payload.shelves
					state.isLoading = false
					state.commonShelf = commonShelf
					state.createNewCardModal.shelfId = allShelves[0].id
					if (state.isDataAlreadyInStore) {
						state.isFirstRender = false
					}
					shelvesAdapter.setAll(state, allShelves)
					const shelvesDndRepresentation = allShelves.map((shelf, index) => ({ id: shelf.id, index }))
					state.shelvesIdsAndIndexesInitial = shelvesDndRepresentation
					state.shelvesIdsAndIndexesCurrent = shelvesDndRepresentation
					state.shelvesTitles = allShelves.map(shelf => shelf.title)
					state.isDataAlreadyInStore = true
					state.isNeedRefetch = true
					state.cupboardData = {
						all: commonShelf.data.all,
						train: commonShelf.data.train,
						wait: commonShelf.data.wait,
					}
					// // const cupboard = action.payload
					// const commonShelf = action.payload.commonShelf
					// const allShelves = action.payload.shelves
					// // state.isDataAlreadyInStore = true
					// state.commonShelf = commonShelf
					// state.createNewCardModal.shelfId = allShelves[0].id
					// shelvesAdapter.setAll(state, allShelves)
					// const shelvesDndRepresentation = allShelves.map((shelf, index) => ({ id: shelf.id, index }))
					// state.shelvesIdsAndIndexesInitial = shelvesDndRepresentation
					// state.shelvesIdsAndIndexesCurrent = shelvesDndRepresentation
					// state.shelvesTitles = allShelves.map(shelf => shelf.title)
					// state.cupboardData = {
					// 	all: commonShelf.data.all,
					// 	train: commonShelf.data.train,
					// 	wait: commonShelf.data.wait,
					// }
					// state.isLoading = false
				})
			.addCase(
				fetchCupboardDataThunk.rejected,
				(state) => {
					state.isLoading = false
				})
			.addCase(
				fetchCupboardDataThunk.pending,
				(state) => {
					state.isLoading = true
				}
			)
			.addCase(
				updateShelfListOrderThunk.fulfilled,
				(state, action: PayloadAction<boolean>) => {
					if (action.payload) {
						state.shelvesIdsAndIndexesInitial = state.shelvesIdsAndIndexesCurrent
					}
				})
			.addCase(
				setLocalShelvesToStore.fulfilled,
				(state, action: PayloadAction<ShelfSchema[]>) => {
					if (action.payload.length > 0) {
						shelvesAdapter.setAll(state, action.payload)
						const shelvesDndRepresentation = action.payload.map((shelf, index) => ({ id: shelf.id, index }))
						state.shelvesIdsAndIndexesInitial = shelvesDndRepresentation
						state.shelvesIdsAndIndexesCurrent = shelvesDndRepresentation
					}
				})
			.addCase(
				createNewShelfThunk.fulfilled,
				(state, action: PayloadAction<ShelfSchema[]>) => {
					shelvesAdapter.setAll(state, action.payload)
					state.createNewShelfModal.requestStatus = 'success'
					const shelvesDndRepresentation = action.payload.map((shelf, index) => ({ id: shelf.id, index }))
					state.shelvesIdsAndIndexesInitial = shelvesDndRepresentation
					state.shelvesIdsAndIndexesCurrent = shelvesDndRepresentation
					state.shelvesTitles.push(action.payload[0].title)
					state.createNewShelfModal.shelfTitle = ''
					state.createNewShelfModal.shelvesCreated++
				})
			.addCase(
				createNewShelfThunk.rejected,
				(state) => {
					state.createNewShelfModal.requestStatus = 'error'
				})
			.addCase(
				deleteShelfThunk.fulfilled,
				(state, action: PayloadAction<{ id: string, title: string }>) => {
					state.shelvesTitles = state.shelvesTitles.filter(title => title !== action.payload.title)
					shelvesAdapter.removeOne(state, action.payload.id)
				})
			.addCase(
				deleteShelfThunk.rejected,
				(state, action) => {
					if (action.meta.aborted) {
						state.abortedThunkIds = state.abortedThunkIds.filter(id => id !== action.payload)
						return
					}
					shelvesAdapter.updateOne(state, { id: action.payload as string, changes: { isDeleting: false } })
				})
			// .addCase(
			// 	renameShelfThunk.fulfilled,
			// 	(state, action: PayloadAction<RenameShelfThunkArg>) => {
			// 		state.shelvesTitles = state.shelvesTitles.filter(title => title !== action.payload.currentShelfTitle)
			// 		state.shelvesTitles.push(action.payload.title)
			// 		// shelvesAdapter.removeOne(state, action.payload.id)
			// 	})
			// .addCase(
			// 	deleteShelfThunk.rejected,
			// 	(state, action) => {
			// 		if (action.meta.aborted) {
			// 			state.abortedThunkIds = state.abortedThunkIds.filter(id => id !== action.payload)
			// 			return
			// 		}
			// 		shelvesAdapter.updateOne(state, { id: action.payload as string, changes: { isDeleting: false } })
			// 	})
			.addCase(
				updateBoxTimeThunk.fulfilled,
				(state, action: PayloadAction<UpdateBoxTimeThunkArg>) => {
					const { boxId, shelfId, timeObject } = action.payload
					const box = state.entities[shelfId]?.boxesData.find(box => box.id === boxId)
					if (box && box?.specialType !== 'new') {
						box.timing = timeObject
					}
				})
			.addCase(
				updateMissedTrainingThunk.fulfilled,
				(state, action: PayloadAction<UpdateMissedTrainingThunkArg>) => {
					const { boxId, shelfId, missedTrainingValue } = action.payload
					if (!boxId) shelvesAdapter.updateOne(state, { id: shelfId, changes: { missedTrainingValue } })
					else {
						const box = state.entities[shelfId]?.boxesData.find(box => box.id === boxId)
						if (box) {
							box.missedTrainingValue = missedTrainingValue
						}
					}
				})
			.addCase(
				createNewCardThunk.fulfilled,
				(state, action: PayloadAction<{ shelfId: string, boxId: string }>) => {
					const { boxId, shelfId } = action.payload
					const shelf = state.entities[shelfId]!
					const box = shelf.boxesData.find(box => box.id === boxId)!
					// const commonShelf = { ...state.commonShelf! }
					state.cupboardData.all += 1
					box.data.all += 1
					shelf.data.all += 1
					// state.commonShelf!.data.all = state.commonShelf!.data.all + 1
					if (box.specialType === 'new') {
						state.commonShelf!.new.all += 1
						if (NEW_CARDS_COUNTS_AS_TRAIN) {
							shelf.data.train += 1
							state.cupboardData.train += 1
							// state.commonShelf!.data.train = state.commonShelf!.data.train + 1
						} else {
							shelf.data.wait += 1
							state.cupboardData.wait += 1
							// state.commonShelf!.data.wait = state.commonShelf!.data.wait + 1
						}
					} else {
						// box.data.all += 1
						shelf.data.wait += 1
						box.data.wait += 1
						state.cupboardData.wait += 1
						// state.commonShelf!.data.wait = state.commonShelf!.data.wait + 1
						if (box.specialType === 'learnt') {
							state.commonShelf!.learnt.all += 1
							state.commonShelf!.learnt.wait += 1
						} else {
							state.commonShelf!.learning.all += 1
							state.commonShelf!.learning.wait += 1
						}
					}
				})
		// .addCase(
		// 	createNewCardThunk.fulfilled,
		// 	(state, action: PayloadAction<{ shelfId: string, boxId: string }>) => {
		// 		const { boxId, shelfId } = action.payload
		// 		const shelf = state.entities[shelfId]!
		// 		const box = shelf.boxesData.find(box => box.id === boxId)!
		// 		const commonShelf = { ...state.commonShelf! }
		// 		commonShelf.data.all += 1
		// 		if (box.specialType === 'new') {
		// 			box.data.all += 1
		// 			if (NEW_CARDS_COUNTS_AS_TRAIN) {
		// 				shelf.data.train += 1
		// 				commonShelf.data.train += 1
		// 			} else {
		// 				shelf.data.wait += 1
		// 				commonShelf.data.wait += 1
		// 			}
		// 		} else {
		// 			box.data.all += 1
		// 			box.data.wait += 1
		// 			commonShelf.data.wait += 1
		// 		}
		// 		state.commonShelf = commonShelf
		// 	})
		// .addCase(
		// 	createNewCardThunk.fulfilled,
		// 	(state, action: PayloadAction<{ shelfId: string, boxId: string }>) => {
		// 		const { boxId, shelfId } = action.payload
		// 		const shelf = state.entities[shelfId]!
		// 		const box = shelf.boxesData.find(box => box.id === boxId)!
		// 		const commonShelf = { ...state.commonShelf! }
		// 		state.commonShelf!.data.all = state.commonShelf!.data.all + 1
		// 		if (box.specialType === 'new') {
		// 			box.data.all += 1
		// 			if (NEW_CARDS_COUNTS_AS_TRAIN) {
		// 				shelf.data.train += 1
		// 				state.commonShelf!.data.train = state.commonShelf!.data.train + 1
		// 			} else {
		// 				shelf.data.wait += 1
		// 				state.commonShelf!.data.wait = state.commonShelf!.data.wait + 1
		// 			}
		// 		} else {
		// 			box.data.all += 1
		// 			box.data.wait += 1
		// 			state.commonShelf!.data.wait = state.commonShelf!.data.wait + 1
		// 		}
		// 	})

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