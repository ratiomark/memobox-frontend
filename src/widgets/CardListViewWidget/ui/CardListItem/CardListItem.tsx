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
import { ChangeEvent, MouseEvent, SyntheticEvent, useMemo, useState } from 'react';
import { CheckBox } from '@/shared/ui/CheckBox';
import { motion } from 'framer-motion'

const animations = {
	selected: {
		boxShadow: '0 0 3px 0px rgb(51 214 159 / 20%)',
		// border: '1px solid var(--accent)',
		transition: { duration: 0.7 }
	},
	regular: {
		// boxShadow:  '0 1px 4px rgb(0 0 0 / 10%)'
		// border: '1px solid var(--accent)',
		// transition: { duration: 2 }
	}
}
const liAnimations = {
	hidden: {
		opacity: 0.2,
		// border: '1px solid var(--accent)',
		// transition: { duration: 0.7 }
	},
	visible: {
		opacity: 1,
		// boxShadow:  '0 1px 4px rgb(0 0 0 / 10%)'
		// border: '1px solid var(--accent)',
		// transition: { duration: 2 }
	}
}

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
	onOpenEditCardModal: (card: CardSchema) => void
}

export const CardListItem = (props: CardListItemProps) => {
	const {
		className,
		card,
		onSelectCard,
		selectedCardIds,
		onOpenEditCardModal,
	} = props
	const { t } = useTranslation()
	const multiSelectIsActive = useSelector(getViewPageMultiSelectIsActive)
	// обычный клик открывает модалку редактирования. Клик в режиме мультиселекта выбирает карточку
	// const [cardsSelected, setCardsSelected] = useState<CardSchema[]>([])\

	const onSelectCardHandle = (e: ChangeEvent) => {
		if (e.target.tagName === 'INPUT') onSelectCard(card._id)
	}
	const onSelectCardByCardClick = (e: MouseEvent) => {
		// console.log(e.currentTarget.tagName)
		// e.stopPropagation()
		// if (e.currentTarget.tagName === 'INPUT') return
		onSelectCard(card._id)
	}
	const onOpenEditCardModalHandle = (e: MouseEvent<HTMLLIElement>) => {
		console.log(e.target.tagName)
		if (e.target.tagName === 'INPUT') return
		// console.log(e.currentTarget.tagName)
		// console.log(e.target.toString())
		// if (e.currentTarget.tagName === 'INPUT') return
		onOpenEditCardModal(card)
		// console.log('CLICK', e.target)
		// return
	}
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
		<motion.li
			// variants={liAnimations}
			// initial='hidden'
			// whileInView='visible'
			className={clsx(cls.item)}
			onClick={multiSelectIsActive ? onSelectCardByCardClick : onOpenEditCardModalHandle}
		>
			{/* <input type='checkbox' /> */}
			<motion.div
				// variants={animations}
				// initial={false}
				// animate={isCardSelected ? 'selected' : ''}
				className={clsx(
					cls.CardListItem,
					// isCardSelected ? cls.CardListItemSelected : '',
				)}
			// onClick={multiSelectIsActive ? onSelectCardHandle : onOpenEditCardModalHandle}
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
			</motion.div>
		</motion.li>
	)
}