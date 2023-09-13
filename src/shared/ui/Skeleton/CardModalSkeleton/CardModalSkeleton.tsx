import clsx from 'clsx'
import cls2 from './CardModalSkeleton.module.scss'
import cls from '@/shared/styles/CardEditAndCreateModal.module.scss'
import { Skeleton } from '..';
import { HDialog } from '../../HDialog';
import { useWindowSize } from '@/shared/lib/helpers/hooks/useWindowHeight';
import { useEditorMinHeight } from '@/shared/lib/helpers/hooks/useEditorMinHeight';

interface CardModalSkeletonProps {
	className?: string;
}

export const CardModalSkeleton0 = (props: CardModalSkeletonProps) => {
	// const { editorMinHeight } = useEditorMinHeight({ isOpen: true, })
	// const { windowHeight } = useWindowSize()
	return (
		<div className={cls2.CardModalSkeleton}
		// style={{ height: windowHeight * 0.9 }}
		>
			<div
				className={cls.cardModal}
			>
				{/* <div
					className={cls.mainContentWrapper}
				> */}
				<div className={cls.mainContent}>
					<div>
						<div className={cls.grid}>
							<div className={cls.listBoxWrapper} style={{ overflow: 'hidden', display: 'flex', gap: 4, flexDirection: 'column' }}>
								<Skeleton width={120} height={24} borderRadius='4px' />
								<Skeleton width={200000} height={40} borderRadius='4px' />
							</div>
							<div className={cls.listBoxWrapper} style={{ overflow: 'hidden', display: 'flex', gap: 4, flexDirection: 'column' }}>
								<Skeleton width={140} height={24} borderRadius='4px' />
								<Skeleton width={200000} height={40} borderRadius='4px' />
							</div>
						</div>
					</div>
					<div>
						<div style={{ overflow: 'hidden', display: 'flex', gap: 4, flexDirection: 'column' }}>
							<Skeleton width={140} height={24} borderRadius='4px' />
							<div style={{ minHeight: 100, border: '1px solid red' }}></div>
							{/* <Skeleton width={200000} height={40} borderRadius='4px' /> */}
						</div>
					</div>
					<div>
						<div style={{ overflow: 'hidden', display: 'flex', gap: 4, flexDirection: 'column' }}>
							<Skeleton width={140} height={24} borderRadius='4px' />
							<div style={{ minHeight: 100, border: '1px solid red' }}></div>
							{/* <Skeleton width={200000} height={40} borderRadius='4px' /> */}
						</div>
					</div>
				</div>
			</div>
			{/* <div> */}

			{/* <Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} />
			<Skeleton width={200000} height={10} /> */}
			{/* <Skeleton width={200000} height={10} /> */}
		</div>
	)
}
export const CardModalSkeleton = (props: CardModalSkeletonProps) => {
	return (
		<HDialog isOpen={true}>
			<CardModalSkeleton0 />
		</HDialog>
	)
}