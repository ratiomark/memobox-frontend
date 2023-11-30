import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './BoxesPresenter.module.scss';
import { useGetTrashQuery } from '@/entities/Trash';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ShelfItemTrash } from '../ShelvesPresenter/ShelfItemTrash/ShelfItemTrash';
import { BoxItemTrash } from './BoxItemTrash/BoxItemTrash';
import { ContentPresenterWrapper } from '../ContentPresenterWrapper/ContentPresenterWrapper';
import { MyText } from '@/shared/ui/Typography';

interface BoxesPresenterProps {
	className?: string
}

export const BoxesPresenter = (props: BoxesPresenterProps) => {
	const {
		className
	} = props

	const { isLoading, data, isError } = useGetTrashQuery()


	const boxes = data?.boxes.map(box => <BoxItemTrash key={box.id} box={box} />)


	// const content = (
	// 	<AnimateSkeletonLoader
	// 		isLoading={isLoading}
	// 		skeletonComponent={<Skeleton width={1000} height={35} />}
	// 		componentAfterLoading={shelves}
	// 		commonWrapper={false}
	// 		classNameAbsoluteParts={cls.absolute}
	// 	/>
	// )
	const labelsList = (
		<MyText text='label' />
	)

	return (
		<ContentPresenterWrapper
			labelsList={null}
			contentList={boxes}
		/>
	)
	// const content = (
	// 	<AnimateSkeletonLoader
	// 		isLoading={isLoading}
	// 		skeletonComponent={<Skeleton width={1000} height={35} />}
	// 		componentAfterLoading={shelves}
	// 		commonWrapper={false}
	// 		classNameAbsoluteParts={cls.absolute}
	// 	/>
	// )

	// return (

	// 	<div className={clsx(
	// 		cls.ShelvesPresenter,
	// 		className)}
	// 	>
	// 		<ul className={cls.shelfListWrapper} >
	// 			{content}
	// 			{/* {shelves} */}
	// 		</ul>
	// 	</div>)
}