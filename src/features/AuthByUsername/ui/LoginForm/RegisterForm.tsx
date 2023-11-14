import {
	getLoginError,
	getLoginIsLoading,
	getLoginPassword,
	getLoginUsername,
} from '../../Model/selectors/getLoginState/getLoginState'
import { loginActions, loginReducer } from '../../Model/slice/loginSlice'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import cls from './LoginForm.module.scss'
// import { loginUserByUserName } from '../../Model/services/loginByUserName/loginUserByUserName'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'

import {
	ReducersList,
	useAsyncReducer,
} from '@/shared/lib/helpers/hooks/useAsyncReducer'
import clsx from 'clsx'
import { MyText } from '@/shared/ui/Typography'
import { registerUserByUserName } from '@/entities/User'
import { HStack } from '@/shared/ui/Stack'
import { GetMeButton } from './GetMeButton'

export interface LoginFormProps {
	className?: string
	isOpen?: boolean
	onSuccess: () => void;
}

const initialReducers: ReducersList = {
	loginForm: loginReducer,
}

const RegisterForm = memo(() => {
	const { t } = useTranslation()
	const { dispatch, store } = useAsyncReducer({
		reducers: initialReducers,
	})
	const email = useSelector(getLoginUsername)
	const password = useSelector(getLoginPassword)
	const isLoading = useSelector(getLoginIsLoading)
	const error = useSelector(getLoginError)

	const onChangeEmail = useCallback((value: string) => {
		dispatch(loginActions.setEmail(value))
	}, [dispatch])

	const onChangePassword = useCallback((value: string) => {
		dispatch(loginActions.setPassword(value))
	}, [dispatch])

	const onClickRegisterButton = useCallback(async () => {
		dispatch(registerUserByUserName({ email, password }))
	}, [dispatch, email, password])

	// const onMeClick = useCallback(async () => {
	// 	dispatch(registerUserByUserName({ email, password }))
	// }, [dispatch, email, password])

	return (
		<div className={cls.wrapper} >

			<div className={clsx(cls.LoginForm)}>
				<MyText text={t('Регистрация в системе')} />
				{/* <MyText text={t('regiset form in modal')} /> */}

				<div className={cls.inputWrapper}>
					{error && <MyText text={error} variant='error' />}

					<label className={cls.label} htmlFor='userName'>
						{t('enter email')}
					</label>
					<Input
						autoFocus
						type='text'
						id='userName'
						value={email}
						onChangeString={onChangeEmail}
					/>
					<label className={cls.label} htmlFor='password'>
						{t('enter password')}
					</label>
					<Input
						type='text'
						id='password'
						value={password}
						onChangeString={onChangePassword}
					/>
					<HStack max justify='between'>

						<GetMeButton />
						<Button
							variant='outline'
							size='size_m'
							className={cls.loginBtn}
							onClick={onClickRegisterButton}
							disabled={isLoading}
						>
							{t('log in')}
						</Button>
					</HStack>
				</div>
			</div>
		</div>
	)
})

export default RegisterForm
