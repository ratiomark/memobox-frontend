import clsx from 'clsx'
import cls from './ShelfItemTrash.module.scss'
import { BoxSchemaDeleted, ShelfSchemaDeleted } from '@/entities/Trash';
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
import { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { BoxItemTrash } from '../../BoxesPresenter/BoxItemTrash/BoxItemTrash';
import { Collapsible } from '@/shared/ui/Animations';
import { ButtonsBlockTrashEntity } from '../../ButtonsBlock/ButtonsBlockTrashEntity';
interface ShelfItemProps {
	className?: string;
	shelf: ShelfSchemaDeleted
}

export const ShelfItemTrash = (props: ShelfItemProps) => {
	const {
		className,
		shelf,
	} = props
	const { t } = useTranslation('trash-page')
	const dispatch = useAppDispatch()

	// const boxesCount = shelf.box.length

	const [isCollapsed, setIsCollapsed] = useState(true)

	const onCollapse = () => setIsCollapsed(prev => !prev)

	// const buttons = (
	// 	<div className={cls.buttons} >
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
	// 		<Icon
	// 			className={
	// 				clsx(cls.arrow, !isCollapsed ? cls.rotateArrow : '')}
	// 			clickable
	// 			type='hint'
	// 			Svg={ArrowBottomIcon}
	// 			onClick={onCollapse}
	// 		/>
	// 	</div>)

	const boxes = (
		<div >
			{shelf.box.map(box => <BoxItemTrash key={box.id} box={box as BoxSchemaDeleted} />)}
		</div>
	)

	return (
		<div>

			<HStack
				max
				className={clsx(cls.ShelfItem, [className])}
			>
				<Heading className={cls.title}
					as={'h3'}
					title={shelf.title} />
				<MyText
					size='s'
					text={shelf.boxesCount ?? 'кол-во коробок'}
				/>
				<MyText
					size='s'
					text={shelf.cardsCount ?? 'кол-во карточек'}
				/>
				<MyText
					saveOriginal
					size='s'
					text={shelf.deletedAt ?? formatDate('2022-03-27T08:36:08.269Z')}
				/>
				<ButtonsBlockTrashEntity
					isCollapsed={isCollapsed}
					onCollapseClick={onCollapse}
				// onRestoreClick={() => { }}
				// onRemoveClick={() => { }}
				/>
			</HStack>
			{/* <Collapsible
				isOpen={!isCollapsed}
			>

				{boxes}
			</Collapsible> */}
			{!isCollapsed && boxes}
		</div>
	)
}