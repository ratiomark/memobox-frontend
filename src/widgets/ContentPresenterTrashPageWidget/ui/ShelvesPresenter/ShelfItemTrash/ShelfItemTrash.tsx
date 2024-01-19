import clsx from 'clsx'
import cls from './ShelfItemTrash.module.scss'
import { BoxSchemaDeleted, ShelfSchemaDeleted } from '@/entities/Trash';
import { Heading, MyText } from '@/shared/ui/Typography';
import { formatDate } from '@/shared/lib/helpers/common/formaters';
import { useTranslation } from 'react-i18next';
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { BoxItemTrash } from '../../BoxesPresenter/BoxItemTrash/BoxItemTrash';
import { ButtonsBlockTrashEntity } from '../../ButtonsBlockTrashEntity/ButtonsBlockTrashEntity';
import { rtkRestoreShelfById } from '@/entities/Shelf';
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
		const response = await dispatch(rtkRestoreShelfById(shelf.id)).unwrap()
		console.log(response)
	}
	// const boxesCount = shelf.box.length

	const [isCollapsed, setIsCollapsed] = useState(false)

	const onCollapse = () => setIsCollapsed(prev => !prev)

	const boxes = (
		<ul className={cls.boxListWrapper} >
			{shelf.box.map(box => (
				<BoxItemTrash
					key={box.id}
					box={box as BoxSchemaDeleted}
					cards={shelf.card.filter(card => card.boxId === box.id)}
					buttonsBlockProps={{
						isCollapsed: true,
						showRemoveButton: false,
						showRestoreButton: false,
					}}
				/>)
			)
			}
		</ul>
	)

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
				// onRemoveClick={() => { }}
				/>
			</div>
			{/* <Collapsible
				isOpen={!isCollapsed}
			>

				{boxes}
			</Collapsible> */}
			{!isCollapsed && boxes}
		</li>
	)
}