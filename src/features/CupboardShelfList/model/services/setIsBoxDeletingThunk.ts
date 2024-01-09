import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { BoxSchema,} from '@/entities/Box'
import { getBoxSettingsDropdownBoxId, getBoxSettingsDropdownShelfId } from '../selectors/getBoxSettingDropdownModal'
import { DataBlock } from '@/shared/types/DataBlock'
import { cupboardShelfListActions } from '../slice/cupboardShelfListSlice'

export type DeleteBoxThunkResponse = {
	shelfId: string,
	boxes: BoxSchema[]
	boxCardsData: DataBlock
	shelfCardsData: DataBlock
}

export const setIsBoxDeletingThunk = createAsyncThunk<void, boolean, { rejectValue: string; extra: ThunkExtraArg; state: StateSchema; }>(
	'cupboardPage/deleteBoxThunk',
	async (isDeleting, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		try {
			const boxId = getBoxSettingsDropdownBoxId(getState())
			const shelfId = getBoxSettingsDropdownShelfId(getState())
			if (!boxId || !shelfId) return thunkAPI.rejectWithValue('some error')

			dispatch(cupboardShelfListActions.setIsBoxDeleting({ shelfId, boxId, isDeleting }))

		} catch (err) {
			return thunkAPI.rejectWithValue('some error')
		}
	})
