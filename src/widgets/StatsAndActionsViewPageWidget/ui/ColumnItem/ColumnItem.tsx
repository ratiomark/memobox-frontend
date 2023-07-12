import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ColumnItem.module.scss';
import { SortColumnObject } from '@/entities/User';
import { Switcher } from '@/shared/ui/Switcher';
import { Reorder, useDragControls, useMotionValue } from 'framer-motion';
import DragDotsIcon from '@/shared/assets/icons/dragDotsIcon2.svg'
import { Icon } from '@/shared/ui/Icon';
import { useEffect, useState } from 'react';

interface ColumnItemProps {
	className?: string
	column: SortColumnObject
	onSwitchClick: (column: SortColumnObject) => void
	// SortColumnValue
}

export const ColumnItem = (props: ColumnItemProps) => {
	const {
		className,
		column,
		onSwitchClick
	} = props
	const [isDragging, setIsDragging] = useState(false)
	const { t } = useTranslation()
	const controls = useDragControls()
	const isShelfColumn = column.value === 'shelf'
	const handleSwitchClick = () => onSwitchClick(column)
	const handleDragStart = () => {
		setIsDragging(true);
		document.body.classList.add('dragging');
	}
	const handleDragEnd = () => {
		setIsDragging(false);
		document.body.classList.remove('dragging');
	}

	if (isShelfColumn) {
		return (
			<li
				className={clsx(
					cls.ColumnItem,
					className)}
			>
				{t(column.content)}
				<Switcher isChecked={column.enabled} onClickSwitcher={handleSwitchClick} />
			</li>
		)
	}


	return (
		<Reorder.Item
			value={column}
			dragListener={false}
			dragControls={controls}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			className={clsx(
				cls.ColumnItem,
				className)}
		>

			<Icon
				Svg={DragDotsIcon}
				type={isDragging ? 'main' : 'hint'}
				onPointerDown={(e) => controls.start(e)}
				className={cls.dragIcon}
				style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
				width={25}
				height={25}
			/>
			{t(column.content)}
			<Switcher isChecked={column.enabled} onClickSwitcher={handleSwitchClick} />
		</Reorder.Item>
	)
}