import clsx from 'clsx';
import cls from './CardListItem.module.scss';
import { CardSchemaExtended, getCardMainData } from '@/entities/Card';
import { MyText } from '@/shared/ui/Typography';
// import ShareIcon from '@/shared/assets/icons/shareIcon.svg'
import { Icon } from '@/shared/ui/Icon';
import {
	getViewPageColumns,
	getViewPageMultiSelectIsActive,
	getViewPageShelvesDataDictionary,
	viewPageActions,
} from '@/features/ViewPageInitializer';
import { useSelector } from 'react-redux';
import { ChangeEvent, MouseEvent,  useMemo, } from 'react';
import { CheckBox } from '@/shared/ui/CheckBox';
import {  motion } from 'framer-motion'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { Collapsible } from '@/shared/ui/Animations';
import TrashIcon from '@/shared/assets/icons/trashIcon2.svg'
import EyeIcon from '@/shared/assets/icons/eye2.svg'
import { formatDate, timeLeft } from '@/shared/lib/helpers/common/formaters';
import { EditorCardPresenter } from '@/shared/ui/LexicalEditor';
import { CardDeleting } from '../CardDeleting/CardDeleting';
import { getViewPageIsCardEdited, getViewPageIsCardSelected } from '@/features/ViewPageInitializer';

interface CardListItemProps {
	className?: string
	card: CardSchemaExtended
	onSelectCard: (cardId: string) => void
	// selectedCardIds: string[]
	onOpenEditCardModal: (card: CardSchemaExtended) => void
}

