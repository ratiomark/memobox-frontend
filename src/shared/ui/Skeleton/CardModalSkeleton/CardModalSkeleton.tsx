import cls2 from './CardModalSkeleton.module.scss'
import cls from '@/shared/styles/CardEditAndCreateModal.module.scss'
import { DefaultButtonSkeleton, Skeleton } from '..';
import { HDialog } from '../../HDialog';
import { useEditorMinHeight } from '@/shared/lib/helpers/hooks/useEditorMinHeight';
import { useRef } from 'react';

export const CardModalSkeleton0 = () => {
	const shelvesAndBoxesRef = useRef<HTMLDivElement>(null)
	const modalButtonsRef = useRef<HTMLDivElement>(null)

	const { mainContentMaxHeight, editorMinHeight } = useEditorMinHeight({
		isOpen: true,
		modalButtonsRef: modalButtonsRef.current,
		shelvesAndBoxesRef: shelvesAndBoxesRef.current,
	})

	return (
		<div>
			<div
				className={cls.cardModal}
			>

				<div className={cls.emptySpace_top} />
				<div
					className={cls.mainContent}
					style={{ maxHeight: mainContentMaxHeight }}
				>

					<div ref={shelvesAndBoxesRef}>
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
					<div style={{ overflow: 'hidden', display: 'flex', gap: 4, flexDirection: 'column' }}>
						<Skeleton width={140} height={24} borderRadius='4px' />
						<Skeleton width={'100%'} height={editorMinHeight} borderRadius='4px' />
					</div>
					<div style={{ overflow: 'hidden', display: 'flex', gap: 4, flexDirection: 'column' }}>
						<Skeleton width={140} height={24} borderRadius='4px' />
						<Skeleton width={'100%'} height={editorMinHeight} borderRadius='4px' />
					</div>
				</div>
				<div className={cls.emptySpace_bottom} />
				<div style={{ display: 'flex', gap: 14, justifyContent: 'end' }} className={cls.actionsSkeleton} ref={modalButtonsRef}>
					<DefaultButtonSkeleton width={80} />
					<DefaultButtonSkeleton width={140} />
				</div>
			</div>
		</div>
	)
}
export const CardModalSkeleton = () => {
	return (
		<HDialog
			className={cls.cardModalPanel}
			panelWithMainPadding={false}
			isOpen={true}
		>
			<CardModalSkeleton0 />
		</HDialog>
	)
}

export const useCardModalSkeleton = () => {
	const shelvesAndBoxesRef = useRef<HTMLDivElement>(null)
	const modalButtonsRef = useRef<HTMLDivElement>(null)

	const { mainContentMaxHeight, editorMinHeight } = useEditorMinHeight({
		isOpen: true,
		modalButtonsRef: modalButtonsRef.current,
		shelvesAndBoxesRef: shelvesAndBoxesRef.current,
	})

	const cardModalSkeleton = (
		<HDialog
			className={cls.cardModalPanel}
			panelWithMainPadding={false}
			isOpen={true}
		>
			<div
			// className={cls2.CardModalSkeleton}
			// style={{ height: windowHeight * 0.9 }}
			>
				<div
					className={cls.cardModal}
				>

					<div className={cls.emptySpace_top} />
					<div
						className={cls.mainContent}
						style={{ maxHeight: mainContentMaxHeight }}
					>

						<div ref={shelvesAndBoxesRef}>
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
						<div style={{ overflow: 'hidden', display: 'flex', gap: 4, flexDirection: 'column' }}>
							<Skeleton width={140} height={24} borderRadius='4px' />
							<Skeleton width={'100%'} height={editorMinHeight} borderRadius='4px' />
							{/* <div style={{ minHeight: editorMinHeight, border: '1px solid red' }}></div> */}
						</div>
						<div style={{ overflow: 'hidden', display: 'flex', gap: 4, flexDirection: 'column' }}>
							<Skeleton width={140} height={24} borderRadius='4px' />
							<Skeleton width={'100%'} height={editorMinHeight} borderRadius='4px' />
							{/* <div style={{ minHeight: editorMinHeight, border: '1px solid red' }}></div> */}
						</div>
					</div>
					<div className={cls.emptySpace_bottom} />
					<div style={{ display: 'flex', gap: 14, justifyContent: 'end' }} className={cls.actionsSkeleton} ref={modalButtonsRef}>
						<DefaultButtonSkeleton width={80} />
						<DefaultButtonSkeleton width={140} />
					</div>
				</div>
			</div>
		</HDialog>
	)

	return { cardModalSkeleton, mainContentMaxHeight, editorMinHeight }
}