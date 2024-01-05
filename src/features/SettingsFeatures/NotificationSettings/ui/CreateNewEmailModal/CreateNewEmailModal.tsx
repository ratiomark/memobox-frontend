import { useTranslation } from 'react-i18next';
import cls from './CreateNewEmailModal.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { useState } from 'react';
import { Heading } from '@/shared/ui/Typography';
import { useSelector } from 'react-redux';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { HDialogHeadless } from '@/shared/ui/HDialog/HDialogHeadless';
import { Button } from '@/shared/ui/Button';
import * as Toast from '@radix-ui/react-toast';
import { getUserNotificationEmailList } from '@/entities/User';
import { getCreateNewEmailValue, getIsCreateNewEmailModalOpen } from '../../../model/selectors/getModals';
import { settingsFeaturesActions } from '../../../model/slice/settingsFeaturesSlice';
import { validateEmail } from '@/shared/lib/helpers/validation/validateEmail';


export const CreateNewEmailModal = () => {
	const { t } = useTranslation()
	const { t: t2 } = useTranslation('settings')
	const isOpen = useSelector(getIsCreateNewEmailModalOpen)
	const email = useSelector(getCreateNewEmailValue)
	const notificationEmailList = useSelector(getUserNotificationEmailList)
	const emailsFromStore = notificationEmailList?.map(emailObj => emailObj.email) ?? []
	const [emailWasValidated, setEmailWasValidated] = useState(false)
	const [inputErrors, setInputErrors] = useState([])
	const dispatch = useAppDispatch()
	// const [open, setOpen] = useState(false);

	const onChangeShelfName = (emailValue: string) => {
		dispatch(settingsFeaturesActions.setCreateNewEmailValue(emailValue))
		if (emailsFromStore?.includes(emailValue)) setInputErrors([t('inputs.SHELF_NAME_ALREADY_EXISTS')])
		else setInputErrors(inputErrors.filter(errorText => errorText !== t('inputs.SHELF_NAME_ALREADY_EXISTS')))
		if (emailWasValidated) {
			onValidate(emailValue)
		}
	}

	const onValidate = (emailValue: string) => {
		if (!validateEmail(emailValue)) {
			setInputErrors([t('inputs.INVALID_EMAIL')])
			setEmailWasValidated(true)
		}
		else setInputErrors(inputErrors.filter(errorText => errorText !== t('inputs.INVALID_EMAIL')))
	}

	const onCreateNewEmail = () => {
		// const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		// dispatch(createNewShelfThunk())
		dispatch(settingsFeaturesActions.setIsCreateNewEmailModalOpen(false))
		dispatch(settingsFeaturesActions.setIsManageEmailsModalOpen(true))
		// setOpen(true)
		// dispatch(cupboardShelfListActions.setCreateNewShelfModalRequestStatus('pending'))
		// setTimeout(() => {
		// }, 4000)
		// dispatch(cupboardShelfListActions.setIsCreateNewShelfModalOpen(false))
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
		dispatch(settingsFeaturesActions.setIsCreateNewEmailModalOpen(false))
		dispatch(settingsFeaturesActions.setIsManageEmailsModalOpen(true))
	}

	console.log('inputErrors  --  ', inputErrors.length)

	return (
		<HDialogHeadless
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={onCreateNewEmail}
		>
			<div className={cls.CreateNewEmailModal}>
				<Heading as='h2' className={cls.title} title={t2('write new notification email')} />
				<Input
					value={email}
					onChangeString={onChangeShelfName}
					inputErrors={inputErrors}
					className={cls.input}
					classNameInputError={cls.inputError}
					onValidate={onValidate}
				/>

				<ModalButtons
					onClose={onClose}
					onSubmit={onCreateNewEmail}
					textSubmitButton={t2('add notification email')}
					isSubmitDisabled={email.length === 0 || inputErrors.length > 0}
					justify='end'
					gap='gap_14'
				/>
			</div>
		</HDialogHeadless>
	)
}