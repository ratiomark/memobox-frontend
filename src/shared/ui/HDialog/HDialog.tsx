import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './HDialog.module.scss';
import { CSSProperties, MutableRefObject, ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import { Overlay } from '../Overlay/Overlay';
import { useTheme } from '@/shared/context/useTheme';

interface HDialogProps {
	className?: string
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	// initialFocus?: MutableRefObject<HTMLElement | null>
	max?: boolean
	lazy?: boolean
	noBackground?: boolean
	styles?: CSSProperties
	unmount?: boolean
}

export const HDialog = (props: HDialogProps) => {
	const {
		className,
		isOpen,
		lazy,
		onClose,
		// initialFocus,
		max = false,
		noBackground = false,
		styles,
		children,
		unmount,
	} = props
	const { theme } = useTheme()

	if (lazy && !isOpen) return null

	return (
		<Dialog
			className={clsx(
				cls.HDialog,
				theme,
				'app_modal',
				className
				// !unmount ? 'hidden' :
			)
			}
			unmount={unmount}
			style={styles}
			// initialFocus={initialFocus}
			open={isOpen}
			onClose={onClose}
		>
			<div className={cls.overlay} />
			<div className={cls.content} >
				<Dialog.Panel
					className={max ? cls.panelMax : cls.panel}
				>
					{children}
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}