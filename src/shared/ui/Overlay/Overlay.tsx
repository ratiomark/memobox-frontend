import clsx from 'clsx';
import cls from './Overlay.module.scss';

interface OverlayProps {
	className?: string
	onClick?: () => void
	transparent?: boolean
}

export const Overlay = (props: OverlayProps) => {
	const {
		className,
		onClick,
		transparent
	} = props

	return (
		<div className={clsx(
			cls.Overlay,
			transparent ? cls.transparent : cls.regular,
			[className])
		}
			onClick={onClick} />
	)
}