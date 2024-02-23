import {
	getLoginError,
	getLoginIsLoading,
	getLoginPassword,
	getLoginEmail,
	getLoginUserName,
} from '../../Model/selectors/getLoginState/getLoginState'
import { loginActions } from '../../Model/slice/loginSlice'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import cls from './LoginForm.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import clsx from 'clsx'
import { MyText } from '@/shared/ui/Typography'
import { registerByEmailThunk } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'

export interface LoginFormProps {
	className?: string
	isOpen?: boolean
	onSuccess: () => void;
}

const RegisterForm = memo(() => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const email = useSelector(getLoginEmail)
	const userName = useSelector(getLoginUserName)
	const password = useSelector(getLoginPassword)
	const isLoading = useSelector(getLoginIsLoading)
	const error = useSelector(getLoginError)

	const onChangeEmail = useCallback((value: string) => {
		dispatch(loginActions.setEmail(value))
	}, [dispatch])

	const onChangePassword = useCallback((value: string) => {
		dispatch(loginActions.setPassword(value))
	}, [dispatch])

	const onChangeUserName = useCallback((value: string) => {
		dispatch(loginActions.setUserName(value))
	}, [dispatch])

	const onSwitchToLogin = useCallback(() => {
		dispatch(loginActions.setIsLoginProcess(true))
	}, [dispatch])

	const onClickRegisterButton = useCallback(async () => {
		dispatch(registerByEmailThunk({ email, password, name: userName }))
	}, [dispatch, email, password, userName])

	// const onMeClick = useCallback(async () => {
	// 	dispatch(registerByEmailThunk({ email, password }))
	// }, [dispatch, email, password])

	return (
		<div className={cls.wrapper} >

			<div className={clsx(cls.LoginForm)}>
				{/* <MyText align='center' text={t('Регистрация')} /> */}
				{/* <MyText text={t('regiset form in modal')} /> */}

				<div className={cls.inputWrapper}>
					{error && <MyText text={error} variant='error' />}

					<label className={cls.label} htmlFor='userName'>
						{t('name')}
					</label>
					<Input
						autoFocus
						type='text'
						id='userName'
						value={userName}
						onChangeString={onChangeUserName}
					/>
					<label className={cls.label} htmlFor='email'>
						{t('email')}
					</label>
					<Input
						autoFocus
						type='text'
						id='email'
						value={email}
						onChangeString={onChangeEmail}
					/>
					<label className={cls.label} htmlFor='password'>
						{t('password')}
					</label>
					<Input
						type='password'
						id='password'
						value={password}
						onChangeString={onChangePassword}
					/>
					{/* <HStack className={cls.class}  max justify='center'> */}

					{/* <GetMeButton /> */}
					<Button
						variant='filled'
						size='size_m'
						className={cls.loginBtn}
						onClick={onClickRegisterButton}
						disabled={isLoading}
					>
						{t('sign up')}
					</Button>
					{/* </HStack> */}
					<div>
						<MyText
							className={cls.textBeforeLinkButton}
							as={'span'}
							text={t('have account')}
						/>
						<MyText
							className={cls.linkButton}
							as={'span'}
							onClick={onSwitchToLogin}
							text={t('go to sign up')}
						/>
					</div>
				</div>
			</div>
		</div>
	)
})

export default RegisterForm
