import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './CardListViewWidget.module.scss';
import { getViewPage, getViewPageIsMounted, getViewPageSavedShelf, getViewPageShelfId } from '@/features/ViewPageInitializer'
import { useSelector } from 'react-redux';
import { Skeleton } from '@/shared/ui/Skeleton';
import { CardSchema } from '@/entities/Card';
import { useMemo } from 'react';
import { VStack } from '@/shared/ui/Stack';


export const CardsListSkeleton = () => {
	return (
		<VStack gap='gap_8' max>
			<Skeleton width={'100%'} height={24} />
			<Skeleton width={'100%'} height={24} />
			<Skeleton width={'100%'} height={24} />
			<Skeleton width={'100%'} height={24} />
			<Skeleton width={'100%'} height={24} />
			<Skeleton width={'100%'} height={24} />
			<Skeleton width={'100%'} height={24} />
			<Skeleton width={'100%'} height={24} />
		</VStack>
	)


}