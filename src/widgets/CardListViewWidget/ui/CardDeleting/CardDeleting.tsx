import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardDeleting.module.scss';
import { CardSchemaExtended } from '@/entities/Card';


interface CardDeletingProps {
	// className?: string
	card: CardSchemaExtended
	// onSelectCard: (cardId: string) => void
	// selectedCardIds: string[]
	// onOpenEditCardModal: (card: CardSchemaExtended) => void
}
export const CardDeleting = (props: CardDeletingProps) => {
	const {
		card
	} = props

	const { t } = useTranslation()

	return (
		<div className={cls.item}>
			<div className={cls.CardListItem}>
				<div className={cls.mainContentWrapper} >

					<p>Удаление карточки</p>
					
					<p>Удаление карточки</p>
				</div>
			</div>

		</div>
	)
}