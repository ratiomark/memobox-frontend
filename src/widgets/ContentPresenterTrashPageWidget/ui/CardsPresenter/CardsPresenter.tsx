import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardsPresenter.module.scss';

interface CardsPresenterProps {
	className?: string
}

export const CardsPresenter = (props: CardsPresenterProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.CardsPresenter,
			className)}
		>

		</div>
	)
}