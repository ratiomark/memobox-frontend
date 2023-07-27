import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './EntitySwitcherTrashPageWidget.module.scss';
import { useSelector } from 'react-redux';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import { useMemo } from 'react';
import { getTrashPageActiveEntity } from '@/features/TrashPageInitializer';

interface EntitySwitcherTrashPageWidgetProps {
	className?: string
}

export const EntitySwitcherTrashPageWidget = (props: EntitySwitcherTrashPageWidgetProps) => {
	const {
		className
	} = props
	const activeEntityValue = useSelector(getTrashPageActiveEntity) ?? 'shelves'
	const { t } = useTranslation()

	const items: TabItem[] = useMemo(() => {
		return [
			{
				content: t('shelves'),
				value: 'shelves'
			},
			{
				content: t('boxes'),
				value: 'boxes'
			},
			{
				content: t('cards'),
				value: 'cards'
			},
		]
	}, [t])



	return (
		<div className={clsx(
			cls.entitySwitcherTrashPageWidget,
			className)}
		>
			<Tabs
				tabs={items}
				value={activeEntityValue}
			/>
		</div>
	)
}