import cls from './BoxesBlock.module.scss';

import { Skeleton } from '@/shared/ui/Skeleton';


export const BoxesBlockSkeleton = () => {

	return (
		<div className={cls.BoxesBlock}

		>
			<Skeleton width={150} height={137}/>
			<Skeleton width={150} height={137}/>
			<Skeleton width={150} height={137}/>
			<Skeleton width={150} height={137}/>
			<Skeleton width={150} height={137}/>
		</div>
	)
}