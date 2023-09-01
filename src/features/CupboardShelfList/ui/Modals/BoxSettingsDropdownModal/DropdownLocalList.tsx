import { AbsoluteListDirection } from '@/shared/types/ui'
import clsx from 'clsx'
import { ReactNode } from 'react'
import cls from './DropdownLocalList.module.scss';

interface DropdownLocalListItem {
	disabled?: boolean
	content?: ReactNode
	onClick?: () => void
}

interface DropdownLocalListProps {
	className?: string
	items: DropdownLocalListItem[]
	listDirection?: AbsoluteListDirection
}


export const DropdownLocalList = (props: DropdownLocalListProps) => {
	const {
		className,
		items,
	} = props

	const itemsRendered = items.map((item, index) => {
		return (
			<li
				key={index}
				className={clsx(
					cls.menuItem,
					// { [cls.active]: active },
					{ [cls.disabled]: item.disabled },
				)}
				onClick={item.onClick}
			>
				{item.content}
			</li>)

	})

	return (
		<ul
			className={clsx(
				cls.menu,
				[className])
			}
		>
			{itemsRendered}
		</ul >
	)
}