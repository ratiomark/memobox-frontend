import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { cupboardShelfListActions, getCupboardState } from '../slice/cupboardShelfListSlice'
import { createNewShelf } from '@/entities/Cupboard'
import { ShelfSchema } from '@/entities/Shelf'
import { getQuestionCardModal, getAnswerCardModal, getShelfIdCardModal, getBoxIdCheckedCardModal, getCreateNewCardRequestStatus } from '../selectors/getCreateNewCardModal'
import { toastsActions } from '@/shared/ui/Toast'
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
		// dispatch(getCreateNewCardRequestStatus('pen'))
		dispatch(toastsActions.addToast({ id: randomId, toast: { status: 'pending' } }))
		// dispatch(cupboardShelfListActions.setCreateNewCardModalRequestStatus('pending'))
		const question = getQuestionCardModal(getState())
		const answer = getAnswerCardModal(getState())
		const shelfId = getShelfIdCardModal(getState())
		const boxId = getBoxIdCheckedCardModal(getState())
		// console.log(question)
		try {
			setTimeout(() => {
				// console.log(answer)
				// console.log(shelfId)
				// console.log(boxId)
				// dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('pending'))
				// dispatch(cupboardShelfListActions.setIsCreateNewShelfModalAwaitingResponse(true))
				// console.log('shelfName   ', shelfName)
				const response = Math.random() > 0.5
				// const response = await dispatch(createNewShelf(shelfName)).unwrap()
				if (!response) {
					dispatch(toastsActions.updateToastById({ id: randomId, toast: { status: 'error' } }))
					// dispatch(cupboardShelfListActions.setCreateNewCardModalRequestStatus('error'))
					// dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('error'))
					// dispatch(cupboardShelfListActions.setIsCreateNewShelfModalSuccessfulResponse(false))
					throw new Error()
				}
				dispatch(toastsActions.updateToastById({ id: randomId, toast: { status: 'success' } }))
				// dispatch(cupboardShelfListActions.setCreateNewCardModalRequestStatus('success'))
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