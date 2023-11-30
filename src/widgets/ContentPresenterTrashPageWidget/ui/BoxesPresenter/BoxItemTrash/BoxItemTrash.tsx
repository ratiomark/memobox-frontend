import clsx from 'clsx'
import cls from './BoxItemTrash.module.scss'
import { ShelfSchemaDeleted } from '@/entities/Trash';
import { Card } from '@/shared/ui/Card';
import { Heading, MyText } from '@/shared/ui/Typography';
import { HStack } from '@/shared/ui/Stack';
import { formatDate } from '@/shared/lib/helpers/common/formaters';
import { Icon } from '@/shared/ui/Icon';
import TrashIcon from '@/shared/assets/icons/trashIcon2.svg'
import { Button } from '@/shared/ui/Button';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import ArrowBottomIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { useMemo, useState } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { BoxSchemaDeleted } from '@/entities/Trash';
import { ButtonsBlockTrashEntity } from '../../ButtonsBlock/ButtonsBlockTrashEntity';
interface BoxItemTrashProps {
	className?: string;
	box: BoxSchemaDeleted
}

export const BoxItemTrash = (props: BoxItemTrashProps) => {
	const {
		className,
		box,
	} = props
	const { t } = useTranslation('trash-page')
	const dispatch = useAppDispatch()

	const [isCollapsed, setIsCollapsed] = useState(true)

	const onCollapse = () => setIsCollapsed(prev => !prev)
	const boxTitle = useMemo(() => {
		switch (box.specialType) {
			case 'none':
				return `${t('box text')} ${box.index}`
			case 'new':
				return t('new cards')
			default:
				return t('learnt cards')
		}
	}, [box.index, box.specialType, t])
	// const buttons = (
	// 	<div className={cls.buttons} >
	// 		<Icon
	// 			className={
	// 				clsx(cls.arrow, !isCollapsed ? cls.rotateArrow : '')}
	// 			clickable
	// 			type='hint'
	// 			Svg={ArrowBottomIcon}
	// 			onClick={onCollapse}
	// 		/>
	// 		<Button>{t('restore')}</Button>
	// 		<Icon
	// 			Svg={TrashIcon}
	// 			type='cancel'
	// 			clickable
	// 			withFill={false}
	// 			width={22}
	// 			height={22}
	// 			onClick={() => { }}
	// 			buttonSameSize={false}
	// 			className={clsx(cls.icon, cls.removeIcon)}
	// 		/>
	// 	</div>)

	const cards = (
		<ul>
		{/* {box.cards} */}
		</ul>
	)

	return (
		<li>

			<HStack
				max
				className={clsx(cls.BoxItem, [className])}
			>
				<Heading className={cls.title}
					as={'h3'}
					title={boxTitle} />
				<MyText
					size='s'
					text={box.cardsCount ?? 'xxx'}
				/>
				<MyText
					size='s'
					text={'?'}
				/>
				<MyText
					saveOriginal
					size='s'
					text={box.deletedAt ?? formatDate('2022-03-27T08:36:08.269Z')}
				/>
				<ButtonsBlockTrashEntity
					isCollapsed={isCollapsed}
					onCollapseClick={onCollapse}
				// onRestoreClick={() => { }}
				// onRemoveClick={() => { }}
				/>
			</HStack>
			{cards}
		</li>
	)
}