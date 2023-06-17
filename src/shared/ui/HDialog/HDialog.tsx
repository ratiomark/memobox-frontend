import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './HDialog.module.scss';
import { MutableRefObject, ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import { Overlay } from '../Overlay/Overlay';
import { useTheme } from '@/shared/context/useTheme';

interface HDialogProps {
	className?: string
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	initialFocus?: MutableRefObject<HTMLElement | null>
}

export const HDialog = (props: HDialogProps) => {
	const {
		className,
		isOpen,
		onClose,
		initialFocus,
		children,
	} = props
	const { theme } = useTheme()

	return (
		<Dialog
			className={clsx(
				cls.HDialog,
				theme,
				'app_modal',
				className)
			}
			initialFocus={initialFocus}
			open={isOpen}
			onClose={onClose}
		>
			<div className={cls.overlay} />
			<div className={cls.content} >
				<Dialog.Panel className={cls.panel} >
					{children}
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}