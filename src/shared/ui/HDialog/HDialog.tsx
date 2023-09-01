import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './HDialog.module.scss';
import { CSSProperties, MutableRefObject, ReactNode, lazy, useCallback, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { Overlay } from '../Overlay/Overlay';
import { useTheme } from '@/shared/context/useTheme';
import { AnimatePresence, motion } from 'framer-motion';

interface HDialogProps {
	className?: string
	isOpen: boolean
	onClose: () => void
	onSubmit?: () => void
	children: ReactNode
	// initialFocus?: MutableRefObject<HTMLElement | null>
	max?: boolean
	lazy?: boolean
	styles?: CSSProperties
	unmount?: boolean
	panelWithMainPadding?: boolean
	panelWithBackground?: boolean
	panelAbsolute?: boolean
	overlay?: boolean
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
		unmount,
		panelWithBackground = true,
		panelWithMainPadding = true,
		panelAbsolute,
		overlay = true,
	} = props
	const { theme } = useTheme()


	// const onKeyDown = useCallback((e: KeyboardEvent) => {
	// 	if (e.key === 'Enter' && e.shiftKey) {
	// 		onSubmit()
	// 	}
	// }, [onSubmit])

	useEffect(() => {
		if (!isOpen) return

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter' && e.shiftKey) {
				onSubmit ? onSubmit() : null
			}
		}
		window.addEventListener('keydown', onKeyDown)
		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, onSubmit])

	if (lazy && !isOpen) return null

	return (
		<Dialog
			className={clsx(
				cls.HDialog,
				theme,
				'app_modal',
			)}
			// unmount={unmount}
			// initialFocus={initialFocus}
			open={isOpen}
			onClose={onClose}
		>
			{overlay && <div className={cls.overlay} />}
			<div className={cls.content}>
				<Dialog.Panel
					className={clsx(
						cls.panel,
						{ [cls.panelPaddingMain]: panelWithMainPadding },
						{ [cls.panelMax]: max },
						// { [cls.panel]: max },
						{ [cls.panelBg]: panelWithBackground },
						{ [cls.panelAbsolute]: panelAbsolute },
						className
					)}
					style={styles}
				>
					{children}
				</Dialog.Panel>
			</div>

		</Dialog >
	)
}