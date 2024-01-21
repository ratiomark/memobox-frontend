import { AnimatePresence, motion } from 'framer-motion';
import cls from './BoxesRendered.module.scss';
import { BoxSchema } from '@/entities/Box';
import { BoxesSettingsContent } from './BoxesSettingsContent/BoxesSettingsContent';

export interface BoxesRenderedProps {
	boxes: BoxSchema[]
}

export const BoxesRendered = (props: BoxesRenderedProps) => {


	const onCloseHandle = () => {
		// dispatch(cupboardShelfListActions.setShelfBoxesTemplateModalIsOpen(false))
		// dispatch(cupboardShelfListActions.setShelfBoxesTemplateModalShelfId(''))
		// dispatch(shelfBoxesTemplateSettingsActions.reset())
	}


	const onSubmitHandle = () => {
		// dispatch(updateShelfBoxesTemplate(shelfId))
		// const currentShelfTemplate = useSelector(getBoxesTemplateModalCurrentShelfTemplate)
	}

	// if (!shelf) return <p>Загрузка</p>

	return (

		<AnimatePresence initial={false} mode='wait'>
			<motion.div
				layout
				className={cls.ShelfTemplateSettings}
			>

				<BoxesSettingsContent  {...props} />
			</motion.div>
		</AnimatePresence>
		// <AnimatePresence initial={false} mode='wait'>
		// 	<motion.div
		// 		layout
		// 		className={cls.ShelfTemplateSettings}
		// 	>

		// 		<BoxesSettingsContent  {...props} />
		// 	</motion.div>
		// </AnimatePresence>

	)
}
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
