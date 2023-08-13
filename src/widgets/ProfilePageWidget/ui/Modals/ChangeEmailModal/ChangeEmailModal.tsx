import clsx from 'clsx'
import cls from './ChangeEmailModal.module.scss'
import { HDialog } from '@/shared/ui/HDialog';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { getIsChangeEmailModalOpen, getIsChangeNameModalOpen } from '../../../model/selectors/getProfilePageModals';
import { profilePageWidgetActions } from '../../../model/slice/profilePageWidgetSlice';
import { Input } from '@/shared/ui/Input/Input';
import { ModalButtons } from '@/shared/ui/ModalButtons';
import { Heading, MyText } from '@/shared/ui/Typography';
import { t } from 'i18next';
import { getUserEmail, getUserEmailVerified, getUserName, getUserShelfNamesList } from '@/entities/User';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack } from '@/shared/ui/Stack';
import { CheckBox } from '@/shared/ui/CheckBox';
import { Button } from '@/shared/ui/Button';

interface ChangeEmailModalProps {
	className?: string;
}

export const ChangeEmailModal = (props: ChangeEmailModalProps) => {
	const {
		className,
	} = props
	const { t } = useTranslation('profile')
	const isOpen = useSelector(getIsChangeEmailModalOpen)
	const email = useSelector(getUserEmail)
	const isEmailVerified = useSelector(getUserEmailVerified)
	const [emailLocal, setEmailLocal] = useState(email)
	const [password, setPassword] = useState('')
	const [inputErrors, setInputErrors] = useState([])
	const [passwordInputErrors, setPasswordInputErrors] = useState([])
	const [showPassword, setShowPassword] = useState(true)
	const dispatch = useAppDispatch()
	const [currentMode, setCurrentMode] = useState<
		| 'checking password'
		| 'editing email'
		| 'process completed'>('checking password')

	const toggleShowPassword = () => setShowPassword(prev => !prev)

	const onChangeEmailLocal = (value: string) => {
		// VAR: валидация мейла
		setEmailLocal(value)
		if (!value) setInputErrors([t('inputs.INPUT_CANNOT_BE_EMPTY')])
		else if (value === email) setInputErrors([t('inputs.ENTER_NEW_EMAIL')])
		else setInputErrors([])
	}

	const onChangePassword = (value: string) => {
		setPassword(value)
		if (!value) setPasswordInputErrors([t('inputs.INPUT_CANNOT_BE_EMPTY')])
		else setPasswordInputErrors([])
	}

	const onCloseHandle = () => {
		setInputErrors([])
		setPasswordInputErrors([])
		setEmailLocal(email)
		setPassword('')
		setCurrentMode('checking password')
		dispatch(profilePageWidgetActions.setIsChangeEmailModalOpen(false))
	}

	const onSubmitPassword = () => {
		//VAR: запрос на сервер для проверки пароля
		setCurrentMode('editing email')
		// else setCurrentMode('checking password')
	}

	const onSubmitEmail = () => {
		//VAR: запрос на сервер для обновления мейла
		setCurrentMode('process completed')
	}

	const emailEditBlock = (
		<>
			<Heading as='h2' className={cls.title} title={t('write your new email')} />
			<Input
				value={emailLocal}
				onChangeString={onChangeEmailLocal}
				// placeholder='emailExample@gmail.com'
				inputErrors={inputErrors}
				className={cls.input}
				classNameInputError={cls.inputError}
				autoFocus
			/>

			<ModalButtons
				onClose={onCloseHandle}
				onSubmit={onSubmitEmail}
				isSubmitDisabled={emailLocal === '' || inputErrors.length > 0}
				justify='end'
				gap='gap_14'
			/>
		</>)

	const enterPasswordBlock = (
		<div className={cls.enterPasswordBlock} >
			<Heading as='h2' className={cls.title} title={t('write password to change email')} />
			<Input
				type={showPassword ? 'text' : 'password'}
				value={password}
				onChangeString={onChangePassword}
				inputErrors={passwordInputErrors}
				className={cls.input}
				classNameInputError={cls.inputError}
			/>
			<HStack max justify='between' className={cls.passwordContent} >
				<HStack gap='gap_8'>
					<CheckBox isChecked={showPassword} onClick={toggleShowPassword} />
					<MyText onClick={toggleShowPassword} text={t('show password')} className={cls.showPasswordText} />
				</HStack>
				<MyText text={t('forget password')} className={cls.forgetPassword} />
			</HStack>
			<ModalButtons
				onClose={onCloseHandle}
				textSubmitButton={t('continue')}
				isSubmitDisabled={!password}
				onSubmit={onSubmitPassword}
			/>
		</div>

	)

	const emailChangedBlock = (
		<>
			<Heading
				as='h2'
				align='center'
				variant='accent'
				className={cls.emailChangedTitle}
				title={t('email changed title')}
			/>

			<MyText text={t('email changed description text 1')} className={cls.emilChangedText} />
			<MyText text={`* ${t('email changed description text 2')}`} className={cls.emilChangedText} />
			<MyText text={t('email changed description text 3')} className={cls.emilChangedText} />
			<HStack max justify='center'>
				<Button onClick={onCloseHandle}>{t('close modal')}</Button>
			</HStack>
		</>
	)

	let content;
	if (currentMode === 'checking password') {
		content = enterPasswordBlock
	} else if (currentMode === 'editing email') {
		content = emailEditBlock
	} else {
		content = emailChangedBlock
	}

	const onSubmitHandler = () => {
		switch (currentMode) {
			case 'checking password':
				onSubmitPassword()
				break;
			case 'editing email':
				onSubmitEmail()
				break;
			case 'process completed':
				onCloseHandle()
		}
	}

	// const content = checkedByPassword ? emailEditBlock : enterPasswordBlock

	return (
		<HDialog
			isOpen={isOpen}
			onClose={onCloseHandle}
			onSubmit={onSubmitHandler}
		>
			<div className={clsx(
				cls.changeNameModal,
				className)}
			>
				{/* {emailChangedBlock} */}
				{content}
				{/* "write password to change email": "Введите пароль от вашего аккаунта, чтобы изменить текущий email",
				{/* "forget password": "Забыли пароль?", */}
				{/* "show password": "Показывать символы", */}
				{/* "write password placeholder": "Показывать символы" */}
				{/* <ModalButtons
					onClose={onCloseHandle}

				/> */}
			</div>

		</HDialog>

	)
}