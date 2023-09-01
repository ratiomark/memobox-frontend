import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react'
import { Fragment, ReactNode } from 'react';
import { AbsoluteListDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';

import cls from './Dropdown.module.scss';


export interface DropdownItem {
	disabled?: boolean
	content?: ReactNode
	onClick?: () => void

}

interface DropdownProps {
	className?: string
	items: DropdownItem[]
	listDirection?: AbsoluteListDirection
}


const Dropdown = (props: DropdownProps) => {
	const {
		className,
		// trigger,
		items,
		listDirection = 'bottom_right',
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
				[className])}
		>
			{itemsRendered}
		</ul >
	)
}