export const CardListItem = (props: CardListItemProps) => {
	const {
		card,
		onSelectCard,
		onOpenEditCardModal,
	} = props
	const dispatch = useAppDispatch()
	const isMultiSelectActive = useSelector(getViewPageMultiSelectIsActive)
	const shelvesDataDictionary = useSelector(getViewPageShelvesDataDictionary)
	const isCardEdited = useSelector(getViewPageIsCardEdited(card.id))
	const isCardSelected = useSelector(getViewPageIsCardSelected(card.id))
	const columns = useSelector(getViewPageColumns)
	// const cardsEditedListIds = useSelector(getViewPageCardEditedListIds)
	// const isCardEdited = cardsEditedListIds?.includes(card.id)
	// обычный клик открывает модалку редактирования. Клик в режиме мультиселекта выбирает карточку

	const onDeleteCard = (e: MouseEvent) => {
		e.stopPropagation()
		dispatch(viewPageActions.setCardIsDeleting(card.id))
		// dispatch(viewPageActions.setCardIsDeleting(getCardMainData(card)))
	}
	const onOpenCardEditModalEyeIcon = (e: MouseEvent) => {
		e.stopPropagation()
		onOpenEditCardModal(card)
		// dispatch(viewPageActions.setCardIsDeleting(getCardMainData(card)))
	}

	const onSelectCardHandle = (e: ChangeEvent) => {
		e.stopPropagation()
		if (e.target.tagName === 'INPUT') onSelectCard(card.id)
	}

	const onSelectCardByCardClick = (e: MouseEvent<HTMLLIElement>) => {
		if (e.target instanceof HTMLElement && (
			e.target.tagName === 'INPUT' ||
			e.target.tagName === 'BUTTON'
		)) {
			return
		}
		onSelectCard(card.id)
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

	const columnsRendered = useMemo(() => {
		return columns?.map(column => {
			if (column.enabled) { // VAR: отрисовываю данные, только для активных стобцов
				const columnValue = column.value
				const isColumnDate =
					   columnValue === 'createdAt'
					|| columnValue === 'lastTraining'
					|| columnValue === 'nextTraining'
				if (isColumnDate) {
					return <MyText
						className={cls[columnValue]}
						key={column.index}
						saveOriginal

						text={
								 formatDate(card[columnValue])
						}
						// text={
						// 	columnValue === 'nextTraining'
						// 		? card[columnValue]
						// 		// ? timeLeft(card[columnValue])
						// 		: formatDate(card[columnValue])
						// }
						size='s'
					/>
				} else if (columnValue === 'shelfId') {
					return <MyText
						className={cls[columnValue]}
						align='center'
						key={column.index}
						// text={card[columnValue]}
						text={shelvesDataDictionary?.[card[columnValue]]?.shelfTitle ?? '__error__'}
						size='s'
					/>
				}
			}
		})

	}, [card, columns, shelvesDataDictionary])

	const question = useMemo(() => {
		return <EditorCardPresenter
			editorState={prepareEditorStateOnlyFirstFourNodes(card.question)}
		/>
	}, [card.question])

	const answer = useMemo(() => {
		return <EditorCardPresenter
			editorState={prepareEditorStateOnlyFirstFourNodes(card.answer)}
		/>
	}, [card.answer])

	return (
		<Collapsible
			layout={false}
			initial={false}
			isOpen={!card.isDeleted}
			className={cls.cardCollapse}
		>
			{card.isDeleting
				? (<CardDeleting card={card} cardId={card.id} isCardDeleting={card.isDeleting} />)
				: (
					<motion.li
						// initial={{ opacity: 0 }}
						// animate={{ opacity: 1 }}
						// exit={{ opacity: 0, translateY: -64, transition: { delay: 0, duration: 4 } }}
						className={clsx(
							cls.item,
							{ [cls.isCardSelected]: isCardSelected }
						)}
						onClick={isMultiSelectActive ? onSelectCardByCardClick : onOpenEditCardModalHandle}
					>
						<CheckBox
							blurOnChange
							className={cls.checkBox}
							isChecked={isCardSelected}
							onClick={onSelectCardHandle}
						/>
						<div className={cls.CardListItem}>
							{isCardEdited && <div className={cls.cardEditedLabel} >
								<div className={cls.innerLabel} />
								{/* <Icon
							width={24}
							height={24}
							Svg={UnsavedIcon}
						/> */}
							</div>
							}
							<div className={cls.content} >
								<div className={cls.mainContentWrapper} >
									{question}
									{answer}
								</div>
								{columnsRendered}
							</div>
							{isMultiSelectActive
								? (
									<Icon
										Svg={EyeIcon}
										type='main'
										clickable
										withFill={false}
										width={22}
										height={22}
										onClick={onOpenCardEditModalEyeIcon}
										buttonSameSize={false}
										className={clsx(cls.icon, cls.eyeIcon)} />
								)
								// ? <div className={cls.icon} />
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
					</motion.li>
				)}
		</Collapsible>
	)
}


function prepareEditorStateOnlyFirstFourNodes(editorStateStr: string | null) {
	if(!editorStateStr) return null
	const editorStateParsed = JSON.parse(editorStateStr)
	editorStateParsed.root.children = editorStateParsed.root.children.slice(0, 4)
	return JSON.stringify(editorStateParsed)
		.replace(/"format":"center"/g, '"format":""')
		.replace(/"format":"right"/g, '"format":""')
} 
// import clsx from 'clsx';
// import cls from './CardListItem.module.scss';
// import { useTranslation } from 'react-i18next';
// import { CardSchemaExtended } from '@/entities/Card';
// import { MyText } from '@/shared/ui/Typography';
// // import TrashIcon from '@/shared/assets/icons/trashIcon.svg'
// // import ShareIcon from '@/shared/assets/icons/shareIcon.svg'
// import { Icon } from '@/shared/ui/Icon';
// import { getViewPageCardEditedListIds, getViewPageColumns, getViewPageMultiSelectIsActive, getViewPageSelectedCardIds, getViewPageShelvesDataDictionary, viewPageActions } from '@/features/ViewPageInitializer';
// import { useSelector } from 'react-redux';
// import { ChangeEvent, MouseEvent, useMemo, useState, } from 'react';
// import { CheckBox } from '@/shared/ui/CheckBox';
// import { AnimatePresence, motion } from 'framer-motion'
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { Collapsible } from '@/shared/ui/Animations';
// import UnsavedIcon from '@/shared/assets/icons/unsavedIcon.svg'
// import TrashIcon from '@/shared/assets/icons/trashIcon2.svg'
// import { formatDate } from '@/shared/lib/helpers/common/formaters';
// import { EditorCardPresenter } from '@/shared/ui/LexicalEditor';

// const animations = {
// 	selected: {
// 		boxShadow: '0 0 3px 0px rgb(51 214 159 / 20%)',
// 		// border: '1px solid var(--accent)',
// 		transition: { duration: 0.7 }
// 	},
// 	regular: {
// 		// boxShadow:  '0 1px 4px rgb(0 0 0 / 10%)'
// 		// border: '1px solid var(--accent)',
// 		// transition: { duration: 2 }
// 	}
// }
// const liAnimations = {
// 	hidden: {
// 		opacity: 0.2,
// 		// border: '1px solid var(--accent)',
// 		// transition: { duration: 0.7 }
// 	},
// 	visible: {
// 		opacity: 1,
// 		// boxShadow:  '0 1px 4px rgb(0 0 0 / 10%)'
// 		// border: '1px solid var(--accent)',
// 		// transition: { duration: 2 }
// 	}
// }


// interface CardListItemProps {
// 	className?: string
// 	card: CardSchemaExtended
// 	onSelectCard: (cardId: string) => void
// 	// selectedCardIds: string[]
// 	onOpenEditCardModal: (card: CardSchemaExtended) => void
// }

// export const CardListItem = (props: CardListItemProps) => {
// 	const {
// 		className,
// 		card,
// 		onSelectCard,
// 		onOpenEditCardModal,
// 	} = props
// 	const { t } = useTranslation()
// 	const isMultiSelectActive = useSelector(getViewPageMultiSelectIsActive)
// 	const selectedCardIds = useSelector(getViewPageSelectedCardIds)
// 	const shelvesDataDictionary = useSelector(getViewPageShelvesDataDictionary)
// 	const cardsEditedListIds = useSelector(getViewPageCardEditedListIds)
// 	const isCardEdited = cardsEditedListIds?.includes(card.id)
// 	// обычный клик открывает модалку редактирования. Клик в режиме мультиселекта выбирает карточку
// 	// const [cardsSelected, setCardsSelected] = useState<CardSchema[]>([])\
// 	const dispatch = useAppDispatch()

// 	const [showEditor, setShowEditor] = useState(false)
// 	const toogleEditor = () => setShowEditor(prev => !prev)

// 	const onDeleteCard = (e: MouseEvent) => {
// 		e.stopPropagation()
// 		dispatch(viewPageActions.removeCard(card))
// 	}

// 	const onSelectCardHandle = (e: ChangeEvent) => {
// 		e.stopPropagation()
// 		if (e.target.tagName === 'INPUT') onSelectCard(card.id)
// 	}

// 	const onSelectCardByCardClick = (e: MouseEvent<HTMLLIElement>) => {
// 		if (e.target instanceof HTMLElement && (
// 			e.target.tagName === 'INPUT'
// 			|| e.target.tagName === 'BUTTON'
// 		)) {
// 			return
// 		}
// 		onSelectCard(card.id)
// 	}

// 	const onOpenEditCardModalHandle = (e: MouseEvent<HTMLLIElement>) => {
// 		if (e.target instanceof HTMLElement
// 			&& (
// 				e.target.tagName === 'INPUT' ||
// 				e.target.tagName === 'BUTTON'
// 			)) {
// 			return
// 		}
// 		onOpenEditCardModal(card)
// 	}

// 	const isCardSelected = selectedCardIds?.includes(card.id) ?? false
// 	const columns = useSelector(getViewPageColumns)

// 	const columnsRendered = useMemo(() => {
// 		return columns?.map(column => {
// 			if (column.enabled) { // VAR: отрисовываю данные, только для активных стобцов
// 				const columnValue = column.value
// 				const isColumnDate = columnValue === 'createdAt' || columnValue === 'lastTraining'
// 				if (isColumnDate) {
// 					return <MyText
// 						className={cls[columnValue]}
// 						key={column.index}
// 						saveOriginal
// 						text={formatDate(card[columnValue])}
// 						size='s'
// 					/>
// 				} else if (columnValue === 'shelf') {
// 					return <MyText
// 						className={cls[columnValue]}
// 						align='center'
// 						key={column.index}
// 						// text={card[columnValue]}
// 						text={shelvesDataDictionary?.[card[columnValue]]?.shelfTitle ?? 'Ошибка в данных'}
// 						size='s'
// 					/>
// 				}
// 			}
// 		})

// 	}, [card, columns, shelvesDataDictionary])

// 	// VAR: Тут нужно следить за изменениями которые юзер вносит в карточку. Например, если пользвоатеьль изменит текст вопроса, а потом сохранит карточку, то это нужно будет отобразить
// 	const question = useMemo(() => {
// 		return <EditorCardPresenter
// 			editorState={prepareEditorStateOnlyFirstFourNodes(card.question)}
// 		/>
// 	}, [card.question])

// 	const answer = useMemo(() => {
// 		return <EditorCardPresenter
// 			editorState={prepareEditorStateOnlyFirstFourNodes(card.answer)}
// 		/>
// 	}, [card.answer])

// 	return (
// 		<Collapsible
// 			layout={false}
// 			initial={false}
// 			isOpen={!card.deleted}
// 			className={cls.cardCollapse}
// 		>
// 			{card.isDeleting ?
// 				<CardDeleting card={card}	/>
		
// 			{!card.deleted && (
// 				<motion.li
// 					// initial={{ opacity: 0 }}
// 					// animate={{ opacity: 1 }}
// 					// exit={{ opacity: 0, translateY: -64, transition: { delay: 0, duration: 4 } }}
// 					className={clsx(
// 						cls.item,
// 						{ [cls.isCardSelected]: isCardSelected }
// 					)}
// 					onClick={isMultiSelectActive ? onSelectCardByCardClick : onOpenEditCardModalHandle}
// 				>
// 					<CheckBox
// 						blurOnChange
// 						className={cls.checkBox}
// 						isChecked={isCardSelected}
// 						onClick={onSelectCardHandle}
// 					/>
// 					{/* {isCardEdited && <div className={cls.cardEditedLabel} >
// 						<div className={cls.innerLabel} />
// 					</div>} */}
// 					{/* {isCardEdited && <div className={cls.cardEditedLabel} >
// 						<p style={{ color: 'white' }}>Edited</p>
// 					</div>} */}
// 					<div
// 						className={cls.CardListItem}
// 					>
// 						{isCardEdited && <div className={cls.cardEditedLabel} >
// 							<div className={cls.innerLabel} />
// 							{/* <Icon
// 							width={24}
// 							height={24}
// 							Svg={UnsavedIcon}
// 						/> */}
// 						</div>}
// 						<div className={cls.content} >
// 							<div className={cls.mainContentWrapper} >
// 								{question}
// 								{answer}
// 							</div>
// 							{columnsRendered}
// 						</div>
// 						{isMultiSelectActive
// 							? <div className={cls.icon} />
// 							: (
// 								<Icon
// 									Svg={TrashIcon}
// 									type='cancel'
// 									clickable
// 									withFill={false}
// 									width={22}
// 									height={22}
// 									onClick={onDeleteCard}
// 									buttonSameSize={false}
// 									className={clsx(cls.icon, cls.removeIcon)} />
// 							)}
// 					</div>
// 				</motion.li>
// 			)}
// 		</Collapsible>
// 	)
// }

// function prepareEditorStateOnlyFirstFourNodes(editorStateStr: string) {
// 	const editorStateParsed = JSON.parse(editorStateStr)
// 	editorStateParsed.root.children = editorStateParsed.root.children.slice(0, 4)
// 	return JSON.stringify(editorStateParsed)
// 		.replace(/"format":"center"/g, '"format":""')
// 		.replace(/"format":"right"/g, '"format":""')
// }