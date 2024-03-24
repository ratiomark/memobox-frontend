import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RestoreBoxModal, RestoreNewOrLearnModal, TrashPageEntityType, TrashPageInitializerSchema } from '../types/TrashPageInitializerSchema'

const initialState: TrashPageInitializerSchema = {
	activeEntity: 'shelves',
	_trashPageMounted: false,
	isLoading: true,
	error: '',
	isMultiSelectActive: false,
	isCardEditModalOpen: false,
	isMoveCardsModalOpen: false,
	shelves: [],
	boxes: [],
	cards: [],
	selectedCardIds: [],
	abortedThunkIds: [],
	restoreBoxModal: {
		originalShelfId: '',
		shelfTitle: '',
		boxId: '',
		boxIndex: 0,
		isOpen: false
	},
	restoreNewOrLearntModal: {
		shelfId: '',
		shelfTitle: '',
		boxId: '',
		boxType: 'new',
		isOpen: false
	},
	restoreCardModal: {
		shelfId: '',
		shelfTitle: '',
		boxId: '',
		isOpen: false,
		cardId: '',
		cardIds: [],
	},

}


const trashPageSlice = createSlice({
	name: 'trashPage',
	initialState,
	reducers: {
		setAbortedThunkId: (state, action: PayloadAction<string>) => {
			state.abortedThunkIds.push(action.payload)
		},
		removeAbortedThunkId: (state, action: PayloadAction<string>) => {
			state.abortedThunkIds = state.abortedThunkIds.filter(id => id !== action.payload)
		},
		setActiveEntity: (state, action: PayloadAction<TrashPageEntityType>) => {
			state.activeEntity = action.payload
		},

		setIsMultiSelectActive: (state, action: PayloadAction<boolean>) => {
			state.isMultiSelectActive = action.payload
		},
		addOrRemoveCardFromSelectedCardIds: (state, action: PayloadAction<string>) => {
			if (state.selectedCardIds.includes(action.payload)) {
				state.selectedCardIds = state.selectedCardIds.filter(cardId => cardId !== action.payload)
			} else {
				state.selectedCardIds.push(action.payload)
			}
			if (!state.selectedCardIds.length) {
				state.isMultiSelectActive = false
			} else {
				state.isMultiSelectActive = true
			}
		},
		selectAllCards: (state, action: PayloadAction<string[]>) => {
			state.selectedCardIds = action.payload
		},
		cancelMultiSelect: (state) => {
			state.selectedCardIds = []
			state.isMultiSelectActive = false
		},
		setMultiSelectIsActive: (state, action: PayloadAction<boolean>) => {
			state.isMultiSelectActive = action.payload
		},
		setRestoreBoxModalData: (state, action: PayloadAction<Omit<RestoreBoxModal, 'isOpen'>>) => {
			const { boxId, boxIndex, originalShelfId, shelfTitle } = action.payload
			state.restoreBoxModal.boxId = boxId
			state.restoreBoxModal.boxIndex = boxIndex
			state.restoreBoxModal.originalShelfId = originalShelfId
			state.restoreBoxModal.shelfTitle = shelfTitle
		},
		setIsRestoreBoxModalOpen: (state, action: PayloadAction<boolean>) => {
			state.restoreBoxModal.isOpen = action.payload
		},
		setRestoreBoxModalSelectedShelfId: (state, action: PayloadAction<string>) => {
			state.restoreBoxModal.selectedShelfId = action.payload
		},
		setRestoreBoxModalShelfTitle: (state, action: PayloadAction<string>) => {
			state.restoreBoxModal.shelfTitle = action.payload
		},
		setRestoreNewOrLearnModalData: (state, action: PayloadAction<Omit<RestoreNewOrLearnModal, 'isOpen'>>) => {
			const { boxId, boxType, shelfId, shelfTitle } = action.payload
			state.restoreNewOrLearntModal.boxId = boxId
			state.restoreNewOrLearntModal.shelfId = shelfId
			state.restoreNewOrLearntModal.shelfTitle = shelfTitle
			state.restoreNewOrLearntModal.boxType = boxType
		},
		setIsRestoreNewOrLearnModalOpen: (state, action: PayloadAction<boolean>) => {
			state.restoreNewOrLearntModal.isOpen = action.payload
		},
		// restoreCardModal
		setIsRestoreCardModalOpen: (state, action: PayloadAction<boolean>) => {
			state.restoreCardModal.isOpen = action.payload
		},
		setRestoreCardModalShelfId: (state, action: PayloadAction<string>) => {
			state.restoreCardModal.shelfId = action.payload
		},
		setRestoreCardModalBoxId: (state, action: PayloadAction<string>) => {
			state.restoreCardModal.boxId = action.payload
		},
		setRestoreCardModalCardId: (state, action: PayloadAction<string>) => {
			state.restoreCardModal.cardId = action.payload
		},
		setRestoreCardModalShelfTitle: (state, action: PayloadAction<string>) => {
			state.restoreCardModal.shelfTitle = action.payload
		},
		// setrestoreCardModalShelfTitle: (state, action: PayloadAction<string>) => {
		// 	state.restoreCardModal.shelfTitle = action.payload
		// },
		// setRestoreNewOrLearnModalData: (state, action: PayloadAction<Omit<RestoreNewOrLearnModal, 'isOpen'>>) => {
		// 	const { boxId, boxType, shelfId, shelfTitle } = action.payload
		// 	state.restoreNewOrLearntModal.boxId = boxId
		// 	state.restoreNewOrLearntModal.shelfId = shelfId
		// 	state.restoreNewOrLearntModal.shelfTitle = shelfTitle
		// 	state.restoreNewOrLearntModal.boxType = boxType
		// },
		// setIsRestoreNewOrLearnModalOpen: (state, action: PayloadAction<boolean>) => {
		// 	state.restoreNewOrLearntModal.isOpen = action.payload
		// },
		// setActiveShelfId: (state, action: PayloadAction<string>) => {
		// 	const shelfId = action.payload
		// 	state.shelfId = shelfId
		// 	if (shelfId === 'all') return
		// 	const maxIndexForShelf = state.shelvesData[shelfId].maxIndexBox
		// 	// превосходит ли текущая выбранная коробка например box5 максимальную коробку у выбранной полки
		// 	if (isNumeric(state.boxId) && +state.boxId >= maxIndexForShelf) {
		// 		state.boxId = 'new'
		// 		return
		// 	}
		// 	if (shelfId !== 'all' && state.boxId === 'learning') {
		// 		state.boxId = 'new'
		// 	}
		// },

		// setSortOrder: (state, action: PayloadAction<SortOrderType>) => {
		// 	state.sortOrder = action.payload
		// },
		// setColumnSettingsIsOpen: (state, action: PayloadAction<boolean>) => {
		// 	state.isTableSettingsModalOpen = action.payload
		// },
		// // multiSelect
		// addOrRemoveCardFromSelectedCardIds: (state, action: PayloadAction<string>) => {
		// 	if (state.selectedCardIds.includes(action.payload)) {
		// 		state.selectedCardIds = state.selectedCardIds.filter(cardId => cardId !== action.payload)
		// 	} else {
		// 		state.selectedCardIds.push(action.payload)
		// 	}
		// 	if (!state.selectedCardIds.length) {
		// 		state.isMultiSelectActive = false
		// 	} else {
		// 		state.isMultiSelectActive = true
		// 	}
		// },
		// selectAllCards: (state, action: PayloadAction<string[]>) => {
		// 	state.selectedCardIds = action.payload
		// },
		// cancelMultiSelect: (state) => {
		// 	state.selectedCardIds = []
		// 	state.isMultiSelectActive = false
		// },
		// setMultiSelectIsActive: (state, action: PayloadAction<boolean>) => {
		// 	state.isMultiSelectActive = action.payload
		// },
		// removeCard: (state, action: PayloadAction<CardSchemaExtended>) => {
		// 	state.cards.find(card => {
		// 		if (card.id === action.payload._id) {
		// 			card.deleted = true
		// 			return true
		// 		}
		// 	})
		// },
		// setSelectedCardIsDeleted: (state) => {
		// 	state.cards = state.cards.map(card => {
		// 		if (state.selectedCardIds.includes(card.id)) {
		// 			card.deleted = true
		// 		}
		// 		return card
		// 	})
		// },
		// // 
		// setActiveBoxId: (state, action: PayloadAction<string | number>) => {
		// 	state.boxId = action.payload
		// },
		// setTrashPageIsMounted: (state) => {
		// 	state._trashPageMounted = true
		// },
		// //  move cards modal
		// setMoveCardsModalIsOpen: (state, action: PayloadAction<boolean>) => {
		// 	state.isMoveCardsModalOpen = action.payload
		// },
		// // setTrashPageIsMounted: (state) => {
		// // 	state._trashPageMounted = true
		// // },
		// // edit cards
		// setIsCardEditModalOpen: (state, action: PayloadAction<boolean>) => {
		// 	state.isCardEditModalOpen = action.payload
		// },
		// setCurrentCardData: (state, action: PayloadAction<CardSchemaExtended>) => {
		// 	if (action.payload._id in state.cardsDataCurrent) null
		// 	else state.cardsDataCurrent[action.payload._id] = action.payload
		// },
		// setEditCardData: (state, action: PayloadAction<CardSchemaExtended>) => {
		// 	const cardId = action.payload._id
		// 	if (cardId in state.cardsDataEdited) null
		// 	else {
		// 		const obj = {
		// 			[cardId]: {
		// 				question: action.payload.question,
		// 				answer: action.payload.answer,
		// 				shelf: action.payload.shelf,
		// 				box: action.payload.box,
		// 			}
		// 		}
		// 		state.cardsDataEdited = { ...state.cardsDataEdited, ...obj }
		// 	}
		// },
		// setCurrentCardId: (state, action: PayloadAction<string>) => {
		// 	state.currentCardId = action.payload
		// },
		// setCardQuestionText: (state, action: PayloadAction<string>) => {
		// 	state.cardsDataEdited[state.currentCardId].question = action.payload
		// },
		// setCardAnswerText: (state, action: PayloadAction<string>) => {
		// 	state.cardsDataEdited[state.currentCardId].answer = action.payload
		// },
		// setCardShelfId: (state, action: PayloadAction<string>) => {
		// 	state.cardsDataEdited[state.currentCardId].shelf = action.payload
		// },
		// setCardBoxId: (state, action: PayloadAction<number>) => {
		// 	state.cardsDataEdited[state.currentCardId].box = action.payload
		// },
		// // 
		// initiateShelf: (state, action: PayloadAction<InitiateShelfPayload>) => {
		// 	// if (action.payload.shelfId in state.shelvesDataSaved) {
		// 	// 	null
		// 	// } else
		// 	state.shelvesDataSaved[action.payload.shelfId] = {
		// 		data: {},
		// 		isLoading: true,
		// 		error: '',
		// 		lastBoxId: action.payload.boxId
		// 	}
		// },
		// setLastBoxId: (state, action: PayloadAction<{ shelfId: string, boxId: string }>) => {
		// 	state.shelvesDataSaved[action.payload.shelfId]['lastBoxId'] = action.payload.boxId
		// },
		// setFetchedData: (state, action: PayloadAction<FetchCardsThunkResponse>) => {
		// 	state.cards = action.payload.cards
		// 	state.shelvesData = action.payload.shelvesAndBoxesData
		// 	state.isLoading = false
		// 	state.error = ''
		// }
	},
})

export const { actions: trashPageActions } = trashPageSlice
export const { reducer: trashPageReducer } = trashPageSlice