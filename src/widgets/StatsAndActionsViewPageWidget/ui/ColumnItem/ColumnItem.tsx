import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ColumnItem.module.scss';
import { SortColumnObject } from '@/entities/User';
import { Switcher } from '@/shared/ui/Switcher';

interface ColumnItemProps {
	className?: string
	column: SortColumnObject
	onSwitchClick: (column: SortColumnObject) =>void
	// SortColumnValue
}

export const ColumnItem = (props: ColumnItemProps) => {
	const {
		className,
		column,
		onSwitchClick
	} = props

	const handleSwitchClick = () => onSwitchClick(column)
	const { t } = useTranslation()

	return (
		<li className={clsx(
			cls.ColumnItem,
			className)}
		>
			{t(column.content)}
			<Switcher isChecked={column.enabled} onClickSwitcher={handleSwitchClick} />
		</li>
	)
}