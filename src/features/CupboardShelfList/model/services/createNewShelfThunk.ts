import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { cupboardShelfListActions, getCupboardState } from '../slice/cupboardShelfListSlice'
import { createNewShelf } from '@/entities/Cupboard'
import { ShelfSchema } from '@/entities/Shelf'

export const createNewShelfThunk = createAsyncThunk<ShelfSchema[], string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/createNewShelfThunk',
	async (shelfName, thunkAPI) => {

		const { dispatch, getState } = thunkAPI
		try {
			dispatch(cupboardShelfListActions.setIsCreateNewShelfModalRequestStatus('pending'))
			// dispatch(cupboardShelfListActions.setIsCreateNewShelfModalAwaitingResponse(true))
			// console.log('shelfName   ', shelfName)
			const response = await dispatch(createNewShelf(shelfName)).unwrap()
			if (!response) {
				dispatch(cupboardShelfListActions.setIsCreateNewShelfModalRequestStatus('error'))
				// dispatch(cupboardShelfListActions.setIsCreateNewShelfModalSuccessfulResponse(false))
				throw new Error()
			}
			// console.log('НОВАЯ ПОЛКА', response)
			const shelves = getCupboardState.selectAll(getState()).map(shelf => ({
				...shelf,
				index: shelf.index + 1
			}))
			// console.log(shelves)
			// dispatch(cupboardShelfListActions.setIsCreateNewShelfModalRequestStatus('error'))
			// dispatch(cupboardShelfListActions.setIsCreateNewShelfModalSuccessfulResponse(true))
			return [response, ...shelves]

		} catch (err) {
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)