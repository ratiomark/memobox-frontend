import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';


export const CardsListSkeleton = () => {
	return (
		<VStack gap='gap_8' max>
			<Skeleton width={'100%'} height={64} />
			<Skeleton width={'100%'} height={64} />
			<Skeleton width={'100%'} height={64} />
			<Skeleton width={'100%'} height={64} />
			<Skeleton width={'100%'} height={64} />
		</VStack>
	)


}