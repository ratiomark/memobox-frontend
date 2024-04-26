import { DefaultButtonSkeleton, Skeleton } from '@/shared/ui/Skeleton';
import clsShelfButtons from '../ShelfButtons/ShelfButtons.module.scss'
import { ICON_SIZE_DEFAULT } from '@/shared/const/iconSizes';

export const CommonShelfButtonsSkeleton = () => {
	return (
		<div className={clsShelfButtons.ShelfButtons}>
			{/* <DefaultButtonSkeleton width={65} /> */}
			<Skeleton width={ICON_SIZE_DEFAULT} height={ICON_SIZE_DEFAULT} borderRadius='999px' />
			<DefaultButtonSkeleton width={Number(localStorage.getItem('maxButtonWidth'))} className={clsShelfButtons.trainButton} />
			{/* <DefaultButtonSkeleton width={200} /> */}
			<Skeleton width={24} height={24} borderRadius='999px' className={clsShelfButtons.arrow} />
		</div>
	)
}
// import { DefaultButtonSkeleton, Skeleton } from '@/shared/ui/Skeleton';
// import clsShelfButtons from '../ShelfButtons/ShelfButtons.module.scss'
// import { ICON_SIZE_DEFAULT } from '@/shared/const/iconSizes';

// export const CommonShelfButtonsSkeleton = () => {
// 	return (
// 		<div className={clsShelfButtons.ShelfButtons}>
// 			<DefaultButtonSkeleton width={65} />
// 			<DefaultButtonSkeleton width={110} />
// 			{/* <DefaultButtonSkeleton width={200} /> */}
// 			<Skeleton width={ICON_SIZE_DEFAULT} height={ICON_SIZE_DEFAULT} borderRadius='999px' />
// 		</div>
// 	)
// }