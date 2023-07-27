import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Shelf.module.scss';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { ShelfButtons } from '../../../../features/CupboardShelfList/ui/ShelfButtons/ShelfButtons';
import { Heading, MyText } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { CSSProperties, ReactNode, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ShelfSchema } from '../../model/types/ShelfSchema';
import { AnimatePresence, Reorder, motion, useDragControls } from 'framer-motion'
import { useDrag, useDrop } from 'react-dnd';
import DragDotsIcon from '@/shared/assets/icons/dragDotsIcon2.svg'
import { Icon } from '@/shared/ui/Icon';
import { drop } from 'lodash';

import { DURATION_SHELF_COLLAPSING_SEC } from '@/shared/const/animation';
import { Collapsible } from '@/shared/ui/Animations';

// const dndIsActiveValue = false
// const isCollapsingValue = false
let timerId: number;
export interface ShelfProps {
	shelf: ShelfSchema
	completeSmallDataLabelsBlock: ReactNode
	shelfButtonsBlock: ReactNode
	boxesBlock?: ReactNode
	className?: string
	moveShelf: (atIndex: number, shelfIndex: number) => void
	isFirstRender: boolean
}

export const Shelf = memo((props: ShelfProps) => {
	const {
		className,
		completeSmallDataLabelsBlock,
		shelfButtonsBlock,
		boxesBlock,
		isFirstRender,
		moveShelf,
		shelf: {
			title,
			id,
			isCollapsed,
			index,
		}
	} = props

	const [isDragging, setIsDragging] = useState(false)
	const [isCollapsing, setIsCollapsing] = useState(false)
	const { t } = useTranslation()
	const controls = useDragControls()

	// console.log('SHELF   ', props.shelf.isLoading)
	const handleDragStart = () => {
		setIsDragging(true);
		document.body.classList.add('dragging');
	}

	const handleDragEnd = () => {
		timerId = setTimeout(() => {
			setIsDragging(false);
			clearTimeout(timerId)
		}, 300)
		document.body.classList.remove('dragging');
	}

	useEffect(() => {
		console.log(`${title}  `, isCollapsed)

	}, [isCollapsed, title])


	// useEffect(() => {
	// 	if (isCollapsed) return
	// 	setIsCollapsing(true)
	// 	setTimeout(() => {
	// 		setIsCollapsing(false)
	// 	}, 500)
	// }, [isCollapsed])
	// const isCollapsingNow = useMemo(() => {
	// 	if (isCollapsed) return false
	// 	setTimeout(() => {
	// 		setIsCollapsing(false)
	// 	}, 100000)
	// 	setIsCollapsing(true)
	// 	return isCollapsingValue
	// }, [isCollapsed])

	return (
		<Reorder.Item
			value={props.shelf}
			// layout
			dragListener={false}
			dragControls={controls}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			// drag
			// transition={{ type: 'spring', stiffness: isDragging ? 40 : 2000 }}
			// transition={{ type: 'spring', stiffness: isDragging ? 100 : 0, velocity: 0, restSpeed: 0 }}
			// dragConstraints={{ left: 30, right: 30 }}
			// transition={{ duration: isCollapsingNow ? 0 : 0.5 }}
			// transition={{ duration: isCollapsing ? 0 : 0.5 }}
			// transition={isDragging ? { type: 'spring', duration: 1 } : { ease: 'linear', duration: 0.1 }}
			// transition={{ type: 'spring', stiffness: 900 }}
			className={cls.shelfWrapper}
		>
			<div className={cls.handle} >
				<Icon
					Svg={DragDotsIcon}
					type={isDragging ? 'main' : 'hint'}
					onPointerDown={(e) => controls.start(e)}
					style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
					width={25}
					height={25}

				/>
			</div>
			<div
				className={clsx(
					cls.shelf,
					[className])}
			>
				<div className={cls.topShelfPart}>
					<VStack align='start' gap='gap_8'>
						<Heading as='h3' size='s' title={title} />
						{/* <Heading as='h3' size='s' title={title + '  ' + index.toString()} /> */}
						{completeSmallDataLabelsBlock}
					</VStack>
					{shelfButtonsBlock}
					{/* <div>
						<div style={{ position: 'relative', zIndex: 8 }}>
						</div>
						<div style={{ position: 'relative', zIndex: 4 }}>
							<div style={{ position: 'absolute', width: 100, height: 20, background: '#bbb', zIndex: 4 }} />
							<div style={{ position: 'absolute', width: 100, height: 20, background: 'green', zIndex: 5 }} />
						</div>
					</div> */}
				</div>
				{/* <div className={cls.bottomBoxesWrapper} > */}

				{/* <motion.div
					// onClick={toggleExpand}
					// layout
					initial={false}
					style={{ overflow: isCollapsed ? 'hidden' : 'unset' }}
					animate={{ height: isCollapsed ? 0 : 'auto' }}
					// transition={{ duration: isCollapsed ? 0.5 : 0.5 }}
					transition={{ stiffness: 0, velocity: 0 }}
				>
					{boxesBlock}
				</motion.div> */}
				{/* </div> */}
				<Collapsible
					isOpen={!isCollapsed}
					// initial={false}
					initial={isFirstRender}
					animationDuration={DURATION_SHELF_COLLAPSING_SEC}
				// animationDuration={DURATION_SHELF_COLLAPSING_SEC}
				>
					{boxesBlock}
				</Collapsible>
				{/* <div className={clsx(cls.boxesWrapper, isCollapsed ? cls.collapsed : cls.notCollapsed)}>
					<div className={cls.inner} >
						{boxesBlock}
					</div>
				</div> */}
			</div>
		</Reorder.Item>

	)
})
// import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import cls from './Shelf.module.scss';
// import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
// import { ShelfButtons } from '../../../../features/CupboardShelfList/ui/ShelfButtons/ShelfButtons';
// import { Heading, MyText } from '@/shared/ui/Typography';
// import { VStack } from '@/shared/ui/Stack';
// import { CSSProperties, ReactNode, memo, useCallback, useMemo, useState } from 'react';
// import { ShelfSchema } from '../../model/types/ShelfSchema';
// import { AnimatePresence, motion } from 'framer-motion'
// import { useDrag, useDrop } from 'react-dnd';
// import DragDotsIcon from '@/shared/assets/icons/dragDotsIcon2.svg'
// import { Icon } from '@/shared/ui/Icon';

