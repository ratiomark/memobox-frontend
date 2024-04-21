import { Page } from '@/widgets/Page'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'
import { Loader } from '@/shared/ui/Loader/Loader'
import confirmedImage from '@/shared/assets/images/emailConfirmed.png'
import { useConfirmEmailMutation, useResetPasswordMutation } from '@/entities/User'
import cls from './ForgotPasswordPage.module.scss'
import clsx from 'clsx'
import { HStack, VStack } from '@/shared/ui/Stack'
import { MyText } from '@/shared/ui/Typography'
import { TEST_INPUTS_IDS } from '@/shared/const/testConsts'
import { Input } from '@/shared/ui/Input/Input'
import { CheckBox } from '@/shared/ui/CheckBox'
import { t } from 'i18next'
import { Button } from '@/shared/ui/Button'

const RectangleToSquare = ({ content }: { content: ReactNode }) => {
	const [isExpanded, setIsExpanded] = useState(true);
	// `container ${isExpanded ? 'expanded' : 'collapsed'}`
	return (
		<div className={clsx(cls.container, isExpanded ? '' : cls.collapsed)}>
			{content}
			<button className={cls.toggleBtn} onClick={() => setIsExpanded(!isExpanded)}>
				{isExpanded ? '↘' : '↖'}
			</button>
		</div>
	);
};

const ForgotPasswordPage = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const hash = queryParams.get('hash');
	const [resetPasswordByHash, { isLoading, data, isSuccess, isError }] = useResetPasswordMutation()
	const [password, setPassword] = useState('')
	const [passwordErrors, setPasswordErrors] = useState<string[]>([])
	const [passwordConfirmationErrors, setPasswordConfirmationErrors] = useState<string[]>([])
	const [passwordConfirmation, setPasswordConfirmation] = useState('')
	const [isShowPassword, setIsShowPassword] = useState(false)
	const [isPasswordIdentical, setIsPasswordIdentical] = useState(true)
	const navigate = useNavigate();


	const onChangePassword = (password: string) => {
		setPassword(password)
		if (!isPasswordIdentical) setIsPasswordIdentical(true)
		if (password.length > 6) setPasswordErrors([])

	}

	const onChangeConfirmationPassword = (password: string) => {
		setPasswordConfirmation(password)
		if (!isPasswordIdentical) setIsPasswordIdentical(true)
		if (password.length > 6) setPasswordConfirmationErrors([])

	}
	// $2a$10$1qBUPNnMrOcHwXGaZ4rWouQF7/b6BTtgmAbmfPIPciSnnO9BloHIG
	//$2a$10$SqCMrWqCfpc6x4QR.r11sOyaNLI9Llmp88i6f9zbvLRJGinMT/Zk.
	const onBlurPassword = () => {
		if (password.length < 6) {
			setPasswordErrors(['Пароль должен быть не менее 6 символов'])
		}
	}
	const onBlurPasswordConfirmation = () => {
		if (passwordConfirmation.length < 6) {
			setPasswordConfirmationErrors(['Пароль должен быть не менее 6 символов'])
		}
	}
	const toggleShowPassword = () => setIsShowPassword(prev => !prev)

	const onResetPassword = async () => {
		if (password !== passwordConfirmation) {
			setIsPasswordIdentical(false)
			return
		}
		const res = await resetPasswordByHash({ password, hash: hash! })
		if ('data' in res && res.data === null) {
			navigate('/', { replace: true });
			// navigate('/');
			console.log('NAVIGATE')
		} else {
			console.log('ERROR')

		}
	}

	let content = <Loader />

	if (isLoading) {
		content = <Loader />
	} else if (isError && isLoading) {
		content = (<div>
			<MyText text={'Это ссылка не действительна'} />
		</div>)
		// content = <RectangleToSquare content={(
		// 	<div >
		// 		<p>Почта подтверждена</p >
		// 		<img width={340} src={confirmedImage} />
		// 	</div >
		// )} />
	} else {
		content = (
			<VStack gap='gap_20' style={{ width: 320 }}>
				<VStack gap='gap_8' align='left' max>
					<MyText text={'Введите новый пароль'} />
					<Input
						type={isShowPassword ? 'text' : 'password'}
						id='password'
						value={password}
						onChangeString={onChangePassword}
						onBlur={onBlurPassword}
						inputErrors={passwordErrors}
					/>
				</VStack>
				<VStack gap='gap_8' align='left' max>
					<MyText text={'Повторите пароль'} />
					<Input
						type={isShowPassword ? 'text' : 'password'}
						id='passwordConfirmation'
						value={passwordConfirmation}
						onChangeString={onChangeConfirmationPassword}
						onBlur={onBlurPasswordConfirmation}
						inputErrors={passwordConfirmationErrors}
					/>
				</VStack>
				<HStack max justify='between'  >
					<HStack gap='gap_8'>
						<CheckBox isChecked={isShowPassword} onClick={toggleShowPassword} />
						<MyText onClick={toggleShowPassword} text={`${t('show password')}`} className={cls.showPasswordText} />
					</HStack>
				</HStack>
				<Button
					onClick={onResetPassword}
				>
					Обновить пароль
				</Button>
				{isPasswordIdentical ? null : <MyText variant='error' text={'Пароли не совпадают'} />}
			</VStack>
		)

	}

	return (
		<Page>
			<HStack max justify='center'>
				{content}
			</HStack>
		</Page>
	);
	// const auth = useSelector(getUserAuthData)
	// if (!auth) {
	// 	return (
	// 		<Page data-testid='ForgotPasswordPage'>
	// 			<LoginScreen />
	// 		</Page>
	// 	)
	// }

	// // без StatsAndActionsCupboardWidget не будет работать CupboardShelfListWrapper из-за перерасчета ширины кнопок
	// return (
	// 	<Page data-testid='ForgotPasswordPage'>
	// 		<StatsAndActionsCupboardWidget />
	// 		<CupboardShelfListWrapper />
	// 	</Page>
	// )
}
export default ForgotPasswordPage
