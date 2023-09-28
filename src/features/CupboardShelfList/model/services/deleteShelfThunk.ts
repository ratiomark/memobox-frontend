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
export const deleteShelfThunk = createAsyncThunk<string, string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/deleteShelfThunk',
	async (shelfId, thunkAPI) => {

		const { dispatch } = thunkAPI
		dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { deletingRequestStatus: 'pending' } }))
		// dispatch(cupboardShelfListActions.setShelfDeletionRequestStatus('pending'))
		try {
			// VAR: Тут нужно проверять response и если ответ на свервера успешный, то возвращать shelfId

			await new Promise((resolve, reject) => {
				setTimeout(() => {
					Math.random() > 0.5 ? resolve(null) : reject(null);
				}, 3000);
			});

			// const response = await dispatch(removeShelfByIdMutation(shelfId)).unwrap()

			const response = Math.random() > 50
			// console.log('RESPONSE   ', response)
			// const response = Math.random() > 0.5
			if (!response) {
				throw new Error()
			}
			dispatch(removeShelfByIdMutation(shelfId)).unwrap()
			return shelfId

		} catch (err) {
			return thunkAPI.rejectWithValue(shelfId)
		}
	}
)