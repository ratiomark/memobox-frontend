import { CardSchemaExtended } from '@/entities/Card'
import { SortColumnValue } from '@/entities/User'
import { isNumeric } from '@/shared/lib/helpers/common/isNumeric'
import { SortOrderType } from '@/shared/types/SortOrderType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteCardThunk } from '../services/deleteCardThunk'
import { deleteMultipleCardsThunk } from '../services/deleteMultipleCardsThunk'
import { fetchCards, FetchCardsThunkResponse } from '../services/fetchCards'
import { CardsFactor, ViewPageInitializerSchema } from '../types/ViewPageInitializerSchema'

const initialState: ViewPageInitializerSchema = {
	_viewPageMounted: false,
	isLoading: true,
	sort: 'createdAt',
	sortOrder: 'asc',
	error: '',
	// 
	cards: [],
	cardsFactor: {},
	shelvesData: {},
	cardsDataOriginal: {},
	cardsDataEdited: {},
	isCardEditModalOpen: false,
	currentCardId: '',
	cardEditedListIds: [],
	cardModalHeights: {},
	// 
	isMoveCardsModalOpen: false,
	// 
	shelfId: 'all',
	boxId: '',
	boxSpecialIndex: 'new',
	// 
	selectedCardIds: [],
	isMultiSelectActive: false,
	isTableSettingsModalOpen: false,
	// 
	shelvesDataSaved: {},
	shelfIdsBoxSpecialIndexesObj: {},
	shelfIds: [],
	abortedThunkIds: [],
	multiSelectDeleteCardIdList: [],
	multiSelectDeleteCardIdObject: {},
	multiSelectMoveCardIdList: [],
	multiSelectMoveCardIdObject: {},

}
// .addCase(
// 	deleteShelfThunk.rejected,
// 	(state, action) => {
// 		if (action.meta.aborted) {
// 			state.abortedThunkIds = state.abortedThunkIds.filter(id => id !== action.payload)
// 			return
// 		}
// 		shelvesAdapter.updateOne(state, { id: action.payload as string, changes: { isDeleting: false } })
// 	})
export interface InitiateShelfPayload {
	shelfId: string
	boxId: string
}
// Можно пройти по всем карточкам и записать максимальную коробку для каждой полки. При переходе на полку чекать превышает ли текущая коробка максимальную коробку
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
		selectAllCardsC: (state, action: PayloadAction<string[]>) => {
			if (state.shelfId === 'all' && state.boxSpecialIndex === 'new') {
				// select all new cards
			} else if (state.shelfId === 'all' && state.boxSpecialIndex === 'learnt') {
				// select all learnt cards
			} else if (state.boxSpecialIndex === 'all') {
				// select all card of shelf
			} else if (state.boxSpecialIndex === 'new') {
				// select all card of new cards of shelf
			} else if (state.boxSpecialIndex === 'learnt') {
				// select all learnt
			} else {
				// select all card in boxId
			}
		},

		cancelMultiSelect: (state) => {
			state.selectedCardIds = []
			state.isMultiSelectActive = false
		},
		setMultiSelectIsActive: (state, action: PayloadAction<boolean>) => {
			state.isMultiSelectActive = action.payload
		},
		setCardIsDeleting: (state, action: PayloadAction<string>) => {
			state.cards.find(card => {
				if (card.id === action.payload) {
					card.isDeleting = true
					// return true
				}
			})
		},
		setCardIsNotDeleting: (state, action: PayloadAction<string>) => {
			state.cards.find(card => {
				if (card.id === action.payload) {
					card.isDeleting = false
					// return true
				}
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
			state.isMoveCardsModalOpen = action.payload
		},

		// edit cards
		setIsCardEditModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isCardEditModalOpen = action.payload
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
						boxIndex: action.payload.boxIndex,
					}
				}
				state.cardsDataEdited = { ...state.cardsDataEdited, ...obj }
			}
		},
		setCurrentCardId: (state, action: PayloadAction<string>) => {
			state.currentCardId = action.payload
			if (!(action.payload in state.cardModalHeights)) {
				state.cardModalHeights[action.payload] = {}
			}
		},
		setCardQuestionText: (state, action: PayloadAction<string>) => {
			if (!state.cardEditedListIds.includes(state.currentCardId)) {
				state.cardEditedListIds.push(state.currentCardId)
			}
			state.cardsDataEdited[state.currentCardId].question = action.payload
		},
		setCardAnswerText: (state, action: PayloadAction<string>) => {
			if (!state.cardEditedListIds.includes(state.currentCardId)) {
				state.cardEditedListIds.push(state.currentCardId)
			}
			state.cardsDataEdited[state.currentCardId].answer = action.payload
		},
		setCardShelfId: (state, action: PayloadAction<string>) => {
			if (!state.cardEditedListIds.includes(state.currentCardId)) {
				state.cardEditedListIds.push(state.currentCardId)
			}
			state.cardsDataEdited[state.currentCardId].shelfId = action.payload
		},
		setCardBoxId: (state, action: PayloadAction<number>) => {
			if (!state.cardEditedListIds.includes(state.currentCardId)) {
				state.cardEditedListIds.push(state.currentCardId)
			}
			state.cardsDataEdited[state.currentCardId].boxIndex = action.payload
		},
		setMinHeighQuestion: (state, action: PayloadAction<number>) => {
			state.cardModalHeights[state.currentCardId].minHeightQuestion = action.payload
		},
		setCurrentHeightQuestion: (state, action: PayloadAction<number>) => {
			state.cardModalHeights[state.currentCardId].currentHeightQuestion = action.payload
		},
		setMinHeighAnswer: (state, action: PayloadAction<number>) => {
			state.cardModalHeights[state.currentCardId].minHeightAnswer = action.payload
		},
		setCurrentHeightAnswer: (state, action: PayloadAction<number>) => {
			state.cardModalHeights[state.currentCardId].currentHeightAnswer = action.payload
		},

		// 
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
		},
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
			const cardsFactor: CardsFactor = {}
			cards.forEach(card => {
				if (cardsFactor[card.shelfId]) {
					if (cardsFactor[card.shelfId][card.boxId]) {
						cardsFactor[card.shelfId][card.boxId].push(card)
					} else {
						cardsFactor[card.shelfId][card.boxId] = [card]
					}
				} else {
					cardsFactor[card.shelfId] = { [card.boxId]: [card] }
				}
			})
			state.cardsFactor = cardsFactor
			// cards.reduce((acc, card) => {
			// 	card.shelfId
			// 	if (state.cardsFactor[card.shelfId]) {
			// 		if (state.cardsFactor[card.shelfId][card.boxId]) {
			// 			state.cardsFactor[card.shelfId][card.boxId].push(card)
			// 		} else {
			// 			state.cardsFactor[card.shelfId][card.boxId] = [card]
			// 		}
			// 	} else {
			// 		state.cardsFactor[card.shelfId][card.boxId] = [card]
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
						state.abortedThunkIds = state.abortedThunkIds.filter(id => id != action.payload)
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
				(state, action) => {
					action.payload.forEach(cardId => {
						state.cards.find(card => {
							if (card.id === cardId) {
								card.isDeleted = false
							}
						})
					})
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