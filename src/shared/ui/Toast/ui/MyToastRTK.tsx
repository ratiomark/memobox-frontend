import {
	PropsWithChildren,
	ReactNode,
	useEffect,
} from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import Spinner from '@/shared/assets/icons/requestPendingSpinner.svg'
import CheckIcon from '@/shared/assets/icons/checkIcon.svg'
import CheckIcon2 from '@/shared/assets/icons/done-20-20.svg'
import ErrorIcon from '@/shared/assets/icons/errorIcon.svg'
import { MyToastProps } from '../model/types/ToastsSchema';
import { connect, useSelector } from 'react-redux';
import { getToastsObject } from '../model/selectors/getToasts';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { toastsActions, toastsReducer } from '../model/slice/toastSlice';
import { Root, ToastDescription, ToastTitle } from '@radix-ui/react-toast';
import cls from './MyToast.module.scss';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { motion } from 'framer-motion';
import { toastIconSize } from '@/shared/const/iconSizes';

interface MyComponentToastsProps extends MyToastProps {
	onTimeEnd?: () => void
}

export const MyToast = (props: MyComponentToastsProps) => {
	const {
		className,
		status = 'idle',
		duration = 3000,
		messageLoading = 'messageLoading',
		messageSuccess = 'messageSuccess',
		messageError = 'messageError',
		contentLoading,
		contentSuccess,
		contentError,
		contentCommon,
		onTimeEnd,
	} = props

	const { t } = useTranslation('toast')

	useEffect(() => {
		if ((status === 'error' || status === 'success') && onTimeEnd) {
			setTimeout(onTimeEnd, duration);
		}
	}, [status, onTimeEnd, duration])

	let message: string
	let mainContent: ReactNode;
	let additionalMessage: string | undefined
	switch (status) {
		case 'pending':
			message = messageLoading
			mainContent = (<div className={cls.content} >
				<ToastTitle className={cls.title}>{t(message)}</ToastTitle>
				<Spinner className={cls[status]} width={toastIconSize} height={toastIconSize} />
			</div>)
			additionalMessage = contentLoading ?? contentCommon
			break;
		case 'success':
			message = messageSuccess
			mainContent = (<div className={cls.content} >
				<ToastTitle className={cls.title} >{t(message)}</ToastTitle>
				<CheckIcon className={cls[status]} width={toastIconSize} height={toastIconSize} />
			</div>)
			additionalMessage = contentSuccess ?? contentCommon
			break;
		case 'error':
			message = messageError
			mainContent = (<div className={cls.content} >
				<ToastTitle className={cls.title} >{t(message)}</ToastTitle>
				<ErrorIcon className={cls[status]} width={toastIconSize} height={toastIconSize} />
			</div>)
			additionalMessage = contentError ?? contentCommon
			break;
		default:
			message = messageLoading
			mainContent = (<div className={cls.content} >
				<ToastTitle className={cls.title} >{t(message)}</ToastTitle>
				<Spinner className={cls[status]} width={toastIconSize} height={toastIconSize} />
			</div>)
			additionalMessage = contentLoading ?? contentCommon
			break;
	}
	
	const additionalContent = additionalMessage
		? <ToastDescription className={cls.description} >{t(additionalMessage)}</ToastDescription>
		: null
	
	return (
		<Root
			// onOpenChange={onOpenChange}
			open={status !== 'idle'}
			className={clsx(
				cls.MyToast,
				cls[status + '_toast'],
				className
			)}
		// duration={5000}
		>
			{mainContent}
			{additionalContent}
		</Root>
	)
}


const MyToastWrapper = ({ id, toast }: { id: string, toast: MyToastProps }) => {
	const dispatch = useAppDispatch()
	const onTimeEnd = () => {
		dispatch(toastsActions.removeToastById(id))
	}

	return (
		<MyToast
			onTimeEnd={onTimeEnd}
			{...toast}
		/>
	)

}
const reducers: ReducersList = {
	toasts: toastsReducer
}
export const MyToastsRTK = () => {
	useAsyncReducer({ reducers, removeAfterUnmount: false })
	const toastsObj = useSelector(getToastsObject)
	useEffect(() => {
		console.log(toastsObj)
	}, [toastsObj])

	const renderedToasts = Object.entries(toastsObj).map(([id, toast]) => {
		// console.log(id, toast)
		return <MyToastWrapper key={id} id={id} toast={toast} />
		// return null
	})
	return (
		// <motion.div layout>
		<>
			{renderedToasts}
		</>
		// </motion.div>
	)
}
// export const MyToastsRTK = memo(() => {
// 	// const toasts = useSelector(getToastsList)
// 	const toastsObj = useSelector(getToastsObject)
// 	useEffect(() => {
// 		console.log(toastsObj )
// 	}, [toastsObj ])

// 	const renderedToasts = Object.entries(toastsObj).map(([id, toast]) => {
// 		// console.log(id, toast)
// 		return <MyToastWrapper key={id} id={id} toast={toast} />
// 		// return null
// 	})
// 	return (
// 		<>
// 			{renderedToasts}
// 		</>
// 	)
// })
// MyToastsRTK.displayName = 'MyToastsRTK'


// export const ToastProvider = ({ children }: PropsWithChildren) => {
// 	return (
// 		<RadixToast.Provider duration={5000}>
// 			{children}
// 			<MyToastsRTK />
// 		</RadixToast.Provider>
// 	);
// };
