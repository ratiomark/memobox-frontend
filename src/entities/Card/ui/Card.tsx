import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Card.module.scss';

interface CardProps {
	className?: string
}

export const Card = (props: CardProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.card,
			className)}
		>

		</div>
	)
}