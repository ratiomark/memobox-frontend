import { useTranslation } from 'react-i18next';
import cls from './CreateNewShelfModal.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { useState } from 'react';
import { Heading } from '@/shared/ui/Typography';
import { useSelector } from 'react-redux';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import {
	createNewShelfThunk,
	cupboardShelfListActions,
	getCreateNewShelfModalIsOpen,
	getCreateNewShelfModalShelfTitle,
	getCreateNewShelfModalShelvesTitles,
} from '@/features/CupboardShelfList'



export const CreateNewShelfModal = () => {
	const { t } = useTranslation()
	const isOpen = useSelector(getCreateNewShelfModalIsOpen)
	const shelfName = useSelector(getCreateNewShelfModalShelfTitle)
	const shelfNames = useSelector(getCreateNewShelfModalShelvesTitles)
	const [inputErrors, setInputErrors] = useState([])
	const dispatch = useAppDispatch()

	const onChangeShelfName = (shelfTitle: string) => {
		dispatch(cupboardShelfListActions.setCreateNewShelfModalTitle(shelfTitle))
		if (shelfNames?.includes(shelfTitle)) setInputErrors([t('inputs.SHELF_NAME_ALREADY_EXISTS')])
		else setInputErrors([])
	}

	const onCreateNewShelf = () => {
		dispatch(createNewShelfThunk(shelfName))
		dispatch(cupboardShelfListActions.setIsCreateNewShelfModalOpen(false))
	}

	const onClose = () => {
		dispatch(cupboardShelfListActions.setIsCreateNewShelfModalOpen(false))
	}

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={onCreateNewShelf}
		>
			<div className={cls.CreateNewShelfModal}>
				<Heading as='h2' className={cls.title} title={t('write shelf name')} />
				<Input
					value={shelfName}
					onChangeString={onChangeShelfName}
					inputErrors={inputErrors}
					className={cls.input}
					classNameInputError={cls.inputError}
				/>
				<ModalButtons
					onClose={onClose}
					onSubmit={onCreateNewShelf}
					isSubmitDisabled={shelfName.length === 0 || inputErrors.length > 0}
					justify='end'
					gap='gap_14'
				/>
			</div>
		</HDialogHeadless>
	)
}