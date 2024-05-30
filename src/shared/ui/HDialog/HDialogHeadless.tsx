

import clsx from 'clsx';
import cls from './HDialogHeadless.module.scss';
import { CSSProperties, MutableRefObject, ReactNode, forwardRef, lazy, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { useTheme } from '@/shared/context/useTheme';
import { TEST_ENTITY_NAMES } from '@/shared/const/testConsts';

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
	customId?: string
	isSubmitDisabled?: boolean
}

export const HDialogHeadless = forwardRef<HTMLDivElement, HDialogProps>((props, ref) => {
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
		customId,
		isSubmitDisabled = false,
	} = props
	const { theme } = useTheme()

	// const dialogRef = useRef<HTMLDivElement>(null);
	// const dialogRef = useRef<HTMLDivElement>(null);
	// useImperativeHandle(ref, () => dialogRef.current as HTMLDivElement);

	// const onKeyDown = useCallback((e: KeyboardEvent) => {
	// 	if (e.key === 'Enter' && e.shiftKey) {
	// 		onSubmit()
	// 	}
	// }, [onSubmit])

	useEffect(() => {
		if (!isOpen) return

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter' && e.shiftKey) {
				e.preventDefault()
				// e.stopPropagation()
				// e.stopImmediatePropagation()
				if (onSubmit && !isSubmitDisabled) {
					onSubmit()
					// const activeElement = document.activeElement as HTMLElement;
					// if (activeElement && typeof activeElement.blur === 'function') {
					// 	activeElement.blur();
					// }
					// onSubmit()
				}
			}
		}
		window.addEventListener('keydown', onKeyDown)
		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen, onSubmit, isSubmitDisabled])

	if (lazy && !isOpen) return null

	return (
		<Dialog
			className={clsx(
				cls.HDialogHeadless,
				theme,
				'app_modal',
			)}
			data-testid={isOpen ? TEST_ENTITY_NAMES.modalOpen : TEST_ENTITY_NAMES.modalClose}
			unmount={unmount}
			open={isOpen}
			onClose={onClose}
			custom-id={customId ? customId : undefined}
		// ref={dialogRef}
		>
			<div className={cls.content}
			// custom-id={customId ? customId : undefined}
			>
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
})