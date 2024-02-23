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
import { HStack, VStack } from '@/shared/ui/Stack'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch'
import EyeIcon from '@/shared/assets/icons/eye2.svg'
import { Icon } from '@/shared/ui/Icon'
import { ForgotPasswordModal } from '../ForgotPasswordModal/ForgotPasswordModal'
import { useNavigate } from 'react-router-dom'

export interface LoginFormProps {
	className?: string
	isOpen?: boolean
	onSuccess: () => void;
}

// Отдельно выносим редьюсеры от комопнента, чтобы лишний раз не создавать объект с редьюсерами, если так не сделать, то каждый раз при монтировании компонента LoginForm будет создаваться новый объект с редьюсерами и передаваться в хук, лучше сделать такой объект один раз
// const initialReducers: ReducersList = {
// 	loginForm: loginReducer,
// }

export const AlreadyAuthScreen = () => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const navigate = useNavigate();

	const onClickMainPage = () => navigate('/')

	const onChangePassword = useCallback((value: string) => {
		dispatch(loginActions.setPassword(value))
	}, [dispatch])


	return (
		<div className={cls.wrapper} >
			<div className={clsx(cls.LoginForm)}>
				<VStack gap='gap_8' justify='center' align='center'>
					<MyText text={'Вы уже в системе'} variant='primary' />
					<Button
						variant='filled'
						size='size_m'
						className={cls.loginBtn}
						onClick={onClickMainPage}
					>
						{t('to main page')}
					</Button>
				</VStack>
			</div>
		</div>)
}



