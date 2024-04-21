import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../LoginForm/LoginForm.lazy';
import cls from './LoginScreen.module.scss'
import clsx from 'clsx';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Button } from '@/shared/ui/Button';
import { RegisterForm } from '../LoginForm/RegisterForm.lazy';
import { useSelector } from 'react-redux';
import { getLoginIsLoginProcess, getLoginMounted } from '../../Model/selectors/getLoginState/getLoginState';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { loginReducer } from '../..';
import { LoginModalContent } from './LoginScreenContent';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginActions } from '../../Model/slice/loginSlice';
import { RegisterFormSkeleton } from '../LoginForm/RegisterFormSkeleton';
import { LoginFormSkeleton } from '../LoginForm/LoginFormSkeleton';

export const LoginScreen = () => {
	const isLoginProcess = useSelector(getLoginIsLoginProcess)
	const loginMounted = useSelector(getLoginMounted)
	const dispatch = useAppDispatch()
	const location = useLocation();
	const navigate = useNavigate()

	useEffect(() => {
		if (location.search && loginMounted) {
			const queryParams = new URLSearchParams(location.search);
			const isLogin = queryParams.get('isLoginProcess');
			const isForgotPasswordOpen = queryParams.get('isForgotPasswordOpen');
			if (isLogin) {
				dispatch(loginActions.setIsLoginProcess(true))
			}
			if (isForgotPasswordOpen) {
				dispatch(loginActions.setIsForgotPasswordModal(true))
			}
			navigate('/login', { replace: true })
		}
	}, [location.search, loginMounted, dispatch, navigate])
	// console.log(location.state)
	// const fullPath = location.pathname + location.search + location.hash;

	// console.log('Полный путь после /login:', fullPath);
	// const queryParams = new URLSearchParams(location.search);
	// console.log(JSON.stringify(queryParams.values()))
	// console.log(JSON.stringify(queryParams.entries))
	// console.log(JSON.stringify(queryParams.entries()))
	// console.log(JSON.stringify(queryParams.keys))
	// console.log(JSON.stringify(queryParams.keys()))
	// const status = queryParams.get('status');
	// const hash = queryParams.get('hash');
	// <Button onClick={() => navigate('/login?isLoginProcess=true&isForgotPasswordOpen=true')}>
	// const { postRegistrationStep } = useJsonSettings()
	// useEffect(() => {
	// 	// if (!auth) {
	// 	if (!auth || postRegistrationStep !== 'COMPLETED') {
	// 		navigate('/login')
	// 	}
	// }, [auth, navigate, postRegistrationStep])
	return (
		<div className={cls.wrapper} >
			<Suspense fallback={<RegisterFormSkeleton />}>
				{!isLoginProcess && <RegisterForm />}
			</Suspense>
			<Suspense fallback={<LoginFormSkeleton />}>
				{isLoginProcess && <LoginForm />}
			</Suspense>
		</div>
	)
}


// export const LoginScreen = () => {
// 	const isLoginProcess = useSelector(getLoginIsLoginProcess)
// 	// const { postRegistrationStep } = useJsonSettings()
// 	// useEffect(() => {
// 	// 	// if (!auth) {
// 	// 	if (!auth || postRegistrationStep !== 'COMPLETED') {
// 	// 		navigate('/login')
// 	// 	}
// 	// }, [auth, navigate, postRegistrationStep])
// 	const { t } = useTranslation()
// 	return (
// 		<div className={cls.wrapper} >
// 			<Suspense fallback={<div>{t('zagruzka')} </div>}>
// 				{isLoginProcess && <LoginForm />}
// 				{!isLoginProcess && <RegisterForm />}
// 			</Suspense>
// 		</div>
// 	)
// }






