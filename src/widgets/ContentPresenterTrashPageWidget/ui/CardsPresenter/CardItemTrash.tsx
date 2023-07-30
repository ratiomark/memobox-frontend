import clsx from 'clsx'
import cls from './CardItemTrash.module.scss'
import { useTranslation } from 'react-i18next';

interface CardItemTrashProps {
	className?: string;
}

export const CardItemTrash = (props: CardItemTrashProps) => {
	const {
		className,
	} = props
	
	const { t } = useTranslation()

	return (
		<div className={clsx(cls.CardItemTrash, [className])} >

		</div>
	)
}