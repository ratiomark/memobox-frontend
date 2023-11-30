import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardsPresenter.module.scss';
import { useGetTrashQuery } from '@/entities/Trash';
import { CardItemTrash } from './CardItemTrash/CardItemTrash';
import { MultiSelectScreen } from '../MultiSelectScreen/MultiSelectScreen';
import {
	getTrashPageIsMoveCardsModalOpen,
	getTrashPageIsMultiSelectActive
} from '@/features/TrashPageInitializer';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';

interface CardsPresenterProps {
	className?: string
}

export const CardsPresenter = (props: CardsPresenterProps) => {
	const {
		className
	} = props
	const { isLoading, data, isError } = useGetTrashQuery()
	const { t } = useTranslation()
	const isMultiSelectActive = useSelector(getTrashPageIsMultiSelectActive)
	const isMoveCardsModalOpen = useSelector(getTrashPageIsMoveCardsModalOpen)

	const onCancelMultiSelect = () => { }
	const onSelectAllCards = () => { }
	const onMoveCardsClick = () => { }
	const onRemoveCards = () => { }
	useHotkeys('esc', onCancelMultiSelect, { enabled: isMultiSelectActive && !isMoveCardsModalOpen })
	useHotkeys('a', onSelectAllCards, { enabled: isMultiSelectActive })
	useHotkeys('r', onRemoveCards, { enabled: isMultiSelectActive })
	useHotkeys('m', onMoveCardsClick, { enabled: isMultiSelectActive })

	const cards = data?.cards.map(card => <CardItemTrash key={card.id} card={card} />)

	return (
		<div className={clsx(
			cls.CardsPresenter,
			className)}
		>
			{cards}
			<Suspense fallback={null}>
				<MultiSelectScreen
					onCancelMultiSelect={onCancelMultiSelect}
					onSelectAllCards={onSelectAllCards}
					onMoveCardsClick={onMoveCardsClick}
					onRemoveCards={onRemoveCards}
				/>
			</Suspense>
		</div>
	)
}