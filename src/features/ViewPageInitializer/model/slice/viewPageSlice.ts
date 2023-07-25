import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchBoxesDataByShelfId, FetchBoxesThunkResponse } from '../services/fetchBoxesDataByShelfId'
import { ViewPageInitializerSchema } from '../types/ViewPageInitializerSchema'
import { CardSchema } from '@/entities/Card'
import { fetchCards, FetchCardsThunkResponse } from '../services/fetchCards'
import { SortColumnValue } from '@/entities/User'
import { SortOrderType } from '@/shared/types/SortOrderType'
import { CardSchemaExtended } from '@/entities/Card'
import { isNumeric } from '@/shared/lib/helpers/common/isNumeric'

const initialState: ViewPageInitializerSchema = {
	_viewPageMounted: false,
	isLoading: true,
	sort: 'createdAt',
	sortOrder: 'asc',
	error: '',
	// 
	cards: [],
	shelvesData: {},
	cardsDataCurrent: {},
	cardsDataEdited: {},
	isCardEditModalOpen: false,
	currentCardId: '',
	// 
	isMoveCardsModalOpen: false,
	// 
	shelfId: 'all',
	boxId: 'new',
	// 
	selectedCardIds: [],
	isMultiSelectActive: false,
	isTableSettingsModalOpen: false,
	// 
	shelvesDataSaved: {}
}

export interface InitiateShelfPayload {
	shelfId: string
	boxId: string
}
// Можно пройти по всем карточкам и записать максимальную коробку для каждой полки. При переходе на полку чекать превышает ли текущая коробка максимальную коробку
const viewPageSlice = createSlice({
	name: 'viewPage',
	initialState,
	reducers: {
		setActiveShelfId: (state, action: PayloadAction<string>) => {
			const shelfId = action.payload
			state.shelfId = shelfId
			if (shelfId === 'all') return
			const maxIndexForShelf = state.shelvesData[shelfId].maxIndexBox
			// превосходит ли текущая выбранная коробка например box5 максимальную коробку у выбранной полки
			if (isNumeric(state.boxId) && +state.boxId >= maxIndexForShelf) {
				state.boxId = 'new'
				return
			}
			if (shelfId !== 'all' && state.boxId === 'learning') {
				state.boxId = 'new'
			}
		},
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
		removeCard: (state, action: PayloadAction<CardSchemaExtended>) => {
			state.cards.find(card => {
				if (card._id === action.payload._id) {
					card.deleted = true
					return true
				}
			})
		},
		removeSelectedCards: (state) => {
			state.cards = state.cards.map(card => {
				if (state.selectedCardIds.includes(card._id)) {
					card.deleted = true
				}
				return card
			})
		},
		// 
		setActiveBoxId: (state, action: PayloadAction<string | number>) => {
			state.boxId = action.payload
		},
		setViewPageIsMounted: (state) => {
			state._viewPageMounted = true
		},
		//  move cards modal
		setMoveCardsModalIsOpen: (state, action: PayloadAction<boolean>) => {
			state.isMoveCardsModalOpen = action.payload
		},
		// setViewPageIsMounted: (state) => {
		// 	state._viewPageMounted = true
		// },
		// edit cards
		setIsCardEditModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isCardEditModalOpen = action.payload
		},
		setCurrentCardData: (state, action: PayloadAction<CardSchemaExtended>) => {
			if (action.payload._id in state.cardsDataCurrent) null
			else state.cardsDataCurrent[action.payload._id] = action.payload
		},
		setEditCardData: (state, action: PayloadAction<CardSchemaExtended>) => {
			const cardId = action.payload._id
			if (cardId in state.cardsDataEdited) null
			else {
				const obj = {
					[cardId]: {
						question: action.payload.question,
						answer: action.payload.answer,
						shelf: action.payload.shelf,
						box: action.payload.box,
					}
				}
				state.cardsDataEdited = { ...state.cardsDataEdited, ...obj }
			}
		},
		setCurrentCardId: (state, action: PayloadAction<string>) => {
			state.currentCardId = action.payload
		},
		setCardQuestionText: (state, action: PayloadAction<string>) => {
			state.cardsDataEdited[state.currentCardId].question = action.payload
		},
		setCardAnswerText: (state, action: PayloadAction<string>) => {
			state.cardsDataEdited[state.currentCardId].answer = action.payload
		},
		setCardShelfId: (state, action: PayloadAction<string>) => {
			state.cardsDataEdited[state.currentCardId].shelf = action.payload
		},
		setCardBoxId: (state, action: PayloadAction<number>) => {
			state.cardsDataEdited[state.currentCardId].box = action.payload
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
			state.cards = action.payload.cards
			state.shelvesData = action.payload.shelvesAndBoxesData
			state.isLoading = false
			state.error = ''
		}
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