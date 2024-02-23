import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../LoginForm/LoginForm.lazy';
import cls from './LoginScreen.module.scss'
import clsx from 'clsx';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button } from '@/shared/ui/Button';
import { RegisterForm } from '../LoginForm/RegisterForm.lazy';
import { useSelector } from 'react-redux';
import { getLoginIsLoginProcess } from '../../Model/selectors/getLoginState/getLoginState';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { loginReducer } from '../..';
import { LoginModalContent } from './LoginScreenContent';

interface LoginModalProps {
	className?: string;
	// isOpen: boolean;
	// onClose: () => void;
}
// Отдельно выносим редьюсеры от комопнента, чтобы лишний раз не создавать объект с редьюсерами, если так не сделать, то каждый раз при монтировании компонента LoginForm будет создаваться новый объект с редьюсерами и передаваться в хук, лучше сделать такой объект один раз
// const initialReducers: ReducersList = {
// 	loginForm: loginReducer,
// }
// export const LoginScreen = () => {
// 	// const { dispatch, store } = useAsyncReducer({
// 	// 	reducers: initialReducers,
// 	// 	removeAfterUnmount: false,
// 	// })
// 	// if (store.getState().loginForm) {
// 	return <LoginModalContent />
// 	// }
// 	// export const LoginModal = (props: LoginModalProps) => {
// 	// const {
// 	// className,
// 	// isOpen,
// 	// onClose
// 	// } = props
// 	// const isLoginProcess = useSelector(getLoginIsLoginProcess)
// 	// const [isLogin, setIsLogin] = useState(true)
// 	// const { t } = useTranslation()
// 	return (
// 		null
// 	)
// }
export const LoginScreen = () => {
	// const { dispatch, store } = useAsyncReducer({
	// 	reducers: initialReducers,
	// 	removeAfterUnmount: false,
	// })
	// export const LoginModal = (props: LoginModalProps) => {
	// const {
	// className,
	// isOpen,
	// onClose
	// } = props
	const isLoginProcess = useSelector(getLoginIsLoginProcess)
	// const [isLogin, setIsLogin] = useState(true)
	const { t } = useTranslation()
	return (
		<div className={cls.wrapper} >
			{/* <Button onClick={() => setIsLogin(prev => !prev)}>
				{
					isLogin
						? 'ПЕРЕЙТИ К РЕГИСТРАЦИИ'
						: 'ПЕРЕЙТИ КО ВХОДУ'
				}
			</Button> */}
			<Suspense fallback={<div>{t('zagruzka')} </div>}>
				{isLoginProcess
					? <LoginForm />
					: <RegisterForm />
				}
			</Suspense>
		</div>
	)
}

// export const LoginModal = () => {
// 	// export const LoginModal = (props: LoginModalProps) => {
// 	// const {
// 	// className,
// 	// isOpen,
// 	// onClose
// 	// } = props

// 	const { t } = useTranslation()
// 	return (
// 		<Suspense fallback={<div>{t('zagruzka')} </div>}>
// 			<LoginForm />
// 		</Suspense>
// 	)
// 	// return (
// 	// 	<HDialogHeadless className={clsx(cls.LoginModal, [className])}
// 	// 		isOpen={isOpen}
// 	// 		lazy
// 	// 		onClose={onClose}
// 	// 	>
// 	// 		<Suspense fallback={<div>{t('zagruzka')} </div>}>
// 	// 			<LoginForm onSuccess={onClose} isOpen={isOpen} />
// 	// 		</Suspense>
// 	// 	</HDialogHeadless>
// 	// )
// }
