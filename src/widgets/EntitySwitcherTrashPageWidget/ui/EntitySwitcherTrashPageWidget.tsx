import { useGetTrashQuery } from '@/entities/Trash';
import { TrashPageEntityType, getTrashPageActiveEntity, trashPageActions } from '@/features/TrashPageInitializer';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TabItem, Tabs } from '@/shared/ui/Tabs/Tabs';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from './EntitySwitcherTrashPageWidget.module.scss';

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
	const { entitiesCount } = data || {};

	const onTabClick = (tab: TabItem) => {
		dispatch(trashPageActions.setActiveEntity(tab.value as TrashPageEntityType))
	}

	const items: TabItem[] = useMemo(() => {
		// if (!entitiesCount) return []
		return [
			{
				content: t('shelves') + (` (${entitiesCount?.shelves})` ?? ' (0)'),
				value: 'shelves'
			},
			{
				content: t('boxes') + (` (${entitiesCount?.boxes})` ?? ' (0)'),
				value: 'boxes'
			},
			{
				content: t('cards') + (` (${entitiesCount?.cards})` ?? ' (0)'),
				value: 'cards'
			},
		]
	}, [t, entitiesCount])

	// useEffect(() => {
	// 	console.log(isLoading)
	// }, [isLoading])

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