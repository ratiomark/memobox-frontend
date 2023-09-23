import clsx from 'clsx'
import cls from './ChangePasswordModal.module.scss'
import { HDialog } from '@/shared/ui/HDialog';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { getIsChangePasswordModalOpen } from '../../../model/selectors/getProfilePageModals';
import { profilePageWidgetActions } from '../../../model/slice/profilePageWidgetSlice';
import { Input } from '@/shared/ui/Input/Input';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { Heading } from '@/shared/ui/Typography';
import { getUserName } from '@/entities/User';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ChangePasswordModalProps {
	className?: string;
}

export const ChangePasswordModal = (props: ChangePasswordModalProps) => {
	const {
		className,
	} = props
	const { t } = useTranslation('profile')
	const isOpen = useSelector(getIsChangePasswordModalOpen)
	const userName = useSelector(getUserName)
	const [userNameLocal, setUserNameLocal] = useState(userName)
	const [inputErrors, setInputErrors] = useState([])
	const dispatch = useAppDispatch()

	const onChangeUserLocalName = (value: string) => {
		setUserNameLocal(value)
		if (!value) setInputErrors([t('inputs.INPUT_CANNOT_BE_EMPTY')])
		else setInputErrors([])
	}
	// const onClose = () => dispatch(profilePageWidgetActions.setIsChangeNameModalOpen(false))

	const onCloseHandle = () => {
		setInputErrors([])
		setUserNameLocal(userName)
		dispatch(profilePageWidgetActions.setIsChangePasswordModalOpen(false))
	}

	return (
		<HDialog
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={() => alert('Сохраняю имя пользователя')}
		>
			<div className={clsx(
				cls.changeNameModal,
				className)}
			>
				<Heading as='h2' className={cls.title} title={t('write your name')} />
				<Input
					value={userNameLocal}
					onChangeString={onChangeUserLocalName}
					inputErrors={inputErrors}
					className={cls.input}
					classNameInputError={cls.inputError}
				/>

				<ModalButtons
					onClose={onCloseHandle}
					onSubmit={() => alert('Сохраняю нвоое имя')}
					isSubmitDisabled={userNameLocal === '' || inputErrors.length > 0}
					justify='end'
					gap='gap_14'
				/>
			</div>

		</HDialog>

	)
}