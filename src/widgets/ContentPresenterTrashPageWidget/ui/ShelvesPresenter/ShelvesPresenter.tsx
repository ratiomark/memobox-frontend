import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ShelvesPresenter.module.scss';
import clsCommon from '../common/styles.module.scss';
import { useGetTrashQuery } from '@/entities/Trash';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ShelfItemTrash } from './ShelfItemTrash/ShelfItemTrash';
import { HStack } from '@/shared/ui/Stack';
import { ContentPresenterWrapper } from '../ContentPresenterWrapper/ContentPresenterWrapper';
import { MyText } from '@/shared/ui/Typography';
import { ButtonsBlockTrashEntity } from '../ButtonsBlockTrashEntity/ButtonsBlockTrashEntity';

interface ShelvesPresenterProps {
	className?: string
}

export const ShelvesPresenter = (props: ShelvesPresenterProps) => {
	const {
		className
	} = props
	const { isLoading, data, isError } = useGetTrashQuery()
	const { t } = useTranslation('trash-page')


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
		<div className={cls.labelsListWrapper} >
			<MyText
				size='s'
				text={t('shelf title')}
				className={cls.mainLabel}
			/>
			<div className={cls.labelsListContent} >

				<MyText
					size='s'
					text={t('boxes')}
				/>
				<MyText
					size='s'
					text={t('cards')}
				/>
				<MyText
					size='s'
					text={t('deletedAt')}
				/>
			</div>
			<div className={cls.labelsListButtonsBlock} >
				<ButtonsBlockTrashEntity
					isCollapsed={true}
					onCollapseClick={() => { }}
					onRestoreClick={() => { }}
					onRemoveClick={() => { }}
				/>
			</div>
		</div>
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