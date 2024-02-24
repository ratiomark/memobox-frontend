import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
	getLoginError,
	getLoginIsLoading,
	getLoginPassword,
	getLoginEmail,
} from '../../Model/selectors/getLoginState/getLoginState'
import { loginActions, loginReducer } from '../../Model/slice/loginSlice'
import cls from './LoginForm.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'

import { getUserAuthData, loginUserByEmailThunk } from '@/entities/User'
import {
	ReducersList,
	useAsyncReducer,
} from '@/shared/lib/helpers/hooks/useAsyncReducer'
import { MyText } from '@/shared/ui/Typography'
import clsx from 'clsx'
import { HStack } from '@/shared/ui/Stack'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import EyeIcon from '@/shared/assets/icons/eye2.svg'
import { Icon } from '@/shared/ui/Icon'
import { ForgotPasswordModal } from '../ForgotPasswordModal/ForgotPasswordModal'
import { useNavigate } from 'react-router-dom'
import { AlreadyAuthScreen } from './AlreadyAuthScreen'
import { KEY_USER_REFRESH_TOKEN_LOCAL_STORAGE } from '@/shared/const/localStorage'
import { isRefreshResponse } from '@/shared/api/helpers/checkResponse'

export interface LoginFormProps {
	className?: string
	isOpen?: boolean
	onSuccess: () => void;
}

// Отдельно выносим редьюсеры от комопнента, чтобы лишний раз не создавать объект с редьюсерами, если так не сделать, то каждый раз при монтировании компонента LoginForm будет создаваться новый объект с редьюсерами и передаваться в хук, лучше сделать такой объект один раз
// const initialReducers: ReducersList = {
// 	loginForm: loginReducer,
// }

// eslint-disable-next-line
const LoginForm = memo(() => {
	// const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	// const { dispatch, store } = useAsyncReducer({
	// 	reducers: initialReducers,
	// 	removeAfterUnmount: false,
	// })
	// const auth = useSelector(getUserAuthData)
	const navigate = useNavigate();

	// useEffect(() => {
	// 	if (auth) {
	// 		navigate('/')
	// 	}
	// }, [auth, navigate])

	const email = useSelector(getLoginEmail)
	const password = useSelector(getLoginPassword)
	const isLoading = useSelector(getLoginIsLoading)
	const error = useSelector(getLoginError)
	const [isShowPassword, setIsShowPassword] = useState(false)

	const onChangeEmail = useCallback((value: string) => {
		dispatch(loginActions.setEmail(value))
	}, [dispatch])

	const onChangePassword = useCallback((value: string) => {
		dispatch(loginActions.setPassword(value))
	}, [dispatch])

	const onSwitchToRegister = useCallback(() => {
		dispatch(loginActions.setIsLoginProcess(false))
	}, [dispatch])

	const onClickLoginButton = useCallback(async () => {
		// console.log(email, password)
		const res = await dispatch(loginUserByEmailThunk({ email, password }))
		// console.log(res)
		if (res && res.payload && isRefreshResponse(res.payload) && res.meta.requestStatus === 'fulfilled') {
			navigate('/')
		}
	}, [dispatch, email, password, navigate])

	const onForgotPasswordClick = useCallback(() => {
		dispatch(loginActions.setIsForgotPasswordModal(true))
	}, [dispatch])

	const onClickShowPassword = () => setIsShowPassword(prev => !prev)

	const togglePasswordVisibilityIcon = <Icon
		className={cls.icon}
		Svg={EyeIcon}
		clickable
		onClick={onClickShowPassword}
	// width={iconSizeBox}
	// height={iconSizeBox}
	/>

	// if (auth) {
	// 	return <AlreadyAuthScreen />
	// }

	return (
		<>

			<div className={cls.wrapper} >
				<div className={clsx(cls.LoginForm)}>
					{/* <MyText text={t('login form in modal')} /> */}

					<div className={cls.inputWrapper}>
						{error && <MyText text={error} variant='error' />}

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
						<div className={cls.passwordWrapper} >
							<Input
								type={isShowPassword ? 'text' : 'password'}

								id='password'
								value={password}
								onChangeString={onChangePassword}
							// addonRight={togglePasswordVisibilityIcon}
							/>
							{togglePasswordVisibilityIcon}
						</div>
						{/* <HStack max align='center' justify='center'> */}

						{/* <GetMeButton /> */}
						<Button
							variant='filled'
							size='size_m'
							className={cls.loginBtn}
							onClick={onClickLoginButton}
							disabled={isLoading}
						>
							{t('sign in')}
						</Button>
						{/* </HStack> */}
						<div>
							<MyText
								className={cls.forgetLink}
								as={'span'}
								onClick={onForgotPasswordClick}
								text={t('Забыли пароль?')}
							/>
						</div>
						<div>
							<MyText
								className={cls.textBeforeLinkButton}
								as={'span'}
								text={t('do not have account')}
							/>
							<MyText
								className={cls.linkButton}
								as={'span'}
								onClick={onSwitchToRegister}
								text={t('go to sign in')}
							/>
						</div>
					</div>
				</div>
			</div>
			<ForgotPasswordModal />
		</>
	)
})

export default LoginForm
