import clsx from 'clsx'
import cls from './CardItemTrash.module.scss'
import { useTranslation } from 'react-i18next';
import { CardSchemaDeleted } from '@/entities/Trash';
import { Icon } from '@/shared/ui/Icon';
import { MyText } from '@/shared/ui/Typography';
import { motion } from 'framer-motion';
import { EditorCardPresenter } from '@/shared/ui/LexicalEditor';
import { useMemo } from 'react';
import { CheckBox } from '@/shared/ui/CheckBox';
import TrashIcon from '@/shared/assets/icons/trashIcon2.svg'
import EyeIcon from '@/shared/assets/icons/eye2.svg'
import RestoreIcon from '@/shared/assets/icons/restoreIcon.svg'
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { deleteCardFromTrashByIdThunk, trashPageActions } from '@/features/TrashPageInitializer';
interface CardItemTrashProps {
	className?: string;
	card: CardSchemaDeleted
}

export const CardItemTrash = (props: CardItemTrashProps) => {
	const {
		card,
	} = props
	const isMultiSelectActive = false
	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	const onDeleteCard = () => {
		dispatch(deleteCardFromTrashByIdThunk(card.id))
	}

	const onRestoreCard = () => {
		dispatch(trashPageActions.setRestoreCardModalCardId(card.id))
		dispatch(trashPageActions.setIsRestoreCardModalOpen(true))
	}

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
		<motion.li
			// initial={{ opacity: 0 }}
			// animate={{ opacity: 1 }}
			// exit={{ opacity: 0, translateY: -64, transition: { delay: 0, duration: 4 } }}
			className={clsx(
				cls.item,
				// { [cls.isCardSelected]: isCardSelected }
			)}
		// onClick={isMultiSelectActive ? onSelectCardByCardClick : onOpenEditCardModalHandle}
		>
			<CheckBox
				blurOnChange
				className={cls.checkBox}
				isChecked={false}
				// isChecked={isCardSelected }
				onClick={() => { }}
			// onClick={onSelectCardHandle}
			/>
			<div className={cls.CardListItem}>
				<div className={cls.content} >
					<div className={cls.mainContentWrapper} >
						{question}
						{answer}
					</div>
					{/* {columnsRendered} */}
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
							// onClick={onOpenCardEditModalEyeIcon}
							onClick={() => { }}
							buttonSameSize={false}
							className={clsx(cls.icon, cls.eyeIcon)} />
					)
					// ? <div className={cls.icon} />
					: (
						<>
							<Icon
								Svg={RestoreIcon}
								type='main'
								clickable
								withFill={false}
								width={22}
								height={22}
								onClick={onRestoreCard}
								buttonSameSize={false}
								className={clsx(cls.icon, cls.restoreIcon)} />
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
						</>
					)}
			</div>
		</motion.li>
		// <div className={clsx(cls.CardItemTrash)} >
		// 	<motion.li
		// 		className={clsx(cls.item)}
		// 	// onClick={isMultiSelectActive ? onSelectCardByCardClick : onOpenEditCardModalHandle}
		// 	>
		// 		{/* <CheckBox className={cls.checkBox} isChecked={isCardSelected} onClick={onSelectCardHandle} /> */}

	// 		<div
	// 		// className={cls.CardListItem}
	// 		// onClick={isMultiSelectActive ? onSelectCardHandle : onOpenEditCardModalHandle}
	// 		>
	// 			<div className={cls.content} >

	// 				<div className={cls.mainContentWrapper} >
	// 					{question}
	// 					{answer}
	// 					{/* <MyText text={card.question ?? 'ТУТ null'} className={cls.mainContent} /> */}
	// 					{/* <MyText text={card.answer ?? 'ТУТ null'} className={cls.mainContent} /> */}
	// 				</div>
	// 			</div>
	// 			{isMultiSelectActive
	// 				? <div className={cls.icon} />
	// 				: (
	// 					<Icon
	// 						Svg={TrashIcon}
	// 						type='cancel'
	// 						clickable
	// 						withFill={false}
	// 						width={22}
	// 						height={22}
	// 						onClick={onDeleteCard}
	// 						buttonSameSize={false}
	// 						className={clsx(cls.icon, cls.removeIcon)} />
	// 				)}
	// 			{/* <Button disabled={isMultiSelectActive} onClick={onDeleteCard}>del</Button> */}
	// 		</div>

	// 		{/* </div> */}
	// 	</motion.li>
	// </div>
	)
}

