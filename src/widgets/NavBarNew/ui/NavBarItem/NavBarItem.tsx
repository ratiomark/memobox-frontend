import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderItemType } from '../../model/types/items';

import clsx from 'clsx';
import cls from './NavBarItem.module.scss'
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Icon } from '@/shared/ui/Icon/Icon';

interface HeaderItemProps {
	item: HeaderItemType,
}


export const NavBarItem = memo((props: HeaderItemProps) => {
	const {
		item,
	} = props
	const { t } = useTranslation()
	return (
		<li>
			<AppLink
				className={clsx(
					cls.item,
					// { [cls.collapsedRedesigned]: collapsed }
				)}
				activeClassName={cls.active}
				// additionalActiveClassName={collapsed ? cls.activeWhenCollapsed : ''}
				to={item.path}
				data-testid={item['data-testid']}
			>
				<Icon width={24} height={24} Svg={item.Icon} />
				<span className={cls.linkText}>{t(item.text)}</span>
			</AppLink>
		</li>
	)
})
NavBarItem.displayName = 'HeaderItem'