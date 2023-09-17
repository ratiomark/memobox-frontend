import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './CardsListSkeleton.module.scss';

export const CardsListSkeleton = () => {
	return (
		<div>
			<Skeleton className={cls.cardListItemSkeleton} />
			<Skeleton className={cls.cardListItemSkeleton} />
			<Skeleton className={cls.cardListItemSkeleton} />
			<Skeleton className={cls.cardListItemSkeleton} />
			<Skeleton className={cls.cardListItemSkeleton} />
			<Skeleton className={cls.cardListItemSkeleton} />
			<Skeleton className={cls.cardListItemSkeleton} />
			<Skeleton className={cls.cardListItemSkeleton} />
			<Skeleton className={cls.cardListItemSkeleton} />
		</div>
	)


}
// import { Skeleton } from '@/shared/ui/Skeleton';
// import { VStack } from '@/shared/ui/Stack';
// import cls from './CardListViewWidget.module.scss';

// export const CardsListSkeleton = () => {
// 	return (
// 		<VStack gap='gap_8' max>
// 			<Skeleton className={cls.skeleton} height={64} borderRadius='4px' />
// 			<Skeleton className={cls.skeleton} height={64} borderRadius='4px' />
// 			<Skeleton className={cls.skeleton} height={64} borderRadius='4px' />
// 			<Skeleton className={cls.skeleton} height={64} borderRadius='4px' />
// 			<Skeleton className={cls.skeleton} height={64} borderRadius='4px' />
// 		</VStack>
// 	)


// }