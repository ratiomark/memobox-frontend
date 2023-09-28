// import {
// 	FC,
// 	PropsWithChildren,
// 	ReactNode,
// 	createContext,
// 	useCallback,
// 	useContext,
// 	useEffect,
// 	useMemo,
// 	useState
// } from 'react';
// import * as RadixToast from '@radix-ui/react-toast';
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import { RequestStatusType } from '@/shared/types/GeneralTypes';
// import { Loader } from '../Loader/Loader';
// import Spinner from '@/shared/assets/icons/requestPendingSpinner.svg'
// import CheckIcon from '@/shared/assets/icons/checkIcon.svg'
// import CheckIcon2 from '@/shared/assets/icons/done-20-20.svg'
// import ErrorIcon from '@/shared/assets/icons/errorIcon.svg'
// import cls from './MyToast.module.scss';
// const genRandomId = () => Math.random().toString(32).substring(2);

// interface MyToastProps {
// 	className?: string
// 	status: RequestStatusType
// 	duration?: number
// 	messageLoading?: string
// 	messageSuccess?: string
// 	messageError?: string
// 	contentLoading?: ReactNode
// 	contentSuccess?: ReactNode
// 	contentError?: ReactNode
// 	onTimeEnd: () => void
// 	id?: string
// }

// export const MyToast = (props: ToastProps) => {
// 	const {
// 		className,
// 		status = 'idle',
// 		duration = 3000,
// 		messageLoading = 'loading',
// 		messageSuccess = 'success',
// 		messageError = 'failure',
// 		contentLoading,
// 		contentSuccess,
// 		contentError,
// 		onTimeEnd,
// 	} = props

// 	const { t } = useTranslation()

// 	useEffect(() => {
// 		if (status === 'error' || status === 'success') {
// 			setTimeout(onTimeEnd, duration);
// 		}
// 	}, [status, onTimeEnd, duration])

// 	let message: string
// 	let content: ReactNode;
// 	let additionalContent: ReactNode;
// 	switch (status) {
// 		case 'pending':
// 			message = messageLoading
// 			content = (
// 				<div className={cls.content} >
// 					<RadixToast.Title className={cls.title} >{t(message)}</RadixToast.Title>
// 					<Spinner className={cls[status]} width={32} height={32} />
// 				</div>)
// 			additionalContent = contentLoading
// 				? <RadixToast.Description>{contentLoading}</RadixToast.Description>
// 				: null
// 			break;
// 		case 'success':
// 			message = messageSuccess
// 			content = (
// 				<div className={cls.content} >
// 					<RadixToast.Title className={cls.title} >{t(message)}</RadixToast.Title>
// 					<CheckIcon className={cls[status]} width={32} height={32} />
// 				</div>)
// 			additionalContent = contentSuccess
// 				? <RadixToast.Description>{contentSuccess}</RadixToast.Description>
// 				: null
// 			break;
// 		case 'error':
// 			message = messageError
// 			content = (
// 				<div className={cls.content} >
// 					<RadixToast.Title className={cls.title} >{t(message)}</RadixToast.Title>
// 					<ErrorIcon className={cls[status]} width={32} height={32} />
// 				</div>)
// 			additionalContent = contentError
// 				? <RadixToast.Description>{contentError}</RadixToast.Description>
// 				: null
// 			break;
// 		default:
// 			message = messageLoading
// 			content = (
// 				<div className={cls.content} >
// 					<RadixToast.Title className={cls.title} >{t(message)}</RadixToast.Title>
// 					<Spinner className={cls[status]} width={32} height={32} />
// 				</div>)
// 			additionalContent = contentLoading
// 				? <RadixToast.Description>{contentLoading}</RadixToast.Description>
// 				: null
// 			break;
// 	}

// 	return (
// 		<RadixToast.Root
// 			// onOpenChange={onOpenChange}
// 			open={status !== 'idle'}
// 			className={clsx(
// 				cls.MyToast,
// 				cls[status],
// 				className
// 			)}
// 		// duration={5000}
// 		>
// 			{content}
// 			{additionalContent}
// 		</RadixToast.Root>
// 	)
// }


// type OpenToastParams = ToastProps
// type OpenToastContextProps = (params: ToastProps) => void
// const OpenToastContext = createContext<OpenToastContextProps>(() => null);

// export function useToast() {
// 	return useContext(OpenToastContext);
// }

// export const ToastProvider = ({ children }: PropsWithChildren) => {
// 	const [toasts, setToasts] = useState<ToastProps[]>([]);

// 	const openToast = useCallback((params: OpenToastParams) => {
// 		const id = genRandomId();
// 		setToasts((prev) => [...prev, { id, ...params }]);
// 	}, []);


// 	const toastRendered = useMemo(() => {
// 		toasts.map((value) => console.log(value))
// 		return toasts.map((value) => (
// 			<MyToast {...value} key={value.id} />
// 			// <RadixToast.Toast key={value.id} value={value} onClose={closeToast} />
// 		))
// 	}, [toasts])
// 	// 	(<>
// 	// 	{toasts.map((value) => (
// 	// 		<MyToast {...value} key={value.id} />
// 	// 		// <RadixToast.Toast key={value.id} value={value} onClose={closeToast} />
// 	// 	))}
// 	// </>
// 	// )
// 	// const closeToast = useCallback((id: string) => {
// 	// 	setToasts((prev) =>
// 	// 		prev.map((value) =>
// 	// 			value.id === id ? { ...value, isOpen: false } : value
// 	// 		)
// 	// 	);

// 	// 	setTimeout(() => {
// 	// 		setToasts((prev) => prev.filter((value) => value.id !== id));
// 	// 	}, 200);
// 	// }, []);

// 	return (
// 		<OpenToastContext.Provider value={openToast}>
// 			<RadixToast.Provider duration={5000}>
// 				{children}
// 				{toastRendered}
// 				{/* <MyToast
// 					onTimeEnd={()=>null}
// 					status={'pending'}
// 					messageSuccess='Полка успешно создана'
// 					// messageLoading='Загрузка'
// 					messageLoading='Работа!!!!'
// 					// contentLoading={<MyText text={'Ожидание ответа от сервера'} />}
// 					// contentSuccess={<MyText text={'Все супер класс!'} />}
// 					messageError='Ошибка'

// 				/> */}
// 				{/* {toasts.map((value) => (
// 					<MyToast {...value} key={value.id} />
// 					// <RadixToast.Toast key={value.id} value={value} onClose={closeToast} />
// 				))} */}
// 				{/* <RadixToast.Viewport
// 					className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" /> */}
// 			</RadixToast.Provider>
// 		</OpenToastContext.Provider>
// 	);
// };
