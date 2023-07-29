import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxesPresenter.module.scss';

interface BoxesPresenterProps {
	className?: string
}

export const BoxesPresenter = (props: BoxesPresenterProps) => {
	const {
		className
	} = props

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.BoxesPresenter,
			className)}
		>

		</div>
	)
}