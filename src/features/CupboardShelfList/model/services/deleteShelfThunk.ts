import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { cupboardShelfListActions, getCupboardState } from '../slice/cupboardShelfListSlice'
import { createNewShelf } from '@/entities/Cupboard'
import { ShelfSchema, removeShelfByIdMutation } from '@/entities/Shelf'
import { getQuestionCardModal, getAnswerCardModal, getShelfIdCardModal, getBoxIdCheckedCardModal, getCreateNewCardRequestStatus } from '../selectors/getCreateNewCardModal'
import { toastsActions } from '@/shared/ui/Toast'
import { getShelfTitleByShelfId } from '../selectors/getCupboardShelfList'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'
// interface NewCard {
// 	shelfId: string
// 	boxId: string
// 	question: string
// 	answer: string
// }
export const deleteShelfThunk = createAsyncThunk<string, string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/deleteShelfThunk',
	async (shelfId, thunkAPI) => {

		const { dispatch, getState } = thunkAPI
		const shelfTitle = getShelfTitleByShelfId(shelfId)(getState())
		// console.log(shelfTitle)
		dispatch(toastsActions.addToast({
			id: shelfId,
			toast: {
				status: 'pending',
				messageLoading: t('toast:messageLoading'),
				messageError: t('toast:messageError'),
				messageSuccess: t('toast:delete_shelf.messageSuccess'),
				contentLoading: `${t('toast:delete_shelf.additional')} ${shelfTitle}`,
				contentSuccess: `${t('toast:delete_shelf.additional')} ${shelfTitle}`,
				contentError: `${t('toast:delete_shelf.additional')} ${shelfTitle}`,
				// duration: 1000000,
			}
		}))
		// dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { deletingRequestStatus: 'pending' } }))
		// dispatch(cupboardShelfListActions.setShelfDeletionRequestStatus('pending'))
		try {
			// VAR: Тут нужно проверять response и если ответ на свервера успешный, то возвращать shelfId
			// const response = await dispatch(removeShelfByIdMutation(shelfId)).unwrap()
			await sleep()
			// const response = false
			// const response = Math.random() > 0.5
			const response = Math.random() > 50
			if (!response) {
				dispatch(toastsActions.updateToastById({
					id: shelfId,
					toast: { status: 'error' }
				}))

				throw new Error()
			}

			dispatch(toastsActions.updateToastById({
				id: shelfId,
				toast: { status: 'success' }
			}))
			// dispatch(removeShelfByIdMutation(shelfId)).unwrap()
			return shelfId

		} catch (err) {
			return thunkAPI.rejectWithValue(shelfId)
		}
	}
)
// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
// import { cupboardShelfListActions, getCupboardState } from '../slice/cupboardShelfListSlice'
// import { createNewShelf } from '@/entities/Cupboard'
// import { ShelfSchema, removeShelfByIdMutation } from '@/entities/Shelf'
// import { getQuestionCardModal, getAnswerCardModal, getShelfIdCardModal, getBoxIdCheckedCardModal, getCreateNewCardRequestStatus } from '../selectors/getCreateNewCardModal'
// import { toastsActions } from '@/shared/ui/Toast'
// // interface NewCard {
// // 	shelfId: string
// // 	boxId: string
// // 	question: string
// // 	answer: string
// // }
// export const deleteShelfThunk = createAsyncThunk<string, string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
// 	'cupboardPage/deleteShelfThunk',
// 	async (shelfId, thunkAPI) => {

// 		const { dispatch } = thunkAPI
// 		dispatch(toastsActions.addToast({ id: shelfId, toast: { status: 'pending', messageLoading:'ЙОЙОЙОЙ Удаление', } }))
// 		// dispatch(cupboardShelfListActions.updateShelf({ id: shelfId, changes: { deletingRequestStatus: 'pending' } }))
// 		// dispatch(cupboardShelfListActions.setShelfDeletionRequestStatus('pending'))
// 		try {
// 			// VAR: Тут нужно проверять response и если ответ на свервера успешный, то возвращать shelfId

// 			await new Promise((resolve, reject) => {
// 				setTimeout(() => {
// 					Math.random() > 0.5 ? resolve(null) : reject(null);
// 				}, 3000);
// 			});

// 			// const response = await dispatch(removeShelfByIdMutation(shelfId)).unwrap()

// 			const response = Math.random() > 50
// 			// console.log('RESPONSE   ', response)
// 			// const response = Math.random() > 0.5
// 			if (!response) {
// 				throw new Error()
// 			}
// 			dispatch(removeShelfByIdMutation(shelfId)).unwrap()
// 			return shelfId

// 		} catch (err) {
// 			return thunkAPI.rejectWithValue(shelfId)
// 		}
// 	}
// )