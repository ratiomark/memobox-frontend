import clsx from 'clsx'
import cls from './LoginForm.module.scss'
import { TEST_INPUTS_IDS } from '@/shared/const/testConsts';
import { Input } from '@/shared/ui/Input/Input';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Icon } from '@/shared/ui/Icon';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getLoginEmail, getLoginPassword } from '../../Model/selectors/getLoginState/getLoginState';
import { loginActions } from '../../Model/slice/loginSlice';
import EyeIcon from '@/shared/assets/icons/eye2.svg'

interface EmailAndPasswordProps {
	className?: string;
}

export const EmailAndPassword = (props: EmailAndPasswordProps) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const email = useSelector(getLoginEmail)
	const password = useSelector(getLoginPassword)
	const [isShowPassword, setIsShowPassword] = useState(false)

	const onClickShowPassword = () => setIsShowPassword(prev => !prev)

	const onChangeEmail = useCallback((value: string) => {
		dispatch(loginActions.setEmail(value))
	}, [dispatch])

	const onChangePassword = useCallback((value: string) => {
		dispatch(loginActions.setPassword(value))
	}, [dispatch])

	// const togglePasswordVisibilityIcon = <Icon
	// 	className={cls.icon}
	// 	Svg={EyeIcon}
	// 	clickable
	// 	onClick={onClickShowPassword}
	// // width={iconSizeBox}
	// // height={iconSizeBox}
	// />
	return (
		<>
			<label className={cls.label} htmlFor='email'>
				{t('email')}
			</label>
			<Input
				autoFocus
				type='text'
				id='email'
				data-testid={TEST_INPUTS_IDS.authInputEmail}
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
					data-testid={TEST_INPUTS_IDS.authInputPassword}
					value={password}
					onChangeString={onChangePassword}
				/>
				<Icon
					className={cls.icon}
					Svg={EyeIcon}
					clickable
					onClick={onClickShowPassword}
				// width={iconSizeBox}
				// height={iconSizeBox}
				/>
			</div>
		</>
	)
}