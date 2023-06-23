import { ShelfRepresentedByBoxes, getBoxesByShelfId } from '@/entities/Box'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { getViewPageSavedShelf, viewPageActions } from '../..'



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
export const fetchBoxesDataByShelfId = createAsyncThunk<FetchBoxesThunkResponse, FetchBoxesThunkArg, { state: StateSchema, rejectValue: string, extra: ThunkExtraArg }>(
	'viewPage/fetchBoxesData',
	async ({ shelfId, boxId }, thunkAPI) => {

		const { dispatch, extra, getState } = thunkAPI
		const currentShelvesDataSaved = getState().viewPage?.shelvesDataSaved ?? {}
		dispatch(viewPageActions.setActiveShelfId(shelfId))
		
		try {
			if (shelfId in currentShelvesDataSaved) {
				null
			} else{
				dispatch(viewPageActions.initiateShelf({ boxId, shelfId }))
				// dispatch(viewPageActions.initiateShelf({ boxId, shelfId }))
			}
			const boxes = await dispatch(getBoxesByShelfId(shelfId)).unwrap()
			return { [shelfId]: boxes }


		} catch (err) {
			return thunkAPI.rejectWithValue(shelfId)
		}
	}
)

// import { ShelfRepresentedByBoxes, getBoxesByShelfId } from '@/entities/Box'
// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
// import { getViewPageSavedShelf, viewPageActions } from '../..'



// interface FetchBoxesThunkArg {
// 	shelfId: string
// 	boxId: string
// }
// export interface FetchBoxesThunkResponse {
// 	[shelfId: string]: ShelfRepresentedByBoxes
// }

// export interface ErrorTextAndShelfIdObj {
// 	error: string
// 	shelfId: string
// }

// // createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
// export const fetchBoxesDataByShelfId = createAsyncThunk<FetchBoxesThunkResponse, FetchBoxesThunkArg, { state: StateSchema, rejectValue: string, extra: ThunkExtraArg }>(
// 	'viewPage/fetchBoxesData',
// 	async ({ shelfId, boxId }, thunkAPI) => {

// 		const { dispatch, extra, getState } = thunkAPI
// 		const currentShelvesDataSaved = getState().viewPage?.shelvesDataSaved ?? {}
// 		dispatch(viewPageActions.setActiveShelfId(shelfId))
		
// 		try {
// 			if (shelfId in currentShelvesDataSaved) {
// 				null
// 			} else {
// 				dispatch(viewPageActions.initiateShelf({ boxId, shelfId }))
// 			}
// 			const boxes = await dispatch(getBoxesByShelfId(shelfId)).unwrap()
// 			return { [shelfId]: boxes }


// 		} catch (err) {
// 			return thunkAPI.rejectWithValue(shelfId)
// 		}
// 	}
// )

