import clsx from 'clsx'
import cls from './ShelfItemTrash.module.scss'
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
import { useState } from 'react';
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
	const [isCollapsed, setIsCollapsed] = useState(true)
	const onCollapse = () => setIsCollapsed(prev => !prev)

	return (
		<HStack
			max
			className={clsx(cls.ShelfItem, [className])}
		>
			<Heading className={cls.title}
				as={'h3'}
				// size='s'
				// fontWeight='500'
				title={shelf.title} />
			<MyText
				size='s'
				text={shelf.boxesData.length}
			// title={shelf.title}
			/>
			<MyText
				size='s'
				text={'?'}
			/>
			<MyText
				saveOriginal
				size='s'
				text={shelf.dateTimeDeletion ?? formatDate('2022-03-27T08:36:08.269Z')}
			/>
			<div className={cls.buttons} >
				<Icon
					className={
						clsx(cls.arrow, !isCollapsed ? cls.rotateArrow : '')}
					clickable
					type='hint'
					Svg={ArrowBottomIcon}
					onClick={onCollapse}

				/>
				<Button>{t('restore')}</Button>
				<Icon
					Svg={TrashIcon}
					type='cancel'
					clickable
					withFill={false}
					width={22}
					height={22}
					onClick={() => { }}
					buttonSameSize={false}
					className={clsx(cls.icon, cls.removeIcon)}
				/>
			</div>
		</HStack>
	)
}