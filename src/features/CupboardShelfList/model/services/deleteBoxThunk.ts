import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { toastsActions } from '@/shared/ui/Toast'
import { getAbortedThunkIds, getShelfById, getShelfTitleByShelfId } from '../selectors/getCupboardShelfList'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { t } from 'i18next'
import { ShelfSchema, rtkRemoveShelfById } from '@/entities/Shelf'
import { idPrefixBoxDeletion } from '@/shared/const/idsAndDataAttributes'
import { TAG_TRASH_PAGE, TAG_VIEW_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'
import { localDataService } from '@/shared/lib/helpers/common/localDataService'
import { setLocalShelvesToStore } from './setLocalShelvesToStore'
import { BoxSchema, rtkApiDeleteBoxFromShelf } from '@/entities/Box'
import { getBoxSettingsDropdownBoxId, getBoxSettingsDropdownShelfId } from '../selectors/getBoxSettingDropdownModal'
import { DataBlock } from '@/shared/types/DataBlock'
import { cupboardShelfListActions } from '../..'

type DeleteBoxThunkArg = {
	shelfId: string
	boxId: string
	index: number
}
export type DeleteBoxThunkResponse = {
	shelfId: string,
	boxes: BoxSchema[]
	boxCardsData: DataBlock
	shelfCardsData: DataBlock
}

const AbortedError = 'Aborted'

export const deleteBoxThunk = createAsyncThunk<DeleteBoxThunkResponse, string, { rejectValue: string; extra: ThunkExtraArg; state: StateSchema; rejectedMeta: { aborted: boolean } }>(
	'cupboardPage/deleteBoxThunk',
	async (boxId, thunkAPI) => {
		const { dispatch, getState } = thunkAPI

		// const boxId = getBoxSettingsDropdownBoxId(getState())

		const id = idPrefixBoxDeletion + boxId
		const abortedThunkIds = getAbortedThunkIds(getState())
		try {
			if (abortedThunkIds.includes(id)) {
				throw new Error(AbortedError)
			}

			const shelfId = getBoxSettingsDropdownShelfId(getState())
			const shelf = getShelfById(shelfId)(getState()) as ShelfSchema
			const shelfCardsData = shelf.data
			let boxesData = shelf.boxesData
			const boxTargeted = boxesData.find((box) => box.id === boxId)
			
			if (!boxTargeted) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				console.warn('No box with such id')
				throw new Error('No box with such id')
			}

			const index = boxTargeted.index
			const boxCardsData = boxTargeted.data as DataBlock
			dispatch(
				toastsActions.addToast({
					id,
					toast: {
						status: 'pending',
						messageLoading: t('toast:messageLoading'),
						messageError: t('toast:messageError'),
						messageSuccess: t('toast:delete_box.messageSuccess'),
						contentCommon: `${t('toast:delete_box.additional')} "${index}"`,
					},
				})
			)

			const response = await dispatch(rtkApiDeleteBoxFromShelf({ shelfId, boxId, index })).unwrap()
			// await sleep(1000)
			if (!response) {
				dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
				throw new Error('Request failed')
			}
			dispatch(rtkApi.util.invalidateTags([TAG_VIEW_PAGE, TAG_TRASH_PAGE]))
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			boxesData = boxesData.filter((box) => box.id !== boxId).map((box, i) => ({ ...box, index: i }))

			return { shelfId, boxes: boxesData, boxCardsData, shelfCardsData }

		} catch (err) {
			const error = err as Error
			if (error.message === AbortedError) {
				return thunkAPI.rejectWithValue(id, { aborted: true })
			} else if (error.message === 'Request failed') {
				return thunkAPI.rejectWithValue(boxId, { aborted: false })
			} else {
				// Обработка всех других ошибок
				return thunkAPI.rejectWithValue(boxId, { aborted: false })
			}
		}
	})
