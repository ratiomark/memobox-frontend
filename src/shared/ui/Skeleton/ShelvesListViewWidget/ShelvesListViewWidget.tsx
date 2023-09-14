import { Skeleton } from '../Skeleton';
import { HStack } from '../../Stack';

export const ShelvesListViewWidgetSkeleton = () => (<HStack gap='gap_14' >
	<Skeleton width={32} height={32} borderRadius='4px' />
	<Skeleton width={120} borderRadius='12px' height={24} />
	<Skeleton width={70} borderRadius='12px' height={24} />
	<Skeleton width={100} borderRadius='12px' height={24} />
	<Skeleton width={90} borderRadius='12px' height={24} />
</HStack >)