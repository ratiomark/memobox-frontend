import { ShelfRepresentedByBoxes, getBoxesByShelfId } from '@/entities/Box'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkExtraArg } from '@/app/providers/StoreProvider'

// createAsyncThunk третьим аргументом принимает конфиг и там я могу описать поле extra и теперь обращаясь в thunkAPI.extra ТС подхватит то, что я описал в ThunkExtraArg
export const fetchBoxesDataByShelfId = createAsyncThunk<{[shelfId: string]: ShelfRepresentedByBoxes}, string, { rejectValue: string, extra: ThunkExtraArg }>(
	'viewPage/fetchBoxesData',
	async (shelfId, thunkAPI) => {

		const { dispatch, extra, getState } = thunkAPI

		try {
			const boxes = await dispatch(getBoxesByShelfId(shelfId)).unwrap()
			console.log(boxes)

			return { [shelfId]: boxes }

		} catch (err) {
			return thunkAPI.rejectWithValue('Some Error in fetchBoxesData')
		}
	}
)

