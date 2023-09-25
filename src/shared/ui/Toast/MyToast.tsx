import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './MyToast.module.scss';
import * as ToastRadix from '@radix-ui/react-toast';
import { ReactNode, useEffect } from 'react';
import { RequestStatusType } from '@/shared/types/GeneralTypes';
import { Loader } from '../Loader/Loader';
import Spinner from '@/shared/assets/icons/requestPendingSpinner.svg'
import CheckIcon from '@/shared/assets/icons/checkIcon.svg'
import CheckIcon2 from '@/shared/assets/icons/done-20-20.svg'
import ErrorIcon from '@/shared/assets/icons/errorIcon.svg'

interface ToastProps {
	className?: string
	status: RequestStatusType
	duration?: number
	messageLoading?: string
	messageSuccess?: string
	messageError?: string
	contentLoading?: ReactNode
	contentSuccess?: ReactNode
	contentError?: ReactNode
	onTimeEnd: () => void
}

export const MyToast = (props: ToastProps) => {
	const {
		className,
		status = 'idle',
		duration = 3000,
		messageLoading = 'loading',
		messageSuccess = 'success',
		messageError = 'failure',
		contentLoading,
		contentSuccess,
		contentError,
		onTimeEnd,
	} = props

	const { t } = useTranslation()

	useEffect(() => {
		if (status === 'error' || status === 'success') {
			setTimeout(onTimeEnd, duration);
		}
	}, [status, onTimeEnd, duration])

	let message: string
	let content: ReactNode;
	let additionalContent: ReactNode;
	switch (status) {
		case 'pending':
			message = messageLoading
			content = (
				<div className={cls.content} >
					<ToastRadix.Title className={cls.title} >{t(message)}</ToastRadix.Title>
					<Spinner className={cls[status]} width={32} height={32} />
				</div>)
			additionalContent = contentLoading
				? <ToastRadix.Description>{contentLoading}</ToastRadix.Description>
				: null
			break;
		case 'success':
			message = messageSuccess
			content = (
				<div className={cls.content} >
					<ToastRadix.Title className={cls.title} >{t(message)}</ToastRadix.Title>
					<CheckIcon className={cls[status]} width={32} height={32} />
				</div>)
			additionalContent = contentSuccess
				? <ToastRadix.Description>{contentSuccess}</ToastRadix.Description>
				: null
			break;
		case 'error':
			message = messageError
			content = (
				<div className={cls.content} >
					<ToastRadix.Title className={cls.title} >{t(message)}</ToastRadix.Title>
					<ErrorIcon className={cls[status]} width={32} height={32} />
				</div>)
			additionalContent = contentError
				? <ToastRadix.Description>{contentError}</ToastRadix.Description>
				: null
			break;
		default:
			message = messageLoading
			content = (
				<div className={cls.content} >
					<ToastRadix.Title className={cls.title} >{t(message)}</ToastRadix.Title>
					<Spinner className={cls[status]} width={32} height={32} />
				</div>)
			additionalContent = contentLoading
				? <ToastRadix.Description>{contentLoading}</ToastRadix.Description>
				: null
			break;
	}

	return (
		<ToastRadix.Root
			// onOpenChange={onOpenChange}
			open={status !== 'idle'}
			className={clsx(
				cls.MyToast,
				cls[status],
				className
			)}
		// duration={5000}
		>
			{content}
			{additionalContent}
			{/* {contentLoading} */}
			{/* <ToastRadix.Title className={cls.title} >{t(message)}</ToastRadix.Title> */}
			{/* {status === 'pending' && <Spinner className={cls[status]} width={40} height={40} />} */}
			{/* {status === 'pending' && <Spinner width={80} height={80} />} */}
			{/* {status === 'pending' && <Loader />} */}
			{/* <ToastRadix.Description>{(isResponseSuccessful)?.toString()}</ToastRadix.Description> */}

			{/* <ToastRadix.Title>Заголовок Тоста</ToastRadix.Title> */}
			{/* <ToastRadix.Description>Описание Тоста</ToastRadix.Description> */}
		</ToastRadix.Root>
	)
}