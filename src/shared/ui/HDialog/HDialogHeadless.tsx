

import clsx from 'clsx';
import cls from './HDialogHeadless.module.scss';
import { CSSProperties, MutableRefObject, ReactNode, lazy, useCallback, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { useTheme } from '@/shared/context/useTheme';

interface HDialogProps {
	className?: string
	classNamePanelAdditional?: string
	isOpen: boolean
	onClose: () => void
	onSubmit?: () => void
	children: ReactNode
	transparent?: boolean
	max?: boolean
	lazy?: boolean
	styles?: CSSProperties
	unmount?: boolean
	panelWithMainPadding?: boolean
	panelWithBackground?: boolean
	panelAbsolute?: boolean
	overlay?: boolean
}

export const HDialogHeadless = (props: HDialogProps) => {
	const {
		className,
		classNamePanelAdditional,
		isOpen,
		onSubmit,
		lazy,
		onClose,
		max = false,
		transparent = false,
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

	// useEffect(() => {
	// 	if (!isOpen) return

	// 	const onKeyDown = (e: KeyboardEvent) => {
	// 		if (e.key === 'Enter' && e.shiftKey) {
	// 			onSubmit ? onSubmit() : null
	// 		}
	// 	}
	// 	window.addEventListener('keydown', onKeyDown)
	// 	return () => {
	// 		window.removeEventListener('keydown', onKeyDown)
	// 	}
	// }, [isOpen, onSubmit])

	if (lazy && !isOpen) return null

	return (
		<Dialog
			className={clsx(
				cls.HDialogHeadless,
				theme,
				'app_modal',
			)}

			unmount={unmount}
			open={isOpen}
			onClose={onClose}
		>
			<div className={cls.content}>
				{overlay && <div className={transparent ? cls.overlayTransparent : cls.overlay} />}
				<Dialog.Panel
					className={clsx(
						cls.panel,
						{ [cls.panelPaddingMain]: panelWithMainPadding },
						{ [cls.panelMax]: max },
						{ [cls.panelBg]: panelWithBackground },
						{ [cls.panelAbsolute]: panelAbsolute },
						classNamePanelAdditional,
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