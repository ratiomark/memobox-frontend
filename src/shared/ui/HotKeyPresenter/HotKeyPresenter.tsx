import { ReactNode } from 'react';
import cls from './HotKeyPresenter.module.scss'
import clsx from 'clsx';

interface HotKeyPresenterProps {
	keysCombination: string[]
	description?: ReactNode;
}

export const HotKeyPresenter = (props: HotKeyPresenterProps) => {
	const { keysCombination, description } = props;

	const renderKeyCombination = () => {
		if (keysCombination.length === 1) {
			return <span className={cls.key}>{keysCombination[0]}</span>;
		} else {
			return keysCombination.map((key, index) => (
				<span key={index}>
					<span className={cls.key}>{key}</span>
					{index < keysCombination.length - 1 && <span className={cls.separator}>+</span>}
				</span>
			));
		}
	};

	return (
		<div className={cls.container}>
			<div className={cls.keyCombination}>{renderKeyCombination()}</div>
			{description && <div className={cls.description}>{description}</div>}
		</div>
	);
};

// export default TooltipDemo;
// export const Modal = (props: ModalProps) => {
// 	const {
// 		children,
// 		className,
// 		isOpen,
// 		onClose,
// 		lazy,
// 		animationDelay = 300,
// 		style,
// 		panelAbsolute = false,
// 	} = props
// 	const { theme } = useTheme()
// 	const {
// 		isMounted,
// 		isClosing,
// 		onCloseHandler
// 	} = useModal({ isOpen, onClose, animationDelay })

// 	const mods: Record<string, boolean | undefined> = {
// 		[cls.opened]: isOpen,
// 		[cls.isClosing]: isClosing,
// 	}
// 	if (lazy && !isOpen) return null
// 	// if (lazy && !isMounted) return null

// 	return (
// 		<Portal>
// 			<div className={clsx(cls.Modal, mods, className, theme, 'app_modal')} >
// 				<Overlay onClick={onCloseHandler} />
// 				<div
// 					style={style}
// 					className={clsx(
// 						// cls.content
// 						{ [cls.panelAbsolute]: panelAbsolute }
// 					)}
// 				>
// 					{children}
// 				</div>
// 			</div>
// 		</Portal>
// 	)
// }