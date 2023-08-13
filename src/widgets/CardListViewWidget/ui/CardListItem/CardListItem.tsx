import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardListItem.module.scss';
import { CardSchemaExtended } from '@/entities/Card';
import { MyText } from '@/shared/ui/Typography';
// import TrashIcon from '@/shared/assets/icons/trashIcon.svg'
import ShareIcon from '@/shared/assets/icons/shareIcon.svg'
import { Icon } from '@/shared/ui/Icon';
import { getViewPageColumns, getViewPageMultiSelectIsActive, getViewPageSelectedCardIds, getViewPageShelvesDataDictionary, viewPageActions } from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { ChangeEvent, MouseEvent, useMemo, } from 'react';
import { CheckBox } from '@/shared/ui/CheckBox';
import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { AnimateSkeletonLoader, Collapsible } from '@/shared/ui/Animations';
import TrashIcon from '@/shared/assets/icons/trashIcon2.svg'
import { formatDate } from '@/shared/lib/helpers/common/formaters';

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
	const isMultiSelectActive = useSelector(getViewPageMultiSelectIsActive)
	const selectedCardIds = useSelector(getViewPageSelectedCardIds)
	const shelvesDataDictionary = useSelector(getViewPageShelvesDataDictionary)
	// обычный клик открывает модалку редактирования. Клик в режиме мультиселекта выбирает карточку
	// const [cardsSelected, setCardsSelected] = useState<CardSchema[]>([])\
	const dispatch = useAppDispatch()

	const onDeleteCard = (e: MouseEvent) => {
		e.stopPropagation()
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
		if (e.target instanceof HTMLElement
			&& (
				e.target.tagName === 'INPUT' ||
				e.target.tagName === 'BUTTON'
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
				} else if (columnValue === 'shelf') {
					return <MyText
						className={cls[columnValue]}
						align='center'
						key={column.index}
						// text={card[columnValue]}
						text={shelvesDataDictionary?.[card[columnValue]]?.shelfTitle ?? 'Ошибка в данных'}
						size='s'
					/>
				}
			}
		})

	}, [card, columns, shelvesDataDictionary])

	return (
		<Collapsible
			layout={false}
			initial={false}
			isOpen={!card.deleted}
		>
			<motion.li
				className={clsx(cls.item)}
				onClick={isMultiSelectActive ? onSelectCardByCardClick : onOpenEditCardModalHandle}
			>
				<CheckBox blurOnChange className={cls.checkBox} isChecked={isCardSelected} onClick={onSelectCardHandle} />

				<div
					className={cls.CardListItem}
				>
					<div className={cls.content} >

						<div className={cls.mainContentWrapper} >
							<MyText text={card.question} className={cls.mainContent} />
							<MyText text={card.answer} className={cls.mainContent} />
						</div>
						{/* <div className={cls.columns} > */}

						{/* </div> */}
						{columnsRendered}
					</div>

					{/* <AnimatePresence>
						{isMultiSelectActive
							&& <motion.div
								// initial={{ opacity: 0 }}
								// exit={{ opacity: 0 }}
								// animate={{ opacity: 1 }}
								transition={{ delay: 2 }}
								className={cls.icon}
							/>}
					</AnimatePresence>
					<AnimatePresence>
						{!isMultiSelectActive
							&& (
								<motion.div
									initial={{ opacity: 0 }}
									exit={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 2 }}
								>
								<Icon
									Svg={TrashIcon}
									type='cancel'
									clickable
									withFill={false}
									width={22}
									height={22}
									onClick={onDeleteCard}
									buttonSameSize={false}
									className={clsx(cls.icon, cls.removeIcon)} />
							</motion.div>
							)}
					</AnimatePresence> */}
					{isMultiSelectActive
						? <div className={cls.icon} />
						: (
							<Icon
								Svg={TrashIcon}
								type='cancel'
								clickable
								withFill={false}
								width={22}
								height={22}
								onClick={onDeleteCard}
								buttonSameSize={false}
								className={clsx(cls.icon, cls.removeIcon)} />
						)}
				</div>

				{/* </div> */}
			</motion.li>

		</Collapsible>
	)
}