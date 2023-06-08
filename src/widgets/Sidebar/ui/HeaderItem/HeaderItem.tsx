import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderItemType } from '../../model/types/items';

import clsx from 'clsx';
import cls from './HeaderItem.module.scss'
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Icon } from '@/shared/ui/Icon/Icon';

interface HeaderItemProps {
	item: HeaderItemType,
}


export const HeaderItem = memo((props: HeaderItemProps) => {
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
			>
				<Icon Svg={item.Icon} />
				<span className={cls.linkText}>{t(item.text)}</span>
			</AppLink>
		</li>
	)
})
HeaderItem.displayName = 'HeaderItem'