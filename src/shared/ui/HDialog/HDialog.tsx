
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './HDialog.module.scss';
import { CSSProperties, MutableRefObject, ReactNode, lazy, useCallback, useEffect, useRef } from 'react';
// import { Dialog } from '@headlessui/react';
import * as Dialog from '@radix-ui/react-dialog'
import { Overlay } from '../Overlay/Overlay';
import { useTheme } from '@/shared/context/useTheme';
import { AnimatePresence, motion } from 'framer-motion';
import { TEST_ENTITY_NAMES } from '@/shared/const/testConsts';

interface HDialogProps {
	className?: string
	isOpen: boolean
	onClose?: () => void
	// onClose: () => void
	onSubmit?: () => void
	onOpenChange?: (isOpen: boolean) => void
	children: ReactNode
	// initialFocus?: MutableRefObject<HTMLElement | null>
	max?: boolean
	lazy?: boolean
	styles?: CSSProperties
	stayInDom?: true
	// unmount?: true
	panelWithMainPadding?: boolean
	panelWithBackground?: boolean
	panelAbsolute?: boolean
	overlay?: boolean
	transparent?: boolean
}

export const HDialog = (props: HDialogProps) => {
	const {
		className,
		isOpen,
		onSubmit,
		lazy,
		onClose,
		// initialFocus,
		max = false,
		styles,
		children,
		onOpenChange,
		stayInDom = undefined,
		panelWithBackground = true,
		panelWithMainPadding = true,
		panelAbsolute,
		transparent = false,
		overlay = true,
	} = props
	const { theme } = useTheme()

	useEffect(() => {
		if (isOpen) {
			const timer = setTimeout(() => {
				document.body.style.pointerEvents = '';
			}, 0);
			return () => clearTimeout(timer);
		} else {
			// document.body.style.pointerEvents = 'auto';
		}
	}, [isOpen]);

	if (lazy && !isOpen) return null
	// if (stayInDom) {
	// 	const content = (
	// 		<div
	// 			className={clsx(
	// 				cls.HDialog,
	// 				theme,
	// 				'app_modal',
	// 			)}

	// 		>
	// 			{/* {overlay && <div onClick={onClose} className={cls.overlay} />} */}
	// 			{overlay && <Dialog.Overlay forceMount className={cls.overlay} />}
	// 			{/* {overlay && <Dialog.Overlay className={cls.overlay} />} */}
	// 			{/* <Dialog.Close /> */}
	// 			<Dialog.Content

	// 				forceMount
	// 				className={styles ? cls.fixed : cls.content}
	// 				style={styles}
	// 			// onInteractOutside={() => {
	// 			// 	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!')
	// 			// 	onClose
	// 			// }}
	// 			// onEscapeKeyDown={onClose}
	// 			>
	// 				<div
	// 					className={clsx(
	// 						cls.panel,
	// 						{ [cls.panelPaddingMain]: panelWithMainPadding },
	// 						{ [cls.panelMax]: max },
	// 						// { [cls.panel]: max },
	// 						{ [cls.panelBg]: panelWithBackground },
	// 						{ [cls.panelAbsolute]: panelAbsolute },
	// 						className
	// 					)}
	// 				// style={styles}
	// 				>
	// 					{children}
	// 				</div>
	// 			</Dialog.Content>
	// 		</div>)
	// 	const modal = (<Dialog.Root open={true}
	// 		onOpenChange={onOpenChange}
	// 	>
	// 		<Dialog.Portal>
	// 			{content}
	// 		</Dialog.Portal>
	// 	</Dialog.Root>)
	// 	return isOpen ? modal : null
	// }

	return (
		<Dialog.Root open={isOpen}
			// modal={false}
		// forceMount={true}
			onOpenChange={onOpenChange}
		>
			<Dialog.Portal >
				<div
					className={clsx(
						cls.HDialog,
						theme,
						'app_modal',
					)}
					data-testid={isOpen ? TEST_ENTITY_NAMES.modalOpen : TEST_ENTITY_NAMES.modalClose}
				>
					{/* {overlay && <div onClick={onClose} className={cls.overlay} />} */}
					{overlay && <Dialog.Overlay onClick={onClose} forceMount className={transparent ? cls.overlayTransparent : cls.overlay} />}
					{/* {overlay && <Dialog.Overlay className={cls.overlay} />} */}
					{/* <Dialog.Close /> */}
					<Dialog.Content

						forceMount
						className={styles ? cls.fixed : cls.content}
						style={styles}
						data-modal-type='content'
					// onInteractOutside={() => {
					// 	console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!')
					// 	onClose
					// }}
					// onEscapeKeyDown={onClose}
					>
						<div
							className={clsx(
								cls.panel,
								{ [cls.panelPaddingMain]: panelWithMainPadding },
								{ [cls.panelMax]: max },
								// { [cls.panel]: max },
								{ [cls.panelBg]: panelWithBackground },
								{ [cls.panelAbsolute]: panelAbsolute },
								className
							)}
						// style={styles}
						>
							{children}
						</div>
					</Dialog.Content>
				</div>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './HDialog.module.scss';
// import { CSSProperties, MutableRefObject, ReactNode, lazy, useCallback, useEffect, useRef } from 'react';
// import { Dialog } from '@headlessui/react';
// import { Overlay } from '../Overlay/Overlay';
// import { useTheme } from '@/shared/context/useTheme';
// import { AnimatePresence, motion } from 'framer-motion';

// interface HDialogProps {
// 	className?: string
// 	isOpen: boolean
// 	onClose: () => void
// 	onSubmit?: () => void
// 	children: ReactNode
// 	// initialFocus?: MutableRefObject<HTMLElement | null>
// 	max?: boolean
// 	lazy?: boolean
// 	styles?: CSSProperties
// 	unmount?: boolean
// 	panelWithMainPadding?: boolean
// 	panelWithBackground?: boolean
// 	panelAbsolute?: boolean
// 	overlay?: boolean
// }

// export const HDialog = (props: HDialogProps) => {
// 	const {
// 		className,
// 		isOpen,
// 		onSubmit,
// 		lazy,
// 		onClose,
// 		// initialFocus,
// 		max = false,
// 		styles,
// 		children,
// 		unmount,
// 		panelWithBackground = true,
// 		panelWithMainPadding = true,
// 		panelAbsolute,
// 		overlay = true,
// 	} = props
// 	const { theme } = useTheme()


// 	// const onKeyDown = useCallback((e: KeyboardEvent) => {
// 	// 	if (e.key === 'Enter' && e.shiftKey) {
// 	// 		onSubmit()
// 	// 	}
// 	// }, [onSubmit])

// 	// useEffect(() => {
// 	// 	if (!isOpen) return

// 	// 	const onKeyDown = (e: KeyboardEvent) => {
// 	// 		if (e.key === 'Enter' && e.shiftKey) {
// 	// 			onSubmit ? onSubmit() : null
// 	// 		}
// 	// 	}
// 	// 	window.addEventListener('keydown', onKeyDown)
// 	// 	return () => {
// 	// 		window.removeEventListener('keydown', onKeyDown)
// 	// 	}
// 	// }, [isOpen, onSubmit])

// 	if (lazy && !isOpen) return null

// 	return (
// 		<Dialog
// 			className={clsx(
// 				cls.HDialog,
// 				theme,
// 				'app_modal',
// 			)}
// 			// unmount={unmount}
// 			// initialFocus={initialFocus}
// 			open={isOpen}
// 			onClose={onClose}
// 		>
// 			{overlay && <div className={cls.overlay} />}
// 			<div className={cls.content}>
// 				<Dialog.Panel
// 					className={clsx(
// 						cls.panel,
// 						{ [cls.panelPaddingMain]: panelWithMainPadding },
// 						{ [cls.panelMax]: max },
// 						// { [cls.panel]: max },
// 						{ [cls.panelBg]: panelWithBackground },
// 						{ [cls.panelAbsolute]: panelAbsolute },
// 						className
// 					)}
// 					style={styles}
// 				>
// 					{children}
// 				</Dialog.Panel>
// 			</div>

// 		</Dialog >
// 	)
// }