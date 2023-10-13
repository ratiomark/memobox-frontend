import { CardMainData, CardSchemaExtended } from '@/entities/Card'
import { SortColumnValue } from '@/entities/User'
import { isNumeric } from '@/shared/lib/helpers/common/isNumeric'
import { SortOrderType } from '@/shared/types/SortOrderType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteCardThunk } from '../services/deleteCardThunk'
import { deleteMultipleCardsThunk } from '../services/deleteMultipleCardsThunk'
import { fetchCards, FetchCardsThunkResponse } from '../services/fetchCards'
import { CardsShelfIdBoxIdObj, ViewPageInitializerSchema } from '../types/ViewPageInitializerSchema'

const initialState: ViewPageInitializerSchema = {
	_viewPageMounted: false,
	isLoading: true,
	sort: 'createdAt',
	sortOrder: 'asc',
	error: '',
	// 
	cards: [],
	cardsShelfIdBoxIdObj: {},
	shelvesData: {},
	cardsDataOriginal: {},
	cardsDataEdited: {},
	cardEditModal: {
		isOpen: false,
		currentCardId: '',
	},
	cardEditedListIds: [],
	// cardModalHeights: {},
	// 
	moveCardsModal: {
		isOpen: false,
		shelfId: '',
		boxId: '',
	},
	// 
	shelfId: 'all',
	boxId: '',
	boxSpecialIndex: 'new',
	// 
	selectedCardIds: [],
	isMultiSelectActive: false,
	isTableSettingsModalOpen: false,
	// 
	shelfIdsBoxSpecialIndexesObj: {},
	shelfIds: [],
	abortedThunkIds: [],
	multiSelectDeleteCardIdList: [],
	multiSelectDeleteCardIdObject: {},
	multiSelectMoveCardIdList: [],
	multiSelectMoveCardIdObject: {},
}

