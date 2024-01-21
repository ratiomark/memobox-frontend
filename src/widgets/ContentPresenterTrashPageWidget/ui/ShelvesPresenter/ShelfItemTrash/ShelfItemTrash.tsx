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
import { restoreShelfByIdThunk } from '@/features/TrashPageInitializer';

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

	const [isCollapsed, setIsCollapsed] = useState(true)

	const onCollapse = () => setIsCollapsed(prev => !prev)

	const boxes = (
		<ul className={cls.boxListWrapper} >
			{shelf.box.map(box => (
				<BoxItemTrash
					key={box.id}
					box={box as BoxSchemaDeleted}
					cardsCount={box._count.card}
					cards={box.card}
					buttonsBlockProps={{
						isCollapsed: true,
						showRemoveButton: false,
						showRestoreButton: false,
						showCollapseArrow: box._count.card > 0,
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