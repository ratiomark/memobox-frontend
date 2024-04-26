import { ICON_SIZE_DEFAULT } from '@/shared/const/iconSizes';
import cls from './ShelfButtons.module.scss';
import { DefaultButtonSkeleton, Skeleton } from '@/shared/ui/Skeleton';
import { TEST_BUTTONS_IDS } from '@/shared/const/testConsts';


export const ShelfButtonsSkeleton = () => {
	return (
		<div className={cls.ShelfButtons} data-testid={TEST_BUTTONS_IDS.shelf.skeletonButtons} >
			<Skeleton width={ICON_SIZE_DEFAULT} height={ICON_SIZE_DEFAULT} borderRadius='999px' />
			<Skeleton width={ICON_SIZE_DEFAULT} height={ICON_SIZE_DEFAULT} borderRadius='999px' />
			<Skeleton width={ICON_SIZE_DEFAULT} height={ICON_SIZE_DEFAULT} borderRadius='999px' />
			<DefaultButtonSkeleton width={Number(localStorage.getItem('maxButtonWidth') ?? 160)} className={cls.trainButton} />
			{/* <DefaultButtonSkeleton width={500} /> */}
			<Skeleton width={24} height={24} borderRadius='999px' className={cls.arrow} />
		</div >
	)
}
// import { ICON_SIZE_DEFAULT } from '@/shared/const/iconSizes';
// import cls from './ShelfButtons.module.scss';
// import { DefaultButtonSkeleton, Skeleton } from '@/shared/ui/Skeleton';
// import { TEST_BUTTONS_IDS } from '@/shared/const/testConsts';


// export const ShelfButtonsSkeleton = () => {
// 	return (
// 		<div className={cls.ShelfButtons} data-testid={TEST_BUTTONS_IDS.shelf.skeletonButtons} >
// 			<DefaultButtonSkeleton width={142} />
// 			<DefaultButtonSkeleton width={87} />
// 			<DefaultButtonSkeleton width={65} />
// 			<DefaultButtonSkeleton width={110} />
// 			{/* <DefaultButtonSkeleton width={500} /> */}
// 			<Skeleton width={ICON_SIZE_DEFAULT} height={ICON_SIZE_DEFAULT} borderRadius='999px' />
// 		</div >
// 	)
// }
