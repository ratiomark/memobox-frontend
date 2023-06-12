import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CupboardShelfList.module.scss';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useEffect } from 'react';
import { fetchCupboardData } from '../model/services/fetchCupboardData';
import { useSelector } from 'react-redux';
import {
	getCupboardData,
	getCupboardIsLoading,
	getCupboardError,
	getCupboardShelves
} from '../model/selectors/getCupboardShelfList';
import { getCupboardState } from '../model/slice/cupboardShelfListSlice';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ShelfItem } from './ShelfItem/ShelfItem';
import { ShelfButtons } from './ShelfButtons/ShelfButtons';
import { CompleteBigDataLabels } from '@/shared/ui/DataLabels/CompleteBigDataLabels/CompleteBigDataLabels';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { ShelfSkeleton } from '@/entities/Shelf';
import { getJsonSavedData } from '@/entities/User';
import { getUserShelfNamesList } from '@/entities/User';
import { CommonShelf } from './CommonShelf/CommonShelf';

interface CupboardShelfListProps {
	className?: string
}

// Этот компонент будет работать с полками. 
export const CupboardShelfList = (props: CupboardShelfListProps) => {
	const {
		className
	} = props
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const shelfNamesList = useSelector(getUserShelfNamesList)
	const cupboardData = useSelector(getCupboardData)
	const cupboardIsLoading = useSelector(getCupboardIsLoading)
	const cupboardError = useSelector(getCupboardError)
	const cupboardShelves = useSelector(getCupboardState.selectAll)

	// нужно подтянуть количество полок из профиля юзера, чтобы отрисовать соответствующее количесвто скелетонов.
	// shelvesCount
	useEffect(() => {
		dispatch(fetchCupboardData())
	}, [dispatch])

	useEffect(() => {
		if (!cupboardIsLoading) {
			const trainButtons = document.querySelectorAll('[data-button-type="shelf-train"]') as NodeListOf<HTMLButtonElement>
			const addCardButtons = document.querySelectorAll('[data-button-type="shelf-add-card"]') as NodeListOf<HTMLButtonElement>
			const buttonsWidthList: number[] = []
			const addCardsButtonsWidthList: number[] = []
			trainButtons.forEach(button => buttonsWidthList.push(button.clientWidth))
			addCardButtons.forEach(button => addCardsButtonsWidthList.push(button.clientWidth))
			const maxButtonWidth = Math.ceil(Math.max(...buttonsWidthList))
			const addCardMaxButtonWidth = Math.ceil(Math.max(...addCardsButtonsWidthList))
			trainButtons.forEach(button => button.style.minWidth = `${maxButtonWidth + 2}px`)
			addCardButtons.forEach(button => button.style.minWidth = `${addCardMaxButtonWidth + 2}px`)
		}
	}, [cupboardIsLoading])


	if (cupboardIsLoading) {
		return <>
			<CommonShelf data={cupboardData} isLoading={cupboardIsLoading} />
			{shelfNamesList!.map(title => <ShelfSkeleton key={title} title={title} />)}
		</>
	}

	return (
		<div className={clsx(
			cls.cupboardShelfList,
			className)}
		>
			<CommonShelf data={cupboardData} isLoading={cupboardIsLoading} />
			{cupboardShelves.map(shelf => {
				const buttons =
					<ShelfButtons
						shelfId={shelf.id}
						shelfPosition={shelf.index}
						onAddNewCardClick={() => { }}
						onViewShelfClick={() => { }}
						key={shelf.id}
					/>
				const completeSmallDataLabels =
					<CompleteSmallDataLabels
						data={shelf.data}
						isLoading={cupboardIsLoading}
					/>
				// ShelfItem должен рабоать даже если isLoading, чтобы можно было анимировать CompleteSmallDataLabels
				return (
					<ShelfItem
						key={shelf.id}
						id={shelf.id}
						title={shelf.title}
						completeSmallDataLabelsBlock={
							completeSmallDataLabels
						}
						shelfButtonsBlock={buttons}
						index={shelf.index}
					/>
				)
			})}
		</div>
	)
}