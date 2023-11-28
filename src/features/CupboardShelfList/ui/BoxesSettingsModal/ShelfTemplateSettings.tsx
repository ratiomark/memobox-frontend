import cls from './ShelfTemplateSettings.module.scss';
import { useSelector } from 'react-redux';
import { BoxesSettingsContent } from './BoxesSettingsContent/BoxesSettingsContent';
import { useEffect } from 'react';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { AnimatePresence, motion, } from 'framer-motion';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { shelfBoxesTemplateSettingsReducer, shelfBoxesTemplateSettingsActions } from '../../model/slice/shelfBoxesTemplateSlice';
import { RegularAndLearntCardsBox } from '@/entities/Box';
import { getShelfById } from '../../model/selectors/getCupboardShelfList'
import {
	getBoxesTemplateModalChanged,
	getBoxesTemplateModalIsOpen,
	getBoxesTemplateModalShelfId
} from '../../model/selectors/getShelfBoxesTemplateModal'
import { cupboardShelfListActions } from '../../model/slice/cupboardShelfListSlice'
import { Skeleton } from '@/shared/ui/Skeleton';
import { updateShelfBoxesTemplate } from '../../model/services/updateShelfBoxesTemplate';

const reducers: ReducersList = {
	shelfBoxesTemplateSettings: shelfBoxesTemplateSettingsReducer
}

const ShelfBoxesTemplateModal = () => {
	const shelfId = useSelector(getBoxesTemplateModalShelfId)
	const isOpen = useSelector(getBoxesTemplateModalIsOpen)
	const shelf = useSelector(getShelfById(shelfId))
	// const shelf = useSelector((state: StateSchema) => getShelfById(state, shelfId))
	const isCurrentTemplateEqualToInitial = useSelector(getBoxesTemplateModalChanged)
	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })

	useEffect(() => {
		if (shelf) {
			// console.log(shelf?.boxesData.slice(1,))
			dispatch(shelfBoxesTemplateSettingsActions.setInitialTemplate(shelf?.boxesData.slice(1,) as RegularAndLearntCardsBox[]))
		}
	}, [shelf, dispatch])

	const onCloseHandle = () => {
		dispatch(cupboardShelfListActions.setShelfBoxesTemplateModalIsOpen(false))
		dispatch(cupboardShelfListActions.setShelfBoxesTemplateModalShelfId(''))
		dispatch(shelfBoxesTemplateSettingsActions.reset())
	}


	const onSubmitHandle = () => {
		dispatch(updateShelfBoxesTemplate(shelfId))
		// const currentShelfTemplate = useSelector(getBoxesTemplateModalCurrentShelfTemplate)
	}

	// if (!shelf) return <p>Загрузка</p>

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={onSubmitHandle}
			lazy
			// max
			panelWithMainPadding={false}
		>
			<AnimatePresence initial={false} mode='wait'>
				<motion.div
					layout
					className={cls.ShelfTemplateSettings}
				>
					{!shelf
						? <Skeleton width={1200} height={150} />
						: <BoxesSettingsContent />
					}
					<ModalButtons
						justify='end'
						// max={false}
						isSubmitDisabled={isCurrentTemplateEqualToInitial}
						onClose={onCloseHandle}
						onSubmit={onSubmitHandle}
					/>
				</motion.div>
			</AnimatePresence>
			{/* <div style={{ background: 'red', position: 'absolute', inset: 0 }} /> */}
		</HDialogHeadless>

	)
}
export default ShelfBoxesTemplateModal
// export const ShelfBoxesTemplateModal = () => {
// 	const shelfId = useSelector(getBoxesTemplateModalShelfId)
// 	const isOpen = useSelector(getBoxesTemplateModalIsOpen)
// 	const shelf = useSelector(getShelfById(shelfId))
// 	// const shelf = useSelector((state: StateSchema) => getShelfById(state, shelfId))
// 	const isCurrentTemplateEqualToInitial = useSelector(getBoxesTemplateModalChanged)
// 	const { dispatch } = useAsyncReducer({ reducers, removeAfterUnmount: false })

// 	useEffect(() => {
// 		if (shelf) {
// 			// console.log(shelf?.boxesData.slice(1,))
// 			dispatch(shelfBoxesTemplateSettingsActions.setInitialTemplate(shelf?.boxesData.slice(1,) as RegularAndLearntCardsBox[]))
// 		}
// 	}, [shelf, dispatch])

// 	const onCloseHandle = () => {
// 		dispatch(cupboardShelfListActions.setShelfBoxesTemplateModalIsOpen(false))
// 		dispatch(cupboardShelfListActions.setShelfBoxesTemplateModalShelfId(''))
// 		dispatch(shelfBoxesTemplateSettingsActions.reset())
// 	}


// 	// if (!shelf) return <p>Загрузка</p>

// 	return (
// 		<HDialogHeadless
// 			isOpen={isOpen}
// 			onClose={onCloseHandle}
// 			onSubmit={() => alert('Сохраняю настройки')}
// 			lazy
// 			// max
// 			panelWithMainPadding={false}
// 		>
// 			<AnimatePresence initial={false} mode='wait'>
// 				<motion.div
// 					layout
// 					className={cls.ShelfTemplateSettings}
// 				>
// 					{!shelf
// 						? <Skeleton width={1200} height={150} />
// 						: <BoxesSettingsContent />
// 					}
// 					<ModalButtons
// 						justify='end'
// 						// max={false}
// 						isSubmitDisabled={isCurrentTemplateEqualToInitial}
// 						onClose={onCloseHandle}
// 						onSubmit={() => alert('Сохраняю настройки')}
// 					/>
// 				</motion.div>
// 			</AnimatePresence>
// 			{/* <div style={{ background: 'red', position: 'absolute', inset: 0 }} /> */}
// 		</HDialogHeadless>

// 	)
// }
