import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import cls from './CardListViewWidget.module.scss';

export const CardsListSkeleton = () => {
	return (
		<div className={cls.cardsSkeletonWrapper}>
			<VStack gap='gap_8' max>
				<Skeleton className={cls.skeleton} height={64} />
				<Skeleton className={cls.skeleton} height={64} />
				<Skeleton className={cls.skeleton} height={64} />
				<Skeleton className={cls.skeleton} height={64} />
				<Skeleton className={cls.skeleton} height={64} />
			</VStack>
		</div>
	)


}