// let dndIsActiveValue = false
// let timerId: number;
// export interface ShelfProps {
// 	shelf: ShelfSchema
// 	completeSmallDataLabelsBlock: ReactNode
// 	shelfButtonsBlock: ReactNode
// 	boxesBlock?: ReactNode
// 	className?: string
// 	moveShelf: (atIndex: number, shelfIndex: number) => void
// }

// export const Shelf = memo((props: ShelfProps) => {
// 	const {
// 		className,
// 		completeSmallDataLabelsBlock,
// 		shelfButtonsBlock,
// 		boxesBlock,
// 		moveShelf,
// 		shelf: {
// 			title,
// 			id,
// 			isCollapsed,
// 			index,
// 		}
// 	} = props


// 	const [{ isDrag }, drag, preview] = useDrag(() => ({
// 		type: 'shelf',
// 		item: { index },
// 		// item: { index, id, title },
// 		collect: (monitor) => ({
// 			isDrag: monitor.isDragging()
// 		}),
// 		end: (item, monitor) => {
// 			const { index: originalIndex } = item
// 			const didDrop = monitor.didDrop()
// 			if (!didDrop) {
// 				moveShelf(index, originalIndex)
// 			}
// 		},
// 	}), [moveShelf, index])

// 	const [{ isOver, canDrop }, drop] = useDrop(() => ({
// 		accept: 'shelf',
// 		collect: (monitor) => ({
// 			isOver: monitor.isOver(),
// 			canDrop: monitor.canDrop(),
// 		}),
// 		// hover: ({ id: draggedId, index: indexDragging }: ShelfSchema) => {
// 		// 	console.log('Индекс текущей полки ', indexDragging)
// 		// 	console.log('Drop index ', index)
// 		// },
// 		drop: ({ index: indexDragging }: ShelfSchema) => {
// 			console.log('Индекс текущей полки ', indexDragging)
// 			console.log('Дропаю на ', index)
// 			moveShelf(index, indexDragging)
// 		},
// 	}), [moveShelf, index])

// 	const dndIsActive = useMemo(() => {
// 		if (isOver || isDrag || canDrop) {
// 			dndIsActiveValue = true
// 		}
// 		timerId = setTimeout(() => {
// 			dndIsActiveValue = false
// 			clearTimeout(timerId)
// 		}, 1000)
// 		return dndIsActiveValue
// 	}, [isOver, isDrag, canDrop])

// 	return (

// 		<motion.li
// 			ref={preview}
// 			layout
// 			transition={{ ease: 'linear', duration: dndIsActive ? 0.8 : 0 }}
// 			// transition={{ type: 'spring', stiffness: 900 }}
// 			// ref={node => preview(drop(node))}
// 			style={{
// 				transform: isOver ? 'translateY(-15px) scale(1.02)' : 'none',
// 				// scale: isDrag ? 1.02 : 1,
// 				// border: isOver ? '1px solid var(--accent)' : '',
// 				// boxShadow: isOver ? '0 1px 4px rgba(var(--accent), 0.5)' : '',
// 				// marginBottom: isOver ? '30px' : '1px',
// 				// transition: 'transform 0.5s ease',
// 			}}
// 			className={cls.shelfWrapper}
// 		>
// 			<div ref={node => drag(drop(node))} className={cls.handle}>
// 				<Icon
// 					Svg={DragDotsIcon}
// 					type={isDrag ? 'main' : 'hint'}
// 					width={25}
// 					height={25}
// 				/>
// 				<div className={canDrop ? cls.handle2 : ''} />
// 			</div>
// 			<div
// 				className={clsx(
// 					cls.shelf,
// 					[className])}
// 				style={{
// 					marginBottom: isOver ? '45px' : '30px',
// 					transition: 'margin 0.6s ease',
// 				}}
// 			>
// 				<div className={cls.topShelfPart}>
// 					<VStack align='start' gap='gap_8'>
// 						<Heading as='h3' size='s' title={title + '  ' + index.toString()} />
// 						{completeSmallDataLabelsBlock}
// 					</VStack>
// 					{shelfButtonsBlock}
// 				</div>
// 				<div className={clsx(cls.boxesWrapper, isCollapsed ? cls.collapsed : cls.notCollapsed)}>
// 					{/* <div className={clsx(cls.boxesWrapper, !isCollapsed ? cls.collapsed : '')}> */}

// 					<div className={cls.inner} >
// 						{boxesBlock}
// 					</div>
// 				</div>
// 			</div>
// 		</motion.li>

// 	)
// })
