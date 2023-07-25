import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './MultiSelectScreen.module.scss';
import { useSelector } from 'react-redux';
import { getViewPageMultiSelectIsActive } from '@/features/ViewPageInitializer';
import { Button } from '@/shared/ui/Button';
import { useHotkeys } from 'react-hotkeys-hook';
import { useGetShelvesQuery } from '@/entities/Cupboard';

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
					<Button variant='cancel' color='attention' onClick={onRemoveCards}>{t('remove')}</Button>
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