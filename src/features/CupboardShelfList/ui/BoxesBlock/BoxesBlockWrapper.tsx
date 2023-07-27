import cls from './BoxesBlock.module.scss';
import { ShelfSchema } from '@/entities/Shelf';
import { BoxesBlock } from './BoxesBlock';
import { BoxesBlockSkeleton } from './BoxesBlockSkeleton';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { DURATION_SHELF_COLLAPSING_SEC } from '@/shared/const/animation';

interface BoxesBlockProps {
	shelf: ShelfSchema
	isLoading: boolean
}

export const BoxesBlockWrapper = (props: BoxesBlockProps) => {
	const {
		shelf,
		isLoading,
	} = props

	const boxesBlock = (
		<AnimateSkeletonLoader
			skeletonComponent={<BoxesBlockSkeleton />}
			componentAfterLoading={<BoxesBlock shelf={props.shelf} />}
			// animateSkeletonFadeOutTime={DURATION_SHELF_COLLAPSING_SEC}
			// commonWrapper={false}
			noDelay={!isLoading}
			classNameForCommonWrapper={cls.substitute}
			classNameAbsoluteParts={cls.setBoxesLeft}
			isLoading={isLoading}
		/>)

	return boxesBlock
	// if (shelf.isCollapsed) return <div className={cls.substitute} />
	// else if (shelf.isLoading) return <BoxesBlockSkeleton />
	// else return <BoxesBlock {...props} />
}