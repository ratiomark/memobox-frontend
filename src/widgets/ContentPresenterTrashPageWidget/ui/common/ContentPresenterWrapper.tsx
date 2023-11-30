import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from '../common/styles.module.scss';
import { useGetTrashQuery } from '@/entities/Trash';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack } from '@/shared/ui/Stack';
import { ReactNode } from 'react';

interface ShelvesPresenterProps {
	labelsList?: ReactNode
	contentList?: ReactNode
}

export const ContentPresenterWrapper = (props: ShelvesPresenterProps) => {
	const {
		labelsList,
		contentList
	} = props
	const { isLoading, isError } = useGetTrashQuery()


	// const shelves = data?.shelves.map(shelf => <ShelfItemTrash key={shelf.id} shelf={shelf} />)

	const content = (
		<AnimateSkeletonLoader
			isLoading={isLoading}
			skeletonComponent={<Skeleton width={1000} height={35} />}
			componentAfterLoading={contentList}
			commonWrapper={false}
			classNameAbsoluteParts={cls.absolute}
		/>
	)
	return (
		<div className={cls.contentPresenter}
		>
			<HStack
				className={clsx(cls.labelsWrapper)}
				max
			>
				{labelsList}
			</HStack>
			<ul className={cls.contentListWrapper} >
				{content}
			</ul>
		</div>
	)
}