const viewPageSlice = createSlice({
	name: 'viewPage',
	initialState,
	reducers: {
		setAbortedThunkId: (state, action: PayloadAction<string>) => {
			state.abortedThunkIds.push(action.payload)
		},
		removeAbortedThunkId: (state, action: PayloadAction<string>) => {
			state.abortedThunkIds = state.abortedThunkIds.filter(id => id !== action.payload)
		},
		// 
		setActiveShelfId: (state, action: PayloadAction<string>) => {
			const shelfId = action.payload
			state.shelfId = shelfId
			if (shelfId === 'all') return
			const maxIndexForShelf = state.shelvesData[shelfId].maxIndexBox
			// превосходит ли текущая выбранная коробка например box5 максимальную коробку у выбранной полки
			if (
				(isNumeric(state.boxSpecialIndex) && +state.boxSpecialIndex >= maxIndexForShelf) ||
				state.boxSpecialIndex === 'new' ||
				state.boxSpecialIndex === 'learning'
			) {
				state.boxSpecialIndex = 'new'
				state.boxId = state.shelfIdsBoxSpecialIndexesObj[shelfId]['new']
			} else if (state.boxSpecialIndex === 'learnt') {
				state.boxId = state.shelfIdsBoxSpecialIndexesObj[shelfId]['learnt']
			} else if (state.boxSpecialIndex === 'all') {
				state.boxId = 'all'
			} else {
				state.boxId = state.shelfIdsBoxSpecialIndexesObj[shelfId][state.boxSpecialIndex]
			}
		},
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
		setActiveSort: (state, action: PayloadAction<SortColumnValue>) => {
			state.sort = action.payload
		},
		setSortOrder: (state, action: PayloadAction<SortOrderType>) => {
			state.sortOrder = action.payload
		},
		setColumnSettingsIsOpen: (state, action: PayloadAction<boolean>) => {
			state.isTableSettingsModalOpen = action.payload
		},
		// multiSelect
		addMultiSelectDeleteIds: (state, action: PayloadAction<string>) => {
			state.multiSelectDeleteCardIdList.push(action.payload)
			state.multiSelectDeleteCardIdObject[action.payload] = [...state.selectedCardIds]
			state.selectedCardIds = []
		},
		addMultiSelectMoveIds: (state, action: PayloadAction<string>) => {
			state.multiSelectMoveCardIdList.push(action.payload)
			state.multiSelectMoveCardIdObject[action.payload] = [...state.selectedCardIds]
			state.selectedCardIds = []
		},
		removeMultiSelectDeleteIds: (state, action: PayloadAction<string>) => {
			state.multiSelectDeleteCardIdList = state.multiSelectDeleteCardIdList.filter(id => id !== action.payload)
			const listWithCardIds = state.multiSelectDeleteCardIdObject[action.payload]
			state.cards.forEach(card => {
				if (card.isDeleted && listWithCardIds.includes(card.id)) {
					card.isDeleted = false
				}
			})
			delete state.multiSelectDeleteCardIdObject[action.payload]
		},
		removeMultiSelectMoveIds: (state, action: PayloadAction<string>) => {
			state.multiSelectMoveCardIdList = state.multiSelectMoveCardIdList.filter(id => id !== action.payload)
			const listWithCardIds = state.multiSelectMoveCardIdObject[action.payload]
			state.cards.forEach(card => {
				if (card.isDeleted && listWithCardIds.includes(card.id)) {
					card.isDeleted = false
				}
			})
			delete state.multiSelectDeleteCardIdObject[action.payload]
		},
		// addMultiSelectMoveIds: (state, action: PayloadAction<string>) => {
		// 	state.multiSelectMoveCardIdList.push(action.payload)
		// 	state.multiSelectMoveCardIdObject[action.payload] = [...state.selectedCardIds]
		// 	state.selectedCardIds = []
		// },
		// removeMultiSelectMoveIds: (state, action: PayloadAction<string>) => {
		// 	state.multiSelectMoveCardIdList = state.multiSelectMoveCardIdList.filter(id => id !== action.payload)
		// 	const listWithCardIds = state.multiSelectMoveCardIdObject[action.payload]
		// 	state.cards.forEach(card => {
		// 		if (card.isDeleted && listWithCardIds.includes(card.id)) {
		// 			card.isDeleted = false
		// 		}
		// 	})
		// 	delete state.multiSelectDeleteCardIdObject[action.payload]
		// },
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
		// selectAllCardsC: (state, action: PayloadAction<string[]>) => {
		// 	if (state.shelfId === 'all' && state.boxSpecialIndex === 'new') {
		// 		// select all new cards
		// 	} else if (state.shelfId === 'all' && state.boxSpecialIndex === 'learnt') {
		// 		// select all learnt cards
		// 	} else if (state.boxSpecialIndex === 'all') {
		// 		// select all card of shelf
		// 	} else if (state.boxSpecialIndex === 'new') {
		// 		// select all card of new cards of shelf
		// 	} else if (state.boxSpecialIndex === 'learnt') {
		// 		// select all learnt
		// 	} else {
		// 		// select all card in boxId
		// 	}
		// },

		cancelMultiSelect: (state) => {
			state.selectedCardIds = []
			state.isMultiSelectActive = false
		},
		setMultiSelectIsActive: (state, action: PayloadAction<boolean>) => {
			state.isMultiSelectActive = action.payload
		},
		// setCardIsDeleting: (state, action: PayloadAction<CardMainData>) => {
		// 	const { shelfId, boxId, cardId } = action.payload
		// 	state.cardsShelfIdBoxIdObj[shelfId][boxId]
		// 	.some(card => {
		// 		if (card.id === cardId) {
		// 			card.isDeleting = true
		// 			return true
		// 		}
		// 		return false
		// 	})
		setCardIsDeleting: (state, action: PayloadAction<string>) => {
			state.cards.find(card => {
				if (card.id === action.payload) {
					card.isDeleting = true
					return true
				}
				return false
			})
		},
		// setCardIsNotDeleting: (state, action: PayloadAction<CardMainData>) => {
		// 	const { shelfId, boxId, cardId } = action.payload
		// 	state.cardsShelfIdBoxIdObj[shelfId][boxId]
		// 		.some(card => {
		// 			if (card.id === cardId) {
		// 				card.isDeleting = false
		// 				return true
		// 			}
		// 			return false
		// 		})
		setCardIsNotDeleting: (state, action: PayloadAction<string>) => {
			state.cards.some(card => {
				if (card.id === action.payload) {
					card.isDeleting = false
					return true
				}
				return false
			})
		},
		setCardIsDeleted: (state, action: PayloadAction<string>) => {
			state.cards.find(card => {
				if (card.id === action.payload) {
					card.isDeleted = true
					// return true
				}
			})
		},
		setCardIsNotDeleted: (state, action: PayloadAction<string>) => {
			state.cards.find(card => {
				if (card.id === action.payload) {
					card.isDeleted = false
					// return true
				}
			})
		},
		setSelectedCardIsDeleted: (state) => {
			state.cards = state.cards.map(card => {
				if (state.selectedCardIds.includes(card.id)) {
					card.isDeleted = true
				}
				return card
			})
		},
		setCardsIsNotDeletedByIdList: (state, action: PayloadAction<string[]>) => {
			action.payload.forEach(cardId => {
				state.cards.find(card => {
					if (card.id === cardId) {
						card.isDeleted = false
						// return true
					}
				})
			})

		},
		// removeCard: (state, action: PayloadAction<CardSchemaExtended>) => {
		// 	state.cards.find(card => {
		// 		if (card.id === action.payload.id) {
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
		// 
		setActiveBoxId: (state, action: PayloadAction<string>) => {
			state.boxId = action.payload
		},
		setActiveBoxSpecialIndex: (state, action: PayloadAction<string>) => {
			state.boxSpecialIndex = action.payload
		},
		setActiveBoxIdAndSpecialIndex: (state, action: PayloadAction<{ boxId: string, boxSpecialIndex: string, }>) => {
			state.boxId = action.payload.boxId
			state.boxSpecialIndex = action.payload.boxSpecialIndex
		},
		setViewPageIsMounted: (state) => {
			state._viewPageMounted = true
		},
		//  move cards modal
		setMoveCardsModalIsOpen: (state, action: PayloadAction<boolean>) => {
			state.moveCardsModal.isOpen = action.payload
		},
		setMoveCardsModalShelfId: (state, action: PayloadAction<string>) => {
			state.moveCardsModal.shelfId = action.payload
		},
		setMoveCardsModalBoxId: (state, action: PayloadAction<string>) => {
			state.moveCardsModal.boxId = action.payload
		},

		// edit cards
		setIsCardEditModalOpen: (state, action: PayloadAction<boolean>) => {
			state.cardEditModal.isOpen = action.payload
		},
		checkIsCardWasEdited: (state, action: PayloadAction<boolean>) => {
			// state.isCardEditModalOpen = action.payload
		},
		setCardDataOriginal: (state, action: PayloadAction<CardSchemaExtended>) => {
			if (action.payload.id in state.cardsDataOriginal) null
			else state.cardsDataOriginal[action.payload.id] = action.payload
		},
		setCardDataEdited: (state, action: PayloadAction<CardSchemaExtended>) => {
			const cardId = action.payload.id
			if (cardId in state.cardsDataEdited) null
			else {
				const obj = {
					[cardId]: {
						question: action.payload.question,
						answer: action.payload.answer,
						shelfId: action.payload.shelfId,
						boxId: action.payload.boxId,
					}
				}
				state.cardsDataEdited = { ...state.cardsDataEdited, ...obj }
			}
		},

		setCardQuestionText: (state, action: PayloadAction<string>) => {
			state.cardsDataEdited[state.cardEditModal.currentCardId].question = action.payload
			if (!state.cardEditedListIds.includes(state.cardEditModal.currentCardId)) {
				state.cardEditedListIds.push(state.cardEditModal.currentCardId)
			}
		},
		setCardAnswerText: (state, action: PayloadAction<string>) => {
			state.cardsDataEdited[state.cardEditModal.currentCardId].answer = action.payload
			if (!state.cardEditedListIds.includes(state.cardEditModal.currentCardId)) {
				state.cardEditedListIds.push(state.cardEditModal.currentCardId)
			}
		},
		setCardShelfId: (state, action: PayloadAction<string>) => {
			const shelfId = action.payload
			const originalShelfId = state.cardsDataEdited[state.cardEditModal.currentCardId].shelfId
			const originalBoxId = state.cardsDataEdited[state.cardEditModal.currentCardId].boxId
			const originalBoxIndex = state.shelvesData[originalShelfId].boxesItems.find(box => box.id === originalBoxId)?.index ?? 0
			// const originalBoxIndex = state.cardsDataEdited[state.cardEditModal.currentCardId].boxIndex
			// const originalMaxIndexBox = state.shelvesData[originalShelfId].maxIndexBox
			// const newBoxIndex = state.cardsDataOriginal[state.cardEditModal.currentCardId].boxIndex
			const newMaxIndexBox = state.shelvesData[shelfId].maxIndexBox
			if (originalBoxIndex > newMaxIndexBox) {
				state.cardsDataEdited[state.cardEditModal.currentCardId].boxId = state.shelvesData[shelfId].boxesItems[0].id
			} else {
				state.cardsDataEdited[state.cardEditModal.currentCardId].boxId = state.shelvesData[shelfId].boxesItems[originalBoxIndex].id
			}
			// if
			// state.ca

			state.cardsDataEdited[state.cardEditModal.currentCardId].shelfId = shelfId
			if (
				!state.cardEditedListIds.includes(state.cardEditModal.currentCardId) &&
				shelfId !== state.cardsDataOriginal[state.cardEditModal.currentCardId].shelfId
			) {
				state.cardEditedListIds.push(state.cardEditModal.currentCardId)
			}
		},
		setCardBoxId: (state, action: PayloadAction<string>) => {
			const boxId = action.payload
			state.cardsDataEdited[state.cardEditModal.currentCardId].boxId = boxId
			if (!state.cardEditedListIds.includes(state.cardEditModal.currentCardId) &&
				boxId !== state.cardsDataOriginal[state.cardEditModal.currentCardId].boxId
			) {
				state.cardEditedListIds.push(state.cardEditModal.currentCardId)
			}
			// if (!state.cardEditedListIds.includes(state.currentCardId)) {
			// 	state.cardEditedListIds.push(state.currentCardId)
			// }

		},
		// setCardBoxId: (state, action: PayloadAction<number>) => {
		// 	const boxIndex = action.payload
		// 	state.cardsDataEdited[state.currentCardId].boxIndex = boxIndex
		// 	if (!state.cardEditedListIds.includes(state.currentCardId) &&
		// 		boxIndex !== state.cardsDataOriginal[state.currentCardId].boxIndex
		// 	) {
		// 		state.cardEditedListIds.push(state.currentCardId)
		// 	}
		// 	// if (!state.cardEditedListIds.includes(state.currentCardId)) {
		// 	// 	state.cardEditedListIds.push(state.currentCardId)
		// 	// }

		// },
		setCurrentCardId: (state, action: PayloadAction<string>) => {
			state.cardEditModal.currentCardId = action.payload
		},
		// setCurrentCardId: (state, action: PayloadAction<string>) => {
		// 	state.currentCardId = action.payload
		// 	if (!(action.payload in state.cardModalHeights)) {
		// 		state.cardModalHeights[action.payload] = {}
		// 	}
		// },
		// setMinHeighQuestion: (state, action: PayloadAction<number>) => {
		// 	state.cardModalHeights[state.currentCardId].minHeightQuestion = action.payload
		// },
		// setCurrentHeightQuestion: (state, action: PayloadAction<number>) => {
		// 	state.cardModalHeights[state.currentCardId].currentHeightQuestion = action.payload
		// },
		// setMinHeighAnswer: (state, action: PayloadAction<number>) => {
		// 	state.cardModalHeights[state.currentCardId].minHeightAnswer = action.payload
		// },
		// setCurrentHeightAnswer: (state, action: PayloadAction<number>) => {
		// 	state.cardModalHeights[state.currentCardId].currentHeightAnswer = action.payload
		// },
		// 
		setFetchedData: (state, action: PayloadAction<FetchCardsThunkResponse>) => {
			const cards = action.payload.cards
			const shelvesData = action.payload.shelvesAndBoxesData
			const shelfIds = Object.keys(shelvesData)
			state.shelfIds = shelfIds
			shelfIds.forEach(shelf => {
				if (!state.shelfIdsBoxSpecialIndexesObj[shelf]) {
					state.shelfIdsBoxSpecialIndexesObj[shelf] = {}
				}
				shelvesData[shelf].boxesItems.forEach(boxObject => {
					if (boxObject.index === 0) {
						state.shelfIdsBoxSpecialIndexesObj[shelf]['new'] = boxObject.id
					} else if (boxObject.index === shelvesData[shelf].maxIndexBox) {
						state.shelfIdsBoxSpecialIndexesObj[shelf]['learnt'] = boxObject.id
					} else {
						state.shelfIdsBoxSpecialIndexesObj[shelf][boxObject.index.toString()] = boxObject.id
					}
				})
				// state.shelfIdsBoxSpecialIndexesObj[shelf] = {}
			})
			state.cards = cards
			const cardsShelfIdBoxIdObj: CardsShelfIdBoxIdObj = {}
			cards.forEach(card => {
				if (cardsShelfIdBoxIdObj[card.shelfId]) {
					if (cardsShelfIdBoxIdObj[card.shelfId][card.boxId]) {
						cardsShelfIdBoxIdObj[card.shelfId][card.boxId].push(card)
					} else {
						cardsShelfIdBoxIdObj[card.shelfId][card.boxId] = [card]
					}
				} else {
					cardsShelfIdBoxIdObj[card.shelfId] = { [card.boxId]: [card] }
				}
			})
			state.cardsShelfIdBoxIdObj = cardsShelfIdBoxIdObj
			// cards.reduce((acc, card) => {
			// 	card.shelfId
			// 	if (state.cardsShelfIdBoxIdObj[card.shelfId]) {
			// 		if (state.cardsShelfIdBoxIdObj[card.shelfId][card.boxId]) {
			// 			state.cardsShelfIdBoxIdObj[card.shelfId][card.boxId].push(card)
			// 		} else {
			// 			state.cardsShelfIdBoxIdObj[card.shelfId][card.boxId] = [card]
			// 		}
			// 	} else {
			// 		state.cardsShelfIdBoxIdObj[card.shelfId][card.boxId] = [card]
			// 	}

			// }, {})
			state.shelvesData = action.payload.shelvesAndBoxesData
			state.isLoading = false
			state.error = ''
		},

	},

	extraReducers: (builder) => {
		builder
			// .addCase(
			// 	fetchBoxesDataByShelfId.fulfilled,
			// 	(state, action: PayloadAction<FetchBoxesThunkResponse>) => {
			// 		const shelfId = Object.keys(action.payload)[0]
			// 		state.shelvesDataSaved[shelfId]['isLoading'] = false
			// 		state.shelvesDataSaved[shelfId]['data'] = action.payload[shelfId]
			// 		state.shelvesDataSaved[shelfId]['error'] = undefined
			// 	})
			// .addCase(
			// 	fetchBoxesDataByShelfId.rejected,
			// 	(state, action) => {
			// 		if (action.payload) {
			// 			state.shelvesDataSaved[action.payload]['error'] = `some error when fetching cards shelfId = ${action.payload}`
			// 			state.shelvesDataSaved[action.payload]['isLoading'] = false
			// 		}
			// 	})
			.addCase(
				fetchCards.fulfilled,
				(state, action: PayloadAction<FetchCardsThunkResponse>) => {
					state.isLoading = false
					state.cards = action.payload.cards
					state.shelvesData = action.payload.shelvesAndBoxesData
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
			.addCase(
				deleteCardThunk.rejected,
				(state, action) => {
					if (action.meta.aborted) {
						// state.abortedThunkIds = state.abortedThunkIds.filter(id => id != action.payload)
					}
				})
			.addCase(
				deleteCardThunk.fulfilled,
				(state, action: PayloadAction<string>) => {
					const cardId = action.payload
					state.cards = state.cards.filter(card => card.id !== cardId)
					if (state.cardEditedListIds.includes(cardId)) {
						state.cardEditedListIds = state.cardEditedListIds.filter(id => id !== cardId)
					}
					if (cardId in state.cardsDataEdited) {
						delete state.cardsDataEdited[cardId]
					}
					if (cardId in state.cardsDataOriginal) {
						delete state.cardsDataOriginal[cardId]
					}
				})
			.addCase(
				deleteMultipleCardsThunk.fulfilled,
				(state, action: PayloadAction<string[]>) => {
					state.cards = state.cards.filter(card => {
						return !action.payload.includes(card.id)
					})
					// action.payload.forEach(cardId => {
					// 	state.cards.find(card => {
					// 		if (card.id === cardId) {
					// 			card.isDeleted = false
					// 		}
					// 	})
					// })
				})
		// .addCase(
		// 	fetchCards.fulfilled,
		// 	(state, action: PayloadAction<CardSchemaExtended[]>) => {
		// 		state.isLoading = false
		// 		state.cards = action.payload
		// 		state.error = ''
		// 	})
		// .addCase(
		// 	fetchCards.rejected,
		// 	(state, action) => {
		// 		if (action.payload) {
		// 			state.isLoading = false
		// 			state.error = action.payload
		// 		}
		// 	})
		// .addCase(
		// 	fetchCards.pending,
		// 	(state) => {
		// 		state.isLoading = true
		// 		state.error = ''
		// 	})
	}
})

export const { actions: viewPageActions } = viewPageSlice
export const { reducer: viewPageReducer } = viewPageSlice


// .addCase(
// 	deleteShelfThunk.rejected,
// 	(state, action) => {
// 		if (action.meta.aborted) {
// 			state.abortedThunkIds = state.abortedThunkIds.filter(id => id !== action.payload)
// 			return
// 		}
// 		shelvesAdapter.updateOne(state, { id: action.payload as string, changes: { isDeleting: false } })
// 	})