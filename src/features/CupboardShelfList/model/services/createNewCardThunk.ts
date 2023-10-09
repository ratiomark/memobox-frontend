import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { toastsActions } from '@/shared/ui/Toast'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAnswerCardModal, getBoxIdCheckedCardModal, getQuestionCardModal, getShelfIdCardModal } from '../selectors/getCreateNewCardModal'
import { cupboardShelfListActions } from '../slice/cupboardShelfListSlice'
import { t } from 'i18next'
import { createNewCard } from '@/entities/Card'

export const createNewCardThunk = createAsyncThunk<boolean, string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/createNewCardThunk',
	async (randomId, thunkAPI) => {

		const { dispatch, getState } = thunkAPI
		// dispatch(cupboardShelfListActions.setCreateNewCardModalRequestStatus('pending'))
		dispatch(toastsActions.addToast({
			id: randomId, toast: {
				status: 'pending',
				messageLoading: t('toast:messageLoading'),
				messageError: t('toast:messageError'),
				messageSuccess: t('toast:create_new_card.messageSuccess'),
				contentLoading: t('toast:create_new_card.additional'),
				contentSuccess: t('toast:create_new_card.additional'),
				contentError: t('toast:create_new_card.additional'),
				// duration: 1000000
			}
		}))
		const question = getQuestionCardModal(getState())
		const answer = getAnswerCardModal(getState())
		const shelfId = getShelfIdCardModal(getState())
		const boxId = getBoxIdCheckedCardModal(getState())
		try {
			await sleep()
			const response = Math.random() > 0.5
			// const response = await dispatch(createNewCard({ question, answer, shelfId, boxId, })).unwrap()
			if (!response) {
				dispatch(toastsActions.updateToastById({ id: randomId, toast: { status: 'error' } }))
				dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('error'))
				throw new Error()
			}
			dispatch(toastsActions.updateToastById({ id: randomId, toast: { status: 'success' } }))
			// dispatch(cupboardShelfListActions.setCreateNewCardModalRequestStatus('success'))
			// VAR: тут нужно перделать, если ответ успешный, то нужно добавить карточку в счетчики соответвующей полки+коробки
			return true

		} catch (err) {
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)