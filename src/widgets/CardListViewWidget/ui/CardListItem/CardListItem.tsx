import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardListItem.module.scss';
import { CardSchema } from '@/entities/Card';
import { Card } from '@/shared/ui/Card';
import { MyText } from '@/shared/ui/Typography';
import TrashIcon from '@/shared/assets/icons/trashIcon.svg'
import ShareIcon from '@/shared/assets/icons/shareIcon.svg'
import { Icon } from '@/shared/ui/Icon';
import { getViewPageColumns, getViewPageMultiSelectIsActive } from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { CheckBox } from '@/shared/ui/CheckBox';

const formatDate = (ISODate: string) => {
	const date = new Date(ISODate)
	const day = date.getUTCDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	const minutes = date.getUTCMinutes()
	const hours = date.getUTCHours()
	return `${day}.${month}.${year}\n${hours}:${minutes < 10 ? '0' + minutes : minutes}`
}

interface CardListItemProps {
	className?: string
	card: CardSchema
	onSelectCard: (cardId: string) => void
	selectedCardIds: string[]
}

export const CardListItem = (props: CardListItemProps) => {
	const {
		className,
		card,
		onSelectCard,
		selectedCardIds,
	} = props
	const { t } = useTranslation()
	const multiSelectIsActive = useSelector(getViewPageMultiSelectIsActive)
	// обычный клик открывает модалку редактирования. Клик в режиме мультиселекта выбирает карточку
	// const [cardsSelected, setCardsSelected] = useState<CardSchema[]>([])\
	const onSelectCardHandle = () => onSelectCard(card._id)
	const isCardSelected = selectedCardIds.includes(card._id)
	const columns = useSelector(getViewPageColumns)
	const columnsRendered = useMemo(() => {
		return columns?.map(column => {
			if (column.enabled) { // VAR: отрисовываю данные, только для активных стобцов
				const columnValue = column.value
				const isColumnDate = columnValue === 'createdAt' || columnValue === 'lastTraining'
				if (isColumnDate) {
					return <MyText
						className={cls[columnValue]}
						key={column.index}
						saveOriginal
						text={formatDate(card[columnValue])}
						size='s'
					/>
				} else {
					return <MyText
						className={cls[columnValue]}
						key={column.index}
						text={card[columnValue]}
						size='s'
					/>
				}
			}
		})
	}, [card, columns])

	return (
		<li
			className={clsx(cls.item)}
			onClick={multiSelectIsActive ? onSelectCardHandle : null}
		>
			{/* <input type='checkbox' /> */}
			<div className={clsx(
				cls.CardListItem,
				isCardSelected ? cls.CardListItemSelected : '',
				className)}
			>
				<div className={cls.mainContentWrapper} >
					<MyText text={card.question} className={cls.mainContent} />
					<MyText text={card.answer} className={cls.mainContent} />
				</div>
				{columnsRendered}
				<div className={cls.icons} >
					<CheckBox isChecked={isCardSelected} onClick={onSelectCardHandle} />
					{/* <Icon
					Svg={ShareIcon}
					width={25}
					height={25}
				/> */}
					{/* <Icon
					// width={28}
					// height={28}
					Svg={TrashIcon}
					// type='cancel'
					className={cls.trashIcon}
				/> */}
				</div>
			</div>
		</li>
	)
}