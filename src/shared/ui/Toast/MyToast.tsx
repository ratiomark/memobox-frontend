import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './MyToast.module.scss';
import * as ToastRadix from '@radix-ui/react-toast';
import { useEffect } from 'react';
import { RequestStatusType } from '@/shared/types/GeneralTypes';

interface ToastProps {
	className?: string
	status: RequestStatusType
	duration?: number
	messageLoading?: string
	messageSuccess?: string
	messageError?: string
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
		onTimeEnd,
	} = props

	const { t } = useTranslation()

	useEffect(() => {
		if (status === 'error' || status === 'success') {
			setTimeout(onTimeEnd, duration);
		}
	}, [status, onTimeEnd, duration])

	let message: string
	switch (status) {
		case 'pending':
			message = messageLoading
			break;
		case 'success':
			message = messageSuccess
			break;
		case 'error':
			message = messageError
			break;
		default:
			message = messageLoading
			break;
	}

	return (
		<div className={clsx(
			cls.MyToast,
			className)}
		>
			<ToastRadix.Root
				// onOpenChange={onOpenChange}
				open={status !== 'idle'}
			// duration={5000}
			>
				<ToastRadix.Title>{t(message)}</ToastRadix.Title>
				{/* <ToastRadix.Description>{(isResponseSuccessful)?.toString()}</ToastRadix.Description> */}

				{/* <ToastRadix.Title>Заголовок Тоста</ToastRadix.Title> */}
				{/* <ToastRadix.Description>Описание Тоста</ToastRadix.Description> */}
			</ToastRadix.Root>
		</div>
	)
}