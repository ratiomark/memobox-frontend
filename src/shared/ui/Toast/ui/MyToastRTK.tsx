import {
	PropsWithChildren,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import Spinner from '@/shared/assets/icons/requestPendingSpinner.svg'
import CheckIcon from '@/shared/assets/icons/checkIcon.svg'
import CheckIcon2 from '@/shared/assets/icons/done-20-20.svg'
import ErrorIcon from '@/shared/assets/icons/errorIcon.svg'
import { MyToastProps } from '../model/types/ToastsSchema';
import { connect, useSelector } from 'react-redux';
import { getToastByToastId, getToastsListIds, getToastsObject } from '../model/selectors/getToasts';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { toastsActions, toastsReducer } from '../model/slice/toastSlice';
import { Root, ToastDescription, ToastTitle } from '@radix-ui/react-toast';
import cls from './MyToast.module.scss';
import { ReducersList, useAsyncReducer } from '@/shared/lib/helpers/hooks/useAsyncReducer';
import { motion } from 'framer-motion';
import { iconSizeToast } from '@/shared/const/iconSizes';
import { RequestStatusType } from '@/shared/types/GeneralTypes';
import { Button } from '../../Button';
import { ButtonColor } from '../../Button/Button';
import { useDeleteWithCountdown } from '@/shared/lib/helpers/hooks/useDeleteWithCountdown';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import { genRandomString } from '@/shared/lib/helpers/common/genRandomString';

interface MyComponentToastsProps extends MyToastProps {
	onTimeEnd?: () => void
	// type?: 'withButton'
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
				<Spinner className={cls[status]} width={iconSizeToast} height={iconSizeToast} />
			</div>)
			additionalMessage = contentLoading ?? contentCommon
			break;
		case 'success':
			message = messageSuccess
			mainContent = (<div className={cls.content} >
				<ToastTitle className={cls.title} >{t(message)}</ToastTitle>
				<CheckIcon className={cls[status]} width={iconSizeToast} height={iconSizeToast} />
			</div>)
			additionalMessage = contentSuccess ?? contentCommon
			break;
		case 'error':
			message = messageError
			mainContent = (<div className={cls.content} >
				<ToastTitle className={cls.title} >{t(message)}</ToastTitle>
				<ErrorIcon className={cls[status]} width={iconSizeToast} height={iconSizeToast} />
			</div>)
			additionalMessage = contentError ?? contentCommon
			break;
		default:
			message = messageLoading
			mainContent = (<div className={cls.content} >
				<ToastTitle className={cls.title} >{t(message)}</ToastTitle>
				<Spinner className={cls[status]} width={iconSizeToast} height={iconSizeToast} />
			</div>)
			additionalMessage = contentLoading ?? contentCommon
			break;
	}

	const additionalContent = additionalMessage
		? <ToastDescription className={cls.description} >{t(additionalMessage)}</ToastDescription>
		// ? <ToastDescription className={cls.description} >{t(additionalMessage)}</ToastDescription>
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


interface MyComponentToastWithButtonProps extends Omit<MyToastProps, 'status'> {
	onTimeEnd: () => void
	onButtonClick: () => void
	buttonText?: string
	message?: string
	buttonColor?: ButtonColor
}


export const MySimpleToast = (props: MyToastProps) => {
	const {
		duration = 3000,
		message = 'some text',
		status = 'idle'
	} = props
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setVisible(false);
		}, duration);

		return () => clearTimeout(timerId);
	}, [duration]);

	if (!visible) {
		return null;
	}

	const IconComponent = status === 'pending' ? Spinner : status === 'success' ? CheckIcon : ErrorIcon;

	return (
		<Root open={visible} className={clsx(cls.MyToast, cls[`${status}_toast`])}>
			<div className={cls.content}>
				<ToastTitle className={cls.title}>{message}</ToastTitle>
				<IconComponent className={cls[status]} width={24} height={24} /> {/* Пример размеров, возможно, потребуется настройка */}
			</div>
		</Root>
	);
};


export const MyToastWithButton = (props: MyComponentToastWithButtonProps) => {
	const {
		className,
		duration = 3000,
		message = 'some text',
		onTimeEnd,
		onButtonClick,
		buttonText = 'some text',
		buttonColor = 'attention'
	} = props

	const { t } = useTranslation('toast')
	const [timer, setTimer] = useState<TimeoutId | null>(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			onTimeEnd()
		}, duration)
		setTimer(timer)
	}, [duration, onTimeEnd])

	useEffect(() => {
		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [timer])

	useEffect(() => {
		// console.log('render')
		return () => {
			onTimeEnd()
		}
	}, [onTimeEnd])


	const mainContent = (<div className={cls.content} >
		<ToastTitle className={cls.title}>{t(message)}</ToastTitle>
		<Button
			variant='empty'
			color={buttonColor}
			className={cls.button}
			onClick={onButtonClick}
		>
			{t(buttonText)}
		</Button>
	</div>)


	return (
		<Root
			duration={duration}
			className={clsx(
				cls.MyToastWithButton,
				className
			)}
		>
			{mainContent}
			<motion.div
				className={cls.progressBar}
				initial={{ x: -15, y: 7 }}
				animate={{ translateX: '-100%' }}
				transition={{ duration: duration / 1000 }}
			/>
		</Root>
	)
}


export const useToastCustom = () => {
	const dispatch = useAppDispatch()
	return (props: MyToastProps) => dispatch(toastsActions.addToast({ id: genRandomString(), toast: props }))
}


const MyToastWrapper = ({ id }: { id: string }) => {
	// const MyToastWrapper = ({ id, toast }: { id: string, toast: MyToastProps }) => {
	const dispatch = useAppDispatch()
	const toast = useSelector(getToastByToastId(id))
	const onTimeEnd = () => {
		// dispatch(toastsActions.updateToastById(id))
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

const ToastReducer = () => {
	useTranslation('toast')
	useAsyncReducer({ reducers, removeAfterUnmount: false })
	return <MyToastsRTK />
}
const MyToastsRTK = () => {
	// useAsyncReducer({ reducers, removeAfterUnmount: false })
	// console.log('0000000000000000000000000000000000000')
	const toastsListIds = useSelector(getToastsListIds)
	// useEffect(() => {
	// 	console.log(toastsObj)
	// }, [toastsObj])
	useEffect(() => {
		console.log(toastsListIds)
	}, [toastsListIds])

	const renderedToasts = toastsListIds.map(id => {
		// console.log(id, toast)
		return <MyToastWrapper key={id} id={id} />
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
// export default MyToastsRTK
export default ToastReducer
// export const MyToastsRTK = () => {
// 	useAsyncReducer({ reducers, removeAfterUnmount: false })
// 	const toastsObj = useSelector(getToastsObject)
// 	const { t } = useTranslation('toast')
// 	// useEffect(() => {
// 	// 	console.log(toastsObj)
// 	// }, [toastsObj])

// 	const renderedToasts = Object.entries(toastsObj).map(([id, toast]) => {
// 		// console.log(id, toast)
// 		return <MyToastWrapper key={id} id={id} toast={toast} />
// 		// return null
// 	})
// 	return (
// 		// <motion.div layout>
// 		<>
// 			{renderedToasts}
// 		</>
// 		// </motion.div>
// 	)
// }
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
