import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelvesWrapper.module.scss';
import { Shelf, ShelfSchema } from '@/entities/Shelf';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { CardModal, cardModalActions } from '@/features/CardModal';
import { useCallback } from 'react';
import { ShelfButtons } from '@/entities/Shelf';

interface ShelvesWrapperProps {
	className?: string
	shelvesData?: ShelfSchema[]
	isShelvesLoading: boolean
}

export const ShelvesWrapper = (props: ShelvesWrapperProps) => {
	const {
		className,
		shelvesData,
		isShelvesLoading,
	} = props

	const dispatch = useAppDispatch()

	const onAddNewCardClick = useCallback((shelfId: string) => {
		dispatch(cardModalActions.setShelf(shelfId))
		dispatch(cardModalActions.openModalNewCard())
	}, [dispatch])

	const onCloseNewCardModal = useCallback(() => {
		dispatch(cardModalActions.closeModalNewCard())
	}, [dispatch])

	const shelves = shelvesData?.map(shelfItem => {
		const completeSmallDataLabelsBlock = (
			<CompleteSmallDataLabels
				isLoading={isShelvesLoading}
				data={shelfItem.data}
			/>
		)
		const onNewCardClickHandle = () => { onAddNewCardClick(shelfItem._id) }

		const shelfButtonsBlock = (
			<ShelfButtons
				shelfPosition={shelfItem.index + 1 ?? 11}
				onAddNewCardClick={onNewCardClickHandle}
				// onViewShelfClick={ }
			/>
		)

		const shelf = (
			<Shelf
				id={shelfItem._id}
				completeSmallDataLabelsBlock={completeSmallDataLabelsBlock}
				shelfButtonsBlock={shelfButtonsBlock}
				// data={shelfItem.data}
				// isLoading={isShelvesLoading}
				title={shelfItem.title}
				// position={shelfItem.index + 1}
				key={shelfItem.title}
			// onAddNewCardClick={onAddNewCardClick}
			/>
		)

		return shelf
	})

	const { t } = useTranslation()

	return (
		<div className={clsx(
			cls.ShelvesWrapper,
			className)}
		>
			{shelves}
			<CardModal type='newCard' onClose={onCloseNewCardModal} />
		</div>
	)
}