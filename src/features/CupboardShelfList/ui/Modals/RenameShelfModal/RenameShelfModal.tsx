import { useTranslation } from 'react-i18next';
import cls from './RenameShelfModal.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { useEffect, useState } from 'react';
import { Heading } from '@/shared/ui/Typography';
import { useSelector } from 'react-redux';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { cupboardShelfListActions } from '../../../model/slice/cupboardShelfListSlice';
import { getRenameShelfModalIsOpen, getRenameShelfModalShelfTitle, getRenameShelfModalShelfId, getRenameShelfModalRequestStatus } from '../../../model/selectors/getRenameShelfModal';
import { getCreateNewShelfModalShelvesTitles } from '../../../model/selectors/getCreateNewShelfModal';
import { getShelfTitleByShelfId } from '../../../model/selectors/getCupboardShelfList';
import { renameShelfThunk } from '../../../model/services/renameShelfThunk';


export const RenameShelfModal = () => {
	const { t } = useTranslation()
	const isOpen = useSelector(getRenameShelfModalIsOpen)
	const shelfTitleRedux = useSelector(getRenameShelfModalShelfTitle)
	const shelfId = useSelector(getRenameShelfModalShelfId)
	const shelfNames = useSelector(getCreateNewShelfModalShelvesTitles)
	const renameShelfRequestStatus = useSelector(getRenameShelfModalRequestStatus)
	const [inputErrors, setInputErrors] = useState([])
	const dispatch = useAppDispatch()
	const currentShelfTitle = useSelector(getShelfTitleByShelfId(shelfId)) as string
	// const [open, setOpen] = useState(false);

	useEffect(() => {
		if (currentShelfTitle) {
			dispatch(cupboardShelfListActions.setRenameShelfModalTitle(currentShelfTitle))
		}
	}, [dispatch, currentShelfTitle])


	const onChangeShelfName = (shelfTitle: string) => {
		dispatch(cupboardShelfListActions.setRenameShelfModalTitle(shelfTitle))
		if (shelfNames?.includes(shelfTitle)) setInputErrors([t('inputs.SHELF_NAME_ALREADY_EXISTS')])
		else setInputErrors([])
	}

	const onRenameShelf = () => {
		dispatch(renameShelfThunk({ shelfId, currentShelfTitle, title: shelfTitleRedux }))
		dispatch(cupboardShelfListActions.setIsRenameShelfModalOpen(false))
	}

	// const onCreateNewShelf = () => {
	// 	// setOpen(true)
	// 	dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('pending'))
	// 	setTimeout(() => {
	// 		dispatch(createNewShelfThunk(shelfName))
	// 	}, 4000)
	// 	dispatch(cupboardShelfListActions.setIsCreateNewShelfModalOpen(false))
	// 	// dispatch(cupboardShelfListActions.setIsCreateNewShelfModalOpen(false))
	// }

	const onClose = () => {
		dispatch(cupboardShelfListActions.setIsRenameShelfModalOpen(false))
	}

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={onRenameShelf}
			isSubmitDisabled={shelfTitleRedux.length === 0 || inputErrors.length > 0 || shelfTitleRedux === currentShelfTitle}
		>
			<div className={cls.CreateNewShelfModal}>
				<Heading as='h2' className={cls.title} title={t('write shelf name')} />
				<Input
					value={shelfTitleRedux}
					onChangeString={onChangeShelfName}
					inputErrors={inputErrors}
					className={cls.input}
					classNameInputError={cls.inputError}
				/>

				{/* <Toast.Root open={open} duration={5000}>


					<Toast.Title>Заголовок Тоста</Toast.Title>
					<Toast.Description>Описание Тоста</Toast.Description>
				</Toast.Root> */}
				<ModalButtons
					onClose={onClose}
					onSubmit={onRenameShelf}
					isSubmitDisabled={shelfTitleRedux.length === 0 || inputErrors.length > 0 || shelfTitleRedux === currentShelfTitle}
					justify='end'
					gap='gap_14'
				/>
			</div>
		</HDialogHeadless>
	)
}