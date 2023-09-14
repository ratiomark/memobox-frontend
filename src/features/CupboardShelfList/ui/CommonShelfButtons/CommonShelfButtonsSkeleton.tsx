import { DefaultButtonSkeleton, Skeleton } from '@/shared/ui/Skeleton';
import cls from './CommonShelfButtons.module.scss';
import { ICON_SIZE_DEFAULT } from '@/shared/const/iconSizes';

export const CommonShelfButtonsSkeleton = () => {
	return (
		<div className={cls.ShelfButtons}>
			<DefaultButtonSkeleton width={110} />
			<DefaultButtonSkeleton width={65} />
			<Skeleton width={ICON_SIZE_DEFAULT} height={ICON_SIZE_DEFAULT} borderRadius='999px' />
		</div>
	)
}