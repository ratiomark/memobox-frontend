import { useTranslation } from 'react-i18next';
import cls from './CreateNewShelfModal.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { Dispatch, SetStateAction, useState } from 'react';
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
import { TEST_INPUTS_IDS } from '@/shared/const/testConsts';
import { rtkCreateNewShelf } from '@/entities/Shelf';
import { toastsActions } from '@/shared/ui/Toast';
import { sleep } from '@/shared/lib/helpers/common/sleep';
import { updateJsonSettingsThunk, userActions } from '@/entities/User';

interface CreateNewShelfModalProps {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	setIsShelfCreated: Dispatch<SetStateAction<boolean>>
	isLoading: boolean
	setIsLoading: Dispatch<SetStateAction<boolean>>
}
const CreateNewShelfModal = ({ isOpen, setIsOpen, setIsShelfCreated, isLoading, setIsLoading }: CreateNewShelfModalProps) => {
	const { t } = useTranslation()
	// const [isOpen, setIsOpen] = useState(false)
	// const [inputErrors, setInputErrors] = useState([])
	const [shelfName, setShelfName] = useState('')
	const dispatch = useAppDispatch()

	const onChangeShelfName = (shelfTitle: string) => {
		setShelfName(shelfTitle)
	}

	const onCreateNewShelf = async () => {
		onClose()
		setIsLoading(true)
		dispatch(
			toastsActions.addToast({
				id: shelfName,
				toast: {
					status: 'pending',
					messageLoading: t('toast:messageLoading'),
					messageError: t('toast:messageError'),
					messageSuccess: t('toast:create_new_shelf.messageSuccess'),
					contentCommon: t('toast:create_new_shelf.additional'),
				},
			})
		)
		await sleep(2)
		try {
			const response = await dispatch(rtkCreateNewShelf(shelfName)).unwrap()
			if (!response) {
				throw new Error()
			}
			setIsShelfCreated(true)
			// dispatch(rtkApi.util.invalidateTags([TAG_VIEW_PAGE, TAG_TRASH_PAGE]))
			dispatch(userActions.updateJsonSettings({ hasCreatedFirstShelf: true }))
			await dispatch(updateJsonSettingsThunk())
			dispatch(toastsActions.updateToastById({ id: shelfName, toast: { status: 'success' } }))
			setIsLoading(false)
		} catch (err) {
			setIsLoading(false)
			console.log(err)
		}
	}

	const onClose = () => {
		setIsOpen(false)
		// dispatch(cupboardShelfListActions.setIsCreateNewShelfModalOpen(false))
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
					className={cls.input}
					classNameInputError={cls.inputError}
					data-testid={TEST_INPUTS_IDS.createNewShelfModalInput}
				/>
				<ModalButtons
					onClose={onClose}
					onSubmit={onCreateNewShelf}
					isSubmitDisabled={shelfName.length === 0}
					justify='end'
					gap='gap_14'
				/>
			</div>
		</HDialogHeadless>
	)
}

export default CreateNewShelfModal;