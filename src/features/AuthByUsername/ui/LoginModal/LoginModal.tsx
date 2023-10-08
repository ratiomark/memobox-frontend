import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../LoginForm/LoginForm.lazy';
import cls from './LoginModal.module.scss'
import clsx from 'clsx';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button } from '@/shared/ui/Button';
import { RegisterForm } from '../RegisterForm/RegisterForm.lazy';

interface LoginModalProps {
	className?: string;
	// isOpen: boolean;
	// onClose: () => void;
}

export const LoginScreen = () => {
	// export const LoginModal = (props: LoginModalProps) => {
	// const {
	// className,
	// isOpen,
	// onClose
	// } = props
	const [isLogin, setIsLogin] = useState(true)
	const { t } = useTranslation()
	return (
		<div className={cls.wrapper} >
			<Button onClick={() => setIsLogin(prev => !prev)}>
				{
					isLogin
						? 'ПЕРЕЙТИ К РЕГИСТРАЦИИ'
						: 'ПЕРЕЙТИ КО ВХОДУ'
				}
			</Button>
			<Suspense fallback={<div>{t('zagruzka')} </div>}>
				{isLogin
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
