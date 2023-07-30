import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './MultiSelectScreen.module.scss';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui/Button';
import { useHotkeys } from 'react-hotkeys-hook';
import { useGetShelvesQuery } from '@/entities/Cupboard';
import { useUpdateCardsMutation } from '@/entities/Card';
import { getTrashPageIsMultiSelectActive, getTrashPageSelectedCardIds } from '@/features/TrashPageInitializer';

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
	const { data: shelvesData, isLoading: isShelvesLoading } = useGetShelvesQuery()
	const selectedCardIds = useSelector(getTrashPageSelectedCardIds)
	const [updateCardsMutation] = useUpdateCardsMutation()
	const isMultiSelectActive = useSelector(getTrashPageIsMultiSelectActive)
	// updateCardsMutation({ cardIds: })

	const onRemoveCardsHandle = () => {
		updateCardsMutation({ requestAction: 'removeCards', cardIds: selectedCardIds! })
		onRemoveCards()
	}

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
					{shelvesData
						&& shelvesData.length > 1
						&& <Button onClick={onMoveCardsClick}>{t('move selected cards')}</Button>
					}
				</div>


			</div>
		</div>
	)
}