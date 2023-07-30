import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardsPresenter.module.scss';
import { useGetTrashQuery } from '@/entities/Trash';
import { CardItemTrash } from './CardItemTrash';

interface CardsPresenterProps {
	className?: string
}

export const CardsPresenter = (props: CardsPresenterProps) => {
	const {
		className
	} = props
	const { isLoading, data, isError } = useGetTrashQuery()
	const { t } = useTranslation()


	const cards = data?.cards.map(card => <CardItemTrash key={card.id} card={card} />)
	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.CardsPresenter,
			className)}
		>

		</div>
	)
}