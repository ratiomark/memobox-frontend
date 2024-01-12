import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { BoxSchema, } from '@/entities/Box'
import { getBoxSettingsDropdownBoxId, getBoxSettingsDropdownShelfId } from '../selectors/getBoxSettingDropdownModal'
import { DataBlock } from '@/shared/types/DataBlock'
import { cupboardShelfListActions } from '../slice/cupboardShelfListSlice'

export type DeleteBoxThunkResponse = {
	shelfId: string,
	boxes: BoxSchema[]
	boxCardsData: DataBlock
	shelfCardsData: DataBlock
}
interface BoxDeletingThunkProps {
	boxId: string
	isDeleting: boolean
}
export const setIsBoxDeletingThunk = createAsyncThunk<void, BoxDeletingThunkProps, { rejectValue: string; extra: ThunkExtraArg; state: StateSchema; }>(
	'cupboardPage/setIsBoxDeletingThunk',
	async ({ isDeleting, boxId }, thunkAPI) => {
		const { dispatch, getState } = thunkAPI
		try {
			const shelfId = getBoxSettingsDropdownShelfId(getState())
			if (!boxId || !shelfId) return thunkAPI.rejectWithValue('some error')

			dispatch(cupboardShelfListActions.setIsBoxDeleting({ shelfId, boxId, isDeleting }))

		} catch (err) {
			return thunkAPI.rejectWithValue('some error')
		}
	})
