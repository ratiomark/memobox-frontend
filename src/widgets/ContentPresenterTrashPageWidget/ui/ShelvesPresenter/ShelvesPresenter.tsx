import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelvesPresenter.module.scss';
import { useGetTrashQuery } from '@/entities/Trash';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ShelfItemTrash } from './ShelfItemTrash';

interface ShelvesPresenterProps {
	className?: string
}

export const ShelvesPresenter = (props: ShelvesPresenterProps) => {
	const {
		className
	} = props
	const { isLoading, data, isError } = useGetTrashQuery()
	const { t } = useTranslation()


	const shelves = data?.shelves.map(shelf => <ShelfItemTrash key={shelf.id} shelf={shelf} />)

	const content = (
		<AnimateSkeletonLoader
			isLoading={isLoading}
			skeletonComponent={<Skeleton width={1000} height={35} />}
			componentAfterLoading={shelves}
			commonWrapper={false}
			classNameAbsoluteParts={cls.absolute}
		/>
	)
	return (
		<div className={clsx(
			cls.ShelvesPresenter,
			className)}
		>
			<ul className={cls.shelfListWrapper} >
				{content}
				{/* {shelves} */}
			</ul>
		</div>
	)
}