import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardListItem.module.scss';
import { CardSchema, CardSchemaExtended } from '@/entities/Card';
import { Card } from '@/shared/ui/Card';
import { MyText } from '@/shared/ui/Typography';
import TrashIcon from '@/shared/assets/icons/trashIcon.svg'
import ShareIcon from '@/shared/assets/icons/shareIcon.svg'
import { Icon } from '@/shared/ui/Icon';
import { getViewPageColumns, getViewPageMultiSelectIsActive, getViewPageSelectedCardIds, viewPageActions } from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { ChangeEvent, MouseEvent, SyntheticEvent, useMemo, useState } from 'react';
import { CheckBox } from '@/shared/ui/CheckBox';
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Button } from '@/shared/ui/Button';
import { Collapsible } from '@/shared/ui/Animations';

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
	card: CardSchemaExtended
	onSelectCard: (cardId: string) => void
	// selectedCardIds: string[]
	onOpenEditCardModal: (card: CardSchemaExtended) => void
}

export const CardListItem = (props: CardListItemProps) => {
	const {
		className,
		card,
		onSelectCard,
		// selectedCardIds,
		onOpenEditCardModal,
	} = props
	const { t } = useTranslation()
	const multiSelectIsActive = useSelector(getViewPageMultiSelectIsActive)
	const selectedCardIds = useSelector(getViewPageSelectedCardIds)
	// обычный клик открывает модалку редактирования. Клик в режиме мультиселекта выбирает карточку
	// const [cardsSelected, setCardsSelected] = useState<CardSchema[]>([])\
	const dispatch = useAppDispatch()
	const onDeleteCard = () => {
		dispatch(viewPageActions.removeCard(card))
	}

	const onSelectCardHandle = (e: ChangeEvent) => {
		e.stopPropagation()
		if (e.target.tagName === 'INPUT') onSelectCard(card._id)
	}

	const onSelectCardByCardClick = (e: MouseEvent<HTMLLIElement>) => {
		if (e.target instanceof HTMLElement && (
			e.target.tagName === 'INPUT'
			|| e.target.tagName === 'BUTTON'
		)) {
			return
		}
		onSelectCard(card._id)
	}
	const onOpenEditCardModalHandle = (e: MouseEvent<HTMLLIElement>) => {
		if (e.target instanceof HTMLElement && (
			e.target.tagName === 'INPUT'
			|| e.target.tagName === 'BUTTON'
		)) {
			return
		}
		onOpenEditCardModal(card)
	}

	const isCardSelected = selectedCardIds?.includes(card._id) ?? false
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
		<Collapsible
			layout={false}
			initial={false}
			isOpen={!card.deleted}
		>

			<motion.li
				// variants={liAnimations}
				// initial='hidden'
				// exit={{ opacity: 0 }}
				// whileInView='visible'
				className={clsx(cls.item)}
				onClick={multiSelectIsActive ? onSelectCardByCardClick : onOpenEditCardModalHandle}
			>
				<CheckBox className={cls.checkBox} isChecked={isCardSelected} onClick={onSelectCardHandle} />
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
					{/* <Button disabled={multiSelectIsActive} onClick={onDeleteCard}>del</Button> */}
				</motion.div>
			</motion.li>


		</Collapsible>


		// </Collapsible> 
	)
}


//<div className={cls.icons} >
{/* <CheckBox isChecked={isCardSelected} onClick={onSelectCardHandle} /> */ }
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
//</div>