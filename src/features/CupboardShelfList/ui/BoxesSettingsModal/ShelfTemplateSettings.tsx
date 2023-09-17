import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelfTemplateSettings.module.scss';
import { useSelector } from 'react-redux';
import { BoxesSettingsContent } from './BoxesSettingsContent/BoxesSettingsContent';
import { useEffect } from 'react';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { Button } from '@/shared/ui/Button';
import { AnimatePresence, motion, } from 'framer-motion';
import { HStack } from '@/shared/ui/Stack';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { shelfBoxesTemplateSettingsReducer, shelfBoxesTemplateSettingsActions } from '../../model/slice/shelfBoxesTemplateSlice';
import { StateSchema } from '@/app/providers/StoreProvider';
import { RegularAndLearntCardsBox } from '@/entities/Box';
import { getShelfById } from '../../model/selectors/getCupboardShelfList'
import {
	getBoxesTemplateModalIsOpen,
	getBoxesTemplateModalShelfId
} from '../../model/selectors/getShelfBoxesTemplateModal'
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice'

const reducers: ReducersList = {
	shelfBoxesTemplateSettings: shelfBoxesTemplateSettingsReducer
}

export const ShelfBoxesTemplateModal = () => {
	const shelfId = useSelector(getBoxesTemplateModalShelfId)
	const isOpen = useSelector(getBoxesTemplateModalIsOpen)
	const shelf = useSelector((state: StateSchema) => getShelfById(state, shelfId))
	// const shelfTemplateSettingsFromUser = useSelector(getUserShelfTemplateSettings)
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })
	const { t } = useTranslation()

	useEffect(() => {
		if (shelf) {
			console.log(shelf?.boxesData.slice(1,))
			dispatch(shelfBoxesTemplateSettingsActions.setInitialTemplate(shelf?.boxesData.slice(1,) as RegularAndLearntCardsBox[]))
		}
	}, [shelf, dispatch])

	const onCloseHandle = () => {
		dispatch(cupboardShelfListActions.setShelfBoxesTemplateModalIsOpen(false))
		dispatch(shelfBoxesTemplateSettingsActions.reset())
	}

	// const isCurrentTemplateEqualToInitial = useSelector(getSettingsShelfTemplateChanged)

	if (!shelf) return <p>Загрузка</p>

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={() => alert('Сохраняю настройки')}
			lazy
			// max
			panelWithMainPadding={false}
		>
			<AnimatePresence initial={false} mode='wait'>
				<motion.div
					layout
					className={clsx(
						cls.ShelfTemplateSettings)}
				// animate={{ width: 'auto' }}
				>
					{/* {isAnyTimeSetterOpen && <div className={cls.overlay} />} */}
					<BoxesSettingsContent />

					{/* <div style={{ background: 'red', position: 'absolute', inset: 0 }} /> */}
					<HStack max justify='between'>
						<Button variant='empty'>{t('return to default')}</Button>
						<ModalButtons
							justify='end'
							max={false}
							// isSubmitDisabled={isCurrentTemplateEqualToInitial}
							onClose={onCloseHandle}
							onSubmit={() => alert('Сохраняю настройки')}
						/>
					</HStack>
					{/* <div style={{ background: 'red', position: 'absolute', inset: 0 }} /> */}
				</motion.div>
			</AnimatePresence>
			{/* <div style={{ background: 'red', position: 'absolute', inset: 0 }} /> */}
		</HDialogHeadless>

	)
}
// export const ShelfBoxesTemplateModal = () => {
// 	const isOpen = useSelector(getBoxesTemplateModalIsOpen)
// 	isOpen
// }