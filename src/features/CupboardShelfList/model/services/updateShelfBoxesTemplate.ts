import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { MissedTrainingValue } from '@/entities/User'
import { toastsActions } from '@/shared/ui/Toast'
import { t } from 'i18next'
import { sleep } from '@/shared/lib/helpers/common/sleep'
import { genRandomId } from '@/shared/lib/helpers/common/genRandomId'
import { rtkShelfUpdateBoxesList, updateShelfWithTag } from '@/entities/Shelf'
import { updateBoxWithTag } from '@/entities/Box'
import { getShelfTitleByShelfId } from '../selectors/getCupboardShelfList'
import { idPrefixShelfBoxesTemplateUpdating } from '@/shared/const/idsAndDataAttributes'
import { getBoxesTemplateModalCurrentShelfTemplate } from '../selectors/getShelfBoxesTemplateModal'
import { TAG_VIEW_PAGE, TAG_TRASH_PAGE, TAG_CUPBOARD_PAGE } from '@/shared/api/const/tags'
import { rtkApi } from '@/shared/api/rtkApi'

export interface UpdateShelfBoxesTemplate {
	missedTrainingValue: MissedTrainingValue
	boxId?: string
	shelfId: string
}
export const updateShelfBoxesTemplate = createAsyncThunk<string, string, { rejectValue: string, extra: ThunkExtraArg, state: StateSchema }>(
	'cupboardPage/updateShelfBoxesTemplate',
	async (shelfId, thunkAPI) => {
		// const { boxId, shelfId, missedTrainingValue } = arg
		// console.log('updateShelfBoxesTemplate', arg)
		const id = idPrefixShelfBoxesTemplateUpdating + shelfId
		const { dispatch, getState } = thunkAPI
		const shelfTitle = getShelfTitleByShelfId(shelfId)(getState())
		const currentShelfTemplate = getBoxesTemplateModalCurrentShelfTemplate(getState())!
		const boxesList = currentShelfTemplate.map((box) => ({
			index: box.index,
			id: box.id,
			timing: {
				minutes: box.minutes ?? 0,
				hours: box.hours ?? 0,
				days: box.days ?? 0,
				weeks: box.weeks ?? 0,
				months: box.months ?? 0,
			}
		}))
		// где-то тут нужно переключить глобальный флаг, который не позволит открывать модалку с шаблонами, пока не придет ответ от сервера
		dispatch(toastsActions.addToast({
			id,
			toast: {
				status: 'pending',
				messageLoading: t('toast:messageLoading'),
				messageError: t('toast:messageError'),
				messageSuccess: t('toast:update_shelf_boxes.messageSuccess'),
				contentCommon: `${t('toast:update_shelf_boxes.additional')} ${shelfTitle}`,
				// duration: 1000000,
			}
		}))
		try {
			// FIXME: в случае ошибки нужно оставить текущий текущий шаблон, чтобы пользователь не потерял его
			// await sleep(4)
			// console.log('-------------------------  ', currentShelfTemplate)
			// console.log('+++++++++++++++++++++++  ', boxesList)
			// const response = await dispatch(rtkShelfUpdateBoxesList({ shelfId, boxesList })).unwrap()
			const response = await dispatch(rtkShelfUpdateBoxesList({ shelfId, boxesList })).unwrap()
			dispatch(rtkApi.util.invalidateTags([TAG_CUPBOARD_PAGE, TAG_TRASH_PAGE]))
			// console.log('response===================  ', response)
			// const response = boxId
			// 	? dispatch(updateBoxWithTag({ shelfId, box: { missedTrainingValue, id: boxId } })).unwrap()
			// 	: dispatch(updateShelfWithTag({ id: shelfId, missedTrainingValue })).unwrap()

			if (!response) {
				throw new Error()
			}

			dispatch(toastsActions.updateToastById({ id, toast: { status: 'success' } }))
			return shelfId
		} catch (err) {
			dispatch(toastsActions.updateToastById({ id, toast: { status: 'error' } }))
			return thunkAPI.rejectWithValue('some error in fetchCupboardData')
		}
	}
)

// createAsyncThunk принимает несколько дженериков, первый - то что мы возвращаем, второй - то что мы передаем. В качестве третьего аргумента может выступать объект(AsyncThunkConfig), в это объекте можно указать что мы ожидаем от определенных частей thunk. Например, если при ошибки мы хотим возращать определенный тип ошибки, который мы создали самостоятельно, то в качестве AsyncThunkConfig указывает {rejectValue: MyCustomError} и таким образом я типизирую значение, которое возращает thunkAPI.rejectWithValue при ошибке. Это позволяет очень гибко типизировать все входные и выходные значения