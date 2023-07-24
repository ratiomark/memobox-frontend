import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './MultiSelectScreen.module.scss';
import { useSelector } from 'react-redux';
import { getViewPageMultiSelectIsActive } from '@/features/ViewPageInitializer';
import { Button } from '@/shared/ui/Button';
import { useHotkeys } from 'react-hotkeys-hook';

interface MultiSelectScreenProps {
	className?: string
	onSelectAllCards: () => void
	onCancelMultiSelect: () => void
	onMoveCardsClick: () => void
}

export const MultiSelectScreen = (props: MultiSelectScreenProps) => {
	const {
		className,
		onSelectAllCards,
		onCancelMultiSelect,
		onMoveCardsClick
	} = props
	// useHotkeys('a', () => onCancelMultiSelect())
	// useHotkeys(positionTextCard, onAddNewCardHandle, { keydown: true, preventDefault: true, })
	// useHotkeys(positionTextTrain, startTraining,)

	const multiSelectIsActive = useSelector(getViewPageMultiSelectIsActive)

	const { t } = useTranslation('viewPage')

	if (!multiSelectIsActive) return null

	return (
		<div className={clsx(
			cls.MultiSelectScreen,
			className)}
		>
			<div className={cls.wrapper} >
				<div className={cls.innerWrapper} >
					<Button onClick={onCancelMultiSelect}>{t('cancel')}</Button>
					<Button variant='cancel' color='attention'>{t('remove')}</Button>
				</div>
				<div className={cls.innerWrapper} >
					<Button onClick={onSelectAllCards}>{t('select all')}</Button>
					<Button onClick={onMoveCardsClick}>{t('move selected cards')}</Button>
				</div>


			</div>
		</div>
	)
}