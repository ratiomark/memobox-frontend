import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './HDialog.module.scss';
import { CSSProperties, MutableRefObject, ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import { Overlay } from '../Overlay/Overlay';
import { useTheme } from '@/shared/context/useTheme';
import { AnimatePresence, motion } from 'framer-motion';

interface HDialogProps {
	className?: string
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	// initialFocus?: MutableRefObject<HTMLElement | null>
	max?: boolean
	lazy?: boolean
	styles?: CSSProperties
	unmount?: boolean
	panelWithMainPadding?: boolean
	panelWithBackground?: boolean
	panelAbsolute?: boolean
}

export const HDialog = (props: HDialogProps) => {
	const {
		className,
		isOpen,
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
	} = props
	const { theme } = useTheme()

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

			<div className={cls.overlay} />

			<div className={cls.content}>
				<Dialog.Panel
					className={clsx(
						cls.panel,
						{ [cls.panelPaddingMain]: panelWithMainPadding },
						{ [cls.panelMax]: max },
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