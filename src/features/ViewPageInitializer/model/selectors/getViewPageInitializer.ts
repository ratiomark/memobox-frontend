import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserSavedDataViewPageColumns } from '@/entities/User';
import { createSelector } from '@reduxjs/toolkit';
import { getViewPageSort, getViewPageSortOrder } from './getViewPageSorting';
import { CardSchemaExtended } from '@/entities/Card';
import { getViewPageCardEditedListIds } from './getViewPageEditModal';
import { getViewPageSelectedCardIds } from './getViewPageMultiSelect';
import { localDataService } from '@/shared/lib/helpers/common/localDataService';

export const getViewPageIsMounted = (state: StateSchema) => state.viewPage?._viewPageMounted
export const getViewPageIsLoading = (state: StateSchema) => state.viewPage?.isLoading
// 
export const getViewPageShelfId = (state: StateSchema) => state.viewPage?.shelfId ?? 'all'
export const getViewPageBoxId = (state: StateSchema) => state.viewPage?.boxId ?? ''
export const getViewPageBoxSpecialIndex = (state: StateSchema) => state.viewPage?.boxSpecialIndex ?? 'new'
export const getViewPageAbortedThunkIds = (state: StateSchema) => state.viewPage?.abortedThunkIds ?? []
export const getViewPageShelfIds = (state: StateSchema) => state.viewPage?.shelfIds ?? []

export const getViewPageBoxIdChecked = createSelector(
	[
		getViewPageShelfId,
		getViewPageBoxId,
	],
	(shelfId, boxId) => {
		if (shelfId !== 'all') return boxId
		if (boxId === 'new' || boxId === 'all' || boxId === 'learnt' || boxId === 'learning') {
			return boxId
		}
		return 'new'
	}
)

export const getViewPageBoxSpecialIndexChecked = createSelector(
	[
		getViewPageShelfId,
		getViewPageBoxSpecialIndex,
	],
	(shelfId, boxSpecialIndex) => {
		if (shelfId !== 'all') return boxSpecialIndex
		if (boxSpecialIndex === 'new' || boxSpecialIndex === 'all' || boxSpecialIndex === 'learnt' || boxSpecialIndex === 'learning') {
			return boxSpecialIndex
		}
		return 'new'
	}
)


// export const getViewPageSavedShelf = (shelfId: string) =>
// 	(state: StateSchema) => state.viewPage?.shelvesDataSaved?.[shelfId]
export const getViewPageShelvesDataSaved = (state: StateSchema) => state.viewPage?.shelvesData ?? {}

// export const getLastBoxIdByShelfId = (shelfId: string) =>
// 	(state: StateSchema) => state.viewPage?.shelvesDataSaved[shelfId].lastBoxId ?? 'new'
export const getViewPageCards = (state: StateSchema) => state.viewPage?.cards

