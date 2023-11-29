import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './EntitySwitcherTrashPageWidget.module.scss';
import { useSelector } from 'react-redux';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import { useMemo } from 'react';
import { getTrashPageActiveEntity, trashPageActions } from '@/features/TrashPageInitializer';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { TrashPageEntityType } from '@/features/TrashPageInitializer';
import { useGetTrashQuery } from '@/entities/Trash';
import { t } from 'i18next';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { Skeleton } from '@/shared/ui/Skeleton';

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
	const { isLoading, data, isError } = useGetTrashQuery()
	const onTabClick = (tab: TabItem) => {
		dispatch(trashPageActions.setActiveEntity(tab.value as TrashPageEntityType))
	}

	const items: TabItem[] = useMemo(() => {
		if (!data) return []
		console.log(data)
		return [
			{
				content: t('shelves') + (` (${data?.shelves.length})` ?? ' (0)'),
				value: 'shelves'
			},
			{
				content: t('boxes') + (` (${data?.boxes.length})` ?? ' (0)'),
				value: 'boxes'
			},
			{
				content: t('cards') + (` (${data?.cards.length})` ?? ' (0)'),
				value: 'cards'
			},
		]
	}, [t, data])



	return (
		<div className={clsx(
			cls.entitySwitcherTrashPageWidget,
			className)}
		>
			<AnimateSkeletonLoader
				isLoading={isLoading}
				noDelay={!isLoading}
				skeletonComponent={<Skeleton width={420} height={38} borderRadius='8px' />}
				classNameAbsoluteParts={cls.absolute}
				classNameForCommonWrapper={cls.commonWrapper}
				componentAfterLoading={
					<Tabs
						tabs={items}
						value={activeEntityValue}
						onTabClick={onTabClick}
						classNameForTab={cls.tab}
					/>
				}
			/>

		</div>
	)
}