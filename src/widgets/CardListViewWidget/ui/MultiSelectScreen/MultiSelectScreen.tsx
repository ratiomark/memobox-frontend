import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './MultiSelectScreen.module.scss';
import { useSelector } from 'react-redux';
import { getViewPageMultiSelectIsActive, getViewPageSelectedCardIds, getViewPageShelfItems } from '@/features/ViewPageInitializer';
import { Button } from '@/shared/ui/Button';
import { useHotkeys } from 'react-hotkeys-hook';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { useUpdateCardsMutation } from '@/entities/Card';

interface MultiSelectScreenProps {
	className?: string
	onSelectAllCards: () => void
	onCancelMultiSelect: () => void
	onMoveCardsClick: () => void
	onRemoveCards: () => void
}

export const MultiSelectScreen = (props: MultiSelectScreenProps) => {
	const {
		className,
		onSelectAllCards,
		onCancelMultiSelect,
		onMoveCardsClick,
		onRemoveCards
	} = props
	const shelfItems = useSelector(getViewPageShelfItems)
	// const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
	// const selectedCardIds = useSelector(getViewPageSelectedCardIds)
	// const [updateCardsMutation] = useUpdateCardsMutation()
	// updateCardsMutation({ cardIds: })

	const onRemoveCardsHandle = () => {
		onRemoveCards()
		// updateCardsMutation({ requestAction: 'removeCards', cardIds: selectedCardIds! })
	}
	const isMultiSelectActive = useSelector(getViewPageMultiSelectIsActive)

	const { t } = useTranslation('viewPage')

	if (!isMultiSelectActive) return null

	return (
		<div className={clsx(
			cls.MultiSelectScreen,
			className)}
		>
			<div className={cls.wrapper} >
				<div className={cls.innerWrapper} >
					<Button onClick={onCancelMultiSelect}>{t('cancel')}</Button>
					<Button variant='cancel' color='attention' onClick={onRemoveCardsHandle}>{t('remove')}</Button>
				</div>
				<div className={cls.innerWrapper} >
					<Button onClick={onSelectAllCards}>{t('select all')}</Button>
					{shelfItems
						&& shelfItems.length > 1
						&& <Button onClick={onMoveCardsClick}>{t('move selected cards')}</Button>
					}
				</div>


			</div>
		</div>
	)
}