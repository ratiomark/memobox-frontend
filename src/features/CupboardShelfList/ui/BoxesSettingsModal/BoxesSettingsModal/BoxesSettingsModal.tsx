
import { StateSchema } from '@/app/providers/StoreProvider';
import { cupboardShelfListActions } from '../../../model/slice/cupboardShelfListSlice';
import { getShelfIdBoxesSettingsModal, getIsBoxesSettingsOpen } from '../../../model/selectors/getBoxesSettingsModal';
import { getShelfById } from '../../../model/selectors/getCupboardShelfList'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { HDialog } from '@/shared/ui/HDialog';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BoxesSettingsContent } from '../BoxesSettingsContent/BoxesSettingsContent';
import cls from './BoxesSettingsModal.module.scss';
import { HStack } from '@/shared/ui/Stack';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';


interface BoxesSettingsModalProps {
	className?: string
	// shelfId?: string
	// isOpen: boolean
	// onClose: () => void
}

export const BoxesSettingsModal = memo((props: BoxesSettingsModalProps) => {
	const {
		className,
	} = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	// const cupboardIsLoading = useSelector(getCupboardIsLoading)
	// const cupboardError = useSelector(getCupboardError)
	// const cupboardShelves = useSelector(getCupboardState.selectAll)
	const shelfId = useSelector(getShelfIdBoxesSettingsModal)
	const isOpen = useSelector(getIsBoxesSettingsOpen)
	const shelf = useSelector((state: StateSchema) => getShelfById(state, shelfId))

	const onCloseBoxesSettings = () => {
		dispatch(cupboardShelfListActions.setBoxesSettingsModalIsOpen(false))
	}
	if (!shelf) return null

	console.log(shelf.boxesData, isOpen)
	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onCloseBoxesSettings}
		>
			<AnimatePresence initial={false} mode='wait'>
				<motion.div
					layout
					className={clsx(
						cls.ShelfTemplateSettings,
						className)}
				>
					<BoxesSettingsContent shelf={shelf} />
					<HStack max justify='between'>
						<Button variant='empty'>{t('cancel')}</Button>
						<Button variant='filled'>{t('save')}</Button>
					</HStack>
				</motion.div>
			</AnimatePresence>

			{/* <div
				className={cls.cardModal}
			>
				<BoxesSettingsContent shelf={shelf!} />
				
				<div className={cls.actions} >
					<Button>{t('cancel')}</Button>
					<Button>{t('save')}</Button>
				</div>
			</div> */}
		</HDialogHeadless>
	)
	// return (
	// 	<Modal
	// 		lazy
	// 		isOpen={isOpen}
	// 		onClose={onCloseCardModal}
	// 	>
	// 		<div
	// 			className={cls.cardModal}
	// 		>
	// 			<VStack
	// 				className={cls.mainContent}
	// 				max
	// 				align='left'
	// 				gap='gap_32'
	// 			>
	// 				<HStack
	// 					className={cls.shelvesAndBoxesWrapper}
	// 					max
	// 				>
	// 					{shelvesAndBoxes}
	// 				</HStack>
	// 				<div>
	// 					<MyText text={'question'} />
	// 					<TextArea
	// 						rows={5}
	// 						value={questionTextCardModal}
	// 						onChangeString={onChangeQuestion}
	// 					/>
	// 				</div>
	// 				<div>
	// 					<MyText text={'answer'} />
	// 					<TextArea
	// 						rows={5}
	// 						value={answerTextCardModal}
	// 						onChangeString={onChangeAnswer}
	// 					/>
	// 				</div>

	// 			</VStack>
	// 			<div className={cls.actions} >
	// 				<Button>{t('Назад')}</Button>
	// 				<Button>{t('Сохранить')}</Button>
	// 			</div>
	// 		</div>
	// 	</Modal>
	// )
})
BoxesSettingsModal.displayName = 'BoxesSettingsModal'