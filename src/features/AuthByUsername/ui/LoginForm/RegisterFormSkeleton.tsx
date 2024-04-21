import cls from './LoginForm.module.scss'
import { DefaultButtonSkeleton, Skeleton } from '@/shared/ui/Skeleton'

export const RegisterFormSkeleton = () => {


	return (
		<div className={cls.skeletonWrapper} >

			<div className={cls.LoginFormSkeleton}>
				<div className={cls.inputWrapper}>
					<Skeleton height={24} width={'20%'} className={cls.label} />
					<Skeleton height={40} />
					<Skeleton height={24} width={'25%'} className={cls.label} />
					<Skeleton height={40} />
					<Skeleton height={24} width={'20%'} className={cls.label} />
					<Skeleton height={40} />
					<DefaultButtonSkeleton className={cls.loginBtnSkeleton} />
					{/* <Button
						type='submit'
						variant='filled'
						size='size_m'
						className={cls.loginBtn}
						// onClick={onClickRegisterButton}
						disabled={false}
						data-testid={TEST_BUTTONS_IDS.registerButton}
					>
						Зарегистрироваться
					</Button>
					<div>
						<MyText
							className={cls.textBeforeLinkButton}
							as={'span'}
							text='Зарегистрироваться'
						/>
						<MyText
							className={cls.linkButton}
							as={'span'}
							onClick={() => { }}
							data-testid={TEST_BUTTONS_IDS.goToLogin}
							text='Зарегистрироваться'
						/>
					</div> */}
				</div>
			</div>
		</div>
	)
}

// import {
// 	getLoginError,
// 	getLoginIsLoading,
// 	getLoginPassword,
// 	getLoginEmail,
// 	getLoginUserName,
// } from '../../Model/selectors/getLoginState/getLoginState'
// import { loginActions } from '../../Model/slice/loginSlice'
// import { FormEvent, memo, useCallback, useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useSelector } from 'react-redux'
// import cls from './LoginForm.module.scss'
// import { Button } from '@/shared/ui/Button/Button'
// import { Input } from '@/shared/ui/Input/Input'
// import clsx from 'clsx'
// import { MyText } from '@/shared/ui/Typography'
// import { getUserAuthData, registerByEmailThunk } from '@/entities/User'
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
// import { Icon } from '@/shared/ui/Icon'
// import EyeIcon from '@/shared/assets/icons/eye2.svg'
// import { TEST_BUTTONS_IDS, TEST_INPUTS_IDS } from '@/shared/const/testConsts'
// import { EmailAndPassword } from './EmailAndPassword'
// // import { AlreadyAuthScreen } from './AlreadyAuthScreen'

// export interface LoginFormProps {
// 	className?: string
// 	isOpen?: boolean
// 	onSuccess: () => void;
// }

// const RegisterForm = memo(() => {
// 	const { t } = useTranslation()
// 	const dispatch = useAppDispatch()
// 	const email = useSelector(getLoginEmail)
// 	const firstName = useSelector(getLoginUserName)
// 	const password = useSelector(getLoginPassword)
// 	const isLoading = useSelector(getLoginIsLoading)
// 	const error = useSelector(getLoginError)

// 	// const [isShowPassword, setIsShowPassword] = useState(false)

// 	// const onChangeEmail = useCallback((value: string) => {
// 	// 	dispatch(loginActions.setEmail(value))
// 	// }, [dispatch])

// 	// const onChangePassword = useCallback((value: string) => {
// 	// 	dispatch(loginActions.setPassword(value))
// 	// }, [dispatch])

// 	const onChangeUserName = useCallback((value: string) => {
// 		dispatch(loginActions.setUserName(value))
// 	}, [dispatch])

// 	const onSwitchToLogin = useCallback(() => {
// 		dispatch(loginActions.setIsLoginProcess(true))
// 	}, [dispatch])

// 	const onSubmitRegister = (e: void | FormEvent<HTMLFormElement>) => {
// 		if (e) e.preventDefault()
// 		onClickRegisterButton()
// 	}
// 	const onClickRegisterButton = () => {
// 		dispatch(registerByEmailThunk({ email, password, name: firstName }))
// 	}


// 	// const onMeClick = useCallback(async () => {
// 	// 	dispatch(registerByEmailThunk({ email, password }))
// 	// }, [dispatch, email, password])
// 	// const onClickShowPassword = () => setIsShowPassword(prev => !prev)

// 	// if (auth) {
// 	// 	return <AlreadyAuthScreen />
// 	// }

// 	return (
// 		<div className={cls.wrapper} >

// 			<form className={clsx(cls.LoginForm)} onSubmit={onSubmitRegister}>
// 				{/* <MyText align='center' text={t('Регистрация')} /> */}
// 				{/* <MyText text={t('regiset form in modal')} /> */}

// 				<div className={cls.inputWrapper}>
// 					{error && <MyText text={error} variant='error' />}

// 					<label className={cls.label} htmlFor='firstName'>
// 						{t('name')}
// 					</label>
// 					<Input
// 						autoFocus
// 						type='text'
// 						id='firstName'
// 						data-testid={TEST_INPUTS_IDS.registerInputFirstName}
// 						value={firstName}
// 						onChangeString={onChangeUserName}
// 					/>
// 					<EmailAndPassword />
// 					{/* <label className={cls.label} htmlFor='email'>
// 						{t('email')}
// 					</label>
// 					<Input
// 						autoFocus
// 						type='text'
// 						id='email'
// 						data-testid={TEST_INPUTS_IDS.registerInputEmail}
// 						value={email}
// 						onChangeString={onChangeEmail}
// 					/>
// 					<label className={cls.label} htmlFor='password'>
// 						{t('password')}
// 					</label>
// 					<div className={cls.passwordWrapper} >
// 						<Input
// 							type={isShowPassword ? 'text' : 'password'}
// 							id='password'
// 							data-testid={TEST_INPUTS_IDS.registerInputPassword}
// 							value={password}
// 							onChangeString={onChangePassword}
// 						/>
// 						{togglePasswordVisibilityIcon}
// 					</div> */}
// 					{/* <HStack className={cls.class}  max justify='center'> */}

// 					{/* <GetMeButton /> */}
// 					<Button
// 						type='submit'
// 						variant='filled'
// 						size='size_m'
// 						className={cls.loginBtn}
// 						// onClick={onClickRegisterButton}
// 						disabled={isLoading}
// 						data-testid={TEST_BUTTONS_IDS.registerButton}
// 					>
// 						{t('sign up')}
// 					</Button>
// 					{/* </HStack> */}
// 					<div>
// 						<MyText
// 							className={cls.textBeforeLinkButton}
// 							as={'span'}
// 							text={t('have account')}
// 						/>
// 						<MyText
// 							className={cls.linkButton}
// 							as={'span'}
// 							onClick={onSwitchToLogin}
// 							data-testid={TEST_BUTTONS_IDS.goToLogin}
// 							text={t('go to sign in')}
// 						/>
// 					</div>
// 				</div>
// 			</form>
// 		</div>
// 	)
// })

// export default RegisterForm
