import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelvesPresenter.module.scss';
import clsCommon from '../common/styles.module.scss';
import { useGetTrashQuery } from '@/entities/Trash';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ShelfItemTrash } from './ShelfItemTrash/ShelfItemTrash';
import { HStack } from '@/shared/ui/Stack';
import { ContentPresenterWrapper } from '../common/ContentPresenterWrapper';
import { MyText } from '@/shared/ui/Typography';

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
		<>
			<MyText
				size='s'
				text={t('shelf')}
			/>
			<MyText
				size='s'
				text={t('boxes count')}
			/>
			<MyText
				size='s'
				text={t('cards count')}
			/>
			<MyText
				size='s'
				text={t('deletedAt')}
			/>
		</>
	)

	return (
		<ContentPresenterWrapper
			labelsList={labelsList}
			contentList={shelves}
		/>
	)
	// return (
	// 	<div className={clsCommon.contentPresenter}
	// 	>
	// 		<HStack
	// 			className={clsx(clsCommon.labelsWrapper)}
	// 			max
	// 		>

	// 		</HStack>
	// 		<ul className={cls.shelfListWrapper} >
	// 			{content}
	// 			{/* {shelves} */}
	// 		</ul>
	// 	</div>
	// )
}