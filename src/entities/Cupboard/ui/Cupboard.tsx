import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Cupboard.module.scss';

interface CupboardProps {
	className?: string
}

export const Cupboard = (props: CupboardProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.cupboard,
			className)}
		>

		</div>
	)
}