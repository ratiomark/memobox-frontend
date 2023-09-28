import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { cupboardShelfListActions, getCupboardState } from '../slice/cupboardShelfListSlice'
import { createNewShelf } from '@/entities/Cupboard'
import { ShelfSchema } from '@/entities/Shelf'
import { getQuestionCardModal, getAnswerCardModal, getShelfIdCardModal, getBoxIdCheckedCardModal, getCreateNewCardRequestStatus } from '../selectors/getCreateNewCardModal'
import { toastsActions } from '@/shared/ui/Toast'
import { sleep } from '@/shared/lib/helpers/common/sleep'
// interface NewCard {
// 	shelfId: string
// 	boxId: string
// 	question: string
// 	answer: string
// }
export const createNewCardThunk = createAsyncThunk<boolean, string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/createNewCardThunk',
	async (randomId, thunkAPI) => {

		const { dispatch, getState } = thunkAPI
		dispatch(cupboardShelfListActions.setCreateNewCardModalRequestStatus('pending'))
		dispatch(toastsActions.addToast({ id: randomId, toast: { status: 'pending' } }))
		const question = getQuestionCardModal(getState())
		const answer = getAnswerCardModal(getState())
		const shelfId = getShelfIdCardModal(getState())
		const boxId = getBoxIdCheckedCardModal(getState())
		try {
			// console.log(answer)
			// console.log(question)
			// console.log(shelfId)
			// console.log(boxId)
			await sleep()
			const response = Math.random() > 0.5
			// const response = await dispatch(createNewShelf(shelfName)).unwrap()
			if (!response) {
				dispatch(toastsActions.updateToastById({ id: randomId, toast: { status: 'error' } }))
				dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('error'))
				throw new Error()
			}
			dispatch(toastsActions.updateToastById({ id: randomId, toast: { status: 'success' } }))
			dispatch(cupboardShelfListActions.setCreateNewCardModalRequestStatus('success'))

			return true

		} catch (err) {
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)