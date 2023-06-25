import { ShelfRepresentedByBoxes, getBoxesByShelfId } from '@/entities/Box'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { getViewPageSavedShelf, viewPageActions } from '../..'
import { CardSchema, getAllCards } from '@/entities/Card'

interface FetchBoxesThunkArg {
	shelfId: string
	boxId: string
}
export interface FetchBoxesThunkResponse {
	[shelfId: string]: ShelfRepresentedByBoxes
}

export interface ErrorTextAndShelfIdObj {
	error: string
	shelfId: string
}

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const fetchCards = createAsyncThunk<CardSchema[], FetchBoxesThunkArg, { state: StateSchema, rejectValue: string, extra: ThunkExtraArg }>(
	'viewPage/fetchCards',
	async ({ shelfId, boxId }, thunkAPI) => {

		const { dispatch, extra, getState } = thunkAPI
		// const currentShelvesDataSaved = getState().viewPage?.shelvesDataSaved ?? {}
		dispatch(viewPageActions.setActiveShelfId(shelfId))
		dispatch(viewPageActions.setActiveBoxId(boxId))

		try {
			const cards = await dispatch(getAllCards()).unwrap()
			// console.log(cards)
			if (!cards) throw new Error()
			return cards

		} catch (err) {
			return thunkAPI.rejectWithValue(shelfId)
		}
	}
)
