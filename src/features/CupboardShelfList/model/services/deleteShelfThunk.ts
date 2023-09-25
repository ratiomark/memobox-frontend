import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { cupboardShelfListActions, getCupboardState } from '../slice/cupboardShelfListSlice'
import { createNewShelf } from '@/entities/Cupboard'
import { ShelfSchema, removeShelfByIdMutation } from '@/entities/Shelf'
import { getQuestionCardModal, getAnswerCardModal, getShelfIdCardModal, getBoxIdCheckedCardModal, getCreateNewCardRequestStatus } from '../selectors/getCreateNewCardModal'
// interface NewCard {
// 	shelfId: string
// 	boxId: string
// 	question: string
// 	answer: string
// }
export const deleteShelfThunk = createAsyncThunk<boolean, string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/deleteShelfThunk',
	async (shelfId, thunkAPI) => {

		const { dispatch, getState } = thunkAPI
		// dispatch(cupboardShelfListActions.deleteShelf(shelfId))
		// const response1 = await dispatch(removeShelfByIdMutation(shelfId)).unwrap()
		// removeShelfMutation(shelfId)
		dispatch(cupboardShelfListActions.setShelfDeletionRequestStatus('pending'))
		try {
			setTimeout(() => {
				// const response = await dispatch(removeShelfByIdMutation(shelfId)).unwrap()
				const response = Math.random() > 0.5
				if (!response) {
					// dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { isDeleting: false } }))
					// dispatch(cupboardShelfListActions.setCreateNewCardModalRequestStatus('error'))
					// dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('error'))
					// dispatch(cupboardShelfListActions.setIsCreateNewShelfModalSuccessfulResponse(false))
					dispatch(cupboardShelfListActions.setShelfDeletionRequestStatus('error'))
					throw new Error()
				}
				dispatch(cupboardShelfListActions.setShelfDeletionRequestStatus('success'))
				// console.log('НОВАЯ ПОЛКА', response)
				// dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('error'))
				// dispatch(cupboardShelfListActions.setIsCreateNewShelfModalSuccessfulResponse(true))
			}, 4000)

			return true

		} catch (err) {
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)