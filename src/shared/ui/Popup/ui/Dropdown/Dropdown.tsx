import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Menu } from '@headlessui/react'
import { Fragment, ReactNode } from 'react';
import { AbsoluteListDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';

import cls from './Dropdown.module.scss';
import { TEST_ENTITY_NAMES } from '@/shared/const/testConsts';


export interface DropdownItem {
	disabled?: boolean
	content?: ReactNode
	href?: string
	onClick?: () => void

}

interface DropdownProps {
	className?: string
	trigger: ReactNode
	items: DropdownItem[]
	listDirection?: AbsoluteListDirection
	asMainWrapper?: 'ul' | 'div' | 'ul'
	asListWrapper?: 'ul' | 'div' | 'ul'
	lastItemPadding?: boolean
}


export const Dropdown = (props: DropdownProps) => {
	const {
		className,
		trigger,
		items,
		asMainWrapper,
		asListWrapper,
		listDirection = 'bottom_right',
		lastItemPadding = false,
	} = props

	return (
		<Menu
			as={asMainWrapper ?? 'div'}
			className={clsx(
				cls.Dropdown,
				[className])}
		>
			{({ open }) => (
				<>
					<Menu.Button as={Fragment}>
						{trigger}
					</Menu.Button>

					<Menu.Items
						data-testid={open ? TEST_ENTITY_NAMES.dropdownItems : undefined}
						className={clsx(cls.menu, listDirection)}
						as={asListWrapper ?? 'ul'}
					>

						{items.map((item, index) => {
							const content = ({ active }: { active: boolean }) => (
								<li
									className={clsx(
										cls.menuItem,
										{ [cls.active]: active },
										{ [cls.disabled]: item.disabled },
										{ [cls.lastItemPadding]: index === items.length - 1 && lastItemPadding },
									)}
									onClick={item.onClick}
								>
									{item.content}
								</li>
							)

							if (item.href) {
								return (
									<Menu.Item as={AppLink} key={index} to={item.href} disabled={item.disabled}>
										{/* {({active, close})=>{}} */}
										{content}
									</Menu.Item>
								)
							}

							return (
								<Menu.Item key={index} as={Fragment}>
									{content}
								</Menu.Item>
							)
						})}

					</Menu.Items>
				</>
			)}
		</Menu >
	)
}