// Это вариант для случая, если я решу карточки сохранять в объекте
export const getViewPageCardsFactor = createSelector(
	[
		(state: StateSchema) => state.viewPage?.cardsShelfIdBoxIdObj,
		// (state: StateSchema) => state.viewPage?.cards,
		(state: StateSchema) => state.viewPage?.shelfIdsBoxSpecialIndexesObj,
		getViewPageShelfId,
		getViewPageBoxId,
		// getViewPageBoxIdChecked,
		getViewPageBoxSpecialIndexChecked,
		getViewPageShelfIds,
		getViewPageShelvesDataSaved,
	],
	(cardsShelfIdBoxIdObj, shelfIdsBoxSpecialIndexesObj, shelfId, boxId, boxSpecialIndex, shelfIds, shelvesData) => {
		if (!cardsShelfIdBoxIdObj || !shelfIdsBoxSpecialIndexesObj) return []
		if (shelfId === 'all') {
			// if (boxSpecialIndex === 'all') return cards
			// if (boxSpecialIndex === 'new') return cards?.filter(card => card.specialType === 'new')
			// if (boxSpecialIndex === 'learning') return cards?.filter(card => card.specialType === 'none')
			// if (boxSpecialIndex === 'learnt') return cards?.filter(card => card.specialType === 'learnt')
			const resCards: CardSchemaExtended[] = []
			if (boxSpecialIndex === 'new') {
				// console.log(`if (boxSpecialIndex === 'new') начало`)
				const shelfIdAndNewCardBoxIdList = shelfIds.map(shelfIdItem => ({
					shelfId: shelfIdItem,
					boxId: shelfIdsBoxSpecialIndexesObj[shelfIdItem]['new']
				}))
				shelfIdAndNewCardBoxIdList.forEach(item => {
					const newCards = cardsShelfIdBoxIdObj[item.shelfId][item.boxId]
					if (newCards) {
						resCards.push(...newCards)
					}
				})
				// console.log(`if (boxSpecialIndex === 'new') конец`)
			} else if (boxSpecialIndex === 'learning') {
				const shelfIdAndLearningBoxIdList = shelfIds.map(shelfIdItem => {
					return ({
						shelfId: shelfIdItem,
						boxIds: shelvesData[shelfIdItem].boxesItems.slice(1, shelvesData[shelfIdItem].maxIndexBox).map(box => box.id)
					})
				})
				Array.from(shelfIdAndLearningBoxIdList).forEach(item => {
					item.boxIds.forEach(boxIdItem => {
						const cardItems = cardsShelfIdBoxIdObj[item.shelfId][boxIdItem]
						if (cardItems) {
							resCards.push(...cardsShelfIdBoxIdObj[item.shelfId][boxIdItem])
						}
					})
				})
			} else if (boxSpecialIndex === 'learnt') {
				const shelfIdAndNewCardBoxIdList = shelfIds.map(shelfIdItem => ({
					shelfId: shelfIdItem,
					boxId: shelfIdsBoxSpecialIndexesObj[shelfIdItem]['learnt']
				}))
				Array.from(shelfIdAndNewCardBoxIdList).forEach(item => {
					const learntCards = cardsShelfIdBoxIdObj[item.shelfId][item.boxId]
					if (learntCards) {
						resCards.push(...learntCards)
					}
				})
			} else {
				const shelfIdAndLearningBoxIdList = shelfIds.map(shelfIdItem => {
					return ({
						shelfId: shelfIdItem,
						boxIds: shelvesData[shelfIdItem].boxesItems.map(box => box.id)
					})
				})
				Array.from(shelfIdAndLearningBoxIdList).forEach(item => {
					item.boxIds.forEach(boxIdItem => {
						const cardItems = cardsShelfIdBoxIdObj[item.shelfId][boxIdItem]
						if (cardItems) {
							resCards.push(...cardsShelfIdBoxIdObj[item.shelfId][boxIdItem])
						}
					})
				})
			}
			return resCards ?? []
		}
		if (boxSpecialIndex === 'all') {
			const allBoxIdsInShelf = Object.keys(cardsShelfIdBoxIdObj[shelfId])
			return allBoxIdsInShelf.flatMap(boxIdKey => cardsShelfIdBoxIdObj[shelfId][boxIdKey]) ?? []
		} else if (boxSpecialIndex === 'learnt') {
			const learntBoxId = shelfIdsBoxSpecialIndexesObj[shelfId]['learnt']
			return cardsShelfIdBoxIdObj[shelfId][learntBoxId] ?? []
		} else if (boxSpecialIndex === 'new') {
			const newCardsBoxId = shelfIdsBoxSpecialIndexesObj[shelfId]['new']
			return cardsShelfIdBoxIdObj[shelfId][newCardsBoxId] ?? []
		}
		return cardsShelfIdBoxIdObj[shelfId][boxId] ?? []
	}
)

export const getViewPageCurrentCardIds = (state: StateSchema) => {
	return getViewPageCardsSorted(state).map(card => card.id)
}
// export const getViewPageCurrentCardIds = (state: StateSchema) => {
// 	return getViewPageCardsFactor(state).map(card => card.id)
// }

export const getViewPageCardsFiltered = createSelector(
	[
		getViewPageCards,
		getViewPageShelfId,
		getViewPageBoxSpecialIndexChecked,
	],
	(cards, shelfId, boxSpecialIndex) => {
		if (shelfId === 'all' && boxSpecialIndex === 'all') return cards
		if (shelfId === 'all' && boxSpecialIndex === 'new') return cards?.filter(card => card.specialType === 'new')
		if (shelfId === 'all' && boxSpecialIndex === 'learning') return cards?.filter(card => card.specialType === 'none')
		if (shelfId === 'all' && boxSpecialIndex === 'learnt') return cards?.filter(card => card.specialType === 'learnt')
		if (boxSpecialIndex === 'all') return cards?.filter(card => card.shelfId === shelfId)
		if (boxSpecialIndex === 'new') return cards?.filter(card => (card.shelfId === shelfId && card.specialType === 'new'))
		if (boxSpecialIndex === 'learnt') return cards?.filter(card => card.shelfId === shelfId && card.specialType === 'learnt')
		return cards?.filter(card => (card.shelfId === shelfId && card.boxIndex.toString() == boxSpecialIndex)) ?? []
	}
)

