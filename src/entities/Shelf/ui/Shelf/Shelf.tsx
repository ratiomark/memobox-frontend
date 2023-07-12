import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import cls from './Shelf.module.scss';
import { CompleteSmallDataLabels } from '@/shared/ui/DataLabels/CompleteSmallDataLabels/CompleteSmallDataLabels';
import { ShelfButtons } from '../../../../features/CupboardShelfList/ui/ShelfButtons/ShelfButtons';
import { Heading, MyText } from '@/shared/ui/Typography';
import { VStack } from '@/shared/ui/Stack';
import { CSSProperties, ReactNode, memo, useCallback, useState } from 'react';
import { ShelfSchema } from '../../model/types/ShelfSchema';
import { AnimatePresence, motion } from 'framer-motion'
import { useDrag, useDrop } from 'react-dnd';
import DragDotsIcon from '@/shared/assets/icons/dragDotsIcon2.svg'
import { Icon } from '@/shared/ui/Icon';


export interface ShelfProps {
	shelf: ShelfSchema
	completeSmallDataLabelsBlock: ReactNode
	shelfButtonsBlock: ReactNode
	boxesBlock?: ReactNode
	className?: string
	moveShelf: (atIndex: number, shelfIndex: number) => void
}

export const Shelf = memo((props: ShelfProps) => {
	const {
		className,
		completeSmallDataLabelsBlock,
		shelfButtonsBlock,
		boxesBlock,
		moveShelf,
		shelf: {
			title,
			id,
			isCollapsed,
			index,
		}
	} = props


	const [{ isDrag }, drag, preview] = useDrag(() => ({
		type: 'shelf',
		item: { index },
		// item: { index, id, title },
		collect: (monitor) => ({
			isDrag: monitor.isDragging()
		}),
		end: (item, monitor) => {
			const { index: originalIndex } = item
			const didDrop = monitor.didDrop()
			if (!didDrop) {
				moveShelf(index, originalIndex)
			}
		},
	}), [moveShelf, index])

	const [{ isOver, canDrop }, drop] = useDrop(() => ({
		accept: 'shelf',
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
		// hover: ({ id: draggedId, index: indexDragging }: ShelfSchema) => {
		// 	console.log('Индекс текущей полки ', indexDragging)
		// 	console.log('Drop index ', index)
		// },
		drop: ({ index: indexDragging }: ShelfSchema) => {
			console.log('Индекс текущей полки ', indexDragging)
			console.log('Дропаю на ', index)
			moveShelf(index, indexDragging)
		},
	}), [moveShelf, index])

	return (

		<motion.div
			ref={preview}
			layout
			// transition={{type: 'tween'}}
			// ref={node => preview(drop(node))}
			style={{
				transform: isOver ? 'translateY(-15px) scale(1.02)' : 'none',
				// scale: isDrag ? 1.02 : 1,
				// border: isOver ? '1px solid var(--accent)' : '',
				boxShadow: isOver ? '0 1px 4px rgba(var(--accent), 0.5)' : '',
				// marginBottom: isOver ? '30px' : '1px',
				transition: 'all 0.5s ease',
			}}
			className={cls.shelfWrapper}
		>
			<div ref={node => drag(drop(node))} className={cls.handle}>
				<Icon
					Svg={DragDotsIcon}
					type={isDrag ? 'main' : 'hint'}
					width={25}
					height={25}
				/>
				<div className={canDrop ? cls.handle2 : ''} />
			</div>

			<div
				className={clsx(
					cls.shelf,
					[className])}
				style={{
					marginBottom: isOver ? '45px' : '30px',
					transition: 'all 0.6s ease',
				}}
			>
				<div className={cls.topShelfPart}>
					<VStack align='start' gap='gap_8'>
						<Heading as='h3' size='s' title={title + '  ' + index.toString()} />
						{completeSmallDataLabelsBlock}
					</VStack>
					{shelfButtonsBlock}
				</div>
				<div className={clsx(cls.boxesWrapper, isCollapsed ? cls.collapsed : cls.notCollapsed)}>
					{/* <div className={clsx(cls.boxesWrapper, !isCollapsed ? cls.collapsed : '')}> */}
					<div className={cls.inner} >

						{boxesBlock}
					</div>
				</div>
			</div>
		</motion.div>

	)
})
