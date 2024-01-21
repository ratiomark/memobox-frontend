import clsx from 'clsx'
import cls from './BoxItemTrash.module.scss'
import { CardSchemaDeleted, ShelfSchemaDeleted } from '@/entities/Trash';
import { Card } from '@/shared/ui/Card';
import { Heading, MyText } from '@/shared/ui/Typography';
import { HStack } from '@/shared/ui/Stack';
import { getTiming } from '@/entities/Box';
import { formatDate, } from '@/shared/lib/helpers/common/formaters';
import { Icon } from '@/shared/ui/Icon';
import TrashIcon from '@/shared/assets/icons/trashIcon2.svg'
import { Button } from '@/shared/ui/Button';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { useMemo, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { BoxSchemaDeleted } from '@/entities/Trash';
import { ButtonsBlockTrashEntity, ButtonsBlockTrashEntityProps } from '../../ButtonsBlockTrashEntity/ButtonsBlockTrashEntity';
import { CardItemTrash } from '../../CardsPresenter/CardItemTrash/CardItemTrash';
interface BoxItemTrashProps {
	className?: string;
	box: BoxSchemaDeleted
	cards?: CardSchemaDeleted[]
	cardsCount?: number
	buttonsBlockProps?: ButtonsBlockTrashEntityProps
	showShelfTitle?: boolean
}

export const BoxItemTrash = (props: BoxItemTrashProps) => {
	const {
		className,
		box,
		cards,
		cardsCount,
		buttonsBlockProps,
		showShelfTitle,
	} = props
	const { t } = useTranslation('trash-page')
	const dispatch = useAppDispatch()

	const [isCollapsed, setIsCollapsed] = useState(buttonsBlockProps?.isCollapsed ?? true)

	const onCollapse = () => setIsCollapsed(prev => !prev)
	const boxTitle = useMemo(() => {
		switch (box.specialType) {
			case 'none':
				return `${t('box text')} ${box.index} - ${getTiming(box.timing)}`
			case 'new':
				return t('new cards')
			default:
				return `${t('learnt cards')} - ${getTiming(box.timing)}`
		}
	}, [box.index, box.specialType, t, box.timing])


	const cardsBlock = (
		<ul style={{ paddingLeft: 30 }}>
			{cards?.map(card => <CardItemTrash key={card.id} card={card} />)}
		</ul>
	)

	return (
		<li>

			<HStack
				max
				justify='between'
				className={clsx(cls.BoxItem, [className])}
			>
				<Heading className={cls.title}
					as={'h3'}
					title={boxTitle} />
				<div className={cls.boxItemContent} >
					<MyText
						size='s'
						text={showShelfTitle ? box.shelf.title : ' '}
						className={cls.boxesCardsText}
					/>
					<MyText
						size='s'
						text={cardsCount}
						className={cls.boxesCardsText}
					/>
					<MyText
						saveOriginal
						size='s'
						text={formatDate(box.deletedAt) ?? ''}
					/>
				</div>
				<ButtonsBlockTrashEntity
					{...buttonsBlockProps}
					isCollapsed={isCollapsed}
					onToggleCollapse={onCollapse}
				// onRestoreClick={() => { }}
				// onRemoveClick={() => { }}
				/>
			</HStack>
			{!isCollapsed && cardsBlock}
		</li>
	)
}