export const getViewPageSortChecked = createSelector(
	[
		getViewPageShelfId,
		getViewPageSort,
	],
	(shelfId, sort) => {
		if (shelfId !== 'all' && sort === 'shelfId') return 'createdAt'
		return sort
	}
)
// export const getViewPageCardsFiltered = createSelector(
// 	[
// 		getViewPageCards,
// 		getViewPageShelfId,
// 		getViewPageBoxIdChecked,
// 	],
// 	(cards, shelfId, boxId) => {
// 		if (shelfId === 'all' && boxId === 'all') return cards
// 		if (shelfId === 'all' && boxId === 'new') return cards?.filter(card => card.specialType === 'new')
// 		if (shelfId === 'all' && boxId === 'learning') return cards?.filter(card => card.specialType === 'none')
// 		if (shelfId === 'all' && boxId === 'learnt') return cards?.filter(card => card.specialType === 'learnt')
// 		if (boxId === 'all') return cards?.filter(card => card.shelfId === shelfId)
// 		if (boxId === 'new') return cards?.filter(card => (card.shelfId === shelfId && card.specialType === 'new'))
// 		if (boxId === 'learnt') return cards?.filter(card => card.shelfId === shelfId && card.specialType === 'learnt')
// 		return cards?.filter(card => (card.shelfId === shelfId && card.boxIndex.toString() == boxId)) ?? []
// 	}
// )

export const getViewPageCardsSorted = createSelector(
	[
		getViewPageCardsFiltered,
		getViewPageSortChecked,
		getViewPageSortOrder,
	],
	(cards, sort, sortOrder) => {
		if (cards?.length) {
			const sortedCards = cards
				.filter(card => card[sort] !== null)
				.sort((a, b) => {
					const aValue = a[sort];
					const bValue = b[sort];
					// Обычное сравнение значений
					if (sortOrder === 'asc') {
						return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
					} else {
						return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
					}
				});
			return [...sortedCards, ...cards.filter(card => card[sort] === null)]
		}
		return [];
	}
);
// export const getViewPageCardsSorted = createSelector(
// 	[
// 		getViewPageCardsFiltered,
// 		getViewPageSortChecked,
// 		getViewPageSortOrder,
// 	],
// 	(cards, sort, sortOrder) => {
// 		if (cards?.length) {
// 			return [...cards].sort((a, b) => {
// 				const aValue = a[sort];
// 				const bValue = b[sort];

// 				// Проверка на null
// 				if (aValue === null && bValue === null) {
// 					return 0;
// 				} else if (aValue === null) {
// 					return sortOrder === 'asc' ? 1 : -1;
// 				} else if (bValue === null) {
// 					return sortOrder === 'asc' ? -1 : 1;
// 				}

// 				// Обычное сравнение значений
// 				if (sortOrder === 'asc') {
// 					return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
// 				} else {
// 					return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
// 				}
// 			});
// 		}
// 		return [];
// 	}
// );

// Это вариант для случая, если я решу карточки сохранять в объекте
export const getViewPageCardsSortedFactor = createSelector(
	[
		getViewPageCardsFactor,
		getViewPageSortChecked,
		getViewPageSortOrder,
	],
	(cards, sort, sortOrder) => {
		if (cards?.length) {
			return [...cards].sort((a, b) => {
				if (sortOrder === 'asc') {
					if (a[sort] > b[sort]) {
						return -1
					} else if (a[sort] < b[sort]) {
						return 1
					} else {
						return 0
					}
				} else {
					if (a[sort] < b[sort]) {
						return -1
					} else if (a[sort] > b[sort]) {
						return 1
					} else {
						return 0
					}
				}
			})
		}
		return []
	}
)

export const getViewPageColumns = createSelector(
	[
		getViewPageShelfId,
		getUserSavedDataViewPageColumns,
	],
	(shelfId, columns) => {
		if (shelfId === 'all') {
			return columns
		}
		return columns?.filter(column => column.value !== 'shelfId')
	}
)

export const getViewPageIsCardEdited = (cardId: string) => {
	return createSelector(
		[
			getViewPageCardEditedListIds,
		],
		(listIds) => {
			return listIds?.includes(cardId)
		})
}
export const getViewPageIsCardSelected = (cardId: string) => {
	return createSelector(
		[
			getViewPageSelectedCardIds,
		],
		(listIds) => {
			return listIds?.includes(cardId) ?? false
		})
}



// import { StateSchema } from '@/app/providers/StoreProvider';
// import { getUserSavedDataViewPageColumns } from '@/entities/User';
// import { createSelector } from '@reduxjs/toolkit';
// import { getViewPageSort, getViewPageSortOrder } from './getViewPageSorting';

