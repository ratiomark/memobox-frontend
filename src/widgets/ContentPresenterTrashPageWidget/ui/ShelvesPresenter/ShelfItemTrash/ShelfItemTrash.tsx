import clsx from 'clsx'
import cls from './ShelfItemTrash.module.scss'
import { BoxSchemaDeleted, ShelfSchemaDeleted } from '@/entities/Trash';
import { Heading, MyText } from '@/shared/ui/Typography';
import { formatDate } from '@/shared/lib/helpers/common/formaters';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { BoxItemTrash } from '../../BoxesPresenter/BoxItemTrash/BoxItemTrash';
import { ButtonsBlockTrashEntity } from '../../ButtonsBlockTrashEntity/ButtonsBlockTrashEntity';
import { restoreShelfByIdThunk, trashPageActions } from '@/features/TrashPageInitializer';
import { deleteFinalShelfByIdThunk } from '@/features/TrashPageInitializer';
import { BoxItemTrashLearnt } from '../../BoxesPresenter/BoxItemTrash/BoxItemTrashLearnt';
import { BoxItemTrashNew } from '../../BoxesPresenter/BoxItemTrash/BoxItemTrashNew';

interface ShelfItemProps {
	shelf: ShelfSchemaDeleted
}

export const ShelfItemTrash = (props: ShelfItemProps) => {
	const {
		shelf,
	} = props
	const { t } = useTranslation('trash-page')
	const dispatch = useAppDispatch()

	const onRestoreClick = async () => {
		const response = await dispatch(restoreShelfByIdThunk({ shelfId: shelf.id, title: shelf.title }))
		console.log(response)
	}

	const onDeleteClick = async () => {
		const response = await dispatch(deleteFinalShelfByIdThunk({ shelfId: shelf.id, title: shelf.title }))
		console.log(response)
	}

	const [isCollapsed, setIsCollapsed] = useState(true)

	const onCollapse = () => setIsCollapsed(prev => !prev)

	const boxes = (
		<ul className={cls.boxListWrapper}>
			{shelf.box.map(box => {
				const propsObject = {
					box: box,
					cards: box.card,
					cardsCount: box._count.card,
				}
				const buttonsBlockProps = {
					isCollapsed: true,
					showCollapseArrow: box._count.card > 0,
					showRemoveButton: false,
					showRestoreButton: false,
				}
				switch (box.specialType) {
					case 'none':
						return <BoxItemTrash
							key={box.id}
							{...propsObject}
							buttonsBlockProps={{ ...buttonsBlockProps }}
						/>
					case 'new':
						return <BoxItemTrashNew
							key={box.id}
							{...propsObject}
							buttonsBlockProps={{ ...buttonsBlockProps }}
						/>
					case 'learnt':
						return <BoxItemTrashLearnt
							key={box.id}
							{...propsObject}
							buttonsBlockProps={{ ...buttonsBlockProps }}
						/>
				}
			}
			)}
		</ul>
	)
	// const boxes = (
	// 	<ul className={cls.boxListWrapper} >
	// 		{shelf.box.map(box => (
	// 			<BoxItemTrash
	// 				key={box.id}
	// 				box={box as BoxSchemaDeleted}
	// 				cardsCount={box._count.card}
	// 				cards={box.card}
	// 				buttonsBlockProps={{
	// 					isCollapsed: true,
	// 					showRemoveButton: false,
	// 					showRestoreButton: false,
	// 					showCollapseArrow: box._count.card > 0,
	// 				}}
	// 			/>)
	// 		)
	// 		}
	// 	</ul>
	// )

	return (
		<li>
			<div
				className={cls.ShelfItem}
			>
				<Heading className={cls.title}
					as={'h3'}
					title={shelf.title} />
				<div className={cls.shelfItemContent} >
					<MyText
						size='s'
						text={shelf.boxesCount ?? 'кол-во коробок'}
						className={cls.boxesCardsText}
					/>
					<MyText
						size='s'
						text={shelf.cardsCount ?? 'кол-во карточек'}
						className={cls.boxesCardsText}
					/>
					<MyText
						saveOriginal
						size='s'
						text={formatDate(shelf.deletedAt) ?? ''}
					/>
				</div>
				<ButtonsBlockTrashEntity
					isCollapsed={isCollapsed}
					onToggleCollapse={onCollapse}
					onRestore={onRestoreClick}
					onRemove={onDeleteClick}
				/>
			</div>
			{!isCollapsed && boxes}
		</li>
	)
}