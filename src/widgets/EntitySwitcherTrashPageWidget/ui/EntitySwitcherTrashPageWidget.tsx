import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './EntitySwitcherTrashPageWidget.module.scss';
import { useSelector } from 'react-redux';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import { useMemo } from 'react';
import { getTrashPageActiveEntity, trashPageActions } from '@/features/TrashPageInitializer';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { TrashPageEntityType } from '@/features/TrashPageInitializer';

interface EntitySwitcherTrashPageWidgetProps {
	className?: string
}

export const EntitySwitcherTrashPageWidget = (props: EntitySwitcherTrashPageWidgetProps) => {
	const {
		className
	} = props
	const activeEntityValue = useSelector(getTrashPageActiveEntity)
	const dispatch = useAppDispatch()
	const { t } = useTranslation('trash-page')

	const onTabClick = (tab: TabItem) => {
		dispatch(trashPageActions.setActiveEntity(tab.value as TrashPageEntityType))
	}

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
				onTabClick={onTabClick}
				classNameForTab={cls.tab}
			/>
		</div>
	)
}