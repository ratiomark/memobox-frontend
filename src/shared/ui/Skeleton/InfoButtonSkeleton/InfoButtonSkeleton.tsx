import { infoIconSize } from '@/shared/const/iconSizes';
import { Skeleton } from '../Skeleton';

export const InfoButtonSkeleton = (props: { className?: string }) => (
	<Skeleton className={props.className} width={infoIconSize} height={infoIconSize} borderRadius='999px' />
)