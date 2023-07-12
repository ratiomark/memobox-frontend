import cls from './BoxesBlock.module.scss';
import { ShelfSchema } from '@/entities/Shelf';
import { BoxesBlock } from './BoxesBlock';
import { BoxesBlockSkeleton } from './BoxesBlockSkeleton';

interface BoxesBlockProps {
	shelf: ShelfSchema
}

export const BoxesBlockWrapper = (props: BoxesBlockProps) => {
	const {
		shelf,
	} = props

	if (shelf.isCollapsed) return <div className={cls.substitute} />
	else if (shelf.isLoading) return <BoxesBlockSkeleton />
	else return <BoxesBlock {...props} />
}