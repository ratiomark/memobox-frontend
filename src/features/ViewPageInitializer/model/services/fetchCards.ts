import { ShelfRepresentedByBoxes, getBoxesByShelfId } from '@/entities/Box'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { viewPageActions } from '../slice/viewPageSlice'
import { CardSchemaExtended, getAllCards } from '@/entities/Card'

interface FetchBoxesThunkArg {
	shelfId: string
	boxId: string
	data: FetchCardsThunkResponse
}
interface ShelfData {
	maxIndexBox: number
	boxesItems: { index: number, id: string }[]
	shelfTitle: string
}
export interface FetchBoxesThunkResponse {
	[shelfId: string]: ShelfRepresentedByBoxes
}

export interface ShelvesDataViewPage {
	[shelfId: string]: ShelfData
}

export interface FetchCardsThunkResponse {
	cards: CardSchemaExtended[]
	shelvesAndBoxesData: ShelvesDataViewPage
}

export interface ErrorTextAndShelfIdObj {
	error: string
	shelfId: string
}

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const fetchCards = createAsyncThunk<FetchCardsThunkResponse, FetchBoxesThunkArg, { state: StateSchema, rejectValue: string, extra: ThunkExtraArg }>(
	'viewPage/fetchCards',
	async ({ shelfId, boxId, data }, thunkAPI) => {

		const { dispatch, extra, getState } = thunkAPI
		// const currentShelvesDataSaved = getState().viewPage?.shelvesDataSaved ?? {}
		dispatch(viewPageActions.setActiveShelfId(shelfId))
		dispatch(viewPageActions.setActiveBoxId(boxId))

		try {
			// const cards = await dispatch(getAllCards()).unwrap()
			// console.log(cards)
			// if (!cards) throw new Error()
			// console.log(cards)
			return data
			// return cards.map(card => ({ ...card, deleted: false }))

		} catch (err) {
			return thunkAPI.rejectWithValue(shelfId)
		}
	}
)
// export const fetchCards = createAsyncThunk<FetchCardsThunkResponse, FetchBoxesThunkArg, { state: StateSchema, rejectValue: string, extra: ThunkExtraArg }>(
// 	'viewPage/fetchCards',
// 	async ({ shelfId, boxId }, thunkAPI) => {

// 		const { dispatch, extra, getState } = thunkAPI
// 		// const currentShelvesDataSaved = getState().viewPage?.shelvesDataSaved ?? {}
// 		dispatch(viewPageActions.setActiveShelfId(shelfId))
// 		dispatch(viewPageActions.setActiveBoxId(boxId))

// 		try {
// 			const cards = await dispatch(getAllCards()).unwrap()
// 			// console.log(cards)
// 			if (!cards) throw new Error()
// 			console.log(cards)
// 			return cards
// 			// return cards.map(card => ({ ...card, deleted: false }))

// 		} catch (err) {
// 			return thunkAPI.rejectWithValue(shelfId)
// 		}
// 	}
// )

// // createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
// export const fetchCards = createAsyncThunk<CardSchemaExtended[], FetchBoxesThunkArg, { state: StateSchema, rejectValue: string, extra: ThunkExtraArg }>(
// 	'viewPage/fetchCards',
// 	async ({ shelfId, boxId }, thunkAPI) => {

// 		const { dispatch, extra, getState } = thunkAPI
// 		// const currentShelvesDataSaved = getState().viewPage?.shelvesDataSaved ?? {}
// 		dispatch(viewPageActions.setActiveShelfId(shelfId))
// 		dispatch(viewPageActions.setActiveBoxId(boxId))

// 		try {
// 			const cards = await dispatch(getAllCards()).unwrap()
// 			// console.log(cards)
// 			if (!cards) throw new Error()
// 			return cards
// 			// return cards.map(card => ({ ...card, deleted: false }))

// 		} catch (err) {
// 			return thunkAPI.rejectWithValue(shelfId)
// 		}
// 	}
// )