// export const getViewPageIsMounted = (state: StateSchema) => state.viewPage?._viewPageMounted
// export const getViewPageIsLoading = (state: StateSchema) => state.viewPage?.isLoading
// //
// export const getViewPageShelfId = (state: StateSchema) => state.viewPage?.shelfId ?? 'all'
// export const getViewPageBoxId = (state: StateSchema) => state.viewPage?.boxId ?? 'new'
// export const getViewPageAbortedThunkIds = (state: StateSchema) => state.viewPage?.abortedThunkIds ?? []

// export const getViewPageBoxIdChecked = createSelector(
// 	[
// 		getViewPageShelfId,
// 		getViewPageBoxId,
// 	],
// 	(shelfId, boxId) => {
// 		if (shelfId !== 'all') return boxId
// 		if (boxId === 'new' || boxId === 'all' || boxId === 'learnt' || boxId === 'learning') {
// 			return boxId
// 		}
// 		return 'new'
// 	}
// )

// //
// // export const getViewPageSort = (state: StateSchema) => state.viewPage?.sort ?? 'createdAt'
// // export const getViewPageSortOrder = (state: StateSchema) => state.viewPage?.sortOrder ?? 'asc'
// // export const getViewPageColumnSettingsIsOpen = (state: StateSchema) => state.viewPage?.isTableSettingsModalOpen ?? false

// //

// export const getViewPageSavedShelf = (shelfId: string) =>
// 	(state: StateSchema) => state.viewPage?.shelvesDataSaved?.[shelfId]

// // export const getLastBoxIdByShelfId = (shelfId: string) =>
// // 	(state: StateSchema) => state.viewPage?.shelvesDataSaved[shelfId].lastBoxId ?? 'new'

// export const getViewPageCards = (state: StateSchema) => state.viewPage?.cards

// export const getViewPageSortChecked = createSelector(
// 	[
// 		getViewPageShelfId,
// 		getViewPageSort,
// 	],
// 	(shelfId, sort) => {
// 		if (shelfId !== 'all' && sort === 'shelfId') return 'createdAt'
// 		return sort
// 	}
// )

// export const getViewPageCardsFiltered = createSelector(
// 	[
// 		getViewPageCards,
// 		getViewPageShelfId,
// 		getViewPageBoxIdChecked,
// 	],
// 	(cards, shelfId, boxId) => {
// 		if (shelfId === 'all' && boxId === 'all') return cards
// 		if (shelfId === 'all' && boxId === 'new') return cards?.filter(card => card.specialType === 'new')
// 		if (shelfId === 'all' && boxId === 'learning') return cards?.filter(card => card.specialType === 'none')
// 		if (shelfId === 'all' && boxId === 'learnt') return cards?.filter(card => card.specialType === 'learnt')
// 		if (boxId === 'all') return cards?.filter(card => card.shelfId === shelfId)
// 		if (boxId === 'new') return cards?.filter(card => (card.shelfId === shelfId && card.specialType === 'new'))
// 		if (boxId === 'learnt') return cards?.filter(card => card.shelfId === shelfId && card.specialType === 'learnt')
// 		return cards?.filter(card => (card.shelfId === shelfId && card.boxIndex == boxId)) ?? []
// 	}
// )

// export const getViewPageCardsSorted = createSelector(
// 	[
// 		getViewPageCardsFiltered,
// 		// VAR: использую getViewPageSortChecked вместо getViewPageSort чтобы пофискить проблему в общей полкой, когда там используется shelf как столбец сортировки
// 		getViewPageSortChecked,
// 		getViewPageSortOrder,
// 	],
// 	(cards, sort, sortOrder) => {
// 		if (cards?.length) {
// 			return [...cards].sort((a, b) => {
// 				if (sortOrder === 'asc') {
// 					if (a[sort] > b[sort]) {
// 						return -1
// 					} else if (a[sort] < b[sort]) {
// 						return 1
// 					} else {
// 						return 0
// 					}
// 				} else {
// 					if (a[sort] < b[sort]) {
// 						return -1
// 					} else if (a[sort] > b[sort]) {
// 						return 1
// 					} else {
// 						return 0
// 					}
// 				}
// 			})
// 		}
// 		return []
// 	}
// )

// export const getViewPageColumns = createSelector(
// 	[
// 		getViewPageShelfId,
// 		getUserSavedDataViewPageColumns,
// 		// getColumns,
// 	],
// 	(shelfId, columns) => {
// 		// const columns: SortColumnObject[] = [
// 		// 	{ value: 'shelf', content: 'shelf', enabled: true, index: 0 },
// 		// 	{ value: 'createdAt', content: 'creation', enabled: true, index: 1 },
// 		// 	{ value: 'lastTraining', content: 'last training', enabled: true, index: 2 },
// 		// ]
// 		if (shelfId === 'all') {
// 			return columns
// 		}
// 		return columns?.filter(column => column.value !== 'shelfId')
// 	}
// )