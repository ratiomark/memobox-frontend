import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './MultiSelectScreen.module.scss';
import { useSelector } from 'react-redux';
import { getViewPageMultiSelectIsActive } from '@/features/ViewPageInitializer';
import { Button } from '@/shared/ui/Button';

interface MultiSelectScreenProps {
	className?: string
	onSelectAllCards: () => void
	onCancelMultiSelect: () => void
}

export const MultiSelectScreen = (props: MultiSelectScreenProps) => {
	const {
		className,
		onSelectAllCards,
		onCancelMultiSelect
	} = props
	const multiSelectIsActive = useSelector(getViewPageMultiSelectIsActive)

	const { t } = useTranslation()

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
					<Button>{t('move selected cards')}</Button>
				</div>


			</div>
		</div>
	)
}