import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './ContentPresenterWrapper.module.scss';
import { useGetTrashQuery } from '@/entities/Trash';
import { AnimateSkeletonLoader } from '@/shared/ui/Animations';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
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
	const { isLoading, isError, data } = useGetTrashQuery()


	const content = (
		<AnimateSkeletonLoader
			isLoading={isLoading}
			noDelay={Boolean(data)}
			skeletonComponent={<Skeleton width={1000} height={35} />}
			componentAfterLoading={
				<ul className={cls.contentWrapper}>
					{contentList}
				</ul>
			}
			commonWrapper={false}
			classNameAbsoluteParts={cls.absolute}
		/>
	)

	return (
		<div className={cls.contentPresenter}>
			<HStack
				className={clsx(cls.labelsWrapper)}
				max
			>
				{labelsList}
			</HStack>
			<div className={cls.contentListWrapper} >
				{content}
			</div>
		</div>
	)
}