function prepareEditorStateOnlyFirstFourNodes(editorStateStr: string | null) {
	if (!editorStateStr) return null
	const editorStateParsed = JSON.parse(editorStateStr)
	editorStateParsed.root.children = editorStateParsed.root.children.slice(0, 4)
	return JSON.stringify(editorStateParsed)
		.replace(/"format":"center"/g, '"format":""')
		.replace(/"format":"right"/g, '"format":""')
}
// import clsx from 'clsx'
// import cls from './CardItemTrash.module.scss'
// import { useTranslation } from 'react-i18next';
// import { CardSchemaDeleted } from '@/entities/Trash';
// import { Icon } from '@/shared/ui/Icon';
// import { MyText } from '@/shared/ui/Typography';
// import { motion } from 'framer-motion';
// import TrashIcon from '@/shared/assets/icons/trashIcon2.svg'
// import { EditorCardPresenter } from '@/shared/ui/LexicalEditor';
// import { useMemo } from 'react';

// interface CardItemTrashProps {
// 	className?: string;
// 	card: CardSchemaDeleted
// }

// export const CardItemTrash = (props: CardItemTrashProps) => {
// 	const {
// 		card,
// 	} = props
// 	const isMultiSelectActive = false
// 	const { t } = useTranslation()
// 	const onDeleteCard = () => { }
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
// 		<div className={clsx(cls.CardItemTrash)} >
// 			<motion.li
// 				className={clsx(cls.item)}
// 			// onClick={isMultiSelectActive ? onSelectCardByCardClick : onOpenEditCardModalHandle}
// 			>
// 				{/* <CheckBox className={cls.checkBox} isChecked={isCardSelected} onClick={onSelectCardHandle} /> */}

// 				<div
// 				// className={cls.CardListItem}
// 				// onClick={isMultiSelectActive ? onSelectCardHandle : onOpenEditCardModalHandle}
// 				>
// 					<div className={cls.content} >

// 						<div className={cls.mainContentWrapper} >
// 							{question}
// 							{answer}
// 							{/* <MyText text={card.question ?? 'ТУТ null'} className={cls.mainContent} /> */}
// 							{/* <MyText text={card.answer ?? 'ТУТ null'} className={cls.mainContent} /> */}
// 						</div>
// 					</div>
// 					{isMultiSelectActive
// 						? <div className={cls.icon} />
// 						: (
// 							<Icon
// 								Svg={TrashIcon}
// 								type='cancel'
// 								clickable
// 								withFill={false}
// 								width={22}
// 								height={22}
// 								onClick={onDeleteCard}
// 								buttonSameSize={false}
// 								className={clsx(cls.icon, cls.removeIcon)} />
// 						)}
// 					{/* <Button disabled={isMultiSelectActive} onClick={onDeleteCard}>del</Button> */}
// 				</div>

// 				{/* </div> */}
// 			</motion.li>
// 		</div>
// 	)
// }

// function prepareEditorStateOnlyFirstFourNodes(editorStateStr: string | null) {
// 	if (!editorStateStr) return null
// 	const editorStateParsed = JSON.parse(editorStateStr)
// 	editorStateParsed.root.children = editorStateParsed.root.children.slice(0, 4)
// 	return JSON.stringify(editorStateParsed)
// 		.replace(/"format":"center"/g, '"format":""')
// 		.replace(/"format":"right"/g, '"format":""')
// }