import { iconSizeInfo } from '@/shared/const/iconSizes';
import { Skeleton } from '../Skeleton';

export const InfoButtonSkeleton = (props: { className?: string }) => (
	<Skeleton className={props.className} width={iconSizeInfo} height={iconSizeInfo} borderRadius='999px' />
)