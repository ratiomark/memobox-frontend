import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { SideBarItemType } from '../../model/types/items';

import clsx from 'clsx';
import cls from './SidebarItem.module.scss'
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Icon } from '@/shared/ui/Icon/Icon';

interface SidebarItemProps {
	item: SideBarItemType,
	collapsed: boolean
}


export const SidebarItem = memo((props: SidebarItemProps) => {
	const {
		item,
		collapsed
	} = props
	const { t } = useTranslation()
	return (
		<AppLink
			className={clsx(
				cls.itemRedesigned,
				{ [cls.collapsedRedesigned]: collapsed }
			)}
			activeClassName={cls.active}
			additionalActiveClassName={collapsed ? cls.activeWhenCollapsed : ''}
			to={item.path}
		>
			<Icon Svg={item.Icon} />
			<span className={cls.link}>{t(item.text)}</span>
		</AppLink>
	)
})
SidebarItem.displayName = 'SidebarItem'