import { CSSProperties, ReactNode } from 'react';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss'
import { Overlay } from '../Overlay/Overlay';
import { useModal } from '@/shared/lib/helpers/hooks/useModal';
import clsx from 'clsx';
import { useTheme } from '@/shared/context/useTheme';

interface ModalProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	lazy?: boolean;
	onClose?: () => void;
	animationDelay?: number
	style?: CSSProperties
	panelAbsolute?: boolean
}

export const Modal = (props: ModalProps) => {
	const {
		children,
		className,
		isOpen,
		onClose,
		lazy,
		animationDelay = 300,
		style,
		panelAbsolute = false,
	} = props
	const { theme } = useTheme()
	const {
		isMounted,
		isClosing,
		onCloseHandler
	} = useModal({ isOpen, onClose, animationDelay })

	const mods: Record<string, boolean | undefined> = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
	}
	if (lazy && !isOpen) return null
	// if (lazy && !isMounted) return null

	return (
		<Portal>
			<div className={clsx(cls.Modal, mods, className, theme, 'app_modal')} >
				<Overlay onClick={onCloseHandler} />
				<div
					style={style}
					className={clsx(
						// cls.content
						{ [cls.panelAbsolute]: panelAbsolute }
					)}
				>
					{children}
				</div>
			</div>
		</Portal>
	)
}